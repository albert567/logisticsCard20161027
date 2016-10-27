summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});
}

function downloadCallback(args) {
	if (args.isfinish) {
		var path = args.savePath;
		path = path.substring(0, path.lastIndexOf('/') + 1);
		summer.UMFile.open({
			"filename" : "1.xlsx", //文件全路径
			"filetype" : "xlsx", //支持手机能打开的格式*.txt,*.doc,*.pdf等
			"filepath" : path
		});
	}
}

/**
 * 报价转发
 */
function priceForward(){
	var url;
	var plan = localStorage.getItem("plan");
	if(plan.indexOf("D")!=-1){
		url = "http://123.103.9.211:8080/baseinfo/updateExcel?id="+localStorage.getItem("baseinfoid");
	}else{
		url = "http://123.103.9.211:8080/baseinfo/updateExcelA?id="+localStorage.getItem("baseinfoid");
	}
	 //下载代码
	summer.UMFile.download({
		"url" : url, //下载文件的url
		"locate" : "download", //下载后文件存放的路径
		"filename" : "1.xlsx", //下载后重命名的文件名
		"override" : true, //下载后是否覆盖同名文件
		"callback" : "downloadCallback()"
	});
}

/**
 * 上一步
 */
function pre() {
	summer.closeWin();
}

/**
 * 返回
 */
function back() {
	var email = localStorage.getItem("myemail");
	localStorage.clear();
	localStorage.setItem("myemail",email);
	summer.openWin({
		id : 'menu',
		url : 'html/menu.html',
		isKeep : 'false'
	});
}
