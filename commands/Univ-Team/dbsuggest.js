module.exports = {
    name: 'dbsuggest',
    usage: '',
    desc: 'Suggest an application for Universal DB',
    DM: true,
    permissions: [],
    exec(UnivBot, msg) {
        return msg.send('Follow the template specified here: https://github.com/Universal-Team/db/issues/new?assignees=&labels=app+request&template=app-request.md');
    }
};