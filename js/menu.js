summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});
}
/**
 * 报价
 */
function price() {
	var email = localStorage.getItem("myemail");
	localStorage.clear();
	localStorage.setItem("myemail", email);
	summer.openWin({
		id : 'subMenu',
		url : 'html/subMenu.html'
	});
}

/**
 * 历史
 */
function history() {
	summer.openWin({
		id : 'history',
		url : 'html/history.html'
	});
}

/**
 * 帮助
 */
function help() {
	summer.openWin({
		id : 'help',
		url : 'html/help.html'
	});
}

/**
 * 退出
 */
function logout() {
	localStorage.clear();
	summer.closeWin({
		id : 'menu'
	});
	/*summer.openWin({
		id : 'main',
		url : 'index.html',
	});*/
}

