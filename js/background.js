// chrome.runtime.onInstalled.addListener(function() {
// 	chrome.storage.sync.set({color: '#3aa757'}, function() {
// 	  console.log("The color is green.");
// 	});
// });
// document.elementFromPoint(1, 1).click()
// alert('点击')

var siteMap = {
	"bl": "https://www.bilibili.com/",
	"jj": "https://juejin.im/",
	"yk": "https://www.youku.com",
	"yt": "https://www.youtube.com"
}

$("#search").focus()
$(document).keydown(function(event) {
	if(event.keyCode == 13 && document.activeElement.id == 'search') {
		if (event.altKey) {
			// alt + enter
			var val = $("#search").val()
			if (val && val.trim()) {
				window.location.href = siteMap[val.trim()];
			}
		} else {
			// enter
			var val = $("#search").val()
			if (val && val.trim()) {
				window.location.href = encodeURI("https://www.baidu.com/s?wd=" + val.trim());
			}
		}
	} else if(event.keyCode == 32 && document.activeElement.id != 'search') {
		// alert()
		// document.activeElement.id = 'search'
		$("#search").focus()
	}
});