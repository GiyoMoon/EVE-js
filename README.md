![EVE](https://imgur.com/cgiKlF3.png)
With EVE you can control a Minecraft server via Discord!
![Example](https://imgur.com/cEiEgAw.png)
# Setting EVE up
## Config file
EVE needs a `config.json` file with the following content:
```json
{
   "botToken": "YOUR_BOT_TOKEN",
    "botOwnerID": "YOUR_DISCORD_ID",
    "consoleChannelID": "MINECRAFT_CONSOLE_CHANNEL_ID",
    "MCmaxPlayers": 5
}
```
### Additional Info
- `consoleChannelID` is the ID of the Discord Channel which should be used as the console. EVE will pass every output into this channel and treat every input from every use as a command. It's exactly like the Minecraft server console.
- `MCmaxPlayers` is the max player count of your server. This property will be used in the status of the discord bot. Like this:

![EVEStatus](https://imgur.com/vw3Tdef.png)
## Starting the container
EVE gets automatically builded and deployed on [Docker Hub](https://hub.docker.com/r/giyomoon/eve) and can be pulled from there.

The container can be run with the following command:
```bash
docker run -d -p 25565:25565 -p 8080:80 -v PATH_TO_YOUR_CONFIG_FOLDER:/eve/config -v PATH_TO_YOUR_SERVER_FOLDER:/server --name EVE giyomoon/eve
```

For example:
```bash
docker run -d -p 25565:25565 -p 8080:80 -v /srv/config:/eve/config -v /srv/mcserver:/server --name EVE giyomoon/eve
```

### Volume folders
`/srv/config` is a folder which includes the `config.json` file.

`/srv/mcserver` is the folder which includes the Minecraft server. It has to include a `.jar` file called `server.jar`. EVE starts this server with optimized java flags. Read more [here](https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/)

# Planned features
## [In progress] Permissions
It should be possible to give different Discord users different permissions like the permission to only start and stop the server.