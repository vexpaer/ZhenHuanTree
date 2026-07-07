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
	num: "0.4",
	name: "系统重构",
}

const ENDGAME_SILVER_GOAL = new Decimal("1e200000")

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.4 - 系统重构</h3><br>
		- 银两公式改为基础来源、指数、倍率、后置倍率分段计算。<br>
		- 可重复购买项改为乘积型成本、免费等级、效果软上限与 Shift 买最大。<br>
		- 主线门槛恢复为正式长流程，并加入本层资源与关键循环条件。<br>
		- 全主线和次要人物加入专属机制、逐步保留与自动化路线。<br>
		- 调快前期剪纸节奏，降低不可达节点价格，终局改为银两目标。<br>
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

let winText = `银两已达到终局目标，甄嬛树当前版本通关。`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
	return true
}

// ============== 银两生成公式 ==============
// 银两/秒 = (剪纸来源 + 1)^指数 * 前置倍率 * 后置倍率
// 剪纸来源、指数、倍率由 js/layers.js 中的工具函数统一计算。

function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	if (!player.zh) return new Decimal(0)
	const source = typeof getSilverSource === "function" ? getSilverSource() : player.zh.points
	const exp = typeof getSilverExp === "function" ? getSilverExp() : new Decimal(1)
	let gain = source.add(1).pow(exp)
	if (typeof getSilverMult === "function") gain = gain.times(getSilverMult())
	if (typeof getSilverPostMult === "function") gain = gain.times(getSilverPostMult())
	if (typeof softcap === "function") {
		const start = new Decimal("1e10000").times(typeof getGlobalSoftcapStartMult === "function" ? getGlobalSoftcapStartMult() : 1)
		const power = typeof getSilverSoftcapPower === "function" ? getSilverSoftcapPower() : new Decimal(0.45)
		gain = softcap(gain, start, power)
	}
	return gain
}

function addedPlayerData() { return {
}}

var displayThings = [
	function() {
		if (player.points.lt(ENDGAME_SILVER_GOAL)) {
			return "目标：完成主线并让银两达到 " + format(ENDGAME_SILVER_GOAL)
		}
		return "终局达成：银两达到 " + format(ENDGAME_SILVER_GOAL)
	},
]

function isEndgame() {
	return player.points.gte(ENDGAME_SILVER_GOAL)
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}
