var itemInOut = 2;
var doorCount = 1;
var doors = [];
var checkboxs = [];
var index = 1;
var factoryCount = 2;
var allDoors = [];

summerready = function() {
	index = summer.pageParam.index;
	factoryCount = summer.pageParam.factoryCount;
	checkboxs = $(".um-check-group").find("input:checkbox");
	//工厂信息数组
	if (localStorage.getItem("factories")!=null) {
		var factories = JSON.parse(localStorage.getItem("factories"));
		//门岗
		itemInOut = factories[index - 1].item_inout;
	}
	updateH3();
	updateLb();
	
	//获取门岗信息
	if (localStorage.getItem("doorHardware")!=null) {
		allDoors = JSON.parse(localStorage.getItem("doorHardware"));
		if (index <= allDoors.length) {
			doors = allDoors[index - 1];
		}
	}
	if (doors.length > 0) {
		$.each(checkboxs, function() {
			if (doors[0].indexOf($(this).val()) != -1) {
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
	$summer.byId("lb_door").innerHTML = "岗位：" + itemInOut + "-" + doorCount + "门岗";
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
	//门岗n 小于等于 门岗数组长度，即修改已有值
	if (doorCount <= doors.length) {
		doors[doorCount - 1] = arr.toString();
	} else {
		//门岗数组新增值
		doors.push(arr.toString());
	}
}

/**
 * 上一步
 */
function pre() {
	//saveInfo();
	doorCount--;
	if (doorCount < 1) {
		summer.openWin({
			id : 'ticket',
			url : 'html/ticket.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
		//summer.closeWin("doorHardware");
	} else {
		updateLb();
		var hardware = doors[doorCount - 1];
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
	doorCount++;
	//n门岗小于等于门数
	if (doorCount <= itemInOut) {
		updateLb();
		if (doorCount <= doors.length) {
			$.each(checkboxs, function() {
				if (doors[doorCount - 1].indexOf($(this).val()) != -1) {
					this.checked = true;
				} else {
					this.checked = false;
				}
			});
		} else {
			$summer.byId("ck_a").checked = true;
			$summer.byId("ck_b").checked = true;
			$summer.byId("ck_c").checked = false;
			$summer.byId("ck_d").checked = false;
		}
	} else {
		doorCount--;
		allDoors[index - 1] = doors;
		localStorage.setItem("doorHardware", JSON.stringify(allDoors));
		summer.openWin({
			id : 'weightHardware',
			url : 'html/weightHardware.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
		//summer.closeWin("doorHardware");
	}
}