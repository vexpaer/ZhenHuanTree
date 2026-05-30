// ============== 主线人物配置 ==============

const MAIN_CAST = [
	{
		id: "zh",
		name: "甄嬛",
		symbol: "嬛",
		color: "#c79f52",
		requires: 10,
		resourceName: "剪纸小像",
		buyables: ["剪刀", "红纸"],
		sideNames: ["崔槿汐", "浣碧", "流朱", "温太医"],
		// buyable 参数: [base, growth, knee, effectMult]
		buyableParams: [[10, 1.8, 1.08, 1.6], [100, 2.0, 1.10, 2.2]],
		upgradeCosts: [10, 25, 200, 1000, 5000, 20000, 100000, 500000],
		unlockGain: new Decimal("1e30"),
	},
	{
		id: "smz",
		name: "沈眉庄",
		symbol: "眉",
		color: "#7aa37a",
		requires: 3,
		resourceName: "暖情酒",
		buyables: ["玉镯", "暖情酒"],
		sideNames: ["采月"],
		buyableParams: [[2, 1.7, 1.07, 1.5], [10, 1.9, 1.09, 1.8]],
		sideUnlockCost: new Decimal("1e5"),
		unlockGain: new Decimal("1e40"),
	},
	{
		id: "alr",
		name: "安陵容",
		symbol: "容",
		color: "#8d7bb8",
		requires: 4,
		resourceName: "浮光锦",
		buyables: ["浮光锦", "苦杏仁"],
		sideNames: ["宝鹃"],
		buyableParams: [[5, 1.8, 1.08, 1.55], [25, 2.0, 1.10, 2.0]],
		sideUnlockCost: new Decimal("1e8"),
		unlockGain: new Decimal("1e60"),
		protectTarget: "zh",
		protectCost: new Decimal("1e12"),
		autoTarget: "smz",
		autoCost: new Decimal("1e15"),
	},
	{
		id: "hf",
		name: "华妃",
		symbol: "华",
		color: "#d07a43",
		requires: 7,
		resourceName: "欢宜香",
		buyables: ["欢宜香", "凤尾香罗"],
		sideNames: ["颂芝"],
		buyableParams: [[8, 1.9, 1.09, 1.6], [40, 2.1, 1.11, 2.3]],
		sideUnlockCost: new Decimal("1e12"),
		unlockGain: new Decimal("1e80"),
		protectTarget: "smz",
		protectCost: new Decimal("1e18"),
		autoTarget: "alr",
		autoCost: new Decimal("1e22"),
	},
	{
		id: "hh",
		name: "皇后",
		symbol: "后",
		color: "#8e8e8e",
		requires: 8,
		resourceName: "金步摇",
		buyables: ["金步摇", "七巧玲珑枕"],
		sideNames: ["剪秋", "绘春"],
		buyableParams: [[15, 2.0, 1.10, 1.65], [75, 2.2, 1.12, 2.5]],
		sideUnlockCost: new Decimal("1e16"),
		unlockGain: new Decimal("1e100"),
		protectTarget: "alr",
		protectCost: new Decimal("1e24"),
		autoTarget: "hf",
		autoCost: new Decimal("1e28"),
	},
	{
		id: "py",
		name: "纯元皇后",
		symbol: "纯",
		color: "#d9d0a8",
		requires: 10,
		resourceName: "苏绣寝衣",
		buyables: ["苏绣寝衣", "箫笛"],
		sideNames: [],
		buyableParams: [[30, 2.1, 1.11, 1.7], [150, 2.3, 1.13, 2.7]],
		unlockGain: new Decimal("1e120"),
		protectTarget: "hf",
		protectCost: new Decimal("1e30"),
		autoTarget: "hh",
		autoCost: new Decimal("1e35"),
	},
]

// ============== 次要人物配置 ==============

const SIDE_CHARACTERS = [
	{ id: "cjx", name: "崔槿汐", symbol: "汐", main: "zh", position: -2, unlockUpgrade: 15,
	  resourceName: "忠心",
	  buyables: ["出谋划策", "察言观色", "深谋远虑"],
	  buyableParams: [[5, 1.7, 1.07, 1.5], [25, 1.9, 1.09, 1.8], [100, 2.0, 1.10, 2.0]],
	  upgrades: [
		{ title: "解锁出谋划策", desc: "开启可重复升级：出谋划策", cost: new Decimal("1e5") },
		{ title: "忠心护主", desc: "银两获取速度 x5", cost: new Decimal(100), currency: "own" },
		{ title: "解锁察言观色", desc: "开启可重复升级：察言观色", cost: new Decimal("1e8") },
		{ title: "智计无双", desc: "银两获取速度 x20", cost: new Decimal("1e4"), currency: "own" },
		{ title: "运筹帷幄", desc: "银两获取速度 x100", cost: new Decimal("1e8"), currency: "own" },
		{ title: "决胜千里", desc: "所有次要人物资源获取速度 x5", cost: new Decimal("1e12"), currency: "own" },
	  ]},
	{ id: "hb", name: "浣碧", symbol: "碧", main: "zh", position: -1, unlockUpgrade: 16,
	  resourceName: "姐妹情",
	  buyables: ["悉心照料", "形影不离", "同心同德"],
	  buyableParams: [[5, 1.7, 1.07, 1.5], [25, 1.9, 1.09, 1.8], [100, 2.0, 1.10, 2.0]],
	  upgrades: [
		{ title: "解锁悉心照料", desc: "开启可重复升级：悉心照料", cost: new Decimal("1e6") },
		{ title: "姐妹情深", desc: "剪纸小像获取速度 x5", cost: new Decimal(100), currency: "own" },
		{ title: "解锁形影不离", desc: "开启可重复升级：形影不离", cost: new Decimal("1e10") },
		{ title: "不离不弃", desc: "剪纸小像获取速度 x20", cost: new Decimal("1e4"), currency: "own" },
		{ title: "情同手足", desc: "剪纸小像获取速度 x100", cost: new Decimal("1e8"), currency: "own" },
		{ title: "患难与共", desc: "甄嬛效果加成 x2", cost: new Decimal("1e12"), currency: "own" },
	  ]},
	{ id: "lz", name: "流朱", symbol: "朱", main: "zh", position: 1, unlockUpgrade: 17,
	  resourceName: "护主心",
	  buyables: ["忠心耿耿", "舍身护主", "誓死相随"],
	  buyableParams: [[8, 1.8, 1.08, 1.6], [40, 2.0, 1.10, 2.0], [200, 2.1, 1.11, 2.2]],
	  upgrades: [
		{ title: "解锁忠心耿耿", desc: "开启可重复升级：忠心耿耿", cost: new Decimal("1e8") },
		{ title: "赤胆忠心", desc: "银两获取速度 x10", cost: new Decimal(100), currency: "own" },
		{ title: "解锁舍身护主", desc: "开启可重复升级：舍身护主", cost: new Decimal("1e12") },
		{ title: "万死不辞", desc: "银两获取速度 x100", cost: new Decimal("1e6"), currency: "own" },
		{ title: "碧血丹心", desc: "剪纸小像获取速度 x50", cost: new Decimal("1e10"), currency: "own" },
	  ]},
	{ id: "wty", name: "温太医", symbol: "温", main: "zh", position: 2, unlockUpgrade: 18,
	  resourceName: "医术",
	  buyables: ["医术高超", "情深义重", "仁心仁术"],
	  buyableParams: [[10, 1.8, 1.08, 1.6], [50, 2.0, 1.10, 2.2], [250, 2.1, 1.11, 2.5]],
	  upgrades: [
		{ title: "解锁医术高超", desc: "开启可重复升级：医术高超", cost: new Decimal("1e10") },
		{ title: "悬壶济世", desc: "银两与剪纸小像获取速度 x5", cost: new Decimal(100), currency: "own" },
		{ title: "解锁情深义重", desc: "开启可重复升级：情深义重", cost: new Decimal("1e14") },
		{ title: "妙手回春", desc: "银两与剪纸小像获取速度 x20", cost: new Decimal("1e4"), currency: "own" },
		{ title: "华佗再世", desc: "银两与剪纸小像获取速度 x10", cost: new Decimal("1e8"), currency: "own" },
		{ title: "情深入骨", desc: "甄嬛效果加成 x3", cost: new Decimal("1e12"), currency: "own" },
	  ]},
	{ id: "cyue", name: "采月", symbol: "月", main: "smz", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "侍奉周全", desc: "暖情酒获取速度 x2", cost: new Decimal("1e4") },
		{ title: "忠心可嘉", desc: "银两获取速度 x2", cost: new Decimal("1e10") },
	  ]},
	{ id: "bq", name: "宝鹃", symbol: "鹃", main: "alr", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "制香巧手", desc: "浮光锦获取速度 x2", cost: new Decimal("1e7") },
		{ title: "暗香浮动", desc: "银两获取速度 x3", cost: new Decimal("1e15") },
	  ]},
	{ id: "sz", name: "颂芝", symbol: "颂", main: "hf", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "梳妆巧婢", desc: "欢宜香获取速度 x2", cost: new Decimal("1e10") },
		{ title: "深得信任", desc: "银两获取速度 x4", cost: new Decimal("1e20") },
	  ]},
	{ id: "jq", name: "剪秋", symbol: "秋", main: "hh", position: -1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "得力助手", desc: "金步摇获取速度 x2", cost: new Decimal("1e12") },
		{ title: "阴狠毒辣", desc: "银两获取速度 x5", cost: new Decimal("1e25") },
	  ]},
	{ id: "hc", name: "绘春", symbol: "春", main: "hh", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "绣工精湛", desc: "金步摇获取速度 x3", cost: new Decimal("1e14") },
		{ title: "深藏不露", desc: "银两获取速度 x10", cost: new Decimal("1e30") },
	  ]},
]

// ============== 银两速度加成（次要人物对银两的加成） ==============

function getSideSilverBonus() {
	let mult = new Decimal(1)
	if (hasUpgrade("cjx", 11)) mult = mult.times(2)
	if (hasUpgrade("cjx", 12)) mult = mult.times(5)
	if (hasUpgrade("cjx", 13)) mult = mult.times(20)
	if (hasUpgrade("cjx", 15)) mult = mult.times(100)
	if (hasUpgrade("lz", 11)) mult = mult.times(5)
	if (hasUpgrade("lz", 12)) mult = mult.times(25)
	if (hasUpgrade("lz", 14)) mult = mult.times(100)
	if (hasUpgrade("wty", 11)) mult = mult.times(3)
	if (hasUpgrade("wty", 12)) mult = mult.times(10)
	if (hasUpgrade("wty", 15)) mult = mult.times(10)
	if (hasUpgrade("cyue", 12)) mult = mult.times(2)
	if (hasUpgrade("bq", 12)) mult = mult.times(3)
	if (hasUpgrade("sz", 12)) mult = mult.times(4)
	if (hasUpgrade("jq", 12)) mult = mult.times(5)
	if (hasUpgrade("hc", 12)) mult = mult.times(10)
	return mult
}

// ============== 剪纸小像速度加成（次要人物对甄嬛的加成） ==============

function getSideZhGainMult() {
	let mult = new Decimal(1)
	if (hasUpgrade("hb", 11)) mult = mult.times(2)
	if (hasUpgrade("hb", 12)) mult = mult.times(5)
	if (hasUpgrade("hb", 13)) mult = mult.times(20)
	if (hasUpgrade("hb", 15)) mult = mult.times(100)
	if (hasUpgrade("lz", 15)) mult = mult.times(50)
	if (hasUpgrade("wty", 11)) mult = mult.times(3)
	if (hasUpgrade("wty", 12)) mult = mult.times(10)
	if (hasUpgrade("wty", 15)) mult = mult.times(10)
	return mult
}

// ============== 指定主线人物的次要人物资源加成 ==============

function getSideResourceBonus(mainId) {
	let mult = new Decimal(1)
	if (mainId === "smz") {
		if (hasUpgrade("cyue", 11)) mult = mult.times(2)
	}
	if (mainId === "alr") {
		if (hasUpgrade("bq", 11)) mult = mult.times(2)
	}
	if (mainId === "hf") {
		if (hasUpgrade("sz", 11)) mult = mult.times(2)
	}
	if (mainId === "hh") {
		if (hasUpgrade("jq", 11)) mult = mult.times(2)
		if (hasUpgrade("hc", 11)) mult = mult.times(3)
	}
	return mult
}

// ============== 所有次要人物资源获取速度加成（崔槿汐 upgrade 16） ==============

function getSideAllResourceBonus() {
	let mult = new Decimal(1)
	if (hasUpgrade("cjx", 16)) mult = mult.times(5)
	return mult
}

// ============== 甄嬛效果加成（浣碧 upgrade 16, 温太医 upgrade 16） ==============

function getZhEffectBoost() {
	let mult = new Decimal(1)
	if (hasUpgrade("hb", 16)) mult = mult.times(2)
	if (hasUpgrade("wty", 16)) mult = mult.times(3)
	return mult
}

// ============== 加成链：获得上一层人物的 effect 加成 ==============

function getEffectBonus(layerId) {
	const index = MAIN_CAST.findIndex(m => m.id === layerId)
	if (index < 0 || index >= MAIN_CAST.length - 1) return new Decimal(1)
	const nextId = MAIN_CAST[index + 1].id
	if (tmp[nextId] && tmp[nextId].effect) return tmp[nextId].effect
	return new Decimal(1)
}

// ============== buyable 成本公式：cost = base × max(growth^x, knee^(x²)) ==============

function buyableCost(x, params) {
	const [base, growth, knee] = params
	const linear = Decimal.pow(growth, x)
	const quadratic = Decimal.pow(knee, x.pow(2))
	return new Decimal(base).times(Decimal.max(linear, quadratic))
}

// ============== 可重复购买项工厂 ==============

function createMainBuyables(current, index) {
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")
	const p1 = current.buyableParams[0]  // [base, growth, knee, effectMult]
	const p2 = current.buyableParams[1]

	return {
		showRespec: current.id !== "zh",
		respec() {
			player[this.layer].points = player[this.layer].points.add(player[this.layer].spentOnBuyables)
			resetBuyables(this.layer)
			player[this.layer].spentOnBuyables = new Decimal(0)
			doReset(this.layer, true)
		},
		respecText: "重修" + current.name,
		respecMessage: "确认重修可重复购买项吗？这会强制执行一次" + current.name + "层重置。",
		11: {
			title: current.buyables[0],
			cost(x) { return buyableCost(x, p1) },
			effect(x) { return Decimal.pow(p1[3], x) },
			display() {
				const data = tmp[this.layer].buyables[this.id]
				const amt = getBuyableAmount(this.layer, this.id)
				return "等级: " + formatWhole(amt) + "\n" +
					"成本: " + format(data.cost) + " " + resourceName + "\n" +
					"效果: " + resourceName + "获取 x" + format(data.effect)
			},
			unlocked() {
				if (current.id === "zh") return hasUpgrade("zh", 12)
				return player[this.layer].unlocked
			},
			canAfford() {
				return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				const cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].points = player[this.layer].points.sub(cost)
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
			},
		},
		12: {
			title: current.buyables[1],
			cost(x) { return buyableCost(x, p2) },
			effect(x) { return Decimal.pow(p2[3], x) },
			display() {
				const data = tmp[this.layer].buyables[this.id]
				const amt = getBuyableAmount(this.layer, this.id)
				return "等级: " + formatWhole(amt) + "\n" +
					"成本: " + format(data.cost) + " " + resourceName + "\n" +
					"效果: " + resourceName + "获取 x" + format(data.effect)
			},
			unlocked() {
				if (current.id === "zh") return hasUpgrade("zh", 13)
				return player[this.layer].unlocked
			},
			canAfford() {
				return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				const cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].points = player[this.layer].points.sub(cost)
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
			},
		},
	}
}

// ============== 单次升级项工厂 ==============

function createMainUpgrades(current, next) {
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")
	const upgrades = {}
	const hasSide = current.sideNames.length > 0
	const costs = current.upgradeCosts || []

	// ---- 甄嬛层升级（消耗剪纸小像） ----
	if (current.id === "zh") {
		upgrades[11] = {
			title: "银两速度 *= 剪纸小像数量",
			description: "银两速度额外乘以当前剪纸小像数量。",
			cost: new Decimal(costs[0] || 10),
		}
		upgrades[12] = {
			title: "解锁剪刀",
			description: "开启可重复升级：剪刀。",
			cost: new Decimal(costs[1] || 25),
		}
		upgrades[13] = {
			title: "解锁红纸",
			description: "开启可重复升级：红纸。",
			cost: new Decimal(costs[2] || 200),
			unlocked() { return hasUpgrade("zh", 12) },
		}
		upgrades[14] = {
			title: "银两速度 *= 剪纸小像数量^2",
			description: "银两速度再额外乘以当前剪纸小像数量的平方。",
			cost: new Decimal(costs[3] || 1000),
			unlocked() { return hasUpgrade("zh", 13) },
		}
		upgrades[15] = {
			title: "解锁崔槿汐",
			description: "解锁崔槿汐横向节点。",
			cost: new Decimal(costs[4] || 5000),
			unlocked() { return hasUpgrade("zh", 14) },
		}
		upgrades[16] = {
			title: "解锁浣碧",
			description: "解锁浣碧横向节点。",
			cost: new Decimal(costs[5] || 20000),
			unlocked() { return hasUpgrade("zh", 15) },
		}
		upgrades[17] = {
			title: "解锁流朱",
			description: "解锁流朱横向节点。",
			cost: new Decimal(costs[6] || 100000),
			unlocked() { return hasUpgrade("zh", 16) },
		}
		upgrades[18] = {
			title: "解锁温太医",
			description: "解锁温太医横向节点。",
			cost: new Decimal(costs[7] || 500000),
			unlocked() { return hasUpgrade("zh", 17) },
		}
	}

	// ---- 非甄嬛层：侧分支解锁（消耗银两） ----
	if (hasSide && current.id !== "zh") {
		upgrades[11] = {
			title: "次要人物分支",
			description: "解锁" + current.sideNames.join("、") + "的横向节点。",
			cost: current.sideUnlockCost || new Decimal(1000),
			currencyDisplayName: "银两",
			currencyInternalName: "points",
		}
	}

	// ---- 主线推进（消耗自身资源 + 银两要求） ----
	if (next) {
		upgrades[21] = {
			title: "主线推进：" + next.name,
			description: "解锁下一位主线人物：" + next.name + "。",
			cost: current.requires || new Decimal(3),
			unlocked() {
				if (current.id === "zh") return hasUpgrade("zh", 18)
				return hasSide ? hasUpgrade(this.layer, 11) : true
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost) && player.points.gte(current.unlockGain)
			},
			fullDisplay() {
				return "<h3>" + this.title + "</h3><br>" +
					this.description + "<br><br>" +
					"需求: 银两达到 " + formatWhole(current.unlockGain) + "<br>" +
					"花费: " + format(this.cost) + " " + resourceName
			},
		}
	}
	// ---- 庇护升级：保护低层级人物不被级联重置（消耗银两） ----
	if (current.protectTarget && current.protectCost) {
		const targetName = MAIN_CAST.find(m => m.id === current.protectTarget).name
		upgrades[31] = {
			title: "庇护·" + targetName,
			description: targetName + "不会被更高层人物重置。",
			cost: current.protectCost,
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasSide ? hasUpgrade(this.layer, 11) : true },
		}
	}
	// ---- 沈眉庄特殊升级：让甄嬛的可重复购买项每秒自动点击1次（消耗银两） ----
	if (current.id === "smz") {
		upgrades[12] = {
			title: "自动剪纸",
			description: "甄嬛的剪刀与红纸每秒自动购买1次（受资源限制）。",
			cost: new Decimal("1e12"),
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasUpgrade(this.layer, 11) },
		}
	}
	// ---- 自动重置升级：n+1 级开启 n 级的自动重置（消耗银两） ----
	if (current.autoTarget && current.autoCost) {
		const autoName = MAIN_CAST.find(m => m.id === current.autoTarget).name
		upgrades[32] = {
			title: "自动·" + autoName,
			description: autoName + "的软重置变为每秒自动获取。",
			cost: current.autoCost,
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasSide ? hasUpgrade(this.layer, 11) : true },
		}
	}

	return upgrades
}

// ============== getPointGen 辅助：各层 effect 对银两的加成 ==============

function getChainSilverBonus() {
	let mult = new Decimal(1)
	if (tmp.zh && tmp.zh.effect) mult = mult.times(tmp.zh.effect)
	return mult
}

// ============== 主线人物层工厂 ==============

function createMainLayer(index) {
	const current = MAIN_CAST[index]
	const prev = index > 0 ? MAIN_CAST[index - 1] : null
	const next = index < MAIN_CAST.length - 1 ? MAIN_CAST[index + 1] : null
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")

	addLayer(current.id, {
		name: current.name,
		symbol: current.symbol,
		position: 0,
		startData() {
			return {
				unlocked: index === 0,
				points: new Decimal(0),
				best: new Decimal(0),
				total: new Decimal(0),
				spentOnBuyables: new Decimal(0),
				buyables: {},
				upgrades: [],
				milestones: [],
				achievements: [],
				autoBuyTimer: 0,
			}
		},
		color: current.color,
		requires: new Decimal(current.requires),
		resource: resourceName,
		baseResource: prev ? (prev.resourceName ? prev.resourceName : (prev.name + "势力")) : "银两",
		baseAmount() {
			if (!prev) return player.points
			return player[prev.id].points
		},
		type: current.id === "zh" ? "none" : "normal",
		exponent: 0.5,
		// ---- 甄嬛层：剪纸小像自动生成 ----
		update(diff) {
			if (this.layer !== "zh") return
			let zhGain = new Decimal(diff)
			zhGain = zhGain.times(buyableEffect("zh", 11))
			zhGain = zhGain.times(buyableEffect("zh", 12))
			zhGain = zhGain.times(getSideZhGainMult())
			// 沈眉庄 effect 加成 → 甄嬛
			if (tmp.smz && tmp.smz.effect) zhGain = zhGain.times(tmp.smz.effect)
			player.zh.points = player.zh.points.add(zhGain)
			player.zh.best = Decimal.max(player.zh.best, player.zh.points)
			player.zh.total = player.zh.total.add(zhGain)
			// 沈眉庄升级12：自动购买甄嬛的可重复购买项
			if (hasUpgrade("smz", 12)) {
				player.zh.autoBuyTimer += diff
				while (player.zh.autoBuyTimer >= 1) {
					player.zh.autoBuyTimer -= 1
					if (canBuyBuyable("zh", 11)) buyBuyable("zh", 11)
					if (canBuyBuyable("zh", 12)) buyBuyable("zh", 12)
				}
			}
		},
			automate() {
				if (this.layer === "zh" || this.layer === "py") return
				const idx = MAIN_CAST.findIndex(m => m.id === this.layer)
				const autoLayer = (idx >= 0 && idx + 1 < MAIN_CAST.length) ? MAIN_CAST[idx + 1] : null
				if (!autoLayer || !hasUpgrade(autoLayer.id, 32)) return
				if (!tmp[this.layer] || !tmp[this.layer].canReset) return
				let gain = tmp[this.layer].resetGain
				player[this.layer].points = player[this.layer].points.add(gain).max(0)
				player[this.layer].best = Decimal.max(player[this.layer].best, player[this.layer].points)
				player[this.layer].total = player[this.layer].total.add(gain).max(player[this.layer].total)
				layerDataReset(this.layer, ["points", "best", "total", "upgrades", "milestones", "buyables", "spentOnBuyables"])
			},
		// ---- 各层资源获取倍率 ----
		gainMult() {
			if (this.layer === "zh") return new Decimal(1)
			let mult = new Decimal(1)
			mult = mult.times(buyableEffect(this.layer, 11))
			mult = mult.times(buyableEffect(this.layer, 12))
			mult = mult.times(getSideResourceBonus(this.layer))
			// 加成链：上一层人物 effect 加成当前层
			mult = mult.times(getEffectBonus(this.layer))
			return mult
		},
		gainExp() {
			return new Decimal(1)
		},
		// ---- 各层 effect：对下一层或银两的加成 ----
		effect() {
			return player[this.layer].points.add(1).pow(0.35 + index * 0.03)
		},
		effectDescription() {
			if (this.layer === "zh") return "使银两获取乘以 " + format(tmp[this.layer].effect)
			const prevChar = index > 0 ? MAIN_CAST[index - 1] : null
			if (prevChar) return "使" + prevChar.name + "获取乘以 " + format(tmp[this.layer].effect)
			return "效果: x" + format(tmp[this.layer].effect)
		},
		row: index,
		branches: prev ? [prev.id] : [],
		milestones: current.id === "zh" ? {} : {
			0: {
				requirementDescription: "获得 1 " + resourceName,
				done() {
					return player[this.layer].best.gte(1)
				},
				effectDescription: "稳定" + current.name + "分支基础。",
			},
		},
		upgrades: createMainUpgrades(current, next),
		buyables: createMainBuyables(current, index),
		doReset(resettingLayer) {
			if (layers[resettingLayer].row > this.row) {
				const idx = MAIN_CAST.findIndex(m => m.id === this.layer)
				const protector = (idx >= 0 && idx + 2 < MAIN_CAST.length) ? MAIN_CAST[idx + 2] : null
				if (!protector || !hasUpgrade(protector.id, 31)) {
					layerDataReset(this.layer, ["best", "upgrades", "milestones"])
				}
			}
		},
		tabFormat: current.id === "zh"
			? [["display-text", function() { return "当前剪纸小像: <h2>" + format(player.zh.points) + "</h2>" +
				"<br>银两速度: " + format(tmp.pointGen) + "/秒" }], "buyables", "upgrades"]
			: ["main-display", "prestige-button", "resource-display", "buyables", "upgrades", "milestones"],
		hotkeys: current.id === "zh"
			? []
			: [
				{
					key: current.id[0],
					description: current.id[0].toUpperCase() + ": 重置以获取" + resourceName,
					onPress() {
						if (canReset(this.layer)) doReset(this.layer)
					},
				},
			],
			layerShown() {
			if (!prev) return true
			return hasUpgrade(prev.id, 21)
		},
	})
}

MAIN_CAST.forEach((_, index) => createMainLayer(index))

// ============== 次要人物层工厂 ==============

function createSideLayer(config) {
	const resourceName = config.resourceName || (config.name + "情谊")
	const hasBuyables = config.buyables && config.buyables.length > 0
	const p1 = config.buyableParams ? config.buyableParams[0] : null
	const p2 = config.buyableParams ? config.buyableParams[1] : null
	const p3 = config.buyableParams && config.buyableParams.length > 2 ? config.buyableParams[2] : null

	addLayer(config.id, {
		name: config.name,
		symbol: config.symbol,
		color: "#b7b1a1",
		position: config.position,
		row: MAIN_CAST.findIndex(m => m.id === config.main),
		type: "none",
		resource: resourceName,
		startData() {
			return {
				unlocked: true,
				points: new Decimal(0),
				best: new Decimal(0),
				total: new Decimal(0),
				spentOnBuyables: new Decimal(0),
				buyables: {},
				upgrades: [],
				milestones: [],
			}
		},
		branches: [[config.main, "#8f8570", 2]],
		update(diff) {
			let gain = new Decimal(diff)
			gain = gain.times(player.points.add(1).log10().add(1).pow(0.5))
			if (hasBuyables) {
				if (p1) gain = gain.times(buyableEffect(config.id, 11))
				if (p2) gain = gain.times(buyableEffect(config.id, 12))
				if (p3) gain = gain.times(buyableEffect(config.id, 13))
			}
			if (player[config.id].best.gte(100)) gain = gain.times(2)
			if (player[config.id].best.gte(1e4)) gain = gain.times(3)
			if (player[config.id].best.gte(1e8)) gain = gain.times(10)
			if (player[config.id].best.gte(1e12)) gain = gain.times(50)
			gain = gain.times(getSideAllResourceBonus())
			player[config.id].points = player[config.id].points.add(gain)
			player[config.id].best = Decimal.max(player[config.id].best, player[config.id].points)
			player[config.id].total = player[config.id].total.add(gain)
		},
		upgrades: Object.fromEntries(config.upgrades.map((u, i) => {
			const useOwn = u.currency === "own"
			return [
				11 + i,
				{
					title: u.title,
					description: u.desc,
					cost: u.cost,
					currencyDisplayName: useOwn ? resourceName : "银两",
					currencyInternalName: "points",
					...(useOwn ? { currencyLayer: config.id } : {}),
				}
			]
		})),
		buyables: hasBuyables ? {
			showRespec: false,
			11: p1 ? {
				title: config.buyables[0],
				cost(x) { return buyableCost(x, p1) },
				effect(x) { return Decimal.pow(p1[3], x) },
				display() {
					const data = tmp[this.layer].buyables[this.id]
					const amt = getBuyableAmount(this.layer, this.id)
					return "等级: " + formatWhole(amt) + "\n" +
						"成本: " + format(data.cost) + " " + resourceName + "\n" +
						"效果: " + resourceName + "获取 x" + format(data.effect)
				},
				unlocked() { return hasUpgrade(config.id, 11) },
				canAfford() {
					return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
				buy() {
					const cost = tmp[this.layer].buyables[this.id].cost
					player[this.layer].points = player[this.layer].points.sub(cost)
					setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
				},
			} : null,
			12: p2 ? {
				title: config.buyables[1],
				cost(x) { return buyableCost(x, p2) },
				effect(x) { return Decimal.pow(p2[3], x) },
				display() {
					const data = tmp[this.layer].buyables[this.id]
					const amt = getBuyableAmount(this.layer, this.id)
					return "等级: " + formatWhole(amt) + "\n" +
						"成本: " + format(data.cost) + " " + resourceName + "\n" +
						"效果: " + resourceName + "获取 x" + format(data.effect)
				},
				unlocked() { return hasUpgrade(config.id, 13) },
				canAfford() {
					return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
				buy() {
					const cost = tmp[this.layer].buyables[this.id].cost
					player[this.layer].points = player[this.layer].points.sub(cost)
					setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
				},
			} : null,
			13: p3 ? {
				title: config.buyables[2],
				cost(x) { return buyableCost(x, p3) },
				effect(x) { return Decimal.pow(p3[3], x) },
				display() {
					const data = tmp[this.layer].buyables[this.id]
					const amt = getBuyableAmount(this.layer, this.id)
					return "等级: " + formatWhole(amt) + "\n" +
						"成本: " + format(data.cost) + " " + resourceName + "\n" +
						"效果: " + resourceName + "获取 x" + format(data.effect)
				},
				unlocked() { return hasUpgrade(config.id, 11 + config.upgrades.length - 2) },
				canAfford() {
					return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
				buy() {
					const cost = tmp[this.layer].buyables[this.id].cost
					player[this.layer].points = player[this.layer].points.sub(cost)
					setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
					player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
				},
			} : null,
		} : {},
		milestones: {},
		doReset(resettingLayer) {
			if (layers[resettingLayer].row > this.row) {
				const mainIdx = MAIN_CAST.findIndex(m => m.id === config.main)
				const protector = (mainIdx >= 0 && mainIdx + 2 < MAIN_CAST.length) ? MAIN_CAST[mainIdx + 2] : null
				if (!protector || !hasUpgrade(protector.id, 31)) {
					layerDataReset(this.layer, ["best", "upgrades"])
				}
			}
		},
		layerShown() {
			return tmp[config.main] && tmp[config.main].layerShown && hasUpgrade(config.main, config.unlockUpgrade || 11)
		},
		tabFormat: ["main-display", "resource-display", "buyables", "upgrades"],
	})
}

SIDE_CHARACTERS.forEach(config => createSideLayer(config))
