const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "create",
    description: "create a new url",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.LOGIN_KEY);

async function commandor() {
  try {
    await rest.put(Routes.applicationCommands(process.env.USER_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
}
commandor();
