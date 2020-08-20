const Discord = require(`discord.js`);
const config = require("./config/config.json");
const datasub = require("./data/sub.json");
let prefix = config.prefix;
const client = new Discord.Client();
const fs = require('fs');

client.on('ready', () => {
    console.log(`${client.user.username} ready!`)
    client.user.setPresence({
        activity: {
            name: 'free games!',
            type: "PLAYING",
        },
        status: "dnd"
    });
});

client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "ann")) {
        if (!msg.author.id === "448052818314526721") return;
        //for (let i = 1, i < datasub.length, i++) {

        //}
    }
    if (msg.content.toLowerCase().startsWith(prefix + "sub")) {
        if (datasub[msg.author.id] || datasub[msg.author.id] === "0") {
            datasub[msg.author.id] = "1"
            fs.writeFile("./data/sub.json", JSON.stringify(datasub), err => {
                if (err) throw err;
                msg.channel.send("C'est fait !")
            })
        }
    }
})

client.login(process.env.TOKEN);