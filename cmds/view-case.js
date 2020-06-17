module.exports = {
    conf: {
        aliases: []
    },
    help: {
        name: 'view-case'
    },
    run: async (bot, message, args) => {
        if (!message.guild) {
            return message.reply('Not in Guild, ¯\_(ツ)_/¯')
        }

        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
            return message.reply(":x: You don't have permission to use this command")
        }

        args = args.join(' ')
        if (!args) {
            return message.reply('Please provide caseid to review')
        }
        if (isNaN(args)) {
            return message.reply(':x: Argument must be number/integer');
        }
        args = parseInt(args);

        try {
            const dbResult = bot.db.prepare('SELECT * FROM warns WHERE guild_id = ? AND guild_case_id = ?')
                .all(message.guild.id, args);

            if (dbResult.length < 1) {
                return message.reply(`:x: Case id \`${args}\` not found`);
            }

            const res = dbResult[0];
            const user = await bot.fetchUser(res.id);
            const mod = await bot.fetchUser(res.mod);

            const embed = new (require('discord.js').RichEmbed)()
                .setTitle(mod.tag, mod.displayAvatarURL)
                .addField(`Member`, user.tag)
                .addField(`Action`, res.action)
                .addField(`Reason`, res.reason)
                .setFooter(`Case ${res["guild_case_id"]}`)
                .setTimestamp()

            return message.channel.send({ embed: embed });
        } catch (error) {
            console.log(error);
            return message.channel.send('There a error while doing this thing, Please report it to bot devs!');
        }
    }
}