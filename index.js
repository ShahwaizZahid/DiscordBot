const { Client, GatewayIntentBits } = require("discord.js");

const axios = require("axios");

require("dotenv").config();

const { googleSearch } = require("./google");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating short id for url " + url,
    });
  }

  if (message.content.startsWith("search")) {
    const query = message.content.split("search ")[1];
    if (!query) {
      return message.reply({
        content:
          "Please provide a correct query for search (e.g search example).",
      });
    }

    const result = await googleSearch(query);
    if (result.error) {
      return message.reply({
        content: `Error: ${result.error}`,
      });
    } else {
      return message.reply({
        content: `**${result.title}**\n${result.snippet}\n${result.link}`,
      });
    }
  }

  message.reply({
    content: "Hi! from Bot",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!");
});

client.login(process.env.LOGIN_KEY);
