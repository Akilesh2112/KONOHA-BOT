//All dependencies are imported here
const Discord = require("discord.js");
const config = require("./config.json");


//declaring the instance 
const client = new Discord.Client();
PREFIX = config.prefix;


//Main code goes here


//Welcome & goodbye messages\\
client.on('guildMemberAdd', member => {
    member.roles.add(member.guild.roles.cache.find(i => i.name === '736874356738752585'))

    const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setColor('#5cf000')
    welcomeEmbed.setTitle('**' + member.user.username + '** is now Among Us other **' + member.guild.memberCount + '** people')
    welcomeEmbed.setImage('https://cdn.mos.cms.futurecdn.net/93GAa4wm3z4HbenzLbxWeQ-650-80.jpg.webp')

    member.guild.channels.cache.find(i => i.name === 'greetings').send(welcomeEmbed)
})
client.on('guildMemberRemove', member => {
    const goodbyeEmbed = new Discord.MessageEmbed()

    goodbyeEmbed.setColor('#f00000')
    goodbyeEmbed.setTitle('**' + member.user.username + '** was not the impostor there are **' + member.guild.memberCount + '** left Among Us')
    goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')

    member.guild.channels.cache.find(i => i.name === 'greetings').send(goodbyeEmbed)
})
//Welcome & goodbye messages end\\
client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === '736874356738752585');
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