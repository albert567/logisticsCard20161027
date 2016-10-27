var checkboxs = [];
var factoryCount = 2;
var index = 1;
var allMonitors = [];
var factory;
summerready = function() {
	index = summer.pageParam.index;
	factoryCount = summer.pageParam.factoryCount;
	checkboxs = $(".um-check-group").find("input:checkbox");
	updateH3();
	if (localStorage.getItem("monitorHardware")!=null) {
		allMonitors = JSON.parse(localStorage.getItem("monitorHardware"));
		if (index <= allMonitors.length) {
			if (!!(allMonitors[index - 1])) {
				$summer.byId("ck_a").checked = true;
			} else {
				$summer.byId("ck_a").checked = false;
			}
		} else {
			$summer.byId("ck_a").checked = true;
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
 * 保存信息
 */
function saveInfo() {
	var arr = [];
	$.each(checkboxs, function() {
		if (this.checked) {
			arr.push($(this).val());
		}
	});

	//监控室n 小于等于 监控室数组长度，即修改已有值
	if (index <= allMonitors.length) {
		allMonitors[index - 1] = arr.toString();
	} else {
		//监控室数组新增值
		allMonitors.push(arr.toString());
	}
	localStorage.setItem("monitorHardware", JSON.stringify(allMonitors));
}

/**
 * 上一步
 */
function pre() {
	summer.openWin({
		id : 'weightHardware',
		url : 'html/weightHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
	//summer.closeWin("monitorHardware");
}

/**
 * 下一步
 */
function next() {
	saveInfo();
	summer.openWin({
		id : 'qualityHardware',
		url : 'html/qualityHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
	//summer.closeWin("monitorHardware");
}