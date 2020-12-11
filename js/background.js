
// 创建右键菜单
console.log("创建右键菜单")
chrome.contextMenus.create({
	title: "收藏此页面",
	onclick: (info, tab) => {
		http.GET("/collect", {url: tab.url, title: tab.title}, (data) => {
			if (data && data.code == 100) {
				alert("收藏成功")
			} else {
				alert("【!】收藏失败")
			}
		})
	}
})