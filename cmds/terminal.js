module.exports = {
    run: async (bot, message, args) => { // THIS EVEN BETTER LOOK
        if (!bot.isAdmin(message.author.id)) {
            return message.reply(`Access denied! :parrot: <a:error:${'717349340649095189'}> \`\`\`app@r-parrot$terminal:~ author(${message.author.id}): ${args}\`\`\``);
        }
      
const embed = new (require("discord.js")).RichEmbed()
      .setAuthor("Parrot Terminal", message.author.displayAvatarURL)
      .setDescription("```app@r-parrot$terminal:~ missing arguments...```")
      .setColor("#883dd9")


if (args.length < 1) {
    return message.channel.send({embed: embed});
  }
        try {
            const argString = args.join(" ");
            let evaled = await eval(argString);

            evaled = require("util").inspect(evaled, { depth: 0 });
            evaled = evaled.replace(new RegExp(bot.token), "<redacted>")
            evaled = evaled.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

            await message.channel.send(`Result: \n\`\`\`${evaled.length > 2000 ? evaled.slice(0, 1900) : evaled}\`\`\``)
        } catch (error) {
            await message.channel.send(`Error: \`\`\`${error}\`\`\``)
        }
    },
    conf: {
        aliases: []
    },
    help: {
        name: "terminal"
    }
}