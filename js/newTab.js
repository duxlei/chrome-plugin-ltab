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
			if (val && val.trim() && siteMap[val.trim()]) {
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
		$("#search").focus()
	}
});

// 查询保存栏数据
http.GET("/collect/list", {}, (resp) => {
    if (resp.code == 100 && resp.data && resp.data.length > 0) {
        resp.data.forEach(e => {
            if (e.folder) {
                // $("#collectList > tbody").append("<tr><td style='cursor:pointer;'><i class='layui-icon layui-icon-right'></i> "+e.name+"</td></tr>")
                $(".tree > ul").append("<li node-id="+e.id+"><a href='#'>"+e.name+"</a><span>=</span></li>")
            } else {
                // $("#collectList > tbody").append("<tr><td><a href='"+e.url+"'>"+e.name+"</a></td></tr>")
                $(".tree > ul").append("<li node-id="+e.id+" title='"+e.name+"'><a href='"+e.url+"'>"+e.name+"</a><span>=</span></li>")
            }
        })
        drag()
    }
})


// ===================== 树组件拖动处理 =====================
var dragFlag = false
var dragEl = null
var offset = {x: 0, y: 0}
var divLeft = 285
var divTop = 20
var sourceId = null
var targetId = null
$(".tree").mousemove((f) => {
    //移动鼠标时改变元素位置
    if (dragFlag && dragEl) {
        fresh()
        updatePosition(f)
    }
    f.stopPropagation()
})

/** 元素拖动位置刷新 */
function fresh() {
    if (!dragEl) {
        return
    }
    dragEl.css({
        left: offset.x + 'px',
        top: offset.y  + 'px'
    })
    // 位置变动
    var ls = $(".tree > ul > li").not(".drag-li").not(".dragging")
    if (ls.length == 0) {
        return
    }
    sourceId = $(".dragging").attr("node-id")
    for(var i = 0; i < ls.length; i++) {
        const element = ls[i]
        if ($(".dragging").offset().top < $(element).offset().top) {
            $(".drag-li").remove()
            $(element).before("<li class='drag-li'></li>")
            targetId = $(element).attr("node-id")
            return
        }
    }
    // 判断拖动到最后
    if ($(".dragging").offset().top > $(ls[ls.length-1]).offset().top) {
        $(".drag-li").remove()
        $(ls[ls.length-1]).after("<li class='drag-li'></li>")
        targetId = $(ls[ls.length-1]).attr("node-id")
    }
}
function updatePosition(f) {
    var treeOffset = $(".tree").offset()
    offset.x = f.clientX - treeOffset.left - divLeft
    offset.y = f.clientY - treeOffset.top - divTop
    console.log(f.clientX + "," + treeOffset.left)
    // console.log(offset)
}
/** 元素拖动结束事件以及样式移除 */
function reset() {
    if (dragEl) {
        dragEl.removeClass("dragging")
        dragEl.removeAttr("style")
        // 克隆被拖动元素
        var dragElClone = dragEl.clone()
        // 为克隆元素绑定事件
        dragElClone.children("span").mousedown(spanMouseDown)
        $(".drag-li").after(dragElClone)
        dragEl.remove()
    }
    $(".drag-li").remove()
    $(".tree").removeClass("no-select")
    if (sourceId != null && targetId != null) {
        http.GET("/collect/sort-num", {sourceId: sourceId, targetId: targetId})
    }
    dragFlag = false
    dragEl = null
    sourceId = null
    targetId = null
}
/** 元素拖动事件绑定及处理 */
function drag() {
    $(".tree > ul > li > span").unbind()
    $(".tree > ul > li > span").mousedown(spanMouseDown)
    // 复位
    $(".tree > ul").mouseup(reset)
    $(".tree > ul > li").mouseup(reset)
    $(".tree > ul > li > span").mouseup(reset)

    $(".tree > ul > li").oncontextmenu({
        width: 110, // width
        itemHeight: 30, // 菜单项height
        bgColor: "#333", // 背景颜色
        color: "#fff", // 字体颜色
        fontSize: 12, // 字体大小
        hoverColor: "#fff", // hover字体颜色
        hoverBgColor: "#99CC66", // hover背景颜色
        target: function(ele) { // 当前元素--jq对象
            console.log(ele);
        },
        menu: [{ // 菜单项
                text: "新增",
                icon: "img/1.png",
                callback: function() {
                    alert("新增");
                }
            },
            {
                text: "复制",
                icon: "img/2.png",
                callback: function() {
                    alert("复制");
                }
            },
            {
                text: "粘贴",
                icon: "img/3.png",
                callback: function() {
                    alert("粘贴");
                }
            },
            {
                text: "删除",
                icon: "img/4.png",
                callback: function() {
                    alert("删除");
                }
            }
        ]
    })
}
function spanMouseDown(e){
    var el = $(e.target).parent()[0]
    $(el).addClass('dragging')
    if (el && 'LI' == el.tagName.toLocaleUpperCase()) {
        if ($(".tree > ul > li.drag-li").length == 0) {
            updatePosition(e)
            $(".tree").addClass('no-select')
            $(e.target).parent().after("<li class='drag-li'></li>")
            dragFlag = true
            dragEl = $(el)
            fresh() // 刷新一次防止跳动
        }
    }
    // 阻止事件冒泡
    e.stopPropagation()
}
// ===================== 树组件拖动结束 =====================