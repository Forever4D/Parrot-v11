module.exports.run = async(bot, message, args) => {
let prefix = "p!";
const embed = new (require('discord.js').RichEmbed)()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .addField(
      `**► :smile: Fun commands**`,
      `
    \n\n
    **• p!howgay [member]** - Shows how gay you are (real 100%)
    **• p!8ball [question?]** - asks the magic 8ball about your future.
    **• p!say [message]** - makes the bot whatever you want.
    **• p!hack [member]** - hacks the user you mension (not real hack)
    **• p!kill [member]** - Sick of someone? Easy! Just kill them! (we do not endorse murder yet)
`
    )
    .addField(
      `**► :smiling_face_with_3_hearts: Anime commands**`,
      `
\n\n
    **• p!slap [member]** - Slaps a member in the server.
    **• p!pat [member]** - Pats a member in the server.
    **• p!kiss [member]** - Kisses a member in the server.
    **• p!pout [member]** - Pouts on a member in the server.
    **• p!cuddle [member]** - Cuddles a member in the server.
    **• p!hug [member]** - Hugs a member in the server.
    **• p!cry** - Sends crying gif.
`)

.addField(
      `**► :crossed_swords: Moderation commands**`,
      `
\n\n
    **• p!ban [member] [reason]** - bans a member from the server.
    **• p!kick [member] [reason]** - kicks a member from the server.
    **• p!purge [amount] [messageType]** - Delete a number of messages from a channel, use **p!purge** to display list of all message types (purge limit 250) 
    **• p!warn [member] [reason]** - Warns a member.
`)

.addField(
      `**►:sparkles: Info commands**`,
      `
\n\n
    **• p!snipe or p!snipe [member]** - Shows the last deleted message from a specified channel.
    **• p!ping** - Shows the bots ping.
    **• p!serverinfo** - Shows the server informations
    **• p!whois [member]** - Shows the member information.
`)
.setTimestamp();
  
    message.channel.send( { embed: embed } )
     

}
module.exports.help = {
    name: "help"

}
