const Command = require("./command_cls.js");
const Discord = require("discord.js");

class Regalito extends Command
{
    execution(msg)
    {
        if (msg.author.id !== "1296846133489963049" && msg.author.id !== "1069155273182285834") 
        {
            msg.reply("Usuario no autorizado.");
            return;
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle("Regalo")
            .setColor("#0099ff");

        msg.reply({embeds:[embed]});
    }
}

module.exports = new Regalito("!regalito", "diversion");