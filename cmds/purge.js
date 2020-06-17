const {stripIndent} = require('common-tags');

module.exports = {
  conf: {
    aliases: []
  },
  help: {
    name: "purge"
  },
  run: async function(bot, message, args) {
    if (!message.guild) {
      return message.reply('This command is executeable only in servers!');
    }
    
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const MissingAuthPerm = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .setDescription(":parrot: You don't have permission to delete messages on this server! :x:")

      return message.reply({embed: MissingAuthPerm});
    }

    const EmbedA = new (require("discord.js")).RichEmbed()
      .setTitle("command: p!purge")
      .setDescription(stripIndent`
        -= List messageType =-
        \`\`\`
        * [amount] normal    = Clear all Messages
        * [amount] bots      = Clear bots messages
        * [amount] invite    = Clear invite link messages
        * [amount] links     = Clear link messages
        * [amount] self      = Clear command-invoker messages
        * [amount] pbot      = Clear parrot-bot messages
        
        Example: p!purge 10 bots
        \`\`\`
      `)
      .setColor("#e66027")    

    if (args.length < 1) {
      return message.reply({embed: EmbedA});
    }
    
    const rawNumber = args.shift().replace(/\D+/g, '');
    const realNumber = parseInt(rawNumber);
    
    if (isNaN(realNumber) || realNumber < 1) {
      return message.reply('Invalid amount type!');
    } else if (realNumber > 101) {
      return message.reply('Maximum purge amount is 100! :x:');
    }
    
    const type = args.join(' ').toLowerCase();
    
    if (type && type !== "normal") {
      let FilterMessage;
      if (type === "bots") {
        FilterMessage = msg => msg.author.bot;
      } else if (type === "invite") {
        FilterMessage = msg => msg.content.search(/(discord\.gg\/.+|discordapp\.com\/invite\/.+)/i) !== -1;
      } else if (type === "self") {
        FilterMessage = msg => msg.author.id === message.author.id;
      } else if (type === "pbot") {
        FilterMessage = msg => msg.author.id === bot.user.id;
      } else if (type === "links") {
        FilterMessage = msg => msg.content.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1;
      } else {
        return message.reply('Invalid messageType! '+`<a:error:${'717349340649095189'}>`);
      }
      
      const messages = await message.channel.fetchMessages({ limit: realNumber }).catch(err => null);
      const DeletMessages = messages.filter(FilterMessage);
      
      await message.channel.bulkDelete(DeletMessages.array().reverse()).catch(error => null);
      
      return message.channel.send(`Successfully deleted \`${DeletMessages.size}\` message(s) <a:error:${'717349278015553637'}>`)
    } else {
      const messages = await message.channel.fetchMessages({limit: realNumber}).catch(error => null);
      await message.channel.bulkDelete(messages.array().reverse()).catch(error => null);
      
      return message.channel.send(`Successfully deleted \`${messages.size}\` message(s) <a:error:${'717349278015553637'}>`)
    }
  }
};
