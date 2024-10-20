const Command = require("./command_cls.js")

class ManzanaVerde extends Command
{
    users = [];

    execution(msg)
    {
        var user_added = false;
        var total_apples = 1;
        for (const user of this.users)
        {
            if (user.user === this.get_mention(msg))
            {
                user_added = true;
                user.green_apples += 1;
                total_apples = user.green_apples;
                break;
            }
        }

        if (!user_added)
            this.users.push({user: this.get_mention(msg), green_apples: 1})

        msg.reply(`${this.get_mention(msg)}, ahora tenes ${total_apples}<:ManzanaVerde:1296171434246410380>`)
    }
}

module.exports = new ManzanaVerde("!manzanaverde");