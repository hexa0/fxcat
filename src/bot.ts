import "colors";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import {
	Client,
	GatewayIntentBits,
	Message,
	OmitPartialGroupDMChannel,
} from "discord.js";

declare module "discord.js" {
	export interface Client {
		cluster: ClusterClient<Client>;
	}
}

const client = new Client({
	shards: getInfo().SHARD_LIST,
	shardCount: getInfo().TOTAL_SHARDS,

	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.cluster = new ClusterClient(client);

client.once("clientReady", () => {
	console.log("client ready".green);
});

const urlExp =
	/https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?/gi;

function getLinks(text: string): string[] {
	return text.match(urlExp) ?? [];
}

async function respondTo(
	message: OmitPartialGroupDMChannel<Message<boolean>>,
	url: URL,
) {
	message.reply(url.toString());
	message.suppressEmbeds();

	// it's an absolute hack but sometimes this doesn't work instantly

	setTimeout(() => {
		message.suppressEmbeds();
	}, 1000);

	setTimeout(() => {
		message.suppressEmbeds();
	}, 2000);
}

function fixUrl(url: URL) {
	switch (url.host) {
		case "www.tiktok.com":
			url.host = "tnktok.com";
			return true;
		case "vm.tiktok.com":
			url.host = "tnktok.com";
			return true;
		case "x.com":
			url.host = "fixupx.com";
			return true;
		case "twitter.com":
			url.host = "fxtwitter.com";
			return true;
		case "www.instagram.com":
			url.host = "kkinstagram.com";
			return true;
		case "bsky.app":
			url.host = "bskyx.app";
			return true;
		case "witchsky.app":
			url.host = "bskyx.app";
			return true;
	}

	return false;
}

client.on("messageCreate", (message) => {
	getLinks(message.content).forEach((link) => {
		const url = new URL(link);

		if (fixUrl(url)) {
			respondTo(message, url)
		}
	});
});

client.login(process.env.DISCORD_TOKEN);
