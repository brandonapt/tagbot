const db = require("../database/init");

module.exports = {
    name: 'list_tags',
    description: 'Lists all tags',
    execute: async function (body, say, context, server, client, app) {
        const tags = await db.server.findOne({ id: body.team_id });
        if (!tags.tags[0]|| !tags.tags || !tags.tags.length) {
            await say("No tags found");
            return;
        }
        const tagNames = tags.tags.map((tag) => tag.name);
        say('**Tags**\n\n' + tagNames.join('\n'));
    }
}