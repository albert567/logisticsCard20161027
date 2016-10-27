var checkboxs = [];
var factoryCount = 2;
var index = 1;
var allQuas = [];
var factory;
summerready = function() {
	index = summer.pageParam.index;
	factoryCount = summer.pageParam.factoryCount;
	checkboxs = $(".um-check-group").find("input:checkbox");
	updateH3();
	if (localStorage.getItem("qualityHardware")!=null) {
		allQuas = JSON.parse(localStorage.getItem("qualityHardware"));
		if (index <= allQuas.length) {
			var obj = allQuas[index - 1];
			$.each(checkboxs, function() {
				if (obj.indexOf($(this).val()) != -1) {
					this.checked = true;
				}
			});
		}
	}

}
/**
 * 更新标题
 */
function updateH3() {
	$summer.byId("hh").innerHTML = index + "/" + factoryCount + "工厂硬件选择";
}
/**
 * 保存页面信息 
 */
function saveInfo() {
	var arr = [];
	$.each(checkboxs, function() {
		if (this.checked) {
			arr.push($(this).val());
		}
	});
	if (index <= allQuas.length) {
		allQuas[index - 1] = arr.toString();
	} else {
		allQuas.push(arr.toString());
	}
	localStorage.setItem("qualityHardware", JSON.stringify(allQuas));
}

/**
 * 上一步
 */
function pre() {
	summer.openWin({
		id : 'monitorHardware',
		url : 'html/monitorHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
	//summer.closeWin("qualityHardware");
}

/**
 * 下一步
 */
function next() {
	saveInfo();
	summer.openWin({
		id : 'materialHardware',
		url : 'html/materialHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
	//summer.closeWin("qualityHardware");
}