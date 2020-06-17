module.exports.run = async(bot, message, args) => {

    const m = await message.channel.send("Ping ? getting ping ");
    m.edit(`**Message:** ${m.createdTimestamp - message.createdTimestamp}ms || **Websocket:** ${Math.round(bot.ping)}ms`);
    const Discord = module.require("discord.js");

}
module.exports.help = {
    name: "ping"

}
