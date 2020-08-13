const http = require("http");
const express = require("express");
const Database = require("better-sqlite3");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " - Uptime");
  response.sendStatus(200);
});
app.listen(3000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get("/lol.xd", (req, res) => {
  res.send("key1, key2, key3"); // A92jfAjdkALsjfopslfds====
}); // edit from here i'm lazy to use fs.readSync

const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const {stripIndent} = require('common-tags');

const prefix = botConfig.prefix;
const fs = require("fs");
const bot = new Discord.Client({
  disableEveryone: true
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.warns = require("./warns.json");

bot.db = new Database(".data/parrot.db")

bot.db.prepare("CREATE TABLE IF NOT EXISTS warns (guild_id TEXT NOT NULL, id TEXT NOT NULL, reason TEXT, mod TEXT NOT NULL, action TEXT, guild_case_id INTEGER NOT NULL)")
  .run()

bot.isGuildModerator = function(message) {
  if (!message.member) {
    return false;
  }

  const role = message.member.roles.find(role => {
    const mods = ["Administrator", "Moderator"];

    return mods.includes(role.name);
  });

  return role ? true : false;
};

bot.getLatestCaseId = async function(guild) {
  Array.max = function(array) {
    return Math.max.apply(Math, array);
  }

  const count = bot.db.prepare("SELECT * FROM warns WHERE guild_id = ?")
    .all(guild.id);

  if (count.length === 0) {
    return 0;
  }

  const results = count.map(r => r["guild_case_id"]);

  return Array.max(results);
}

bot.isAdmin = function(id) {
  // if you checking author id is admin or not try use this function in if else statement
  return [
    "239023934391975936",
    "550983444734279691",
    "523854355955449896",
    "429581898759536653"
  ].includes(id);
};

bot.getMemberFromString = function(message, text) {
  if (!message.guild) return;
  if (!text) return;

  let mostRecentTimestamp = 0;
  let match;

  for (const member of message.guild.members.array()) {
    if (
      (!member.user.tag.toLowerCase().includes(text.toLowerCase()) &&
        !(
          member.nickname &&
          member.nickname.toLowerCase().includes(text.toLowerCase())
        ) &&
        !(member.user.id === text.replace(/[^\d]/g, ""))) ||
      (member.lastMessage ? member.lastMessage.createdTimestamp : 0) <
        mostRecentTimestamp
    )
      continue;

    mostRecentTimestamp = member.lastMessage
      ? member.lastMessage.createdTimestamp
      : 0;
    match = member;
  }

  return match;
};

bot.checkMiddleware = function(member, target) {
  if (member.user.id === "344754852989108226") {
    return false;
  }

  const targetHighest = target.highestRole.position;
  const memberHighest = member.highestRole.position;

  return targetHighest >= memberHighest;
};

fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("no commands to load");
    return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    props.name = props.help.name;
    console.log(`${i + 1}: ${f} command loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("webhookUpdate", (channel) => {
  if (channel.guild.id !== "508183387509358592") {
    return;
  }

  channel.fetchWebhooks().then(collec => {
    collec.map(x => x.delete("Unauthorized webhook!"));
  })
})

bot.on("ready", () => {
  bot.user.setActivity(` p!help | ${bot.guilds.size} » SERVERS ✨`
, { type: "WATCHING" });
  
  console.log(bot.user.tag);
  console.log("Bot is running!");

  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      if (!guild) continue; // this should fix it
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if (!mutedRole) continue;
      if (!member) continue;

      if (Date.now() > time) {
        console.log(`${i} is now able to be unmuted !`);

        member.removeRole(mutedRole);
        delete bot.mutes[i];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
        });
      }
    }
  }, 5000);
});
console.log(`bot is ready! `);
console.log(bot.commands);

bot.commandCooldowns = new Discord.Collection();

// I remove some guild-only code :)

Array.prototype.remove = function() {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

bot.on("messageDelete", async msg => {
  if (msg.partial) {
    return;
  }

  msg.dateDeleted = new Date();
  if (!msg.channel.lastMessageI) {
    msg.channel.lastMessageI = [];
  }
  
  msg.channel.lastMessageI.reverse();
  msg.channel.lastMessageI.push(msg);
  msg.channel.lastMessageI.reverse();
  setTimeout(() => {
    if (typeof msg.channel.lastMessageI === "object") msg.channel.lastMessageI.remove(msg);
  }, 600000) // I add this to make 10minute message life
});

bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.isMentioned(bot.user)) {
    message.channel.send(`Prefix `+"``p!``"+` | type p!help to view list of all commands!`);
  }

// if (message.guild && !bot.isGuildModerator(message)) {
//    const regex = /(discord\.gg\/.+|discordapp\.com\/invite\/.+|discord\.com\/invite\/.+)/i;
//
//    if (regex.test(message.content)) {
//      await message.author
//        .send("Sending invite link is not allowed!")
//        .catch(_ => null);
//      return message.delete();
//    }
//  }

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (!cmd) return;

  if (!cmd.cooldown) cmd.cooldown = 5000;

  if (!bot.isAdmin(message.author.id)) {
    if (bot.commandCooldowns.has(message.author.id)) {
      const cooldowns = bot.commandCooldowns.get(message.author.id);

      if (cooldowns.has(cmd.name)) {
        const expirationTime = cooldowns.get(cmd.name);
        const timeRemaining = Math.ceil((expirationTime - Date.now()) / 1000) * 1000;

        if (Date.now() < expirationTime) {
          if (!cooldowns.has('handler:cooldown') || Date.now() > cooldowns.get('handler:cooldown')) message.reply(createCooldownEmbed(timeRemaining))
          return cooldowns.set('handler:cooldown', Date.now() + 5000);
        }
      }

      cooldowns.set(cmd.name, Date.now() + cmd.cooldown);
    } else {
      const cooldowns = new Discord.Collection();

      cooldowns.set(cmd.name, Date.now() + cmd.cooldown);

      bot.commandCooldowns.set(message.author.id, cooldowns)
    }
  }
  if (cmd) {
    try {
      console.log(message.author.tag + " runned command: " + cmd.help.name);
      if (!["terminal"].includes(cmd.help.name)) {
      }

      await cmd.run(bot, message, args);
    } catch (error) {
      console.error(error);
      await message.channel.send(
        `an error occurred while executing commands: \`\`\`${error.stack}\`\`\``
      );
    }
  }
});

const createCooldownEmbed = (timeRemaining) => {
  const embed = new Discord.RichEmbed()
    .setDescription(`Slow down... You can use this command again in \`${Math.ceil(timeRemaining / 1000)}s\``)

  return embed;
}

bot.login("NDU0MjgyMzk1Nzg1NDk0NTM4.Wxk5cw.xwXdRONfTQRf2dLq_5b9xoshrzA");
