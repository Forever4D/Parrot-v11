module.exports.run = async (bot, message) => {

function getMemoryUsage() {
  let total_rss = Number( require('fs').readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8").split("\n").filter(l => l.startsWith("total_rss"))[0].split(" ")[1] ) / 1e6; 
  return Math.round( total_rss - (process.memoryUsage().rss/1e6) );
}
  
const moment = require("moment");
const { stripIndent } = require("common-tags");
let RaMpercent = Math.round((getMemoryUsage() / 512 * 100));

let cpu = Math.round(process.cpuUsage().system)
let cpupercent = Math.round((cpu / 17424000 * 100));

// Uptime
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
let uptime = `${days} days ${hours} hours ${minutes} minutes`;
///

let botname = bot.user.username;
let botinfoembed = new (require('discord.js').RichEmbed)()

    .setColor("#9a00ff")
    .setAuthor(`${botname} - Statistics`, bot.user.displayAvatarURL)
    .addField(
      "❯ App Status",
      stripIndent`
      **<:ram:${"718053609312354385"}> RAM: **${getMemoryUsage()}MB (${RaMpercent}%)
      **<:disk:${"718054976466714643"}> Disk: **5MB (2%)
      **<:cpu:${"718053633496973384"}> CPU: **${cpupercent}%
      **<:ping:${"718053777395023892"}> Ping: **${Math.round(bot.ping)}ms
      **<:command:${"718057841205837834"}> Commands: **${bot.commands.size}
  `, true)
    .addField(
      "❯ Guild",
      stripIndent`
      **<:server:${"718053562172833803"}> Total Server: **${bot.guilds.size}
      **<:member:${"718055982013480961"}> Total Member: **${bot.users.size}
      **<:text:${"717653456243916839"}> Total Text Channels: **${bot.channels.filter(c => c.type === "text").size}
      **<:voice:${"717653477127356487"}> Total Voice Channels: **${bot.channels.filter(c => c.type === "voice").size}
  `, true)
    .setFooter("Developed by Forever4D")
    .setTimestamp()

message.channel.send(botinfoembed);
  
};
module.exports.help = {
  name: "status"
};