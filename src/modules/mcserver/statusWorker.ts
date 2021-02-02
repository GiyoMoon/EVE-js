import { Client } from "discord.js";

export default class StatusWorker {
    private _playerCount = 0;

    constructor(private _client: Client) { }

    public addPlayer() {
        this._playerCount++;
        this._newPlayerCount();
    }

    public removePlayer() {
        this._playerCount--;
        this._newPlayerCount();
    }

    public serverStarted() {
        this._newPlayerCount();
    }

    public serverStopped() {
        this._client.user.setActivity(`🔴Offline`);
    }

    private _newPlayerCount() {
        this._client.user.setActivity(`🟢Online | ${this._playerCount}/5 players`);
    }


}