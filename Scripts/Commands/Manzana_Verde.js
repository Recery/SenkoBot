const Command = require("./command_cls.js")

class ManzanaVerde extends Command
{
    async execution(msg)
    {
        let green_apples = await this.get_bot_state().get_green_apples(this.get_mention(msg));

        msg.reply(`${this.get_mention(msg)}, tu balance total es de ${green_apples}<:ManzanaVerde:1296171434246410380>`)
    }
}

module.exports = new ManzanaVerde("!manzanaverde");