import "reflect-metadata";
import path from "path";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";

const client = new Client({
  prefix: "!",
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  classes: [
    path.join(__dirname, "commands", "**/*.{ts,js}"),
    path.join(__dirname, "events", "**/*.{ts,js}"),
  ],
  // slashGuilds: ["475742959585722408"],
  silent: true,
});

client.on("ready", () => {
  client.initSlashes({ log: { forGuild: true, forGlobal: true } });
});

client.on("interactionCreate", (interaction: Interaction) => {
  client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
  client.executeCommand(message);
});

client.login(process.env.BOT_TOKEN ?? ""); // provide your bot token