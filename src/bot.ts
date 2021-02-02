import { existsSync, readdirSync } from 'fs';
import { Client } from 'discord.js';

import messageListener from './listeners/messageListener';
import readyListener from './listeners/readyListener';

import { Module } from './interfaces/module';

import config from './config/config.json';

export class EVEBot {
    // Discord client of the bot
    private _client: Client;

    // listeners
    private _messageListener: messageListener;
    private _readyListener: readyListener;

    private _modules: Module[];

    getClient(): Client {
        return this._client;
    }

    getModules(): Module[] {
        return this._modules;
    }

    // initial start method
    public async start() {
        // create new client
        this._client = new Client();

        this._messageListener = new messageListener(this);
        this._readyListener = new readyListener(this);

        // init event listeners
        this._initEvents();

        this._client.login(config.botToken);
    }

    // init event listeners
    private _initEvents() {
        this._client.on('message', async (msg) => this._messageListener.evalMessage(msg));
        this._client.on('ready', async () => this._readyListener.evalReady());
    }

    private _loadModules() {
        this._modules = [];

        const modules = readdirSync('./modules/', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        modules.forEach((moduleFolder) => {
            let instanceClass;
            if (existsSync(`./modules/${moduleFolder}/instance.js`)) {
                instanceClass = require(`./modules/${moduleFolder}/instance.js`).default;
            } else {
                instanceClass = require(`./modules/${moduleFolder}/instance.ts`).default;
            }
            const instance = new instanceClass(this);
            this._modules.push({ id: instance.info.id, name: instance.info.name, enabled: true, instance });
        });
    }

    public getConfig() {
        return config;
    }

    public afterReady() {
        this._loadModules();
    }
}