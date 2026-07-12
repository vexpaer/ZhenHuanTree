// Character-specific generated silhouettes for layer backgrounds.
// Images are loaded only when their character layer is visible; motion stays CSS-only.

var CHARACTER_VISUALS = {
	zh:   { accent: "#c79f52", seal: "嬛", align: "right", position: "84% 102%", size: "auto 96%", opacity: 0.24, duration: "12s" },
	smz:  { accent: "#7aa37a", seal: "眉", align: "left", position: "15% 102%", size: "auto 91%", opacity: 0.21, duration: "16s" },
	alr:  { accent: "#8d7bb8", seal: "容", align: "right", position: "86% 103%", size: "auto 92%", opacity: 0.21, duration: "10s" },
	hf:   { accent: "#d07a43", seal: "华", align: "left", position: "13% 103%", size: "auto 99%", opacity: 0.26, duration: "8s", scale: 1.022 },
	hh:   { accent: "#8e8e8e", seal: "后", align: "right", position: "87% 102%", size: "auto 98%", opacity: 0.23, duration: "18s", scale: 1.01 },
	py:   { accent: "#d9d0a8", seal: "纯", align: "left", position: "13% 104%", size: "auto 95%", opacity: 0.19, duration: "14s" },
	cjx:  { accent: "#9b8769", seal: "汐", align: "right", position: "86% 103%", size: "auto 87%", opacity: 0.19, duration: "14s" },
	hb:   { accent: "#668f82", seal: "碧", align: "left", position: "14% 104%", size: "auto 84%", opacity: 0.19, duration: "11s" },
	lz:   { accent: "#a6534d", seal: "朱", align: "right", position: "86% 104%", size: "auto 88%", opacity: 0.21, duration: "7s", scale: 1.025 },
	wty:  { accent: "#66858d", seal: "温", align: "left", position: "14% 103%", size: "auto 91%", opacity: 0.20, duration: "12s" },
	cyue: { accent: "#78927c", seal: "月", align: "right", position: "86% 104%", size: "auto 82%", opacity: 0.18, duration: "13s" },
	bq:   { accent: "#76688f", seal: "鹃", align: "left", position: "14% 104%", size: "auto 83%", opacity: 0.19, duration: "9s" },
	sz:   { accent: "#9b6857", seal: "颂", align: "right", position: "86% 104%", size: "auto 85%", opacity: 0.19, duration: "10s" },
	jq:   { accent: "#656b78", seal: "秋", align: "left", position: "14% 103%", size: "auto 87%", opacity: 0.20, duration: "13s", scale: 1.012 },
	hc:   { accent: "#71857a", seal: "春", align: "right", position: "86% 104%", size: "auto 84%", opacity: 0.18, duration: "14s" },
}

function characterRgba(hex, alpha) {
	var value = hex.replace("#", "")
	var red = parseInt(value.slice(0, 2), 16)
	var green = parseInt(value.slice(2, 4), 16)
	var blue = parseInt(value.slice(4, 6), 16)
	return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")"
}

function getCharacterBackgroundStyle(config) {
	var visual = CHARACTER_VISUALS[config.id]
	if (!visual) return {}

	var glowCenter = visual.align === "left" ? "18%" : "82%"
	return {
		"--character-content": '""',
		"--character-silhouette": 'url("../resources/characters/' + config.id + '.png")',
		"--character-figure-position": visual.position,
		"--character-figure-size": visual.size,
		"--character-opacity": String(visual.opacity),
		"--character-duration": visual.duration,
		"--character-seal-duration": String(parseFloat(visual.duration) * 1.35) + "s",
		"--character-drift-x": visual.align === "left" ? "9px" : "-9px",
		"--character-scale": String(visual.scale || 1.016),
		"--character-accent": visual.accent,
		"--character-accent-soft": characterRgba(visual.accent, 0.16),
		"--character-accent-faint": characterRgba(visual.accent, 0.055),
		"--character-seal": '"' + visual.seal + '"',
		"--character-seal-x": visual.align === "left" ? "80%" : "20%",
		background: "radial-gradient(ellipse at " + glowCenter + " 58%, " + characterRgba(visual.accent, 0.15) + " 0%, " + characterRgba(visual.accent, 0.045) + " 34%, transparent 68%), linear-gradient(155deg, " + characterRgba(visual.accent, 0.045) + " 0%, transparent 48%)",
	}
}
