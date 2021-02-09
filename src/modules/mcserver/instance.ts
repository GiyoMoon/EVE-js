import { Client, Message, TextChannel } from 'discord.js';

import { EVEBot } from './../../bot';
import { ModuleInstance } from './../../interfaces/moduleInstance';
import MCServerProcess from './mcServerProcess';
import StatusWorker from './statusWorker';

export default class mcServer implements ModuleInstance {
    public info = {
        id: 1,
        name: 'mcServer',
        cmds: [
            {
                prefixes: ['info'],
                cmdDescription: 'Information about the mcServer module.',
                methodName: 'executeInfo',
                admin: false
            }
        ],
        moduleDescription: 'Utilities for providing information.',
    }

    private _client: Client;

    private _mcServerProcess: MCServerProcess;

    private _statusWorker: StatusWorker;

    constructor(private _bot: EVEBot) {
        this._client = this._bot.getClient();
        const consoleChannel = this._client.channels.cache.get(this._bot.getConfig().consoleChannelID) as TextChannel;
        this._statusWorker = new StatusWorker(this._bot);
        this._mcServerProcess = new MCServerProcess(consoleChannel, this._statusWorker, this._bot.getConfig());
    }

    public executeInfo(msg: Message) {
        msg.channel.send(`The Minecraft server can be controlled in <#${this._bot.getConfig().consoleChannelID}>.\nType \`start\` to start the server up.`);
    }

    public startServer() {
        this._mcServerProcess.startMCServer();
    }

    public sendCommand(cmd: string) {
        this._mcServerProcess.sendCommand(cmd);
    }
}