import { EVEBot } from './../bot';

export default class readyListener {

    constructor(private _botClient: EVEBot) { }

    public async evalReady() {
        console.log(`Logged in as ${this._botClient.getClient().user.tag}`);
    }
}