import { EVEBot } from "../../bot";

export default class StatusWorker {
    private _playerCount = 0;

    constructor(private _bot: EVEBot) { }

    public addPlayer() {
        this._playerCount++;
        this._newPlayerCount();
    }

    public removePlayer() {
        this._playerCount--;
        this._newPlayerCount();
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