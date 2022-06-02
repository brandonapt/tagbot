module.exports = {
    name: 'ping',
    description: 'Ping!',
    setup: false,
    async execute(body, say, context) {
        await say('Pong!');    
    }
}