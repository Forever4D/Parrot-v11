module.exports = {
  conf: {
    aliases: []
  },
  help: {
    name: "reboot"
  },
  run: async function(bot, message) {
    if (!bot.isAdmin(message.author.id)) {
      return message.reply(
        "no perms!"+`<a:error:${'717349340649095189'}>`
      );
    }

const timeoutP = time => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };

const msg = await message.channel.send(`Rebooting system... <a:error:${'717339427709648977'}>`);
      await timeoutP(4000);
      await msg.edit("System restarted! "+`<a:error:${'717352512239435776'}>`).then(() => {
  process.exit(1);
  })
}
};
