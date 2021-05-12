//All dependencies are imported here
const Discord = require("discord.js");
const config = require("./config.json");
const mongoose = require('mongoose');
const {MongoClient} = require("mongodb");

//declaring the instance 
const client = new Discord.Client();
PREFIX = config.prefix;
const clientMongo = new MongoClient(config.uri);


//------------------Main code goes here-----------------------

//Mongodb connection 
// mongoose.connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connection success");
// });
async function run() {
    try {
        // Connect the client to the server
        await clientMongo.connect();

        const db = clientMongo.db('Data')
        const userCollection = db.collection('userDetails')

        details = {
            userId: 1234567890,
            userUsername: "qwertyuiop",
            userTag: "sgfdh#2435",
            userAvatar: "https://cdn.discordapp.com/avatars/658331305104375830/0aea486923618ef9358ebfbfa661f51a.webp"
        };
        const result = await userCollection.insertOne(details);
        console.log(

            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,

        );

        // Establish and verify connection
        console.log("Connected successfully to server");
        console.log(quotesCollection);
    } catch {
        console.error();
    }
}
run().catch(console.dir);




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