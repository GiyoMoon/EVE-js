# **Archived Repository**
This is the old repository for EVE written in Javascript. I rewrote the bot with new features in Rust [here](https://github.com/GiyoMoon/EVE).

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
    "MCmaxPlayers": 5,
    "MCserverFlags": [
        "-Xms6G",
        "-Xmx6G",
        "-XX:+UseG1GC",
        "-XX:+ParallelRefProcEnabled",
        "-XX:MaxGCPauseMillis=200",
        "-XX:+UnlockExperimentalVMOptions",
        "-XX:+DisableExplicitGC",
        "-XX:+AlwaysPreTouch",
        "-XX:G1NewSizePercent=30",
        "-XX:G1MaxNewSizePercent=40",
        "-XX:G1HeapRegionSize=8M",
        "-XX:G1ReservePercent=20",
        "-XX:G1HeapWastePercent=5",
        "-XX:G1MixedGCCountTarget=4",
        "-XX:InitiatingHeapOccupancyPercent=15",
        "-XX:G1MixedGCLiveThresholdPercent=90",
        "-XX:G1RSetUpdatingPauseTimePercent=5",
        "-XX:SurvivorRatio=32",
        "-XX:+PerfDisableSharedMem",
        "-XX:MaxTenuringThreshold=1",
        "-jar",
        "server.jar",
        "nogui"
    ],
    "MCserverPath": "/server",
    "MCautoShutdown": false,
    "MCshutdownAfter": 60
}
```
### Additional Info
- `consoleChannelID` is the ID of the Discord Channel which should be used as the console. EVE will pass every output from the server into this channel and treat every input from every user as a command. It's exactly like the Minecraft server console.
- `MCmaxPlayers` is the max player count of your server. This property will be used in the status of the discord bot. Like this:

![EVEStatus](https://imgur.com/vw3Tdef.png)


- `MCserverFlags` are all the java flags which are used to start the server. They are inspired from [here](https://aikar.co/2018/07/02/).
- `MCserverPath` is the internal path to the Minecraft server. Should only be changed if you are in a development environment.
- `MCautoShutdown` whether to automatically shut down the Minecraft server when no users are online.
- `MCshutdownAfter` after how many **minutes**, when no player is online, the server should be shut down.
## Starting the container
EVE gets automatically builded and deployed on [Github Packages](https://github.com/GiyoMoon/EVE-js/pkgs/container/eve-js) and can be pulled from there.

The container can be run with the following command:
```bash
docker run -d -p 25565:25565 -v PATH_TO_YOUR_CONFIG_FOLDER:/eve/config -v PATH_TO_YOUR_SERVER_FOLDER:/server --name EVE ghcr.io/giyomoon/eve-js:java17
```

For example:
```bash
docker run -d -p 25565:25565 -v /srv/config:/eve/config -v /srv/mcserver:/server --name EVE ghcr.io/giyomoon/eve-js:java17
```
Additional ports can be mapped if you are running a dynmap for example.
### Volume folders
`/srv/config` is a folder which includes the `config.json` file.

`/srv/mcserver` is the folder which includes the Minecraft server. It has to include a `.jar` file called `server.jar`.

## Java version
EVE gets build for three different Java versions. Java 17, 11 and 8. Depending on the version/type of your Minecraft server, you need to choose the correct version for you.

### Docker Image Tags
- `Java 17`: `java17` (`ghcr.io/giyomoon/eve-js:java17`)
- `Java 11`: `java11` (`ghcr.io/giyomoon/eve-js:java11`)
- `Java 8`: `java8` (`ghcr.io/giyomoon/eve-js:java8`)
