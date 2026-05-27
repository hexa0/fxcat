# heyo!!!
this is a VERY dead simple embed fixer bot as a FOSS alternative to the QuickVids bot (which is literally just a scam don't use that bot if you have any self respect, why charge for other peoples embed fixers lmfao),\
this bot sees a message and simply replies with an embed fixed link if available and nothing more or less\
it is designed to be self hosted very easily (create a .env file with DISCORD_TOKEN= and your bot token and have message intents enabled then just run docker compose up --build -d)

if there's any links that aren't handled feel free to open a PR, the code is so tiny that it should be super easy to read, just look in src/bot.ts and you'll find the code that matches for URLs