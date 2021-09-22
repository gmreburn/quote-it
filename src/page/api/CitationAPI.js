const Formats = {
	MLA: "MLA8",
	MLA8: "MLA8",
	APA: "APA7",
	APA7: "APA7",
	APA6: "APA6",
	HARVARD: "HARVARD",
	QUOTE: "QUOTE",
};

function CitationAPI(format, facts) {
	// facts should be an object of known metadata for citing
	switch (format) {
		case Formats.MLA8:
			return `Scheck, Justin et al. "Facebook Employees Flag Drug Cartels And Human Traffickers. The Company’S Response Is Weak, Documents Show.". WSJ, 2021, https://www.wsj.com/articles/facebook-drug-cartels-human-traffickers-response-is-weak-documents-11631812953?mod=hp_lead_pos7. Accessed 1 Aug 2020.`;

		case Formats.APA6:
			return `Scheck, J., Horwitz, J., & Purnell, N. (2021). Facebook Employees Flag Drug Cartels and Human Traffickers. The Company’s Response Is Weak, Documents Show. Retrieved 1 August 2020, from https://www.wsj.com/articles/facebook-drug-cartels-human-traffickers-response-is-weak-documents-11631812953?mod=hp_lead_pos7`;

		case Formats.APA7:
			return `Scheck, J., Horwitz, J., & Purnell, N. (2021). Facebook Employees Flag Drug Cartels and Human Traffickers. The Company’s Response Is Weak, Documents Show.. WSJ. Retrieved 1 August 2020, from https://www.wsj.com/articles/facebook-drug-cartels-human-traffickers-response-is-weak-documents-11631812953?mod=hp_lead_pos7.`;

		case Formats.HARVARD:
			return `Scheck, J., Horwitz, J. and Purnell, N., 2021. Facebook Employees Flag Drug Cartels and Human Traffickers. The Company’s Response Is Weak, Documents Show.. [online] WSJ. Available at: <https://www.wsj.com/articles/facebook-drug-cartels-human-traffickers-response-is-weak-documents-11631812953?mod=hp_lead_pos7> [Accessed 1 August 2020].`;

		case Formats.QUOTE:
			return facts.text;
		default:
			break;
	}
	return null;
}

export default CitationAPI;
// export Formats;

// http://style.mla.org
