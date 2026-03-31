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
		unlockGain: new Decimal("1e100"),
		unlockCost: new Decimal(8),
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
		unlockGain: new Decimal("1e1000"),
		unlockCost: new Decimal(10),
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
		unlockGain: new Decimal("1e10000"),
		unlockCost: new Decimal(12),
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
		unlockGain: new Decimal("1e30000"),
		unlockCost: new Decimal(14),
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
		unlockGain: new Decimal("1e50000"),
		unlockCost: new Decimal(16),
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
		unlockGain: new Decimal("1e100000"),
		unlockCost: new Decimal(0),
	},
]

function createMainBuyables(current, index) {
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
		11: {
			title: current.buyables[0],
			cost(x) {
				if (current.id === "zh") {
					const linear = Decimal.times(10, Decimal.pow(0.99, x))
					const quadratic = Decimal.pow(1.01, x.pow(2))
					return linear.times(quadratic)
				}
				return Decimal.pow(2 + index, x.add(2)).floor()
			},
			effect(x) {
				if (current.id === "zh") return Decimal.pow(1.5, x)
				return Decimal.pow(1.45 + index * 0.07, x)
			},
			display() {
				const data = tmp[this.layer].buyables[this.id]
				return "成本: " + format(data.cost) + " " + resourceName + "\n" +
					"等级: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\n" +
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
			cost(x) {
				if (current.id === "zh") return Decimal.times("1e4", Decimal.pow(1.25, x.pow(2)))
				return Decimal.pow(3 + index, x.add(1)).floor()
			},
			effect(x) {
				if (current.id === "zh") return Decimal.pow(2, x)
				return Decimal.pow(1.35 + index * 0.05, x)
			},
			display() {
				const data = tmp[this.layer].buyables[this.id]
				return "成本: " + format(data.cost) + " " + resourceName + "\n" +
					"等级: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\n" +
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

function createMainUpgrades(current, next) {
	const resourceName = current.resourceName ? current.resourceName : (current.name + "势力")
	const upgrades = {}
	const hasSide = current.sideNames.length > 0

	if (hasSide && current.id !== "zh") {
		upgrades[11] = {
			title: "次要人物分支",
			description: "解锁" + current.sideNames.join("、") + "的横向节点。",
			cost: new Decimal(3),
		}
	}

	if (current.id === "zh") {
		upgrades[11] = {
			title: "银两速度 *= 剪纸小像数量",
			description: "银两速度额外乘以当前剪纸小像数量。",
			cost: new Decimal(10),
		}
		upgrades[12] = {
			title: "解锁剪刀",
			description: "开启可重复升级：剪刀。",
			cost: new Decimal(20),
		}
		upgrades[13] = {
			title: "解锁红纸",
			description: "开启可重复升级：红纸。",
			cost: new Decimal(1000),
		}
		upgrades[14] = {
			title: "银两速度 *= 剪纸小像数量^2",
			description: "银两速度再额外乘以当前剪纸小像数量的平方。",
			cost: new Decimal("1e15"),
		}
		upgrades[15] = {
			title: "解锁崔槿汐",
			description: "解锁崔槿汐横向节点。",
			cost: new Decimal("1e15"),
		}
		upgrades[16] = {
			title: "解锁浣碧",
			description: "解锁浣碧横向节点。",
			cost: new Decimal("1e20"),
		}
		upgrades[17] = {
			title: "解锁流朱",
			description: "解锁流朱横向节点。",
			cost: new Decimal("1e40"),
		}
		upgrades[18] = {
			title: "解锁温太医",
			description: "解锁温太医横向节点。",
			cost: new Decimal("1e50"),
		}
	}

	if (next) {
		upgrades[21] = {
			title: "主线推进：" + next.name,
			description: "解锁下一位主线人物：" + next.name + "。",
			cost: current.unlockCost,
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

	return upgrades
}

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
			let zhGain = new Decimal(diff)
			zhGain = zhGain.times(buyableEffect("zh", 11))
			zhGain = zhGain.times(buyableEffect("zh", 12))
			player.zh.points = player.zh.points.add(zhGain)
			player.zh.best = Decimal.max(player.zh.best, player.zh.points)
			player.zh.total = player.zh.total.add(zhGain)
		},
		gainMult() {
			if (this.layer === "zh") return new Decimal(1)
			let mult = new Decimal(1)
			mult = mult.times(buyableEffect(this.layer, 11))
			mult = mult.times(buyableEffect(this.layer, 12))
			return mult
		},
		gainExp() {
			return new Decimal(1)
		},
		effect() {
			return player[this.layer].points.add(1).pow(0.35 + index * 0.03)
		},
		effectDescription() {
			if (this.layer === "zh") return "使银两获取乘以 " + format(tmp[this.layer].effect)
			return "使上一位人物层获取乘以 " + format(tmp[this.layer].effect)
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
			if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, ["best"])
		},
		tabFormat: current.id === "zh"
			? [["display-text", function() { return "当前剪纸小像: <h2>" + format(player.zh.points) + "</h2>" }], "buyables", "upgrades"]
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
