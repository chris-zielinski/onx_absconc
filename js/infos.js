var legal = { 
	title: "Mentions légales",
	text: [
		"Ce site a été conçu pour le projet de recherche mené par des personnels d'<a target='_blank' href='https://www.univ-amu.fr/'>Aix-Marseille Université</a>.",
		"<span class='important'>Identification</span> AMU (LPL, LPC, ILCB) - Adresse : 5 avenue Pasteur, 13100 Aix-en-Provence, France - Téléphone : +33(0)4.13.55.27.08 - Courriel : nuria.gala(at)univ-amu.fr ",
		"<span class='important'>Conception et réalisation</span> Aix-Marseille Université - D. Goryachun<sup>1</sup>, N. Gala<sup>1</sup>, C. Zielinski<sup>2</sup> (<sup>1</sup><a target='_blank' href='http://lpl.univ-amu.fr/'>Laboratoire Parole et Langage</a> ; <sup>2</sup><a target='_blank' href='https://www.ilcb.fr/'>Institute of Language, Communication, and the Brain</a>)",
		"<span class='important'>Responsable de la publication</span> Núria Gala",
		"<span class='important'>Hébergement</span> Serveur ILCB administré par Stéphane Dufau (<a target='_blank' href='https://lpc.univ-amu.fr/fr'>Laboratoire de Psychologie Cognitive</a>, Marseille, AMU)"]
};

var anonym = {
	title: "Anonymat",
	text: [	
		"Les données collectées sont <b>anonymes</b>, c'est-à-dire qu'elles ne contiennent aucune information permettant de vous identifier (vos nom et prénom, adresse physique et IP demeurent inconnus).",
		"La liste des données collectées est :"+ 
		"<ul><li style='list-style-type:square;'> la date de lancement de l'expérience depuis votre navigateur</li>"+
		"<li style='list-style-type:square;'> le type de navigateur (Firefox, Chrome, Opera) et sa version</li>"+
		"<li style='list-style-type:square;'> le système d'exploitation (Windows, Mac, Unix) et sa version</li>"+
		"<li style='list-style-type:square;'> les valeurs données à l'échelle abstrait/concret pour les 120 mots proposés</li>"+
		"<li style='list-style-type:square;'> les données du questionnaire final</li></ul>",
		"Les réponses du formulaire final sont utilisées pour analyser les données (corrélations entre les mesures recueillies).", 
		"L'ensemble de ces données est stocké dans une base mySQL sur le serveur à l'aide d'un script PHP, à la toute fin de l'expérience. ",
		"L'accès aux pages de l'expérience n'engendre aucun dépôt de traceur (cookie) sur votre ordinateur.",
		"Ce site n'est pas déclaré à la CNIL car il ne recueille pas d'informations personnelles (« informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » - article 4 de la loi n° 78-17 du 6 janvier 1978)."]
};

var consent = {
	title: "Consentement",
	text: ["En acceptant de lancer l'expérience, vous donnez votre consentement à l'enregistrement des données et à leur utilisation à des fins de recherche scientifique. Du fait qu'elles soient anonymes, il sera impossible de les supprimer a posteriori de la base de données. Vous pouvez à tout moment quitter l'expérience (les données ne sont enregistrées dans la base qu'à la toute fin de l'expérience)."]
};

var lucky = {
	title: "Tirage au sort",
	text: ["A l'issue de votre participation, un tirage au sort a lieu qui vous permettra peut-être de gagner un bon d'achat de 25€ (un gagnant tous les 50 participants). La méthode de tirage au sort garantit l'anonymat des données : aucun lien ne pourra être établi entre le gagnant et une entrée spécifique de la base de données. Le résultat du tirage s'affiche à la fin de l'expérience. Si vous êtes gagnant, un code pour un bon d'achat et une adresse e-mail de contact seront affichés."]
};

var valid = {
	title: "Validité de participation",
	text: ["Votre implication dans l'expérience sera contrôlée automatiquement au cours de l'expérience. Dans l'éventualité où cette vérification révèlerait une participation non conforme (pas de réponse donnée, réponses aléatoires), un message vous en alertera et l'expérience sera arrêtée. Les données ne seront pas collectées ni le tirage au sort réalisé."]
	
}
var respon = {
	title: "Limitation de responsabilité",
	text: [
		"L'expérience est jouée par votre navigateur à l'aide du langage JavaScript, et en particulier de la librairie <a target='_blank' href='https://www.jspsych.org/'>jsPsych</a>. Ce langage est interprété par tous les navigateurs récents, il permet de rendre le contenu de la page dynamique – le contenu est modifié par votre navigateur directement, indépendamment du côté serveur. En aucun cas ce site ne pourra être tenu responsable de dommages matériels directs ou indirects liés à l'exécution de l'expérience par votre navigateur."]
};

var scripts = {
	title: "Outils & scripts",
	text: ["<p>L'expérience a été développée à partir de la librairie <a target='_blank' href='https://www.jspsych.org/'><img class='logo' src='img/layout/logo_jspsych.png' style='float:left;max-height:3em;padding-right:1em;padding-bottom:2em;' alt='Logo jsPsych' title='Vers le site de jsPsych'/>jsPsych</a>. "+  
		"Le fond d'écran de la page d'accueil provient du site <a target='_blank' href='https://www.toptal.com/designers/subtlepatterns/seamless-paper-texture/'>Subtle Patterns</a>.</p>"]
};

/*+
		"Les barres de défilement ont été générées grâce au plugin <a target='_blank' href='https://manos.malihu.gr/jquery-custom-content-scroller/'>jQuery custom content scroller</a>."*/
	
var allinfos = [anonym, consent, lucky, valid, respon, legal, scripts]; 

function put_lines(textarr){
	var Np = textarr.length;
	var spar = "";
	for (var k = 0 ; k < Np ; k++){
		spar += "<p>" + textarr[k] + "</p>";
	}
	return spar;
}

function put_infos(infos){
	
	var Ni = infos.length;
	var infotext = "";
	for (var i=0; i < Ni; i++){
		
		var infopart = infos[i];
		infotext += "<div class='legal_title shabox'>" + infopart.title + "</div>";
		infotext += put_lines(infopart.text);
	}
	return infotext;	
}

var info_txt = put_infos(allinfos);