module.exports.run = async (bot, message, args) => {
  var eightball = [
    "Yes!",
    "Yep",
    "Nope",
    "No...",
    "Maybe?",
    "Pretty hard to guess...",
    "Probably",
    "I don't think so.",
    "Never!",
    "I think so...",
    "No idea.. :/"
  ];

  const embed = new (require("discord.js")).RichEmbed()
    .setAuthor("8ball", message.author.displayAvatarURL)
    .setColor("#693999")
    .addField("Question:", args.join(" "))
    .addField(
      "Answer:",
      eightball[Math.floor(Math.random() * eightball.length).toString()]
    )
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png"
    );
  //.setTimestamp()
  // .setFooter(" ", 'https://cdn.discordapp.com/attachments/383674404447584256/716182350844919859/Photo_1590821550863.png');

  if (args[1] != null) message.reply({ embed: embed });
  // if args[1], post random answer
  else
    message.channel.send(
      "Ummmm, what is your question? :rolling_eyes: (Correct usage: p!8ball [question])"
    ); // if not, error
};
module.exports.help = {
  name: "8ball"
};
