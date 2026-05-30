let modInfo = {
	name: "甄嬛树",
	author: "vexpaer",
	pointsName: "银两",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(10),
	offlineLimit: 1,
}

let VERSION = {
	num: "0.3",
	name: "节奏重塑",
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.3 - 节奏重塑</h3><br>
		- 重新设计所有可重复购买项的成本公式：自然停购点 (~8-12级)。<br>
		- 打通人物加成链：各层 effect 实际生效，层层叠加。<br>
		- 非初始层单次升级改为消耗银两，形成清晰节奏。<br>
	<h3>v0.2 - 后宫初开</h3><br>
		- 补全全部次要人物节点。<br>
		- 次要人物现拥有独立的升级页面。<br>
		- 新增各人物分支间的加成联动。<br>
	<h3>v0.1 - 后宫开局</h3><br>
		- 重构为甄嬛传主题的人物树。`

let winText = `你已走到后宫权力尽头，甄嬛树当前版本通关。`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
	return true
}

// ============== 银两生成公式 ==============
// 基础: 剪纸小像数量
// 升级 11: ×剪纸小像数量
// 升级 14: ×剪纸小像数量^2
// 甄嬛 effect: ×(剪纸小像+1)^0.35
// 次要人物加成: ×getSideSilverBonus()

function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	if (!player.zh) return new Decimal(0)
	let gain = player.zh.points
	if (hasUpgrade("zh", 11)) gain = gain.times(player.zh.points)
	if (hasUpgrade("zh", 14)) gain = gain.times(player.zh.points.pow(2))
	// 甄嬛 effect 加成
	if (tmp.zh && tmp.zh.effect) gain = gain.times(tmp.zh.effect)
	// 甄嬛效果加成（次要人物）
	gain = gain.times(getZhEffectBoost ? getZhEffectBoost() : 1)
	// 次要人物加成
	gain = gain.times(getSideSilverBonus ? getSideSilverBonus() : 1)
	return gain
}

function addedPlayerData() { return {
}}

var displayThings = [
	function() {
		if (!player.py || player.py.best.lt(1)) {
			return "目标：沿人物主线推进，最终获得 1 纯元皇后势力"
		}
		return "主线完成：可继续堆叠势力与购买项"
	},
]

function isEndgame() {
	return player.py && player.py.best.gte(1)
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}
