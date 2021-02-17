import { EventEmitter } from 'ws';

import { EVEBot } from '../../bot';

export default class StatusWorker extends EventEmitter {
    private _playerCount = 0;

    constructor(private _bot: EVEBot) {
        super();
    }

    public getPlayerCount() {
        return this._playerCount;
    }

    public addPlayer() {
        this._playerCount++;
        this._newPlayerCount();
        this.emit('playerChange', this._playerCount - 1, this._playerCount);
    }

    public removePlayer() {
        this._playerCount--;
        this._newPlayerCount();
        this.emit('playerChange', this._playerCount + 1, this._playerCount);
    }

    public serverStarting() {
        this._bot.getClient().user.setActivity(`🟠Starting up...`);
    }

    public serverStarted() {
        this._newPlayerCount();
    }

    public serverStopping() {
        this._bot.getClient().user.setActivity(`🟠Stopping...`);
    }

    public serverStopped() {
        this._bot.getClient().user.setActivity(`🔴Offline`);
    }

    private _newPlayerCount() {
        this._bot.getClient().user.setActivity(`🟢Online | ${this._playerCount}/${this._bot.getConfig().MCmaxPlayers} players`);
    }


}