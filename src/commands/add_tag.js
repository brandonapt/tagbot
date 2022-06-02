const db = require("../database/init");
module.exports = {
    name: 'add_tag',
    description: 'Add a tag',
    setup: true,
    async execute(body, say, context, server, client, app) {
        const result = await client.views.open({
            trigger_id: body.trigger_id,
            view: {
              type: 'modal',
              callback_id: 'create_tag',
              title: {
                type: 'plain_text',
                text: 'Create Tag'
              },
              blocks: [            
                {
                  type: 'input',
                  block_id: 'name',
                  label: {
                    type: 'plain_text',
                    text: 'Tag Name'
                  },
                  element: {
                    type: 'plain_text_input',
                    action_id: 'tagname',
                    multiline: false
                  }
                },
                {
                    type: 'input',
                    block_id: 'text',
                    label: {
                        type: 'plain_text',
                        text: 'Tag Text'
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
                text: 'Submit'
              }
            }
          });
          app.view('create_tag', async ({ ack, body, view, client, logger }) => {
            ack();
            const tagName = view['state']['values']['name']['tagname']['value'];
            const tagText = view['state']['values']['text']['tagtext']['value'];
            const tag = {
                name: tagName,
                text: tagText,
                createdAt: new Date()
            };
            const server = await db.server.findOne({ id: body.team.id });
            server.tags.push(tag);
            await server.save();
            await say(`Tag ${tagName} added!`);
          }
        );
    }
}