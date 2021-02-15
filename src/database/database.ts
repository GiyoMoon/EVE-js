import { ConnectionOptions, createConnection, Connection, Repository } from 'typeorm';

import { DynamicConfig } from './entities/dynamicConfig';

// database options
const options: ConnectionOptions = {
    type: 'sqlite',
    database: `./config/eve.db`,
    entities: [DynamicConfig],
    logging: false
}

export class BotDatabase {

    private _connection: Connection;

    private _configRepository: Repository<DynamicConfig>;

    public async initConnection() {
        // init connection to database
        this._connection = await createConnection(options);

        // check if all tables are correct and generate scaffolding
        await this._connection.synchronize();

        // save repository to property
        this._configRepository = this._connection.getRepository(DynamicConfig);

        return this;
    }

    // getter for the database connection
    public getConnection() {
        return this._connection;
    }

    public getConfigRepository() {
        return this._configRepository;
    }

}