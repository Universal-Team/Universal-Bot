module.exports = {
	name: "dbsuggest",
	usage: "",
	desc: "Suggest an application for Universal DB",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		return msg.send({"embed": {
			"title": "Universal DB app request",
			"url": "https://github.com/Universal-Team/db/issues/new?assignees=&labels=app+request&template=app-request.md",
			"description": "You can suggest apps by submitting an Issue following this template on the GitHub repository.",
			"color": 51330
		}});
	}
}
