const db = require("../database/init");
module.exports = {
    name: 'edit_tag',
    description: 'Edits a tag',
    setup: true,
    async execute(body, say, context, server, client, app) {
        const result = await client.views.open({
            trigger_id: body.trigger_id,
            view: {
              type: 'modal',
              callback_id: 'edit_tag',
              title: {
                type: 'plain_text',
                text: 'Edit Tag'
              },
              blocks: [            
                {
                    type: 'input',
                    block_id: 'text',
                    label: {
                        type: 'plain_text',
                        text: 'New Tag Text'
                    },
                    element: {
                        type: 'plain_text_input',
                        action_id: 'tagtext',
                        multiline: true
                    }
                },
              ],
              submit: {
                type: 'plain_text',
                text: 'Edit'
              }
            }
          });
          app.view('edit_tag', async ({ ack, body, view, client, logger }) => {
            ack();
            const tagText = view['state']['values']['text']['tagtext']['value'];
            const tagServer = await db.server.findOne({ id: body.team.id });
            const tag = tagServer.tags.find((tag) => tag.name.toLowerCase() === tagName.toLowerCase());
            tag.text = tagText;
            await tagServer.save();
            await say(`Tag ${tag.name} edited`);
          }
        );
    }
}