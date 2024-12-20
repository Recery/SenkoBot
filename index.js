require('dotenv').config()
const { Client, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildPresences
  ],
  http: {timeout:60000}
});

const available_commands = require("./Scripts/available_commands.js");
const available_interactions = require("./Scripts/available_interactions.js");
const Prefix = require("./prefix.js");

client.once(Events.ClientReady, (readyClient) => {
	for (const command of available_commands)
		command.set_client(client);

	console.log(`El bot inició correctamente como ${readyClient.user.tag}.`);
});

client.on(Events.MessageCreate, (msg) => {
	const prefix = Prefix.get_prefix(msg.guildId);
	if (!msg.content.startsWith(prefix)) return;

	const content = msg.content.slice(msg.content.indexOf(prefix) + 1).trim().split(' ');
	console.log(content[0]);

	if (msg.author.id !== "1069155273182285834")
	{
		return;
	}

	if (content === "receryhelp")
  	{
    	let message = "Comandos de Recery Bot: \n"
    	message += "!receryhelp, ";
    	for (const command of available_commands)
    	{
    		message += command.get_activator() + ", ";
    	}
    	message = message.slice(0, -2);
    	msg.reply(get_help_message());
  	}
	else
	{
		for (const command of available_commands)
		{
			command.check_activation(content[0]);
		}
	}
});

client.on(Events.InteractionCreate, async (interaction) => {
	for (const interaction_content of available_interactions)
	{
		if (interaction_content.check_activation(interaction.customId))
			interaction_content.execution(interaction);
	}
});

function get_help_message()
{
	let embed = new EmbedBuilder()
		.setColor("#65a7fc")
		.setTitle("Comandos de Recery Bot")
		.addFields(
			{name: "Acción", value: "Comandos para realizar acciones hacia otros miembros o hacia ti mismo."},
			{name: "Apoyo", value: "Comandos para apoyar a Recery, mi creador."},
			{name: "Ayuda", value: "Comandos que te ayudarán."},
			{name: "Diversion", value: "Comandos para divertirte."},
			{name: "Otros", value: "Comandos varios."}
		)

	const delete_button = new ButtonBuilder()
		.setCustomId("delete")
		.setLabel("Cancelar")
		.setStyle(ButtonStyle.Danger);

	const selection = new StringSelectMenuBuilder()
		.setCustomId("help_categories_sel")
		.setPlaceholder("Elige una categoría")
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel("Acción")
				.setDescription("Comandos para realizar acciones hacia otros miembros o hacia ti mismo.")
				.setValue("accion"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Apoyo")
				.setDescription("Comandos para apoyar a Recery, mi creador.")
				.setValue("apoyo"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Ayuda")
				.setDescription("Comandos que te ayudarán.")
				.setValue("ayuda"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Diversión")
				.setDescription("Comandos para divertirte.")
				.setValue("diversion"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Otros")
				.setDescription("Comandos varios.")
				.setValue("otros"),
		);
	
	const row1 = new ActionRowBuilder()
		.addComponents(selection);
	const row2 = new ActionRowBuilder()
		.addComponents(delete_button);

	let message = {
		embeds: [embed],
		components: [row1, row2]
	};
	return message;
}

client.login(process.env.TOKEN);
