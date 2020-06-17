const {stripIndent} = require('common-tags');
module.exports.run = async (bot, message, args) => {

if (!bot.isAdmin(message.author.id)) {
            return message.reply(`Access denied!`);
        }

  
  const Discord = require("discord.js");
  const client = new Discord.Client(); 
  const DBL = require("dblapi.js"); 
  const dbl = new DBL('KeyeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NDI4MjM5NTc4NTQ5NDUzOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyMTY1MTI1fQ._WMY37NCZqPVsTnTfq4u7Z9OUei42K3HLgddwy-jYek', client); 
dbl.on('posted', () => { console.log('Server count posted!'); }) 
  dbl.on('error', e => { console.log(`Oops! ${e}`); })
 
//  const randomPuppy = require("random-puppy");

  //const subReddits = ["dankmeme", "meme", "me_irl"];
  //const random = subReddits[Math.floor(Math.random() * subReddits.lenth)];
  //const img = await randomPuppy(random);
  
  //*const embed = new (require('discord.js').RichEmbed)()
  //   .setTitle("**List of Commands**\n") // sets the title to List of Commands
  //            .addField(" - help", "Displays this message (Correct usage: *help)") // sets the first field to explain the command *help
  ///            .addField(" - info", "Tells info about myself :grin:") // sets the field information about the command *info
  //            .addField(" - ping", "Tests your ping (Correct usage: *ping)") // sets the second field to explain the command *ping
  //            .addField(" - cookie", "Sends a cookie to the desired player! :cookie: (Correct usage: *cookie @username)") // sets the third field to explain the command *cookie
  //            .addField(" - 8ball", "Answers to all of /your questions! (Correct usage: *8ball [question])") // sets the field to the 8ball command
  //            .setColor(0xFFA500) // sets the color of the embed box to orange
  //      .setFooter("You need help, do you?") // sets the footer to "You need help, do you?"


  //const embed = new (require("discord.js")).RichEmbed()
  //  .setColor(Math.floor(Math.random() * 16777214) + 1)
 //   .setImage(img)
  //  .setTitle(`From /r/${random}`)
  //  .setURL(`https://reddit.com/r/${random}`);

};
module.exports.help = {
  name: "test"
};
