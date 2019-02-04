const Discord = require('discord.js');

const weathers = ["Il va faire beau aujourd'hui", "Il va pleuvoir aujourd'hui", "Il va neiger aujourd'hui", "Ça va être nuageux aujourd'hui"];
const prefix = ("/");
const epref = "**❌ | ";

var bot = new Discord.Client();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `Garder le Monde`, type: 0}});
    bot.user.setStatus("dnd");
    console.log("Bot Prêt !");
    console.log(Date.getDate());
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content.startsWith(prefix + "help")) {
        var help_embed = new Discord.RichEmbed()
            .setColor('#E81414')
            .addField("Prefix", `${prefix}`)
            .addField("Commandes", "- help: Montre ce menu\n- roll: donne un chiffre aléatoire entre 0 (echec) et 100 (réussite)")
            .setFooter(message.guild.name, `${message.guild.iconURL}`)
            .setTimestamp();
        message.channel.send(help_embed);
    }

    if (message.content.startsWith(prefix + "roll")){
        var randum = getRandomInt(0, 100);
        if (randum < 5) {
            message.channel.sendMessage(`Echec Critique **${randum}**`);
        } else if (randum > 95) {
            message.channel.sendMessage(`Réussite Critique **${randum}**`);
        } else {
            message.channel.sendMessage(`Roll: **${randum}**`);
        }
    }
});

bot.setInterval(randomWheather, 30000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomWheather() {
    var date = new Date();
    if(date.getHours() == 0 && date.getMinutes() == 0) {
        bot.channels.get("540963427653255169").send(weathers[getRandomInt(0, 3)])
    }
}
