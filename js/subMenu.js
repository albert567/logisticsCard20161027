summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});
}
function openInfo() {
	UM.alert({
		title : '请先进行基本信息维护',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			summer.openWin({
				id : 'industry',
				url : 'html/industry.html'
			});
		}
	});
}

/**
 * 基本信息维护
 */
function info() {
	summer.openWin({
		id : 'industry',
		url : 'html/industry.html'
	});
}

/**
 * A:地磅计量采集（低配）
 */
function simple() {
	localStorage.setItem("plan","A:地磅计量采集（低配）");
	if (localStorage.getItem("baseinfoid") != null) {
		summer.openWin({
			id : 'picDescription1',
			url : 'html/picDescription1.html'
		});
	} else {
		openInfo();
	}

}

/**
 * B:计量一卡通（中配）
 */
function common() {
	localStorage.setItem("plan","B:计量一卡通（中配）");
	if (localStorage.getItem("baseinfoid") != null) {
		summer.openWin({
			id : 'picDescription2',
			url : 'html/picDescription2.html'
		});
	} else {
		openInfo();
	}
}

/**
 * C:智能工厂（高配）
 */
function intel() {
	localStorage.setItem("plan","C:智能工厂（高配）");
	if (localStorage.getItem("baseinfoid") != null) {
		summer.openWin({
			id : 'picDescription3',
			url : 'html/picDescription3.html'
		});
	} else {
		openInfo();
	}
}

/**
 * D:自定义配置
 */
function custom() {
	localStorage.setItem("plan","D:自定义配置");
	if (localStorage.getItem("baseinfoid") != null) {
		summer.openWin({
			id : 'ticket',
			url : 'html/ticket.html'
		});
	} else {
		openInfo();
	}
}
