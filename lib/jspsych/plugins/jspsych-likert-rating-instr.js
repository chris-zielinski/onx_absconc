/**
**/

(function($) {
	
	jsPsych['likert-rating-instr'] = (function() {

		var plugin = {};

		plugin.create = function(params) {
			
			params = jsPsych.pluginAPI.enforceArray(params, ['stimuli']);
			var trials = new Array(params.stimuli.length);
			
			var slider = params.slider;
			
			// check for ticklabel options if any
			var ticklab = (typeof params.slider.ticklabel === 'undefined') ? {values:[], labels:[], rm_other: false} : params.slider.ticklabel;			
			ticklab.values = (ticklab.values === 'undefined') ? [] :  ticklab.values;
			ticklab.labels = (ticklab.labels === 'undefined') ? [] :  ticklab.labels;
			
			// TODO: check for slider options according to noUIslider 
			/*slider.start = [slider.start];
			slider.connect = false;
			slider.animate = false; */
			for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].stim = params.stimuli[i]; 
				
                trials[i].slider = slider || []; 
				
				trials[i].ticklabel = ticklab;
				trials[i].button = params.button || 'Valider';

				// + Add timing_post_trial parameter (otherwise, the default value is 1000 in jspsych.js)
				trials[i].timing_post_trial = (typeof params.timing_interstim === 'undefined') ? -1 : params.timing_interstim;

            }
			return trials;
		};

		plugin.trial = function(display_element, trial) {
			
			/** Stimulus div **/
			var $stim = $('<div />')
				.attr('id', 'slider-stim')
				.html(trial.stim);
			
			
			// var $subm = $('<div />').attr('id',"subbut").addClass("form_subbutton");
			
			var $slider = $('<div />')
				.attr('id', 'slider');
			var $node = $('<div />')
				.addClass('fake-fill');
			
			var $valbut = $('<div />')
				.addClass("button")
				.attr("id","slider-valid")
				.html('<span>'+ trial.button+'</span>');
			
			display_element.append($stim, $slider, $valbut);
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
			
			$("#slider-valid").click( function() {
				// Measure response time
				var endTime = (new Date()).getTime();
				var response_time = endTime - startTime;
				
				// save data
				jsPsych.data.write({
					"rt": response_time//,
					//"stim": trial.stim,
					//"val": $('[role="slider"]').attr('aria-valuenow')
				});

				display_element.html('');

				// next trial
				jsPsych.finishTrial();
			});

			var startTime = (new Date()).getTime();
		};

		return plugin;
	})();
})(jQuery, noUiSlider);