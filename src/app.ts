import "colors";
import { ClusterManager } from "discord-hybrid-sharding";
import path from "path";

console.log("starting bot".yellow);

const manager = new ClusterManager(path.join(__dirname, "./bot.ts"), {
	token: process.env.DISCORD_TOKEN,
	totalShards: "auto",
	shardsPerClusters: 2,
});

manager.on("clusterCreate", (cluster) => {
	console.log(`Launched Cluster ${cluster.id}`.green);

	cluster.on("shardReady", (shardID) =>
		console.log(`Shard Ready ${shardID}`.green),
	);
	cluster.on("shardReconnecting", (shardID) =>
		console.log(`Shard Reconnecting ${shardID}`.yellow),
	);
	cluster.on("shardResume", (shardID) =>
		console.log(`Shard Resumed ${shardID}`.green),
	);
	cluster.on("shardDisconnect", (shardID) =>
		console.log(`Shard Disconnected ${shardID}`.red),
	);
});

manager.on("clusterReady", (cluster) =>
	console.log(`Cluster ${cluster.id} is ready`.green),
);
manager.on("debug", (message) => console.log(`DEBUG: ${message}`.yellow));
manager.spawn();
