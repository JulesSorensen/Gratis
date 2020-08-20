const Discord = require(`discord.js`);
const config = require("./config/config.json");
//const datasub = require("./data/sub.json");
let prefix = config.prefix;
const client = new Discord.Client();
const fs = require('fs');
var datasub = ["697717795227697173", "448052818314526721", "676690539126718467", "364759830944153605", "639501477420990494", "328925921283145729", "278211495915945985", "358551694654832642", "364758930615828490"];

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

    // announce
    if (msg.content.toLowerCase().startsWith(prefix + "ann")) {
        if (msg.author.id !== "448052818314526721") return;
        const arg = msg.content.slice(prefix.length).split(' ');
        ann = ""
        for (let i = 1; i < arg.length; i++) {
            if (i === 1) { ann = ann + arg[i] } else { ann = ann + " " + arg[i] }
        }
        for (let i = 0; i < datasub.length; i++) {
            let authoruser = client.users.cache.get(datasub[i])
            authoruser.send(ann).then(msg2 => {
                msg2.react("745999683335225444")
            })
        }
    }

    // help
    if (msg.content.toLowerCase().startsWith(prefix + "h")) {
        msg.channel.send({
            embed: {
                color: 7506394,
                thumbnail: {
                    url: "https://i.imgur.com/RIRj172.png"
                },
                author: {
                    name: "Help command",
                    icon_url: msg.author.avatarURL()
                },
                title: "Here is the list of my commands!\n­",
                fields: [{
                    name: "`" + prefix + "subscribe`",
                    value: "Once this command has been sent, you will receive a message every time a game is free temporarily, you won't be able to miss anything!\nYou can also type " + prefix + "sub\n­"
                }, {
                    name: "`" + prefix + "unsubscribe`",
                    value: "Once this command has been sent, you will no longer receive a notification (see command above). It may take some time to update the database so no need to spam!\nYou can also type " + prefix + "unsub\n­"
                }],
                timestamp: new Date(),
                footer: {
                    text: "Gratis Version 1.0.0 | Help command requested by " + msg.author.tag
                }
            }
        })
    }

    // subs
    if (msg.content.toLowerCase().startsWith(prefix + "sub")) {
        for (let i = 0; i < datasub.length; i++) {
            if (datasub[i] === msg.author.id) {
                msg.channel.send("You are already a subscriber!")
                return;
            }
        }
        datasub.push(msg.author.id)
        msg.channel.send("It's done!")
        let authoruser = client.users.cache.get(msg.author.id)
        authoruser.send(`➕ ${msg.author} vous êtes inscrit !`)
        let wilfre = client.users.cache.get('448052818314526721')
        wilfre.send(`➕ ${msg.author} veut s'inscrire !`)
    }
    // unsubs
    if (msg.content.toLowerCase().startsWith(prefix + "unsub")) {
        result = 0
        for (let i = 0; i < datasub.length; i++) {
            if (datasub[i] === msg.author.id) {
                result = 1
            }
        }
        if (result = 1) {
            datasub.pop(msg.author.id)
            msg.channel.send("It's done!")
            let authoruser = client.users.cache.get(msg.author.id)
            authoruser.send(`➖ ${msg.author} vous n'êtes plus inscrit !`)
            let wilfre = client.users.cache.get('448052818314526721')
            wilfre.send(`➖ ${msg.author} ne veut plus être inscrit !`)
        } else {
            msg.channel.send("You aren't a subscriber!")
        }

    }

    // log
    if (msg.content.toLowerCase() === prefix + "log") {
        console.log(datasub)
    }
})

client.login(process.env.TOKEN);