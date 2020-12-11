$("#search").focus()
var siteMap = {
	"bl": "https://www.bilibili.com/",
	"jj": "https://juejin.im/",
	"yk": "https://www.youku.com",
	"yt": "https://www.youtube.com"
}
function sendMessage(val) {
	// console.log(chrome.tabs)
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs)
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "ltab-search", data: val}, function(response) {
			console.log(response)
		})
	})
}

$(document).keydown(function(event) {
	if(event.keyCode == 13 && document.activeElement.id == 'search') {
		if (event.altKey) {
			// alt + enter
			var val = $("#search").val()
			if (val && val.trim()) {
				sendMessage(siteMap[val.trim()])
			}
		} else {
			// enter
			var val = $("#search").val()
			console.log(val)
			if (val && val.trim()) {
				sendMessage(encodeURI("https://www.baidu.com/s?wd=" + val.trim()))
			}
		}
	}
})