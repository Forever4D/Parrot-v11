module.exports.run = async(bot, message, args) => {
const embed = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .setTitle("#Rules")
                .addField("**:scroll: 1. Discord Terms of Service and Community Guidelines apply.**", "You must be at least 13 years old to use Discord and abide by all other terms and guidelines. (https://discordapp.com/terms and https://discord.com/guidelines)")
                .addField("**:sunglasses: 2. Be cool, kind, and civil.**", "Treat all members with respect and constructively express your thoughts.")
                .addField("**:abc: 3. Use English only!**", " Communicate in English, but be considerate of all languages.")
                .addField("**:incoming_envelope: 4. Do not spam!**", "Please be kind to one another. There is a border between jokes and harming someone's feelings, and it should not be crossed. Don't joke about disabilities")
                .addField("**:loudspeaker: 5. No self-promotion or advertisements.**", " This includes unsolicited references and links to other social media, servers, communities, and services in chat or direct messages(DM).")
                .addField("**:shield: 6. No personal information.**", " Protect your privacy and the privacy of others.")  
                .addField("**:head_bandage:  7. No harassment, abuse, bullying or insulting**", "Swearing is allowed but you are not allowed to use bad language to insult someone nor insult someone in good language.  We have zero-tolerance for harming others.")
                .addField("**:anger_right:  8. No racist, sexist, anti-LGBTQ+, or otherwise offensive content.**", "Saying the N-word and all of it's sorts or any other racist word. You must follow the discord t&s and the community guidelines as we have zero-tolerance for hate speech.")
                .addField("**:underage: 9. No NSFW content!**", "Any form of pornography, nude, gore or animal porn imagery is not allowed on the server as it would be breaking TOS. We do not condone illegal or suspicious discussions and activity.")
                .addField("**:link: 11. No inappropriate and short links links!**", "Any inappropriate links (phishing pishing links, screamers, viruses or others) are not allowed on the server and do not use any shortlink (like adf.ly or linkvertise) to link any script that you did not make or made yourself or any other things.")
                .addField("**:file_folder: 13. Do not post any file that isn't allowed!**", "We don't allow any type of files that contains .exe, .bat or any other type (Not Even Trigon EVO files), Only Images, Videos, Txt files, and mp3 files are allowed."); 

const embedb = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .addField("**:frame_photo: 14. Use an appropriate name and avatar.**", " No religion name such 'JESUS', Avoid special characters, emoji, obscenities, impersonation, @everyone, invisible and use normally pingable names. Do not use any NSFW related avatar.")
                .addField("**:bank:  15. No political or religious topics.**", " These complex subjects result in controversial and offensive posts.")
                .addField("**:no_bell: 16. No mass pinging, ghost pinging or direct messages.**", " Do not mention or send direct message to any staff members or higher rank members without any proper reason and avoid mass pings, ghost pings in general or other channels.")
                .addField("**:beginner: 17. No begging.**", " Begging for free nitro/roles either on the server or in DMs is not allowed.")
                .addField("**:robot: 18. Use bot commands only in #bot-commands.**", " You are allowed to use bot commands only in #bot-commands, using it on any other channels will result in a warning (unless if the bot cmd is for a moderation reason like mute, kick, ban, warn)")
                .addField("**:ear_with_hearing_aid: 19.  No Earrape!**", "Playing ear rapes through the music bot is prohibited.")
                .addField("**:speech_balloon: 20. No talking in #script-releases and #theme-release**", "TALKING in #script-releases is prohibited unless you are releasing a script. if we found you are chatting/talking in #script-releases or #theme-releases you will get a warning. If you have any questions about that released script, talk in #script-request or #script-chat.")

message.channel.send( { embed: embed } )
message.channel.send( { embed: embedb } )           

}
module.exports.help = {
    name: "ruleeeeeeeeeeeeee"

}
