//All dependencies are imported here
const Discord = require("discord.js");
const config = require("./config.json");


//declaring the instance 
const client = new Discord.Client();
PREFIX = config.prefix;


//------------------Main code goes here-----------------------


//Welcome
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '736874356738752585');
    if (!channel) console.log("channel bokuno pick");;
    channel.send(`Welcome to the server, ${member}`);
});


//get user id
client.on('message', msg => {
    if (msg.content === `${PREFIX}testme`) {
        var userId = msg.author.id;
        var userUsername = msg.author.username;
        var userTag = msg.author.tag;
        var userAvatar = msg.author.displayAvatarURL();

        msg.channel.send(`
        userId: ${userId}\n
        userUsername: ${userUsername}\n
        userTag: ${userTag}\n
        userAvatar: ${userAvatar}\n`);
        
    }
});


//---------test message-------------
client.on('message', msg => {
    if (msg.content === `${PREFIX}test`) {
        msg.channel.send(`Your test output: ${msg.author.lastMessageID}!`);
    }
});



//Console-log when bot run's success
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



//Bot token key goes here
client.login(config.BOT_TOKEN);