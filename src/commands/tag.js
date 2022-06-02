const db = require("../database/init");

module.exports = {
    name: "tag",
    description: "View a tag",
    setup: true,
    async execute(body, say, context, server, client, app) {
        const tagName = body.text
        if (!tagName) {
            await say("Please specify a tag name");
            return;
        }
        
        const tagServer = await db.server.findOne({ id: body.team_id });
        const tag = tagServer.tags.find((tag) => tag.name.toLowerCase() === tagName.toLowerCase());
        say(tag.text);
    }
}