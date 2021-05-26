//All dependencies are imported here
const Discord = require("discord.js");
const config = require("./config.json");
const {
    MongoClient
} = require("mongodb");

//declaring the instance 
const client = new Discord.Client();
PREFIX = config.prefix;
const clientMongo = new MongoClient(config.uri);




//------------------Main code goes here-----------------------



//Welcome
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '736874356738752585');
    if (!channel) console.log("channel bokuno pico");

    channel.send(`Welcome to the server, ${member}`);
    channel.send(`${member.id}`);
    channel.send(`${member.user.username}`);
    channel.send(`${member.user.tag}`);
    channel.send(`${member.user.displayAvatarURL()}`);





    //----------------Uploading New User Details To Database----------------------

    //Mongodb connection 

    async function run() {
        try {
            // Connect the client to the server
            await clientMongo.connect();

            const db = clientMongo.db('Data')
            const userCollection = db.collection('userDetails')

            details = {
                userId: member.id,
                userUsername: member.user.username,
                userTag: member.user.tag,
                userAvatar: member.user.displayAvatarURL()
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
        //getting user details in that servver
        // const list = client.guilds.cache.get("736874356168327182");
        // console.log(list);
        // list.forEach(id => console.log(id));

        //list.members.forEach(member => console.log(member.user.username));
        // msg.channel.send(`Your test output: ${JSON.stringify(list)}!`);

        // newMemberId = client.fetchUser(member.id);
        // channel.send(`tag: ${newMemberId.tag}`);

        const Guild = client.guilds.cache.get("736874356168327182"); // Getting the guild.
        const MemberId = Guild.members.cache.map(member => member.id); // Getting the members and mapping them by ID.
        const MemberName = Guild.members.cache.map(member => member.user.username);
        const MemberTag = Guild.members.cache.map(member => member.user.tag);
        const MemberAvathar = Guild.members.cache.map(member => member.user.displayAvatarURL());
        //console.log(`${MemberTag} '\n' ${MemberAvathar} '**'`);
        msg.channel.send(`${MemberId}'\n'  ${MemberName} '\n' ${MemberTag}`);
        msg.channel.send(`'\n' ${MemberAvathar}`);

    }
});



//Console-log when bot run's success
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



//Bot token key goes here
client.login(config.BOT_TOKEN);