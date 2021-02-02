![EVE](https://i.imgur.com/iXEVE0q.png)
# EVE
## Set up
### Config file
EVE needs a `config.json` file with the following content:
```json
{
    "botToken": "YOUR_BOT_TOKEN",
    "botOwnerID": "YOUR_DISCORD_ID"
}
```
### Start the container
EVE gets automatically builded and deployed on [Docker Hub](https://hub.docker.com/r/giyomoon/eve) and can be pulled from there.

The container can be run with the following commands:
```
docker pull giyomoon/eve:latest
docker run -d -p 25565:25565 -v PATH_TO_YOUR_CONFIG_FOLDER:/eve/config -v PATH_TO_YOUR_SERVER_FOLDER:/server --name EVE giyomoon/eve
```