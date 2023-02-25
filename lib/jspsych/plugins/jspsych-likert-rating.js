/**
**/

(function($) {
	
	jsPsych['likert-rating'] = (function() {

		var plugin = {};

		plugin.create = function(params) {

			params = jsPsych.pluginAPI.enforceArray(params, ['stimuli']);
			
			params.slider = params.slider || [];
			
			// check for ticklabel options if any
			var ticklab = (typeof params.slider.ticklabel === 'undefined') ? {values:[], labels:[], rm_other: false} : params.slider.ticklabel;			
			ticklab.values = (ticklab.values === 'undefined') ? [] :  ticklab.values;
			ticklab.labels = (ticklab.labels === 'undefined') ? [] :  ticklab.labels;
			
			params.ticklabel = ticklab;
			// + Add timing_post_trial parameter (otherwise, the default value is 1000 in jspsych.js)
			params.timing_post_trial = (typeof params.timing_interstim === 'undefined') ? -1 : params.timing_interstim;
			
			var trials = [params];
			// TODO: check for slider options according to noUIslider 
			/*slider.start = [slider.start];
			slider.connect = false;
			slider.animate = false; */
			return trials;
		};

		plugin.trial = function(display_element, trial) {
			var stim = trial.stimuli[0];
			var startTime = (new Date()).getTime();
			var istim = 0;
			// minimum number of valid responses 
			var thr_wrong_max = Object.keys(trial.check_point).length - trial.thr_check_min;
			// count number of valid response for controlled stimuli
			var count_wrong = 0;
			// threshold of allowed number of no slider manipulation
			var thr_null_max =  trial.thr_null_max;
			// count number of trial associated with no slider position change
			var count_null = 0;
			var Nstim = trial.stimuli.length;
			
			var update_count = function(istim){
				$('#slider-count').html(('000'+(istim+1)).slice(-3) + '/'+ Nstim);
			}
			
			/** Stimulus div **/
			var $stim = $('<div />')
				.attr('id', 'slider-stim')
				.html(stim);
			
			var $slider = $('<div />')
				.attr('id', 'slider');
				
			var $node = $('<div />')
				.addClass('fake-fill');


			var $valbut = $('<div />')
				.addClass("button")
				.attr("id","slider-valid")
				.html('<span>'+ trial.button+'</span>');
				
			// display the counter of trial
			var $count = $('<div/>')
				.attr('id', 'slider-count')
				.html('001/'+ Nstim);
			
			display_element.append($stim, $slider, $valbut, $count);
			var sliderUI = noUiSlider.create($slider[0], trial.slider);

			// check if pips have been set + change label according to trial.ticklabel option if needed
			var tklab = trial.ticklabel;
			if ((typeof trial.slider.pips !=='undefined') && (tklab.values.length > 0)){
				// remove all values
				if (tklab.rm_other){
					$('.noUi-value').each(function(){
						$(this).html('');
					});
				}
				// Change label at specific value
				for (var i=0; i < tklab.values.length ; i++){
					$('.noUi-value[data-value="'+tklab.values[i] + '"]').html(tklab.labels[i]);
				}
			}
			
			// $('#subbut').append($but);
			$('#slider').append($node);
			
			var node = $node[0];
			sliderUI.on('update', (values, handle, unencoded, tap, positions) => {
			  var pos = positions[0];

			  if (pos >= 50) {
				node.style.left = '50%';
				node.style.right = 'auto';
				node.style.width = (pos - 50) + '%';
			  } else {
				node.style.left = 'auto';
				node.style.right = '50%';
				node.style.width = (50 - pos) + '%';
			  }
			});

			$('.noUi-value').click(function(){
				sliderUI.set(parseInt($(this).attr('data-value')));
			});
			/**------ PARSE THE RESPONSES AFTER SUBMIT BUTTON CLICK **/
			var end_stim = function() {
				// Measure response time
				var endTime = (new Date()).getTime();
				var response_time = endTime - startTime;
				
				var val = $('[role="slider"]').attr('aria-valuenow');
				var valnum = parseInt(val);
				// save data
				jsPsych.data.write({
					"type": (typeof trial.check_point[stim] !== 'undefined') ? "check" : "rating",
					"icur": istim+1,
					"rt": response_time,
					"stim": stim,
					"val": parseInt(val)
				});
				// check if check_point stim
				if (typeof trial.check_point[stim] !== 'undefined'){
					if ((trial.check_point[stim]==='neg' && valnum>=0) 
						|| (trial.check_point[stim]==='pos' && valnum<=0)){
							count_wrong++;
						} 
				}
				if (valnum===0){
					count_null++;
				}
				if (count_null > thr_null_max || count_wrong > thr_wrong_max){
					display_element.html("<div id='slider-stim'>"+ trial.stop_msg + "</div>");
					return;
				}
				// next trial			
				$('#slider-stim').css('opacity', 0);
				istim++;
				if (istim+1 > Nstim){
					display_element.html('');
					jsPsych.finishTrial();
				}else{
					stim = trial.stimuli[istim];
					update_count(istim);
					disp_stim(stim);
				}
				
			};
			var disp_stim = function(stim) {
				
				sliderUI.set(0);
				$('#slider-stim')
					.html(stim)
					.animate({opacity: 1},
						{
							duration: 100,
							complete: function(){
								startTime = (new Date()).getTime();
							}
						});
					
			};
			$("#slider-valid").click(end_stim);

		};

		return plugin;
	})();
})(jQuery, noUiSlider);