# Docker Installation 

#### ⌚ Installation
Download the latest version from Docker.
```bash
docker pull lachlandev/discord-bot-dashboard-v2
```
**If you are using arm64 architectures please use this version**
```bash
docker pull lachlandev/discord-bot-dashboard-v2:arm64
```
#### ⚙️ Setting up
Once you have pulled the desired version please run the following __run__ command.
```
docker run -p 3000:3000 -e clientID=clientID -e clientSecret=clientSecret -e callBackURL=callBackURL -e admin=admin -e token=token -e prefix=prefix -e port=3000 -d lachlandev/discord-bot-dashboard-v2
```
* **``clientID``** - This is the Client ID for your BOT, this can be found in the [Discord Developer Portal](https://discord.com/developers) or in the Discord Client.
* **``clientSecret``** - This is the Client Secret for your BOT, this can be ONLY be found in the [Discord Developer Portal](https://discord.com/developers)
* **``callbackURL``** - Head over to OAuth2 and create a redirect link. for example: ``http://localhost:3000/login/api`` Can change ``localhost`` for the IP of your system.
* **``Admin``** - This is the Client ID of your Discord account used to authenticate in the login process. Multiple admins can be added ``userAdminID,userAdminID2`` 
* **``token``** - This is the Token for your BOT used to login to Discord.
* **``prefix``** - Is what we will use to call for commands.
* **``port``** - Is port that will be used to access the dashboard! Ensure you change the port on your OAuth2 url.

#### 📡 Finishing up
Once your Docker Container has started it should have exited please check the logs to see if it exited with the following output __"Config Updated Please restart Docker Container!"__ If so please restart the container and now you should have Discord BOT Dashboard V2 installed!