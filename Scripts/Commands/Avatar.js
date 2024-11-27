const Command = require("./command_cls.js")
const Canvas = require("canvas")
const { AttachmentBuilder } = require("discord.js");

class Avatar extends Command
{
    async execution(msg)
    {
        const canvas = Canvas.createCanvas(800,240);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("https://imgur.com/R5z3Xn9")
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const img = await Canvas.loadImage(
            msg.author.displayAvatarURL({extension: "png", size: 128})
        );
        ctx.drawImage(img, 50, 50, 160, 160);

        ctx.font = "30px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(`${msg.author.username}`, 400, 120)

        const attachment = new AttachmentBuilder(canvas.toBuffer(), "avatar.png")

        msg.reply(
        {
            content: `${this.get_mention(msg)}, tu foto de perfil: `,
            files: [attachment]
        });
    }
}

module.exports = new Avatar("!avatar", "diversion");