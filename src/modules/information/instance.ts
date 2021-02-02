import { Client, Message, MessageEmbed, version as djsVersion } from 'discord.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { EVEBot } from './../../bot';

import { ModuleInstance } from './../../interfaces/moduleInstance';

export default class information implements ModuleInstance {
    public info = {
        id: 0,
        name: 'Information',
        cmds: [
            {
                prefixes: ['help', 'h'],
                cmdDescription: 'List all available commands.',
                methodName: 'executeHelp',
                admin: false
            },
            {
                prefixes: ['stats'],
                cmdDescription: 'Stats about EVE.',
                methodName: 'executeStats',
                admin: false
            }
        ],
        moduleDescription: 'Utilities for providing information.',
    }

    private _client: Client;

    constructor(private _bot: EVEBot) {
        dayjs.extend(duration);
        this._client = this._bot.getClient();
    }

    public executeHelp(msg: Message): void {
        const embed = new MessageEmbed();
        embed.setTitle('Commands');
        embed.setThumbnail(this._client.user.avatarURL());
        embed.setColor(0xEED4E0);
        embed.setFooter('by GiyoMoon❤️');

        const modules = this._bot.getModules();
        modules.forEach(m => {
            let moduleField = '';
            moduleField += `${m.instance.info.moduleDescription}\n▬▬▬\n`;
            m.instance.info.cmds.forEach(cmd => {
                moduleField += `${cmd.admin ? ':lock:' : ''}${cmd.prefixes.map(p => `\`${p}\``)}\n${cmd.cmdDescription}\n---\n`;
            });
            embed.addField(`${m.enabled ? ':green_circle:' : ':red_circle:'}${m.name}`, moduleField);
        });

        msg.channel.send(embed);
    }

    public executeStats(msg: Message): void {
        const embed = new MessageEmbed();
        embed.setTitle('Stats');
        embed.setThumbnail(this._client.user.avatarURL());
        embed.setColor(0xEED4E0);
        embed.setFooter('by GiyoMoon❤️');

        embed.addField('Node.js version', `\`${process.version}\``, true);
        embed.addField('Discord.js version', `\`${djsVersion}\``, true);

        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        embed.addField(':cd:Memory usage', `\`${Math.round(usedMemory * 100) / 100} mb\``, true);

        embed.addField(':timer:Uptime', `${this._formatUptime(process.uptime())}`);

        msg.channel.send(embed);
    }

    // format seconds to a better readable format
    private _formatUptime(seconds: number) {
        let duration = dayjs.duration(seconds, 'seconds');
        return (
            (Math.floor(duration.asMonths()) > 0 ? `${Math.floor(duration.asMonths())}M ` : '') +
            (Math.floor(duration.asMonths()) > 0 || duration.days() > 0 ? `${duration.days()}d ` : '') +
            (duration.hours() > 0 || duration.days() > 0 || Math.floor(duration.asMonths()) > 0 ? `${duration.hours()}h ` : '') +
            (duration.minutes() > 0 || duration.hours() > 0 || duration.days() > 0 || Math.floor(duration.asMonths()) > 0 ? `${duration.minutes()}m ` : '') +
            `${duration.seconds()}s`
        );
    }
}