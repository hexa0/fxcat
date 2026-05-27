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
	console.log(`launched cluster ${cluster.id}`.green);

	cluster.on("shardReady", (shardID) =>
		console.log(`shard ready ${shardID}`.green),
	);
	cluster.on("shardReconnecting", (shardID) =>
		// in the original sans bot code i used .orange here, i have no damn clue why that type doesn't exist so i use .yellow instead
		console.log(`shard reconnecting ${shardID}`.yellow),
	);
	cluster.on("shardResume", (shardID) =>
		console.log(`shard resumed ${shardID}`.green),
	);
	cluster.on("shardDisconnect", (shardID) =>
		console.log(`shard disconnected ${shardID}`.red),
	);
});

manager.on("clusterReady", (cluster) =>
	console.log(`Cluster ${cluster.id} is ready`.green),
);
// manager.on("debug", (message) => console.log(`debug: ${message}`.yellow));
manager.spawn();
