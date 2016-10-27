var weightCount = 2;
var weightIndex = 1;
//单个工厂的计量衡器硬件
var weights = [];
var checkboxs = [];
var factoryCount = 2;
var index = 1;
//n个工厂的计量衡器硬件
var allWeights = [];
var factory;
summerready = function() {
	index = summer.pageParam.index;
	factoryCount = summer.pageParam.factoryCount;
	checkboxs = $(".um-check-group").find("input:checkbox");

	//工厂信息数组
	if (localStorage.getItem("factories")!=null) {
		var factories = JSON.parse(localStorage.getItem("factories"));
		factory = factories[index - 1];
		//计量衡器
		weightCount = factory.wei_count;
	}

	updateH3();
	updateLb();
	//获取计量衡器信息
	if (localStorage.getItem("weightHardware")!=null) {
		allWeights = JSON.parse(localStorage.getItem("weightHardware"));
		if (index <= allWeights.length) {
			weights = allWeights[index - 1];
		}
	}
	if (weights.length > 0) {
		$.each(checkboxs, function() {
			if (weights[0].indexOf($(this).val()) != -1) {
				this.checked = true;
			}
		});
	}
}
/**
 * 更新标题
 */
function updateH3() {
	$summer.byId("hh").innerHTML = index + "/" + factoryCount + "工厂硬件选择";
}

/**
 * 更新岗位
 */
function updateLb() {
	$summer.byId("lb_weight").innerHTML = "岗位：" + weightCount + "-" + weightIndex + "计量衡器";
}

/**
 * 保存信息
 */
function saveInfo() {
	var arr = [];
	//将选项放入数组arr中
	$.each(checkboxs, function() {
		if (this.checked) {
			arr.push($(this).val());
		}
	});
	//计量衡器n 小于等于 计量衡器数组长度，即修改已有值
	if (weightIndex <= weights.length) {
		weights[weightIndex - 1] = arr.toString();
	} else {
		//计量衡器数组新增值
		weights.push(arr.toString());
	}
}

/**
 * 上一步
 */
function pre() {
	saveInfo();
	weightIndex--;
	if (weightIndex < 1) {
		summer.openWin({
			id : 'doorHardware',
			url : 'html/doorHardware.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
		//summer.closeWin("weightHardware");
	} else {
		updateLb();
		var hardware = weights[weightIndex - 1];
		$.each(checkboxs, function() {
			if (hardware.indexOf($(this).val()) != -1) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	}
}

/**
 * 下一步
 */
function next() {
	saveInfo();
	weightIndex++;
	if (weightIndex <= weightCount) {
		updateLb();
		if (weightIndex <= weights.length) {
			$.each(checkboxs, function() {
				if (weights[weightIndex - 1].indexOf($(this).val()) != -1) {
					this.checked = true;
				} else {
					this.checked = false;
				}
			});
		} else {
			$.each(checkboxs, function() {
				this.checked = false;
			});
		}
	} else {
		weightIndex--;
		allWeights[index - 1] = weights;
		
		localStorage.setItem("weightHardware", JSON.stringify(allWeights));
		summer.openWin({
			id : 'monitorHardware',
			url : 'html/monitorHardware.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
		//summer.closeWin("weightHardware");
	}
}