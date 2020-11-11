
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.greeting == "ltab-search") {
		window.location.href = request.data
	}
})
