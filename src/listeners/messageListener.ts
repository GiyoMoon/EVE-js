import { Message, Client } from 'discord.js';
import { EVEBot } from './../bot';

export default class messageListener {

    private _client: Client;

    private _prefix = '!';

    constructor(private _bot: EVEBot) {
        this._client = this._bot.getClient();
    }

    public async evalMessage(msg: Message) {
        if (msg.author.bot || !msg.guild) return;

        if (msg.content.startsWith(`<@${this._client.user.id}>`) || msg.content.startsWith(`<@!${this._client.user.id}`)) {
            msg.channel.send(`My prefix is \`${this._prefix}\`\nGet a list of commands with \`${this._prefix}help\``);
            return;
        }

        if (!msg.content.startsWith(this._prefix) && msg.channel.type !== 'dm') return;

        let args;
        if (msg.content.toLowerCase().startsWith(this._prefix.toLowerCase())) {
            args = msg.content.slice(this._prefix.length).split(/ +/);
        } else {
            args = msg.content.split(/ +/);
        }

        const commandString = args.shift().toLowerCase();

        const module = this._bot.getModules().find(m => {
            return m.instance.info.cmds.find(cmd => cmd.prefixes.includes(commandString));
        });

        if (!module) return;

        const command = module.instance.info.cmds.find(cmd => cmd.prefixes.includes(commandString));

        if (!module.enabled) {
            msg.channel.send('This module is currently disabled.');
            return;
        }

        if (command.admin && msg.author.id !== this._bot.getConfig().botOwnerID) {
            msg.channel.send('Only the bot owner can execute this command.');
            return;
        }

        try {
            // @ts-ignore
            module.instance[command.methodName](msg);
        } catch (error) {
            console.error(error);
            msg.channel.send(`Error...`);
        }
    }
}