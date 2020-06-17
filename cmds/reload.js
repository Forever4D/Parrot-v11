module.exports = {
  conf: {
    aliases: []
  },
  help: {
    name: "reload"
  },
  run: async function(bot, message) {
    if (!bot.isAdmin(message.author.id)) {
      return message.reply(
        "no perms!"+`<a:error:${'717349340649095189'}>`
      );
    }

    const readdir = require("util").promisify(require("fs").readdir);

    try {
      const files = await readdir("./cmds/");
      const jsfiles = files.filter(x => x.split(".").pop() === "js");
      if (jsfiles.length < 0) {
        return message.reply("No commands to load");
      }
      console.log(`Loading ${jsfiles.length} commands!`);

      bot.commands = new (require("discord.js")).Collection();
      jsfiles.forEach((f, i) => {
        if (require.cache[require.resolve(`../cmds/${f}`)])
          delete require.cache[require.resolve(`../cmds/${f}`)];
        let props = require(`../cmds/${f}`); // not yet
        console.log(`${i + 1}: ${f} commands loaded!`);
        bot.commands.set(props.help.name, props);
      });

      return message.channel.send("Commands reloaded! "+`<a:error:${'717352512239435776'}>`);
    } catch (error) {
      return message.reply(`\`\`\`${error}\`\`\``);
    }
  }
};
