module.exports = {
    conf: {
        aliases: []
    },
    help: {
        name: 'warnings'
    },
    run: async (bot, message, args) => {
        if (!message.guild) {
            return message.reply('Not in Guild, ¯\_(ツ)_/¯')
        }

        let member = message.member;
        if (args.length > 0) {
            member = bot.getMemberFromString(message, args.join(' '));
            if (!member) {
                return message.reply('Please mention a valid member of this server first')
            }
        }

        try {
            let result = bot.db.prepare('SELECT * FROM warns WHERE guild_id = ? AND id = ?')
                .all(message.guild.id, member.user.id);
            console.log(result);
          
            result = result.sort((a, b) => a["guild_case_id"] - b["guild_case_id"])
            let rows = result.length;
            if (rows > 20) {
                result += result.splice(0, 21)
            }
          
            

            const warn = result.filter(r => r.action === 'warn').length;
            const kick = result.filter(r => r.action === 'kick').length;
            const ban = result.filter(r => r.action === 'ban').length;
            const mute = result.filter(r => r.action === 'mute').length;

            let warns = '';
            for (const row of result) {
                warns += `\`Case ${row["guild_case_id"]}:\` **${row.action}** - ${row.reason}\n`
            }

            const embed = new (require('discord.js').RichEmbed)()
                .setTitle(member.user.tag, member.user.displayAvatarURL)
                .setDescription(warns || 'None')
                .setFooter(`Warned: ${warn} Kicked: ${kick} Banned: ${ban} Muted: ${mute}`);

            return message.channel.send({ embed: embed })

        } catch (error) {
            console.log(error)
            return message.channel.send('There a error while doing this thing, Please report it to devs!');
        }
    }
}