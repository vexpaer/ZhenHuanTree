// ============== v0.4 数值工具 ==============

function toDecimal(value) {
	return value instanceof Decimal ? value : new Decimal(value)
}

function softcap(value, start, power) {
	value = toDecimal(value)
	start = toDecimal(start)
	power = toDecimal(power)
	if (value.lte(start)) return value
	return start.times(value.div(start).pow(power))
}

function formatFormulaNumber(value) {
	return format(toDecimal(value))
}

function hasLayerUpgrade(layer, id) {
	return player[layer] && hasUpgrade(layer, id)
}

function layerBest(layer) {
	return player[layer] && player[layer].best ? player[layer].best : new Decimal(0)
}

function layerPoints(layer) {
	return player[layer] && player[layer].points ? player[layer].points : new Decimal(0)
}

function buyableAmountSafe(layer, id) {
	if (!player[layer] || !player[layer].buyables || player[layer].buyables[id] === undefined) return new Decimal(0)
	return getBuyableAmount(layer, id)
}

// ============== 主线人物配置 ==============

const MAIN_CAST = [
	{
		id: "zh",
		name: "甄嬛",
		symbol: "嬛",
		color: "#c79f52",
		requires: new Decimal("1e20"),
		progressCost: new Decimal("1e20"),
		resourceName: "剪纸小像",
		buyables: ["剪刀", "红纸"],
		sideNames: ["崔槿汐", "浣碧", "流朱", "温太医"],
		buyableParams: {
			11: { base: 10, linear: 1.12, knee: 1.014, effectBase: 1.6, freeFrom: "zh12/2,hb11/5", softcapStart: "1e24", softcapPower: 0.6, role: "zhGain", text: "剪纸小像获取" },
			12: { base: 100, linear: 1.1, knee: 1.02, effectBase: 1.8, softcapStart: "1e20", softcapPower: 0.55, role: "silverMult", text: "银两获取" },
		},
		upgradeCosts: [14, 30, 35, "15000", "1e7", "2e9", "1e17", "1e19"],
		unlockGain: new Decimal("1e100"),
		unlockChecks: {
			best: new Decimal("1e20"),
			buyables: [{ id: 11, amount: 20 }, { id: 12, amount: 8 }],
			upgrades: [18],
		},
	},
	{
		id: "smz",
		name: "沈眉庄",
		symbol: "眉",
		color: "#7aa37a",
		requires: new Decimal("1e20"),
		progressCost: new Decimal(100),
		resourceName: "暖情酒",
		buyables: ["玉镯", "暖情酒"],
		sideNames: ["采月"],
		buyableParams: {
			11: { base: 2, linear: 1.08, knee: 1.015, effectBase: 2, softcapStart: "1e20", softcapPower: 0.6, role: "stable", text: "暖情酒获取与低层保留" },
			12: { base: 10, linear: 1.08, knee: 1.02, effectBase: 1.8, softcapStart: "1e18", softcapPower: 0.6, role: "automation", text: "暖情酒获取与自动剪纸速度" },
		},
		sideUnlockCost: new Decimal("1e120"),
		unlockGain: new Decimal("1e1000"),
		unlockChecks: {
			best: new Decimal(100),
			buyables: [{ id: 11, amount: 8 }, { id: 12, amount: 4 }],
			upgrades: [11, 12],
		},
	},
	{
		id: "alr",
		name: "安陵容",
		symbol: "容",
		color: "#8d7bb8",
		requires: new Decimal(100),
		progressCost: new Decimal(1000),
		resourceName: "浮光锦",
		buyables: ["浮光锦", "苦杏仁"],
		sideNames: ["宝鹃"],
		buyableParams: {
			11: { base: 5, linear: 1.1, knee: 1.018, effectBase: 2.1, softcapStart: "1e30", softcapPower: 0.58, role: "costControl", text: "浮光锦获取与后续成本缓和" },
			12: { base: 25, linear: 1.1, knee: 1.022, effectBase: 1.9, freeFrom: "alr11/4", softcapStart: "1e28", softcapPower: 0.58, role: "freeLevels", text: "浮光锦获取与免费等级" },
		},
		sideUnlockCost: new Decimal("1e800"),
		unlockGain: new Decimal("1e10000"),
		protectTarget: "zh",
		protectCost: new Decimal("1e1000"),
		autoTarget: "smz",
		autoCost: new Decimal("1e1500"),
		unlockChecks: {
			best: new Decimal(1000),
			buyables: [{ id: 11, amount: 10 }, { id: 12, amount: 6 }],
			upgrades: [11, 31, 32],
		},
	},
	{
		id: "hf",
		name: "华妃",
		symbol: "华",
		color: "#d07a43",
		requires: new Decimal(1000),
		progressCost: new Decimal("1e4"),
		resourceName: "欢宜香",
		buyables: ["欢宜香", "凤尾香罗"],
		sideNames: ["颂芝"],
		buyableParams: {
			11: { base: 8, linear: 1.12, knee: 1.02, effectBase: 2.2, softcapStart: "1e40", softcapPower: 0.56, role: "resetExp", text: "欢宜香获取与重置收益指数" },
			12: { base: 40, linear: 1.12, knee: 1.025, effectBase: 2, freeFrom: "hf11/5", softcapStart: "1e38", softcapPower: 0.56, role: "silverBurst", text: "欢宜香获取与银两后置倍率" },
		},
		sideUnlockCost: new Decimal("1e6000"),
		unlockGain: new Decimal("1e30000"),
		protectTarget: "smz",
		protectCost: new Decimal("1e8000"),
		autoTarget: "alr",
		autoCost: new Decimal("1e12000"),
		unlockChecks: {
			best: new Decimal("1e4"),
			buyables: [{ id: 11, amount: 10 }, { id: 12, amount: 6 }],
			upgrades: [11, 31, 32],
		},
	},
	{
		id: "hh",
		name: "皇后",
		symbol: "后",
		color: "#8e8e8e",
		requires: new Decimal("1e4"),
		progressCost: new Decimal("1e5"),
		resourceName: "金步摇",
		buyables: ["金步摇", "七巧玲珑枕"],
		sideNames: ["剪秋", "绘春"],
		buyableParams: {
			11: { base: 15, linear: 1.14, knee: 1.022, effectBase: 2.3, softcapStart: "1e50", softcapPower: 0.55, role: "keepUpgrades", text: "金步摇获取与低层保留" },
			12: { base: 75, linear: 1.14, knee: 1.028, effectBase: 2.1, freeFrom: "hh11/5", softcapStart: "1e48", softcapPower: 0.55, role: "startResource", text: "金步摇获取与重置后起始资源" },
		},
		sideUnlockCost: new Decimal("1e20000"),
		unlockGain: new Decimal("1e50000"),
		protectTarget: "alr",
		protectCost: new Decimal("1e25000"),
		autoTarget: "hf",
		autoCost: new Decimal("1e32000"),
		unlockChecks: {
			best: new Decimal("1e5"),
			buyables: [{ id: 11, amount: 10 }, { id: 12, amount: 6 }],
			upgrades: [11, 31, 32],
		},
	},
	{
		id: "py",
		name: "纯元皇后",
		symbol: "纯",
		color: "#d9d0a8",
		requires: new Decimal("1e5"),
		progressCost: new Decimal("1e6"),
		resourceName: "苏绣寝衣",
		buyables: ["苏绣寝衣", "箫笛"],
		sideNames: [],
		buyableParams: {
			11: { base: 30, linear: 1.16, knee: 1.024, effectBase: 2.4, softcapStart: "1e60", softcapPower: 0.55, role: "globalSoftcap", text: "苏绣寝衣获取与全局软上限" },
			12: { base: 150, linear: 1.16, knee: 1.03, effectBase: 2.2, freeFrom: "py11/6", softcapStart: "1e58", softcapPower: 0.55, role: "globalAuto", text: "苏绣寝衣获取与跨层自动化" },
		},
		unlockGain: new Decimal("1e100000"),
		protectTarget: "hf",
		protectCost: new Decimal("1e60000"),
		autoTarget: "hh",
		autoCost: new Decimal("1e70000"),
	},
]

// ============== 次要人物配置 ==============

const SIDE_CHARACTERS = [
	{ id: "cjx", name: "崔槿汐", symbol: "汐", main: "zh", position: -2, unlockUpgrade: 15,
	  resourceName: "忠心",
	  buyables: ["出谋划策", "察言观色", "深谋远虑"],
	  buyableParams: {
		11: { base: 25, linear: 1.22, knee: 1.06, effectBase: 1.35, softcapStart: 100, softcapPower: 0.35, role: "sideGain", text: "忠心获取" },
		12: { base: "1e4", linear: 1.28, knee: 1.08, effectBase: 1.25, softcapStart: 1000, softcapPower: 0.25, role: "sideGain", text: "忠心获取" },
		13: { base: "1e8", linear: 1.35, knee: 1.1, effectBase: 1.18, softcapStart: "1e4", softcapPower: 0.2, role: "sideGain", text: "忠心获取" },
	  },
	  upgrades: [
		{ title: "解锁出谋划策", desc: "开启可重复升级：出谋划策。忠心获取有低软上限，后期会明显变慢。", cost: new Decimal("1e8") },
		{ title: "忠心护主", desc: "银两获取速度 x2，并在重置中保留甄嬛升级。", cost: new Decimal(180), currency: "own" },
		{ title: "解锁察言观色", desc: "开启可重复升级：察言观色。", cost: new Decimal(1500), currency: "own" },
		{ title: "智计无双", desc: "银两获取速度 x5，并强化低层保留。", cost: new Decimal("2e4"), currency: "own" },
		{ title: "旧物留存", desc: "银两获取速度 x10，银两公式使用历史最高剪纸小像。", cost: new Decimal("1e8"), currency: "own" },
		{ title: "决胜千里", desc: "所有次要人物资源获取速度 x2。", cost: new Decimal("1e12"), currency: "own" },
	  ]},
	{ id: "hb", name: "浣碧", symbol: "碧", main: "zh", position: -1, unlockUpgrade: 16,
	  resourceName: "姐妹情",
	  buyables: ["悉心照料", "形影不离", "同心同德"],
	  gainSoftcaps: [{ start: 300, power: 0.42 }, { start: "2e4", power: 0.23 }],
	  buyableParams: {
		11: { base: 35, linear: 1.23, knee: 1.065, effectBase: 1.32, softcapStart: 150, softcapPower: 0.35, role: "sideGain", text: "姐妹情获取" },
		12: { base: "2e4", linear: 1.3, knee: 1.085, effectBase: 1.24, softcapStart: 800, softcapPower: 0.26, role: "sideGain", text: "姐妹情获取" },
		13: { base: "5e8", linear: 1.36, knee: 1.11, effectBase: 1.16, softcapStart: "5e3", softcapPower: 0.2, role: "sideGain", text: "姐妹情获取" },
	  },
	  upgrades: [
		{ title: "解锁悉心照料", desc: "开启可重复升级：悉心照料。姐妹情获取有软上限，后期会逐渐固定。", cost: new Decimal(120), currency: "own" },
		{ title: "姐妹情深", desc: "剪纸小像获取速度 x3。", cost: new Decimal(900), currency: "own" },
		{ title: "解锁形影不离", desc: "开启可重复升级：形影不离。", cost: new Decimal(8000), currency: "own" },
		{ title: "不离不弃", desc: "剪纸小像获取速度 x6。", cost: new Decimal("1e5"), currency: "own" },
		{ title: "同心留样", desc: "剪纸小像获取速度 x10，并按悉心照料等级给予剪刀免费等级。", cost: new Decimal("1e9"), currency: "own" },
		{ title: "患难与共", desc: "甄嬛效果加成 x1.5，并在重置中保留甄嬛购买项。", cost: new Decimal("1e14"), currency: "own" },
	  ]},
	{ id: "lz", name: "流朱", symbol: "朱", main: "zh", position: 1, unlockUpgrade: 17,
	  resourceName: "护主心",
	  buyables: ["忠心耿耿", "舍身护主", "誓死相随"],
	  gainSoftcaps: [{ start: 250, power: 0.4 }, { start: "1e4", power: 0.22 }],
	  buyableParams: {
		11: { base: 45, linear: 1.24, knee: 1.07, effectBase: 1.3, softcapStart: 150, softcapPower: 0.34, role: "sideGain", text: "护主心获取" },
		12: { base: "5e4", linear: 1.31, knee: 1.09, effectBase: 1.22, softcapStart: 700, softcapPower: 0.25, role: "sideGain", text: "护主心获取" },
		13: { base: "1e9", linear: 1.38, knee: 1.12, effectBase: 1.15, softcapStart: "4e3", softcapPower: 0.19, role: "sideGain", text: "护主心获取" },
	  },
	  upgrades: [
		{ title: "解锁忠心耿耿", desc: "开启可重复升级：忠心耿耿。护主心获取有软上限，后期会逐渐固定。", cost: new Decimal(160), currency: "own" },
		{ title: "赤胆忠心", desc: "银两获取速度 x3。", cost: new Decimal(1500), currency: "own" },
		{ title: "解锁舍身护主", desc: "开启可重复升级：舍身护主。", cost: new Decimal("2e4"), currency: "own" },
		{ title: "万死不辞", desc: "银两获取速度 x8，并提高重置保护。", cost: new Decimal("5e7"), currency: "own" },
		{ title: "碧血丹心", desc: "剪纸小像获取速度 x5。", cost: new Decimal("1e13"), currency: "own" },
	  ]},
	{ id: "wty", name: "温太医", symbol: "温", main: "zh", position: 2, unlockUpgrade: 18,
	  resourceName: "医术",
	  buyables: ["医术高超", "情深义重", "仁心仁术"],
	  gainSoftcaps: [{ start: 200, power: 0.38 }, { start: 8000, power: 0.2 }],
	  buyableParams: {
		11: { base: 60, linear: 1.25, knee: 1.075, effectBase: 1.28, softcapStart: 120, softcapPower: 0.33, role: "sideGain", text: "医术获取" },
		12: { base: "1e5", linear: 1.32, knee: 1.095, effectBase: 1.2, softcapStart: 600, softcapPower: 0.24, role: "sideGain", text: "医术获取" },
		13: { base: "2e9", linear: 1.4, knee: 1.13, effectBase: 1.14, softcapStart: "3e3", softcapPower: 0.18, role: "sideGain", text: "医术获取" },
	  },
	  upgrades: [
		{ title: "解锁医术高超", desc: "开启可重复升级：医术高超。医术获取有软上限，后期会逐渐固定。", cost: new Decimal(200), currency: "own" },
		{ title: "悬壶济世", desc: "银两与剪纸小像获取速度 x2。", cost: new Decimal(2500), currency: "own" },
		{ title: "解锁情深义重", desc: "开启可重复升级：情深义重。", cost: new Decimal("5e4"), currency: "own" },
		{ title: "妙手回春", desc: "银两与剪纸小像获取速度 x4，并缓解购买项软上限。", cost: new Decimal("1e8"), currency: "own" },
		{ title: "华佗再世", desc: "银两与剪纸小像获取速度 x2，并缓解银两软上限。", cost: new Decimal("1e14"), currency: "own" },
		{ title: "情深入骨", desc: "甄嬛效果加成 x1.5，并恢复少量银两指数。", cost: new Decimal("1e20"), currency: "own" },
	  ]},
	{ id: "cyue", name: "采月", symbol: "月", main: "smz", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "侍奉周全", desc: "暖情酒获取速度 x2，并让玉镯额外提高保留比例。", cost: new Decimal("1e130") },
		{ title: "忠心可嘉", desc: "银两获取速度 x2。", cost: new Decimal("1e180") },
	  ]},
	{ id: "bq", name: "宝鹃", symbol: "鹃", main: "alr", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "制香巧手", desc: "浮光锦获取速度 x2，并降低华妃购买项 knee。", cost: new Decimal("1e1300") },
		{ title: "暗香浮动", desc: "银两获取速度 x3。", cost: new Decimal("1e1800") },
	  ]},
	{ id: "sz", name: "颂芝", symbol: "颂", main: "hf", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "梳妆巧婢", desc: "欢宜香获取速度 x2，并提高华妃爆发收益。", cost: new Decimal("1e13000") },
		{ title: "深得信任", desc: "银两获取速度 x4。", cost: new Decimal("1e18000") },
	  ]},
	{ id: "jq", name: "剪秋", symbol: "秋", main: "hh", position: -1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "得力助手", desc: "金步摇获取速度 x2，并强化低层升级保留。", cost: new Decimal("1e36000") },
		{ title: "阴狠毒辣", desc: "银两获取速度 x5。", cost: new Decimal("1e41000") },
	  ]},
	{ id: "hc", name: "绘春", symbol: "春", main: "hh", position: 1, unlockUpgrade: 11,
	  upgrades: [
		{ title: "绣工精湛", desc: "金步摇获取速度 x3，并提高重置后起始资源。", cost: new Decimal("1e37000") },
		{ title: "深藏不露", desc: "银两获取速度 x10。", cost: new Decimal("1e43000") },
	  ]},
]

// ============== 配置查询与可重复购买项公式 ==============

function getMainConfig(layerId) {
	return MAIN_CAST.find(m => m.id === layerId)
}

function getSideConfig(layerId) {
	return SIDE_CHARACTERS.find(s => s.id === layerId)
}

function getRawBuyableConfig(layer, id) {
	const main = getMainConfig(layer)
	if (main && main.buyableParams) return main.buyableParams[id]
	const side = getSideConfig(layer)
	if (side && side.buyableParams) return side.buyableParams[id]
	return null
}

function getBuyableConfig(layer, id) {
	const raw = getRawBuyableConfig(layer, id) || { base: 10, linear: 1.2, knee: 1.05, effectBase: 1.5, softcapStart: "1e8", softcapPower: 0.5, role: "gain", text: "资源获取" }
	const config = Object.assign({}, raw)

	if (layer === "zh" && id == 11 && hasLayerUpgrade("zh", 14)) config.linear = 1
	if (layer === "zh" && id == 12 && hasLayerUpgrade("wty", 14)) config.softcapPower = toDecimal(config.softcapPower).add(0.05)

	if (layer === "hf" && hasLayerUpgrade("bq", 11)) config.knee = toDecimal(config.knee).pow(0.95)
	if (layer === "hf" && hasLayerUpgrade("alr", 31)) config.linear = Decimal.max(1, toDecimal(config.linear).pow(0.9))
	if (layer === "hh" && hasLayerUpgrade("sz", 11)) config.effectBase = toDecimal(config.effectBase).add(0.08)
	if (layer === "py" && hasLayerUpgrade("wty", 15)) config.softcapPower = toDecimal(config.softcapPower).add(0.05)

	return config
}

function getBuyableFreeLevels(layer, id) {
	let free = new Decimal(0)
	if (layer === "zh" && id == 11) {
		if (hasLayerUpgrade("zh", 16)) free = free.add(buyableAmountSafe("zh", 12).div(2).floor())
		if (hasLayerUpgrade("hb", 15)) free = free.add(buyableAmountSafe("hb", 11).div(5).floor())
	}
	if (layer === "alr" && id == 12) free = free.add(buyableAmountSafe("alr", 11).div(4).floor())
	if (layer === "hf" && id == 12 && hasLayerUpgrade("sz", 11)) free = free.add(buyableAmountSafe("hf", 11).div(5).floor())
	if (layer === "hh" && id == 12 && hasLayerUpgrade("hc", 11)) free = free.add(buyableAmountSafe("hh", 11).div(5).floor())
	if (layer === "py" && id == 12) free = free.add(buyableAmountSafe("py", 11).div(6).floor())
	return free
}

function getBuyableEffectiveAmount(layer, id, x) {
	const bought = x === undefined ? buyableAmountSafe(layer, id) : toDecimal(x)
	return bought.add(getBuyableFreeLevels(layer, id))
}

function buyableCost(x, params) {
	const config = Array.isArray(params)
		? { base: params[0], linear: params[1], knee: params[2], effectBase: params[3] }
		: params
	x = toDecimal(x)
	const base = toDecimal(config.base)
	const linear = Decimal.pow(config.linear || 1, x)
	const knee = Decimal.pow(config.knee || 1, x.pow(2))
	return base.times(linear).times(knee)
}

function buyableEffectFromConfig(layer, id, x) {
	const config = getBuyableConfig(layer, id)
	const effective = getBuyableEffectiveAmount(layer, id, x)
	let effect = Decimal.pow(config.effectBase || 1, effective)
	const start = toDecimal(config.softcapStart || "1e100").times(getGlobalSoftcapStartMult())
	let power = toDecimal(config.softcapPower || 0.5)
	if (hasLayerUpgrade("wty", 14)) power = Decimal.min(0.95, power.add(0.05))
	effect = softcap(effect, start, power)
	return effect.max(1)
}

function getConfiguredBuyableCost(layer, id, x) {
	return buyableCost(x, getBuyableConfig(layer, id))
}

function buyableCostSum(layer, id, from, count) {
	let total = new Decimal(0)
	for (let i = 0; i < count; i++) {
		total = total.add(getConfiguredBuyableCost(layer, id, from.add(i)))
	}
	return total
}

function buyMaxConfiguredBuyable(layer, id) {
	if (!player[layer] || !tmp[layer] || !tmp[layer].buyables || !tmp[layer].buyables[id]) return
	const currency = player[layer].points
	const from = buyableAmountSafe(layer, id)
	let high = 1
	while (high < 10000 && currency.gte(buyableCostSum(layer, id, from, high))) high *= 2
	let low = 0
	while (low + 1 < high) {
		const mid = Math.floor((low + high) / 2)
		if (currency.gte(buyableCostSum(layer, id, from, mid))) low = mid
		else high = mid
	}
	if (low <= 0) return
	const cost = buyableCostSum(layer, id, from, low)
	player[layer].points = player[layer].points.sub(cost)
	setBuyableAmount(layer, id, from.add(low))
	player[layer].spentOnBuyables = player[layer].spentOnBuyables.add(cost)
}

function buyableFormulaText(config) {
	return "价格公式: " + formatFormulaNumber(config.base) + " * " + formatFormulaNumber(config.linear || 1) + "^x * " + formatFormulaNumber(config.knee || 1) + "^(x^2)\n" +
		"效果公式: " + formatFormulaNumber(config.effectBase || 1) + "^(购买等级 + 免费等级)\n" +
		"软上限: 超过 " + format(toDecimal(config.softcapStart || "1e100").times(getGlobalSoftcapStartMult())) + " 后 ^" + format(config.softcapPower || 0.5)
}

function makeConfiguredBuyable(layerId, id, title, resourceName, unlockedFn) {
	return {
		title: title,
		cost(x) { return getConfiguredBuyableCost(layerId, id, x) },
		effect(x) { return buyableEffectFromConfig(layerId, id, x) },
		display() {
			const data = tmp[this.layer].buyables[this.id]
			const amt = buyableAmountSafe(this.layer, this.id)
			const free = getBuyableFreeLevels(this.layer, this.id)
			const effective = amt.add(free)
			const config = getBuyableConfig(this.layer, this.id)
			let text = "等级: " + formatWhole(amt)
			if (free.gt(0)) text += " + " + formatWhole(free) + " 免费"
			text += "\n成本: " + format(data.cost) + " " + resourceName + "\n" +
				"效果: " + (config.text || resourceName + "获取") + " x" + format(data.effect)
			if (shiftDown) text += "\n\n" + buyableFormulaText(config) + "\n有效等级: " + formatWhole(effective) + "\nShift+点击: 买最大"
			return text
		},
		unlocked: unlockedFn,
		canAfford() {
			return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
		},
		buy() {
			const cost = tmp[this.layer].buyables[this.id].cost
			player[this.layer].points = player[this.layer].points.sub(cost)
			setBuyableAmount(this.layer, this.id, buyableAmountSafe(this.layer, this.id).add(1))
			player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
		},
		buyMax() {
			buyMaxConfiguredBuyable(this.layer, this.id)
		},
	}
}

// ============== 次要人物与全局加成 ==============

function getSideSilverBonus() {
	let mult = new Decimal(1)
	if (hasLayerUpgrade("cjx", 12)) mult = mult.times(2)
	if (hasLayerUpgrade("cjx", 14)) mult = mult.times(5)
	if (hasLayerUpgrade("cjx", 15)) mult = mult.times(10)
	if (hasLayerUpgrade("lz", 12)) mult = mult.times(3)
	if (hasLayerUpgrade("lz", 14)) mult = mult.times(8)
	if (hasLayerUpgrade("wty", 12)) mult = mult.times(2)
	if (hasLayerUpgrade("wty", 14)) mult = mult.times(4)
	if (hasLayerUpgrade("wty", 15)) mult = mult.times(2)
	if (hasLayerUpgrade("cyue", 12)) mult = mult.times(2)
	if (hasLayerUpgrade("bq", 12)) mult = mult.times(3)
	if (hasLayerUpgrade("sz", 12)) mult = mult.times(4)
	if (hasLayerUpgrade("jq", 12)) mult = mult.times(5)
	if (hasLayerUpgrade("hc", 12)) mult = mult.times(10)
	return mult
}

function getSideZhGainMult() {
	let mult = new Decimal(1)
	if (hasLayerUpgrade("hb", 12)) mult = mult.times(3)
	if (hasLayerUpgrade("hb", 14)) mult = mult.times(6)
	if (hasLayerUpgrade("hb", 15)) mult = mult.times(10)
	if (hasLayerUpgrade("lz", 15)) mult = mult.times(5)
	if (hasLayerUpgrade("wty", 12)) mult = mult.times(2)
	if (hasLayerUpgrade("wty", 14)) mult = mult.times(4)
	if (hasLayerUpgrade("wty", 15)) mult = mult.times(2)
	return mult
}

function getSideResourceBonus(mainId) {
	let mult = new Decimal(1)
	if (mainId === "smz" && hasLayerUpgrade("cyue", 11)) mult = mult.times(2)
	if (mainId === "alr" && hasLayerUpgrade("bq", 11)) mult = mult.times(2)
	if (mainId === "hf" && hasLayerUpgrade("sz", 11)) mult = mult.times(2)
	if (mainId === "hh") {
		if (hasLayerUpgrade("jq", 11)) mult = mult.times(2)
		if (hasLayerUpgrade("hc", 11)) mult = mult.times(3)
	}
	return mult
}

function getSideAllResourceBonus() {
	let mult = new Decimal(1)
	if (hasLayerUpgrade("cjx", 16)) mult = mult.times(2)
	return mult
}

function getZhEffectBoost() {
	let mult = new Decimal(1)
	if (hasLayerUpgrade("hb", 16)) mult = mult.times(1.5)
	if (hasLayerUpgrade("wty", 16)) mult = mult.times(1.5)
	return mult
}

function getGlobalSoftcapStartMult() {
	let mult = new Decimal(1)
	if (hasLayerUpgrade("wty", 15)) mult = mult.times(10)
	if (player.py) mult = mult.times(Decimal.pow(1.05, buyableAmountSafe("py", 11)))
	return mult
}

function getSilverSoftcapPower() {
	let power = new Decimal(0.45)
	if (hasLayerUpgrade("wty", 15)) power = power.add(0.05)
	if (hasLayerUpgrade("wty", 16)) power = power.add(0.05)
	return Decimal.min(0.85, power)
}

function getSilverSource() {
	if (!player.zh) return new Decimal(0)
	if (hasLayerUpgrade("zh", 15) || hasLayerUpgrade("cjx", 15)) return Decimal.max(player.zh.points, player.zh.best)
	return player.zh.points
}

function getSilverExp() {
	let exp = new Decimal(1)
	if (hasLayerUpgrade("zh", 11)) exp = exp.add(0.5)
	if (hasLayerUpgrade("zh", 14)) exp = exp.add(0.75)
	if (hasLayerUpgrade("wty", 16)) exp = exp.add(0.1)
	if (player.py) exp = exp.add(buyableAmountSafe("py", 11).times(0.002).min(0.3))
	return exp
}

function getSilverMult() {
	let mult = new Decimal(1)
	if (player.zh && tmp.zh && tmp.zh.buyables && tmp.zh.buyables[12]) mult = mult.times(buyableEffect("zh", 12))
	if (player.hf && tmp.hf && tmp.hf.buyables && tmp.hf.buyables[12]) mult = mult.times(buyableEffect("hf", 12))
	if (player.py && tmp.py && tmp.py.buyables && tmp.py.buyables[12]) mult = mult.times(buyableEffect("py", 12))
	return mult
}

function getSilverPostMult() {
	let mult = new Decimal(1)
	if (tmp.zh && tmp.zh.effect) mult = mult.times(tmp.zh.effect)
	mult = mult.times(getZhEffectBoost())
	mult = mult.times(getSideSilverBonus())
	return mult
}

function getHigherCharacterBackfeed(layerId) {
	const index = MAIN_CAST.findIndex(m => m.id === layerId)
	if (index < 0 || index >= MAIN_CAST.length - 1) return new Decimal(1)
	const nextId = MAIN_CAST[index + 1].id
	if (tmp[nextId] && tmp[nextId].effect) return tmp[nextId].effect
	return new Decimal(1)
}

// ============== 主线推进、保留与自动化 ==============

function passesUnlockChecks(current) {
	const checks = current.unlockChecks || {}
	if (checks.best && layerBest(current.id).lt(checks.best)) return false
	if (checks.upgrades) {
		for (let i = 0; i < checks.upgrades.length; i++) {
			if (!hasLayerUpgrade(current.id, checks.upgrades[i])) return false
		}
	}
	if (checks.buyables) {
		for (let i = 0; i < checks.buyables.length; i++) {
			const req = checks.buyables[i]
			if (buyableAmountSafe(current.id, req.id).lt(req.amount)) return false
		}
	}
	return true
}

function unlockCheckText(current) {
	const checks = current.unlockChecks || {}
	const lines = []
	if (checks.best) lines.push(current.resourceName + "历史最高达到 " + format(checks.best))
	if (checks.buyables) {
		for (let i = 0; i < checks.buyables.length; i++) {
			const req = checks.buyables[i]
			lines.push(current.buyables[req.id - 11] + "等级达到 " + formatWhole(req.amount))
		}
	}
	if (checks.upgrades) {
		for (let i = 0; i < checks.upgrades.length; i++) lines.push("完成升级 " + checks.upgrades[i])
	}
	return lines.length ? lines.join("<br>") : "无额外条件"
}

function hasProtectionUpgrade(targetLayer) {
	if (targetLayer === "zh" && hasLayerUpgrade("cjx", 12)) return true
	if (targetLayer === "zh" && hasLayerUpgrade("lz", 14)) return true
	for (let i = 0; i < MAIN_CAST.length; i++) {
		const main = MAIN_CAST[i]
		if (main.protectTarget === targetLayer && hasLayerUpgrade(main.id, 31)) return true
	}
	return false
}

function hasBuyableKeep(targetLayer) {
	if (isGlobalAutoUnlocked()) return true
	if (targetLayer === "zh" && hasLayerUpgrade("hb", 16)) return true
	for (let i = 0; i < MAIN_CAST.length; i++) {
		const main = MAIN_CAST[i]
		if (main.autoTarget === targetLayer && hasLayerUpgrade(main.id, 32)) return true
	}
	return false
}

function getResetKeepList(layerId) {
	const keep = ["best"]
	if (player[layerId] && player[layerId].milestones) keep.push("milestones")
	if (hasProtectionUpgrade(layerId)) keep.push("upgrades")
	if (hasBuyableKeep(layerId)) {
		keep.push("upgrades")
		keep.push("buyables")
		keep.push("spentOnBuyables")
	}
	return keep
}

function getResetStartingResource(layerId) {
	if (!player[layerId] || !player[layerId].best) return new Decimal(0)
	let ratio = new Decimal(0)
	if (player.hh) ratio = ratio.add(buyableAmountSafe("hh", 12).times(0.002))
	if (hasLayerUpgrade("hc", 11)) ratio = ratio.add(0.02)
	if (player.py) ratio = ratio.add(buyableAmountSafe("py", 11).times(0.001))
	ratio = Decimal.min(ratio, 0.25)
	return player[layerId].best.times(ratio)
}

function applyResetStartingResource(layerId) {
	const start = getResetStartingResource(layerId)
	if (start.gt(0)) player[layerId].points = Decimal.max(player[layerId].points, start)
}

function isGlobalAutoUnlocked() {
	return hasLayerUpgrade("py", 32) || buyableAmountSafe("py", 12).gte(10)
}

function shouldAutoPrestigeLayer(layerId) {
	if (layerId === "zh" || layerId === "py") return false
	if (isGlobalAutoUnlocked()) return true
	const idx = MAIN_CAST.findIndex(m => m.id === layerId)
	const autoLayer = idx >= 0 && idx + 1 < MAIN_CAST.length ? MAIN_CAST[idx + 1] : null
	return !!(autoLayer && hasLayerUpgrade(autoLayer.id, 32))
}

function getZhGainRate() {
	if (!player.zh) return new Decimal(0)
	let gain = new Decimal(1.5)
	gain = gain.times(buyableEffect("zh", 11))
	gain = gain.times(getSideZhGainMult())
	if (tmp.smz && tmp.smz.effect) gain = gain.times(tmp.smz.effect)
	return gain
}

function mainResourceDisplay(layerId, resourceName) {
	if (layerId === "zh") {
		return "当前剪纸小像: <h2>" + format(player.zh.points) + "</h2>" +
			"<br>剪纸小像获取速度: " + format(getZhGainRate()) + "/秒" +
			"<br>银两公式: (" + format(getSilverSource()) + " + 1)^" + format(getSilverExp()) + " * 倍率" +
			"<br>银两速度: " + format(tmp.pointGen) + "/秒"
	}

	const resetGain = tmp[layerId] && tmp[layerId].resetGain ? tmp[layerId].resetGain : new Decimal(0)
	let text = "当前" + resourceName + ": <h2>" + format(layerPoints(layerId)) + "</h2>"
	if (shouldAutoPrestigeLayer(layerId)) text += "<br>" + resourceName + "获取速度: " + format(resetGain) + "/秒"
	else text += "<br>" + resourceName + "获取速度: 手动重置，当前可获得 " + format(resetGain)
	return text
}

function getZhAutoBuyInterval() {
	if (!hasLayerUpgrade("smz", 12) && !isGlobalAutoUnlocked()) return null
	let interval = new Decimal(1)
	if (tmp.smz && tmp.smz.buyables && tmp.smz.buyables[12]) interval = interval.div(buyableEffect("smz", 12).pow(0.25))
	if (isGlobalAutoUnlocked()) interval = interval.div(5)
	return Math.max(0.05, interval.toNumber())
}

// ============== 可重复购买项工厂 ==============

function createMainBuyables(current) {
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")
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
		11: makeConfiguredBuyable(current.id, 11, current.buyables[0], resourceName, function() {
			if (current.id === "zh") return hasLayerUpgrade("zh", 12)
			return player[this.layer].unlocked
		}),
		12: makeConfiguredBuyable(current.id, 12, current.buyables[1], resourceName, function() {
			if (current.id === "zh") return hasLayerUpgrade("zh", 13)
			return player[this.layer].unlocked
		}),
	}
}

// ============== 单次升级项工厂 ==============

function createMainUpgrades(current, next) {
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")
	const upgrades = {}
	const hasSide = current.sideNames.length > 0
	const costs = current.upgradeCosts || []

	if (current.id === "zh") {
		upgrades[11] = {
			title: "银两指数 +0.5",
			description: "银两公式中的剪纸小像指数提高 0.5。",
			cost: new Decimal(costs[0] || 10),
		}
		upgrades[12] = {
			title: "解锁剪刀",
			description: "开启可重复升级：剪刀，提高剪纸小像获取速度。",
			cost: new Decimal(costs[1] || 20),
		}
		upgrades[13] = {
			title: "解锁红纸",
			description: "开启可重复升级：红纸，提高银两倍率。",
			cost: new Decimal(costs[2] || 1000),
			unlocked() { return hasLayerUpgrade("zh", 12) },
		}
		upgrades[14] = {
			title: "剪刀成套",
			description: "银两指数再提高 0.75，并移除剪刀价格中的线性增长项。",
			cost: new Decimal(costs[3] || "1e15"),
			unlocked() { return hasLayerUpgrade("zh", 13) },
		}
		upgrades[15] = {
			title: "解锁崔槿汐",
			description: "解锁崔槿汐横向节点；银两公式开始使用历史最高剪纸小像。",
			cost: new Decimal(costs[4] || "1e20"),
			unlocked() { return hasLayerUpgrade("zh", 14) },
		}
		upgrades[16] = {
			title: "解锁浣碧",
			description: "崔槿汐完成察言观色后，解锁浣碧横向节点；红纸每 2 级给予 1 个剪刀免费等级。",
			cost: new Decimal(costs[5] || "1e30"),
			unlocked() { return hasLayerUpgrade("zh", 15) && hasLayerUpgrade("cjx", 13) },
		}
		upgrades[17] = {
			title: "解锁流朱",
			description: "浣碧完成形影不离后，解锁流朱横向节点，开启重置保护路线。",
			cost: new Decimal(costs[6] || "1e40"),
			unlocked() { return hasLayerUpgrade("zh", 16) && hasLayerUpgrade("hb", 13) },
		}
		upgrades[18] = {
			title: "解锁温太医",
			description: "流朱完成舍身护主后，解锁温太医横向节点，开启软上限缓解路线。",
			cost: new Decimal(costs[7] || "1e50"),
			unlocked() { return hasLayerUpgrade("zh", 17) && hasLayerUpgrade("lz", 13) },
		}
	}

	if (hasSide && current.id !== "zh") {
		upgrades[11] = {
			title: "次要人物分支",
			description: "解锁" + current.sideNames.join("、") + "的横向节点。",
			cost: current.sideUnlockCost || new Decimal(1000),
			currencyDisplayName: "银两",
			currencyInternalName: "points",
		}
	}

	if (next) {
		upgrades[21] = {
			title: "主线推进：" + next.name,
			description: "满足银两、本层资源与关键循环条件后，解锁下一位主线人物：" + next.name + "。",
			cost: current.progressCost || current.requires || new Decimal(3),
			unlocked() {
				if (current.id === "zh") return hasLayerUpgrade("zh", 18)
				return hasSide ? hasLayerUpgrade(this.layer, 11) : true
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost) && player.points.gte(current.unlockGain) && passesUnlockChecks(current)
			},
			fullDisplay() {
				return "<h3>" + this.title + "</h3><br>" +
					this.description + "<br><br>" +
					"需求: 银两达到 " + formatWhole(current.unlockGain) + "<br>" +
					unlockCheckText(current) + "<br>" +
					"花费: " + format(this.cost) + " " + resourceName
			},
		}
	}

	if (current.protectTarget && current.protectCost) {
		const targetName = MAIN_CAST.find(m => m.id === current.protectTarget).name
		upgrades[31] = {
			title: "庇护·" + targetName,
			description: "高层重置时保留" + targetName + "的升级与里程碑。",
			cost: current.protectCost,
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasSide ? hasLayerUpgrade(this.layer, 11) : true },
		}
	}

	if (current.id === "smz") {
		upgrades[12] = {
			title: "自动剪纸",
			description: "甄嬛的剪刀与红纸会自动购买；暖情酒购买项提高自动频率。",
			cost: new Decimal("1e160"),
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasLayerUpgrade(this.layer, 11) },
		}
	}

	if (current.autoTarget && current.autoCost) {
		const autoName = MAIN_CAST.find(m => m.id === current.autoTarget).name
		upgrades[32] = {
			title: "自动·" + autoName,
			description: autoName + "的软重置收益改为每秒自动获得，并保留购买项。",
			cost: current.autoCost,
			currencyDisplayName: "银两",
			currencyInternalName: "points",
			unlocked() { return hasSide ? hasLayerUpgrade(this.layer, 11) : true },
		}
	}

	return upgrades
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
		update(diff) {
			if (this.layer !== "zh") return
			let zhGain = new Decimal(diff).times(getZhGainRate())
			player.zh.points = player.zh.points.add(zhGain)
			player.zh.best = Decimal.max(player.zh.best, player.zh.points)
			player.zh.total = player.zh.total.add(zhGain)

			const interval = getZhAutoBuyInterval()
			if (interval !== null) {
				player.zh.autoBuyTimer += diff
				while (player.zh.autoBuyTimer >= interval) {
					player.zh.autoBuyTimer -= interval
					if (canBuyBuyable("zh", 11)) buyBuyable("zh", 11)
					if (canBuyBuyable("zh", 12)) buyBuyable("zh", 12)
				}
			}
		},
		automate() {
			if (!shouldAutoPrestigeLayer(this.layer)) return
			if (!tmp[this.layer] || !tmp[this.layer].canReset) return
			const gain = tmp[this.layer].resetGain
			player[this.layer].points = player[this.layer].points.add(gain).max(0)
			player[this.layer].best = Decimal.max(player[this.layer].best, player[this.layer].points)
			player[this.layer].total = player[this.layer].total.add(gain)
			player[this.layer].resetTime = 0
		},
		gainMult() {
			if (this.layer === "zh") return new Decimal(1)
			let mult = new Decimal(1)
			mult = mult.times(buyableEffect(this.layer, 11))
			mult = mult.times(buyableEffect(this.layer, 12))
			mult = mult.times(getSideResourceBonus(this.layer))
			mult = mult.times(getHigherCharacterBackfeed(this.layer))
			return mult
		},
		gainExp() {
			let exp = new Decimal(1)
			if (this.layer === "hf") exp = exp.add(buyableAmountSafe("hf", 11).times(0.01).min(0.5))
			if (this.layer === "hf" && hasLayerUpgrade("sz", 11)) exp = exp.add(0.05)
			if (this.layer === "py") exp = exp.add(buyableAmountSafe("py", 12).times(0.002).min(0.25))
			return exp
		},
		effect() {
			let effect = player[this.layer].points.add(1).pow(0.35 + index * 0.03)
			effect = softcap(effect, new Decimal(100).times(getGlobalSoftcapStartMult()), 0.5)
			effect = softcap(effect, new Decimal(1000).times(getGlobalSoftcapStartMult()), 0.35)
			return effect
		},
		effectDescription() {
			if (this.layer === "zh") return "使银两获取乘以 " + format(tmp[this.layer].effect)
			const prevChar = index > 0 ? MAIN_CAST[index - 1] : null
			if (prevChar) return "高层反哺：使" + prevChar.name + "获取乘以 " + format(tmp[this.layer].effect)
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
				effectDescription: "后续高层重置至少保留本层历史最高值。",
			},
		},
		upgrades: createMainUpgrades(current, next),
		buyables: createMainBuyables(current),
		doReset(resettingLayer) {
			if (layers[resettingLayer].row > this.row) {
				layerDataReset(this.layer, getResetKeepList(this.layer))
				applyResetStartingResource(this.layer)
			}
		},
		tabFormat: current.id === "zh"
			? [["display-text", function() { return mainResourceDisplay("zh", resourceName) }], "buyables", "upgrades"]
			: ["main-display", "prestige-button", ["display-text", function() { return mainResourceDisplay(current.id, resourceName) }], "buyables", "upgrades", "milestones"],
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
			return hasLayerUpgrade(prev.id, 21)
		},
	})
}

MAIN_CAST.forEach((_, index) => createMainLayer(index))

// ============== 次要人物层工厂 ==============

function getSideBaseGain(config) {
	const silverLog = player.points.add(1).log10().add(1)
	if (config.id === "cjx") return silverLog.pow(0.55).times(layerBest("zh").add(1).log10().add(1).pow(0.15))
	if (config.id === "hb") return silverLog.pow(0.45).times(layerPoints("zh").add(1).log10().add(1).pow(0.25))
	if (config.id === "lz") return silverLog.pow(0.6).times(player.zh ? player.zh.resetTime + 1 : 1)
	if (config.id === "wty") return silverLog.pow(0.5).times(getSilverExp())
	return silverLog.pow(0.5).times(layerPoints(config.main).add(1).log10().add(1).pow(0.1))
}

function getSideGainForDiff(config, diff) {
	if (!hasLayerUpgrade(config.main, config.unlockUpgrade || 11)) return new Decimal(0)
	let gainRate = getSideBaseGain(config)
	const hasBuyables = config.buyables && config.buyables.length > 0
	if (hasBuyables) {
		if (config.buyableParams[11]) gainRate = gainRate.times(buyableEffect(config.id, 11))
		if (config.buyableParams[12]) gainRate = gainRate.times(buyableEffect(config.id, 12))
		if (config.buyableParams[13]) gainRate = gainRate.times(buyableEffect(config.id, 13))
	}
	if (player[config.id].best.gte(100)) gainRate = gainRate.times(2)
	if (player[config.id].best.gte(1e4)) gainRate = gainRate.times(3)
	if (player[config.id].best.gte(1e8)) gainRate = gainRate.times(10)
	if (player[config.id].best.gte(1e12)) gainRate = gainRate.times(50)
	gainRate = gainRate.times(getSideAllResourceBonus())
	if (config.gainSoftcaps) {
		for (let i = 0; i < config.gainSoftcaps.length; i++) {
			const cap = config.gainSoftcaps[i]
			gainRate = softcap(gainRate, cap.start, cap.power)
		}
	}
	let gain = new Decimal(diff).times(gainRate)
	if (config.id === "cjx") {
		gain = softcap(gain, new Decimal(1000), new Decimal(0.45))
		gain = softcap(gain, new Decimal("1e5"), new Decimal(0.25))
	}
	return gain
}

function sideResourceDisplay(config, resourceName) {
	return "当前" + resourceName + ": <h2>" + format(layerPoints(config.id)) + "</h2>" +
		"<br>" + resourceName + "获取速度: " + format(getSideGainForDiff(config, 1)) + "/秒"
}

function createSideLayer(config) {
	const resourceName = config.resourceName || (config.name + "情谊")
	const hasBuyables = config.buyables && config.buyables.length > 0

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
			const gain = getSideGainForDiff(config, diff)
			if (gain.lte(0)) return
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
					...(i > 0 ? { unlocked() { return hasLayerUpgrade(config.id, 10 + i) } } : {}),
				}
			]
		})),
		buyables: hasBuyables ? {
			showRespec: false,
			11: config.buyableParams[11] ? makeConfiguredBuyable(config.id, 11, config.buyables[0], resourceName, function() { return hasLayerUpgrade(config.id, 11) }) : null,
			12: config.buyableParams[12] ? makeConfiguredBuyable(config.id, 12, config.buyables[1], resourceName, function() { return hasLayerUpgrade(config.id, 13) }) : null,
			13: config.buyableParams[13] ? makeConfiguredBuyable(config.id, 13, config.buyables[2], resourceName, function() { return hasLayerUpgrade(config.id, 11 + config.upgrades.length - 2) }) : null,
		} : {},
		milestones: {},
		doReset(resettingLayer) {
			if (layers[resettingLayer].row > this.row) {
				layerDataReset(this.layer, getResetKeepList(config.main))
				applyResetStartingResource(this.layer)
			}
		},
		layerShown() {
			return tmp[config.main] && tmp[config.main].layerShown && hasLayerUpgrade(config.main, config.unlockUpgrade || 11)
		},
		tabFormat: ["main-display", ["display-text", function() { return sideResourceDisplay(config, resourceName) }], "buyables", "upgrades"],
	})
}

SIDE_CHARACTERS.forEach(config => createSideLayer(config))
