const Discord = require("discord.js");
const config = require("./config.json");
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const randomPuppy = require("random-puppy");
const mysql = require("mysql");
const { USER, MDP, PORT, HOST, DATABASE } = require("./db.json");
var fs = require('fs');
const client = new Discord.Client();
const prefix = config.prefix;
const usedCommands = new Set();
const Personnages4 = ["amber", "barbara", "beidou", "bennett", "choungyun", "diona", "fischl", "kaeya", "lisa", "ningguang", "noelle", "razor", "sucrose", "xiangling", "xingqiu", "xianyan"];
const Personnages5 = ["diluc", "jean", "keqing", "klee", "mona", "qiqi", "Venti", "zhongli"];
client.on('ready', () => {
    console.log('I am ready!');
    client.user.setActivity('.help', { type: 'WATCHING' })
    channel = client.channels.cache.get('789919232221380668');
    channel.send("<@&774270261234761738> Wesh les frères je suis on ! ");
});

const db = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: MDP,
    database: DATABASE,
})
const dt = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: MDP,
    database: DATABASE,
})
client.on('message', message => {
    let date = new Date();
    let auteur = message.author.username;
    let server = message.guild.name;
    let jour = date.getDay();
    let mois = date.getMonth();
    let heure = date.getHours();
    let minutes = date.getMinutes();
    let user = message.mentions.users.first();


    if (user == 741989862508462091) {
        var avecdit = '';
        const args = message.content.trim().split(' ');
        if (args.includes('dit')) {
            for (let i = args.indexOf('dit', 0) + 1; i < args.length; i++) {
                avecdit = avecdit + " " + args[i];
            }
            message.delete();
            message.channel.send(`${avecdit}`);
        }

    }
    if (message.content.includes('chat')) {
        randomPuppy("catpictures")
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setImage(`${url}`);
                message.reply(embed);
                var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande CHAT dans le serveur " + server + `\n`;
                fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                    if (err) throw err;
                });
                console.log(écrire);
            })
    }
    if (message.content.includes('chien') || message.content.includes('dog') || message.content.includes('Chien') || message.content.includes('Griezzz')) {
        randomPuppy("dogpictures")
            .then(url => {
                console.log(url);
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setImage(`${url}`);
                message.channel.send(embed);
                var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande CHIEN dans le serveur " + server + `\n`;
                fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                    if (err) throw err;
                });
                console.log(écrire);
            })
    }
    if (message.content.includes('dit bonjour')) {
        message.channel.send("Bonjour !");
        var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande BONJOUR dans le serveur " + server + `\n`;
        fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
            if (err) throw err;
        });
        console.log(écrire);
    }
});
client.on("message", function(message) {
    let date = new Date();
    let auteur = message.author.username;
    let auteurid = message.author.id;
    let server = message.guild.name;
    let jour = date.getDay();
    let mois = date.getMonth();
    let heure = date.getHours();

    let minutes = date.getMinutes();
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    switch (command) {

        case 'shop':
            message.channel.send(`💲 Tu veux des gems à profusion ? 💲\nSi oui alors rends toi sur mon Paypal\nTarif :\n 5€ = 100 invocations (10 000 💎)\n https://paypal.me/9Tiger9?locale.x=fr_FR`);
            break;
        case 'clear':
            if (message.member.hasPermission('MANAGE_MESSAGES')) {
                let args = message.content.trim().split(/ +/g);
                if (args[1]) {
                    //NaN = Not a Number
                    if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
                        message.delete();
                        message.channel.bulkDelete(args[1]);
                        message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)

                    } else {
                        message.channel.send("Vous devez indiquer une valeur entre 1 et 99")
                    }
                } else {
                    message.channel.send("Vous devez entrer un nombre")
                }
            } else {
                message.channel.send("Vous devez avoir les droits MANAGE_MESSAGES pour exécuter cette commande !")
            }
            break
        case 'me':
            db.query(`SELECT * FROM n°${auteurid}`, (err, rows) => {
                if (err) {
                    message.channel.send("C'est ta première fois ? \n Je te conseille de faire .claim");
                } else {
                    if (rows.length >= 1) {
                        var possèdequatre = "";
                        var possèdecinq = "";
                        var quatre = 0;
                        var cinq = 0;
                        for (var i = 0; i < rows.length; i++) {

                            if (Personnages4.includes(rows[i].Nom)) {
                                possèdequatre = possèdequatre + "-" + rows[i].Nom + "    Qté : " + rows[i].Quantité + "\n";
                                quatre = quatre + rows[i].Quantité;
                            } else {
                                possèdecinq = possèdecinq + "-" + rows[i].Nom + "    Qté : " + rows[i].Quantité + "\n";
                                cinq = cinq + rows[i].Quantité;
                            }
                        }
                        db.query(`SELECT * FROM utilisateur WHERE Discord_id = ${auteurid}`, (err, Lignes) => {
                            if (err) {
                                console.log(err)
                            }
                            let auteurpp = message.author.avatarURL(({ format: "png", dynamic: true }));
                            var invocation = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle(`*** ${auteur}***`)
                                .addField(`Nombre de 💎 : `, `Multiplicateur : `, true)
                                .addField(`${Lignes[0].Primo}`, `${Lignes[0].Multiplicateur}`, true)
                                .setThumbnail(`${auteurpp}`)
                                .addField("᲼᲼᲼᲼᲼᲼", "᲼᲼᲼᲼᲼᲼")
                                .addField(`Nombre de 5 ⭐ : `, `Nombre de 4 ⭐ : `, true)
                                .addField(`${cinq}`, `${quatre}`, true);

                            message.channel.send(invocation);
                        });
                        setTimeout(() => {
                            var msg = "```diff\nVoici tes perssonages !\n\n+Nombre de 5⭐: " + cinq + "\n" + possèdecinq + "\n+Nombre de 4⭐: " + quatre + "\n" + possèdequatre + " \n```";
                            message.channel.send(msg);
                        }, 300);

                    } else {
                        let auteurpp = message.author.avatarURL(({ format: "png", dynamic: true }));
                        var invocation = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setTitle(`*** ${auteur}***`)
                            .setThumbnail(`${auteurpp}`)
                            .addField(`OUPS`, "`Tu n'as pas de personnage \n Essaye .invoc`");
                        message.channel.send(invocation);
                    }
                }
            });
            break;
        case 'claim':
            let sql;
            db.query(`SELECT * FROM utilisateur WHERE Discord_id ='${auteurid}'`, (errror, rows) => {
                if (errror) {
                    console.log(errror)
                } else {
                    if (rows.length < 1) {
                        var mess = "```\n Voici un cadeau pour ton inscription !\n Voici 100💎 pour ta première invocation !```";
                        message.channel.send(`${mess}`);
                        db.query(`CREATE TABLE n°${auteurid} (Nom VARCHAR(50),Quantité INT)`);
                        db.query(`INSERT INTO utilisateur (Discord_id, Primo,Multiplicateur,Pity4,Pity5)
                            VALUES (${auteurid}, 100,1,0,0);`);
                        var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande INVOC dans le serveur " + server + `  NOUVEAU COMPTE` + `\n`;
                        fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                            if (err) throw err;
                        });
                        console.log(écrire);
                    } else {
                        var coins = rows[0].Primo;
                        if (usedCommands.has(message.author.id)) {
                            message.reply(`Tu ne peux pas faire ça\nUne fois toutes les 2h ⏲ \n Mais ton nombre de 💎 est maintenant de : ${coins} `);
                            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande CLAIM dans le serveur " + server + `  Mais n'a pas attendu 2 heure` + `\n`;
                            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                                if (err) throw err;
                            });
                            console.log(écrire);
                        } else {
                            usedCommands.add(message.author.id);
                            var gagné = parseInt(Math.floor(Math.random() * (100 - 50 + 1) + 50) * rows[0].Multiplicateur, 10);
                            coins = coins + gagné;
                            message.channel.send(`Bravo ! \nTu as gagné ${gagné} 💎`);
                            message.channel.send(`Ton nombre de 💎 est maintenant de : ${coins}`);
                            db.query(`UPDATE Utilisateur SET Primo = ${coins} WHERE Discord_id =${auteurid}`);
                            setTimeout(() => {
                                usedCommands.delete(message.author.id);
                                message.reply("Tu peux claim !");
                            }, 7200000);

                        }

                    }
                }
                db.query(sql, err => {
                    if (err) return;
                });
            });
            break;
        case 'invoc':
            db.query(`SELECT * FROM utilisateur WHERE Discord_id ='${auteurid}'`, (err, rows) => {
                var coins = rows[0].Primo;
                if (rows[0].Primo < 100) {
                    message.channel.send(`Tu n'as pas assez de 💎\nTu as actuellement 💎${coins}`)
                    var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande INVOC dans le serveur " + server + `  Mais n'a pas assez de Primo` + `\n`;
                    fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                        if (err) throw err;
                    });
                    console.log(écrire);
                } else {
                    db.query(`UPDATE Utilisateur SET Primo = ${coins -100 } WHERE Discord_id =${auteurid}`);
                    if (rows[0].Pity5 == 89) {
                        var randoms = Personnages5[Math.floor(Math.random() * Personnages5.length)];
                        AlreadyHave(randoms, 5, rows[0].Multiplicateur);
                        db.query(`UPDATE Utilisateur SET Pity5 = 0 WHERE Discord_id =${auteurid}`);
                        db.query(`UPDATE Utilisateur SET Pity4 = ${rows[0].Pity4 + 1} WHERE Discord_id =${auteurid}`);
                    } else if (rows[0].Pity4 == 9) {
                        var randoms = Personnages4[Math.floor(Math.random() * Personnages4.length)];
                        AlreadyHave(randoms, 4, rows[0].Multiplicateur);
                        db.query(`UPDATE Utilisateur SET Pity4 = 0 WHERE Discord_id =${auteurid}`);
                        db.query(`UPDATE Utilisateur SET Pity5 = ${rows[0].Pity5 + 1} WHERE Discord_id =${auteurid}`);
                    } else {
                        var proba = 0 + 100 * Math.random();
                        let auteurpp = message.author.avatarURL(({ format: "png", dynamic: true }));
                        if (proba <= 0.6) {
                            var randoms = Personnages5[Math.floor(Math.random() * Personnages5.length)];
                            AlreadyHave(randoms, 5, rows[0].Multiplicateur);
                            db.query(`UPDATE Utilisateur SET Pity5 = 0 WHERE Discord_id =${auteurid}`);
                            db.query(`UPDATE Utilisateur SET Pity4 = ${rows[0].Pity4 + 1} WHERE Discord_id =${auteurid}`);
                        } else if (proba <= 5.7 && proba > 0.6) {
                            var randoms = Personnages4[Math.floor(Math.random() * Personnages4.length)];
                            AlreadyHave(randoms, 4, rows[0].Multiplicateur);
                            db.query(`UPDATE Utilisateur SET Pity4 = 0 WHERE Discord_id =${auteurid}`);
                            db.query(`UPDATE Utilisateur SET Pity5 = ${rows[0].Pity5 + 1} WHERE Discord_id =${auteurid}`);
                        } else {
                            var invocation = new Discord.MessageEmbed()
                                .setColor("#059B00")
                                .addField(`Ouch pas de chance  !`, `᲼᲼᲼᲼᲼᲼`, true)
                                .addField(` Le rat `, `᲼᲼᲼᲼᲼᲼`, true)
                                //.addField('')
                                .setTitle(`***🤢 ERK 🤢***:`)
                                .attachFiles([`./GrandPersos/cheh.png`])
                                .setImage(`attachment://cheh.png`)
                                .setThumbnail(`${auteurpp}`);
                            db.query(`UPDATE Utilisateur SET Pity4 =${rows[0].Pity4 + 1} WHERE Discord_id =${auteurid}`);
                            db.query(`UPDATE Utilisateur SET Pity5 =${rows[0].Pity5 + 1} WHERE Discord_id =${auteurid}`);
                            message.channel.send(invocation);
                            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande INVOC dans le serveur " + server + `  Mais n'a rien eu` + `\n`;
                            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                                if (err) throw err;
                            });
                            console.log(écrire);

                        }
                    }

                }
            });
            break;

            function AlreadyHave(Perso, Rareté, Mult) {
                let sql;
                let auteurpp = message.author.avatarURL(({ format: "png", dynamic: true }));
                db.query(`SELECT * FROM n°${auteurid} WHERE Nom = '${Perso}'`, (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (rows.length < 1) {
                            db.query(`INSERT INTO n°${auteurid} (Nom, Quantité)
                            VALUES ('${Perso}',1);`);
                            if (Rareté == 5) {
                                let perso = Perso.toUpperCase();
                                var invocation = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .addField(`Bravo tu as gagné !`, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(` ${perso} `, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(`NOUVEAU PERSO DÉBLOQUÉ !!`, `᲼᲼᲼᲼᲼᲼`)
                                    .setTitle(`***✨✨ JACKPOT ✨✨***:`)
                                    .attachFiles([`./GrandPersos/${Perso}.png`])
                                    .setImage(`attachment://${Perso}.png`)
                                    .setThumbnail(`${auteurpp}`);
                                message.channel.send(invocation);
                            } else {
                                let perso = Perso.toUpperCase();
                                var invocation = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .addField(`Bravo tu as gagné !`, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(` ${perso} `, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(`NOUVEAU PERSO DÉBLOQUÉ !!`, `᲼᲼᲼᲼᲼᲼`)
                                    .setTitle(`***✨ WOW ✨***:`)
                                    .attachFiles([`./GrandPersos/${Perso}.png`])
                                    .setImage(`attachment://${Perso}.png`)
                                    .setThumbnail(`${auteurpp}`);
                                message.channel.send(invocation);
                            }
                            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande INVOC dans le serveur " + server + `  Et a eu un nouveau personnage : ${Perso}` + `\n`;
                            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                                if (err) throw err;
                            });
                            console.log(écrire);

                        } else {
                            var Quantité = rows[0].Quantité + 1;
                            db.query(`UPDATE  n°${auteurid} SET Quantité = ${Quantité} WHERE Nom ='${Perso}'`);
                            if (Rareté == 5) {
                                let perso = Perso.toUpperCase();
                                var invocation = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .addField(`Bravo tu as gagné !`, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(` ${perso} `, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(`WOW UN DOUBLON!!`, `Comme tu as gagné un doublon \nTon multiplicateur du .claim à été augmenté de *0.3* `)
                                    .setTitle(`***✨✨ JACKPOT ✨✨***:`)
                                    .attachFiles([`./GrandPersos/${Perso}.png`])
                                    .setImage(`attachment://${Perso}.png`)
                                    .setThumbnail(`${auteurpp}`);
                                message.channel.send(invocation);
                                Mult = Mult + 0.1;
                                db.query(`UPDATE  Utilisateur SET Multiplicateur  = ${Mult} WHERE Discord_id ='${auteurid}'`);
                            } else {
                                let perso = Perso.toUpperCase();
                                var invocation = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .addField(`Bravo tu as gagné !`, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(` ${perso} `, `᲼᲼᲼᲼᲼᲼`, true)
                                    .addField(`WOW UN DOUBLON!!`, `Comme tu as gagné un doublon \nTon multiplicateur du .claim à été augmenté de *0.1* `)
                                    .setTitle(`***✨ WOW ✨***:`)
                                    .attachFiles([`./GrandPersos/${Perso}.png`])
                                    .setImage(`attachment://${Perso}.png`)
                                    .setThumbnail(`${auteurpp}`);
                                Mult = Mult + 0.03;
                                db.query(`UPDATE  Utilisateur SET Multiplicateur  = ${Mult} WHERE Discord_id ='${auteurid}'`);
                                message.channel.send(invocation);
                            }
                            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande INVOC dans le serveur " + server + `  Et a eu un Doublon: ${Perso} Son multiplicateur :${Mult}` + `\n`;
                            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                                if (err) throw err;
                            });
                            console.log(écrire);
                        }
                        db.query(sql, err => {
                            if (err) return;
                        });
                    }
                });
            }
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp;
            if (timeTaken > 2000) {
                message.reply(`Pong! Le message à un temps de latence de  ${timeTaken}ms.
            Oh frro regarde la geule du ping`);

            } else {
                message.reply(`Pong! Le message à un temps de latence de  ${timeTaken}ms.`);
            }
            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande PING dans le serveur " + server + `  Avec un temps de latence de  ${timeTaken}ms.` + `\n`;
            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                if (err) throw err;
            });
            console.log(écrire);
            break;

        case 'sum':
            if (args.length == 0 || args.length == 1) {
                return message.channel.send(`Il me faut au moins deux arguments , ${message.author}!`);
            }
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply(`La somme de ce que tu m'as donné est de  ${sum}!`);
            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande SUM dans le serveur " + server + `  Avec comme arguements ` + numArgs + `\n`;
            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                if (err) throw err;
            });
            console.log(écrire);
            break;

        case 'pp':
            const user = message.mentions.users.first() || message.author;
            message.channel.send(user.avatarURL(({ format: "png", dynamic: true })));
            if (user == message.author) {
                var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande PP dans le serveur " + server + `\n`;
                fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                    if (err) throw err;
                });
                console.log(écrire);
            } else {
                var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande PP dans le serveur " + server + `  Avec comme arguements ` + user.username + `\n`;
                fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                    if (err) throw err;
                });
                console.log(écrire);

            }
            break;

        case 'dm':
            let usere = message.mentions.users.first();
            message.channel.send(`Look over here , ${usere}`);
            break;
        case 'today':
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Dimanche";
            weekday[1] = "Lundi";
            weekday[2] = "Mardi";
            weekday[3] = "Mercredi";
            weekday[4] = "Jeudi";
            weekday[5] = "Vendredi";
            weekday[6] = "Samedi";
            var n = weekday[d.getDay()];
            message.channel.send(`On est ${n}`);
            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande TODAY dans le serveur " + server + `\n`;
            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                if (err) throw err;
            });
            console.log(écrire);
            break;

        case 'lire':

            try {
                // read contents of the file
                const data = fs.readFileSync(`./watchlist/${message.author.id}.txt`, 'UTF-8');
                // split the contents by new line
                const lines = data.split(/\r?\n/);
                var i = 1;
                // print all lines
                lines.forEach((line) => {
                    console.log(i + ") " + line);
                    i++;
                });
            } catch (err) {
                console.error(err);
            }
            break;
        case 'watchlist':
            if (args.length == 0) {
                console.log("pas d'arg");

            } else {
                let id = message.author.id;
                switch (args[0]) {
                    case ("add"):
                        var taille = args.length - 1;
                        var ajouter = "";
                        if (taille == 0) {
                            message.channel.send("il me faut un argument ")
                        } else {
                            for (var i = 1; i <= taille; i++) {
                                ajouter = ajouter + " " + args[i];
                            }
                            console.log(ajouter);
                            /*
                            fs.appendFile(`./watchlist/${id}.txt`, `${ajouter} \n`, function(err) {
                                if (err) throw err;
                            });*/
                        }

                        break;
                    case ("create"):
                        fs.appendFile(`./watchlist/${id}.txt`, "", function(err) {
                            if (err) throw err;
                        });
                        break
                    default:
                        message.channel.send("il me faut des arguments corrects ")
                        break;

                }
                /*console.log("arg");
                    
                                                console.log(id);
                                                fs.appendFile(`./watchlist/${id}.txt`, "salut", function(err) {
                                                    if (err) throw err;
                                                });*/
            }
            break;
        case 'dégage':
            const mecs = ["JULIEN", "GRIEZZ", "ERIC", "MARCO", "RG", "LINKSQ"];
            const randoms = mecs[Math.floor(Math.random() * mecs.length)];
            message.channel.send(randoms);

            break;
        case 'meme':
            const subReddits = ["dankmeme", "meme", "me_irl", "RocketLeagueMemes", "LeagueOfMemes", "rance"];
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];
            randomPuppy(random)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Voici ton meme")
                        .setImage(`${url}`)
                        .setTitle(`De /r/${random} :`)
                        .setURL(`https://reddit.com/r/${random}`);
                    message.channel.send(embed);
                })
            var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande MEME dans le serveur " + server + `\n`;
            fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                if (err) throw err;
            });
            console.log(écrire);
            break;
        case 'perso':
            if (!args.length) {
                return message.channel.send(`Il me faut un argument , ${message.author}!`);
            }
            var x = args.length;
            for (var i = 0; i < x; i++) {
                var perso = args[i].charAt(0).toUpperCase() + args[i].slice(1)
                const Persoemb = new Discord.MessageEmbed()
                    .setColor(15158332)
                    .addField(`Voici la page du wiki de ${perso} :`, `https://genshin-impact.fandom.com/wiki/${perso}`)
                    .addField('\u200B', '\u200B')
                    //.addField('')
                    .setTitle(`Voici Les informations sur ***${perso}*** :`)
                    .attachFiles([`./Persos/${args[i]}.png`])
                    .setThumbnail(`attachment://${args[i]}.png`);

                switch (perso) {
                    case 'Diluc':
                        Persoemb.addField("Rareté :", "⭐⭐⭐⭐⭐", true)
                            .addField("Tier :", "***S***", true)
                            .addField("Les armes conséillés  :", "*** La mort du loup  ***\n https://genshin-impact.fandom.com/wiki/Wolf%27s_Gravestone \n ou \n *** Prototype Anémo *** \n https://genshin-impact.fandom.com/wiki/Prototype_Aminus")
                            .addField("📅 Jours de farm 📅: ", "*** Mardi | Vendredi ***", true)
                            .addField("👾 Boss à farm 👾:  ", "*** Stormterror  ***", true)
                            .addField('\u200B', '\u200B');
                        message.channel.send(Persoemb);
                        setTimeout(artediluc, 1000);

                        function artediluc() {
                            const Set1 = new Discord.MessageEmbed()
                                .setColor(12745742)
                                .setTitle(`Voici le set dégats Pyro sur ***${perso}*** :`)
                                .addField("Main Stat à viser ", "ATK% / Pyro DMG / CRIT DMG")
                                .addField("Informations : ", `(2)Gain a 15% Pyro DMG Bonus. \n (4) Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using an Elemental Skill increases 2-Piece Set effects by 50% for 10s. Max 3 stacks.`)
                                .setThumbnail(`https://rerollcdn.com/GENSHIN/Gear/crimson_witch_of_flames.png`);
                            message.channel.send(Set1);
                            const Set2 = new Discord.MessageEmbed()
                                .setColor(12745742)
                                .setTitle(`Voici le set dégats physiques sur ***${perso}*** :`)
                                .addField("Main Stat à viser ", "ATK% / Pyro DMG / CRIT DMG")
                                .addField("Informations : ", `(2) ATK +18% \n (4) If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%.`)
                                .setThumbnail(`https://rerollcdn.com/GENSHIN/Gear/gladiator's_finale.png`);
                            message.channel.send(Set2);
                        }
                }
                var écrire = mois + "/" + jour + " à " + heure + ":" + minutes + "   " + auteur + " à utilisé la commande PERSO dans le serveur " + server + `  Avec comme arguements ` + perso + `\n`;
                fs.appendFile('Commandes utilisés.txt', écrire, function(err) {
                    if (err) throw err;
                });
                console.log(écrire);
            }

            break;

        case 'help':
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Help',
                author: {
                    name: 'Marco SIMON ',
                    icon_url: 'https://instagram.fcdg3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/125201805_363732091528473_2682825725556669165_n.jpg?_nc_ht=instagram.fcdg3-1.fna.fbcdn.net&_nc_ohc=Yp3eACGlopQAX_pANfF&tp=1&oh=3082e30ed0b232fdf2b971600cbe0f32&oe=5FF88E80',
                    url: 'https://github.com/Tigercocotiger',
                },
                description: 'Voici mon bot discord \n Mon [GitHub](https://github.com/Tigercocotiger) pour aller voir le code du BOT. \n Mon [Insta](https://www.instagram.com/marco_sim0n) vas follow mon frère.',
                thumbnail: {
                    url: 'https://cdn.discordapp.com/avatars/302355429361451009/a_29067cc0bb653fca213fbdcdc302f3f7.webp',
                },
                fields: [{
                        name: '*.perso* nom',
                        value: "𝒫𝑒𝓇𝓂𝑒𝓉 𝒹'𝒶𝒻𝒻𝒾𝒸𝒽𝑒𝓇 𝓁𝑒𝓈 𝒾𝓃𝒻𝑜𝓇𝓂𝒶𝓉𝒾𝑜𝓃𝓈 𝒹'𝓊𝓃 𝓅𝑒𝓇𝓈𝑜𝓃𝓃𝒶𝑔𝑒 𝒹𝑒 𝒢𝐸𝒩𝒮𝐻𝐼𝒩",

                    },
                    {
                        name: '*.pp*',
                        value: '𝒱𝑜𝓊𝓈 𝒹𝑜𝓃𝓃𝑒 𝓋𝑜𝓉𝓇𝑒 𝒾𝓂𝒶𝑔𝑒 𝒹𝑒 𝓅𝓇𝑜𝒻𝒾𝓁',
                    },
                    {
                        name: '*.ping*',
                        value: '𝒩𝑒 𝓈𝑒𝓇𝓉 à 𝓇𝒾𝑒𝓃',

                    },
                    {
                        name: '*.sum*',
                        value: '𝒱𝑜𝓊𝓈 𝓅𝑒𝓇𝓂𝑒𝓉 𝒹𝑒 𝒻𝒶𝒾𝓇𝑒 𝓊𝓃 𝒶𝒹𝒹𝒾𝓉𝒾𝑜𝓃 à 𝓅𝒶𝓇𝓉𝒾𝓇 𝒹𝑒𝓈 𝒶𝓇𝑔𝓊𝓂𝑒𝓃𝓉𝓈',

                    },
                    {
                        name: '*.dm*',
                        value: '𝑀𝒶𝓇𝒸𝒽𝑒 𝓅𝒶𝓈 𝒿𝑒 𝓈𝓊𝒾𝓈 𝓉𝑜𝓊𝓉 𝒸𝓁𝒶𝓆𝓊é',

                    },

                    {
                        name: '.today',
                        value: '𝒹𝑜𝓃𝓃𝑒 𝓁𝑒 𝒿𝑜𝓊𝓇 𝒹𝑒 𝓁𝒶 𝓈𝑒𝓂𝒶𝒾𝓃𝑒 🤷‍♂️',

                    },
                ],

            };
            message.channel.send({ embed: exampleEmbed });
            break;
    }
});

client.login(config.BOT_TOKEN);