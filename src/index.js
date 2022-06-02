require("dotenv").config();
const { App } = require("@slack/bolt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const db = require("./database/init");

const BotToken = process.env.woath;
const SigningSecret = process.env.signing;
const SocketToken = process.env.socket;
const Prefix = "!";

const app = new App({
  token: BotToken,
  signingSecret: SigningSecret,
  socketMode: true,
  appToken: SocketToken,
  port: 3000,
});

app.message("hello", async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

async function loadCommands() {
  const commandFiles = fs
    .readdirSync(path.join(__dirname + "/commands"))
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    app.command('/' + command.name, async ({ body, context, ack, say, client }) => {
        ack();
        if (command.setup == true) {
            const server = await db.server.findOne({ id: body.team_id });
            if (!server) {
                await db.server.create({ id: body.team_id });
            }
        await command.execute(body, say, context, server, client, app);
        } else {
            await command.execute(body, say, context);
        }
    });
  }
}



const server = express();

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.get('/invite', (req, res) => {
    res.redirect()
});

server.get('/invite/finish', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/thanks.html"));
});

server.listen(80, () => {
    console.log("Server is running on port 80");
});

(async () => {
    loadCommands();
    await app.start();
  
    console.log("Tagbot is running on port 3000!");
  })();
  