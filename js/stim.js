/** Big object to define the stimuli and the form pages **/

/* Define all sub-objects first*/

function define_stimuli(){
	var word = ["ananas", "guitare", "espoir", "haine", "rouble","bourdonnement","ostracisme","maman","service","information","longueur","consommation","suspect","voie","pétale","stress","relais","rajeunissement","nation","parlement","victoire","écho","agriculture","ingénierie","gare","compatibilité","sentiment","simplicité","échéance","secrétariat","démence","jazz","réserve","rassemblement","affectation","mairie","généralisation","crispation","milieu","soupir","gardien","photographe","trésorerie","catalogue","pirate","terminologie","trouble","codirecteur","modèle","socle","réélection","fortune","ignorance","signe","progrès","hostilité","présentation","réorientation","zone","diffusion","voyage","exception","patronat","secours","civilisation","cosmétique","surprise","échelle","itinéraire","possibilité","lancement","nappe","déjeuner","maison","athlète","orge","amidon","approfondissement","fusion","privatisation","purée","perplexité","pincée","manie","serveur","demandeur","assurance","sûreté","probabilité","détresse","cadre","contrôleur","extrême","estimation","anatomie","citoyen","prêtre","cote","quête","dette","pourcent","preuve","bras","pharmacie","dispersion","valorisation","abri","charge","mosquée","protéine","accomplissement","espèce","éducateur","stratégie","certificat","tâche","renouvellement","renonciation","prince","musicien","temps","soubassement","galette","comité"];
	// Fillers are used to check if participant is playing the game
	var check_stim = {ananas: 'pos', guitare: 'pos', espoir: 'neg', haine: 'neg'};
	
	// Randomize words
	var word_random = jsPsych.randomization.repeat(word, 1, 0);	 
	return {word: word_random, check_point: check_stim};
}
/* ------------------------- General overview */
//var form_blocks = function(npbar_ini, npbar_tot){
function define_form_blocks(){			// npbar_ini, npbar_tot

	var main_info = [
		{
		type: "checkbox",
		idname: "gender",
		quest: "Votre sexe :",
		opt_str : ["M", "F"],
		opt_id : ["gend_m", "gend_f"],
		required: 1
		},
		{
		type: "list",
		idname: "age",
		quest: "Votre age :",
		opt_str : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105"],
		opt_id : ["age_1","age_2","age_3","age_4","age_5","age_6","age_7","age_8","age_9","age_10","age_11","age_12","age_13","age_14","age_15","age_16","age_17","age_18","age_19","age_20","age_21","age_22","age_23","age_24","age_25","age_26","age_27","age_28","age_29","age_30","age_31","age_32","age_33","age_34","age_35","age_36","age_37","age_38","age_39","age_40","age_41","age_42","age_43","age_44","age_45","age_46","age_47","age_48","age_49","age_50","age_51","age_52","age_53","age_54","age_55","age_56","age_57","age_58","age_59","age_60","age_61","age_62","age_63","age_64","age_65","age_66","age_67","age_68","age_69","age_70","age_71","age_72","age_73","age_74","age_75","age_76","age_77","age_78","age_79","age_80","age_81","age_82","age_83","age_84","age_85","age_86","age_87","age_88","age_89","age_90","age_91","age_92","age_93","age_94","age_95","age_96","age_97","age_98","age_99","age_100","age_101","age_102","age_103","age_104","age_105"],
		required: 1
		},
		{
		type : "list",
		idname : "educlevel",
		quest : "Votre niveau d'étude (ou équivalent) :",
		opt_str : ["Pré-Bac", "Bac", "Bac+1", "Bac+2", "Bac+3", "Bac+4", "Bac+5", "Bac+6","Bac+7", "Bac+8"],
		opt_id : ["study_prebac_1", "study_bac_2", 	"study_bac1_3", "study_bac2_4", "study_bac3_5", "study_bac4_6", "study_bac5_7", "study_bac6_8", "study_bac7_9", "study_bac8_10"],
		required: 1
		}	
	];		

	var language = [

		{
		type : "radio",
		idname : "lang_native",
		quest : "Votre langue maternelle : ",
		opt_str : ["français", "autre"],
		opt_id : ["langnat_fr", "langnat_oth"],
		required: 1
		},
		
		{
		type : "text",
		idname : "lang_natother",
		quest : "Si autre, précisez :",
		input_nchar: 20,
		visible_if : ["langnat_oth"]
		},
		
		{
		type : "radio",
		idname : "lang_other",
		quest : "Parlez-vous couramment (au moins) une autre langue ?",
		opt_str : ["oui", "non"],
		opt_id : ["langoth_yes", "langoth_no"],
		required: 1
		},
		
		{
		type : "radio",
		idname : "ortho",
		quest : "Avez-vous déjà été suivi(e) par un orthophoniste pour des problèmes d'apprentissage du langage ?",
		opt_str : ["oui", "non"],
		opt_id : ["ortho_yes", "ortho_no"],
		required: 1
		},
		
		{
		type : "list",
		idname : "ortho_why",
		quest : "Pour quelle(s) raison(s) ?",
		opt_str : ["langage écrit", "langage oral", "les deux", "autre"],
		opt_id : ["ortho_writ", "ortho_spok", "ortho_both", "ortho_oth"],
		visible_if : ["ortho_yes"]
		}
	];
	var exp_problem = [
		{
		type: "radio",
		idname: "exp_prob",
		quest: "Avez-vous rencontré un problème pendant la notation des mots ?",
		opt_str : ["oui", "non"],
		opt_id : ["prob_yes", "prob_no"]
		},
		{
		type: "text",
		idname: "exp_prob_which",
		quest: "Lequel ?",
		input_nchar: 50,
		visible_if : ["prob_yes"]
		}
	];

	/* ================= Big form object */	
	//var iniarr = [];
	var hf_form = [
		{
			preamble: "Quelques questions pour finir :",
			elements: main_info	
		},	
		{
			preamble: " ",
			elements: language
		},
		{
			preamble: "Et enfin :",
			elements: exp_problem
		}
		];
		
	/*** Define ALL FORM BLOCKS*/

	var Npages = hf_form.length;
	var form_blocks = new Array(Npages);
	for (var i = 0; i < Npages ; i++) {
		
		form_blocks[i] = {
			type: "form",
			preamble: hf_form[i].preamble,
			progbar: false,
			form_struct: hf_form[i].elements,
			submit: "Valider"
		};
	}	
	form_blocks[Npages-1]["submit"] = "Validation finale";
	return form_blocks;
};
