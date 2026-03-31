let modInfo = {
	name: "甄嬛树",
	author: "vexpaer",
	pointsName: "银两",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "后宫开局",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- 重构为甄嬛传主题的人物树。<br>
		- 新增主线人物链与横向人物节点。<br>
		- 新增可重复购买项与层级软重置推进。`

let winText = `你已走到后宫权力尽头，甄嬛树当前版本通关。`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	if (!player.zh) return new Decimal(0)
	let gain = player.zh.points
	if (hasUpgrade("zh", 11)) gain = gain.times(player.zh.points)
	if (hasUpgrade("zh", 14)) gain = gain.times(player.zh.points.pow(2))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if (!player.py || player.py.best.lt(1)) {
			return "目标：沿人物主线推进，最终获得 1 纯元皇后势力"
		}
		return "主线完成：可继续堆叠势力与购买项"
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.py && player.py.best.gte(1)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}