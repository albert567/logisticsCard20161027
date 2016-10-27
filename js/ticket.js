var checkboxs = [];
var index = 1;
var factoryCount = 2;
var ticketHardware = [];

summerready = function() {
	checkboxs = $(".um-check-group").find("input:checkbox");
	if(summer.pageParam.index!=null){
		index = summer.pageParam.index;
	}

	if (localStorage.getItem("ticketHardware")!=null) {
		ticketHardware = JSON.parse(localStorage.getItem("ticketHardware"));
		if (index <= ticketHardware.length) {
			$.each(checkboxs, function() {
				if (ticketHardware[index - 1].indexOf($(this).val()) != -1) {
					this.checked = true;
				}else{
					this.checked = false;
				}
			});
		}
	}

	//报价工厂数
	if (localStorage.getItem("factoryCount")!=null) {
		factoryCount = localStorage.getItem("factoryCount");
	}

	updateH3();
}
/**
 * 更新标题
 */
function updateH3() {
	$summer.byId("hh").innerHTML = index + "/" + factoryCount + "工厂信息维护";
}
/**
 * 保存页面信息 
 */
function saveInfo() {
	var arr = [];
	$.each(checkboxs, function() {
		if (this.checked)
			arr.push($(this).val());
	})
	if (index <= ticketHardware.length) {
		ticketHardware[index - 1] = arr.toString();
	} else {
		ticketHardware.push(arr.toString());
	}
	localStorage.setItem("ticketHardware", JSON.stringify(ticketHardware));

}

/**
 * 上一步
 */
function pre() {
	//saveInfo();
	if (index > 1) {
		--index;
		summer.openWin({
			id : 'subFinish',
			url : 'html/subFinish.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
	}else{
		summer.openWin({
			id : 'subMenu',
			url : 'html/subMenu.html',
			isKeep : 'false'
		});
	}
}

/**
 * 下一步
 */
function next() {
	saveInfo();
	summer.openWin({
		id : 'doorHardware',
		url : 'html/doorHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
	//summer.closeWin("ticket");
}