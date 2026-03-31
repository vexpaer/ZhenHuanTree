var layoutInfo = {
    startTab: "zh",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)

const SIDE_NODES = [
    { id: "cjx", symbol: "汐", title: "崔槿汐", row: 0, position: -2, main: "zh", unlockUpgrade: 15 },
    { id: "hb", symbol: "碧", title: "浣碧", row: 0, position: -1, main: "zh", unlockUpgrade: 16 },
    { id: "lz", symbol: "朱", title: "流朱", row: 0, position: 1, main: "zh", unlockUpgrade: 17 },
    { id: "wty", symbol: "温", title: "温太医", row: 0, position: 2, main: "zh", unlockUpgrade: 18 },
    { id: "cyue", symbol: "月", title: "采月", row: 1, position: 1, main: "smz" },
    { id: "bq", symbol: "鹃", title: "宝鹃", row: 2, position: 1, main: "alr" },
    { id: "sz", symbol: "颂", title: "颂芝", row: 3, position: 1, main: "hf" },
    { id: "jq", symbol: "秋", title: "剪秋", row: 4, position: -1, main: "hh" },
    { id: "hc", symbol: "春", title: "绘春", row: 4, position: 1, main: "hh" },
]

SIDE_NODES.forEach(node => {
    addNode(node.id, {
        row: node.row,
        position: node.position,
        symbol: node.symbol,
        color: "#b7b1a1",
        branches: [[node.main, "#8f8570", 2]],
        tooltip: node.title,
        layerShown() {
            const sideUnlock = node.unlockUpgrade ? node.unlockUpgrade : 11
            return tmp[node.main] && tmp[node.main].layerShown && hasUpgrade(node.main, sideUnlock)
        },
    })
})


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})