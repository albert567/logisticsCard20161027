var factories = [];
var index = 1;
var factoryCount = 2;
summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});

	//报价工厂数
	if (localStorage.getItem("factoryCount") != null) {
		factoryCount = localStorage.getItem("factoryCount");
	}
	//工厂信息数组
	/*if (localStorage.getItem("factories") != null) {
		factories = JSON.parse(localStorage.getItem("factories"));
		arrToValue();
	}*/
	updateH3();
}
/**
 * 更新标题
 */
function updateH3() {
	$summer.byId("hh").innerHTML = index + "/" + factoryCount + "工厂信息维护";
}

/**
 * 数组元素赋值给页面
 */
function arrToValue() {
	var factory = factories[index - 1];
	//工厂名称
	$summer.byId("factoryName").value = factory.fac_name;
	//大宗物资进出厂门数
	$summer.byId("itemInOut").value = factory.item_inout;
	//计量衡器数量
	$summer.byId("weightCount").value = factory.wei_count;
	//开单员/班
	$summer.byId("ticketCount").value = factory.tic_count;
	//计量员/班
	$summer.byId("meterCount").value = factory.met_count;
	//是否无人值守计量
	$summer.byId("isNoduty").checked = factory.is_noduty;
	//计量室/班
	$summer.byId("noDutyMonitors").value = factory.nod_monitors;
	//收料员/班
	$summer.byId("material").value = factory.person_count;
	//质检员/班
	$summer.byId("quality").value = factory.qua_per_count;
	//IC卡数量
	$summer.byId("icCount").value = factory.ic_count;
	//质检卡数量
	$summer.byId("qIcCount").value = factory.qua_ic_count;
}

function alertInfo(str) {
	UM.alert({
		title : str,
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
		}
	});
}

/**
 * 页面赋值给数组元素
 */
function valueToArray() {
	var baseId = localStorage.getItem("baseinfoid");
	var factory = {};
	//工厂名称
	var factoryName = $summer.byId("factoryName").value;
	if(factoryName.value == ""){
		alertInfo("工厂名称不能为空！");
		return false;
	}
	//大宗物资进出厂门数
	var itemInOut = $summer.byId("itemInOut").value;
	if(itemInOut == ""){
		alertInfo("门数不能为空！");
		return false;
	}
	//计量衡器数量
	var weightCount = $summer.byId("weightCount").value;
	if(weightCount == ""){
		alertInfo("计量衡器数量不能为空！");
		return false;
	}
	//开单员/班
	var ticketCount = $summer.byId("ticketCount").value;
	if(ticketCount == ""){
		alertInfo("开单员/班不能为空！");
		return false;
	}
	//计量员/班
	var meterCount = $summer.byId("meterCount").value;
	if(meterCount == ""){
		alertInfo("计量员/班不能为空！");
		return false;
	}
	//是否无人值守计量
	var isNoduty = $summer.byId("isNoduty").checked;
	//计量室/班
	var noDutyMonitors = $summer.byId("noDutyMonitors").value;
	if(isNoduty&&noDutyMonitors == ""){
		alertInfo("无人值守监控员/班不能为空！");
		return false;
	}
	//收料员/班
	var material = $summer.byId("material").value;
	if(material == ""){
		alertInfo("收料员/班不能为空！");
		return false;
	}
	//质检员/班
	var quality = $summer.byId("quality").value;
	if(quality == ""){
		alertInfo("质检员/班不能为空！");
		return false;
	}
	//IC卡数量
	var icCount = $summer.byId("icCount").value;
	if(icCount == ""){
		alertInfo("IC卡数量不能为空！");
		return false;
	}
	//质检卡数量
	var qIcCount = $summer.byId("qIcCount").value;
	if(qIcCount == ""){
		alertInfo("质检卡数量不能为空！");
		return false;
	}
	if (index < factories.length) {
		factory = factories[index - 1];
		factory.fac_name = factoryName;
		factory.item_inout = itemInOut;
		factory.wei_count = weightCount;
		factory.tic_count = ticketCount;
		factory.met_count = meterCount;
		factory.is_noduty = isNoduty;
		factory.nod_monitors = noDutyMonitors;
		factory.person_count = material;
		factory.qua_per_count = quality;
		factory.ic_count = icCount;
		factory.qua_ic_count = qIcCount;
		//更新数据到数据库
		summer.post("http://123.103.9.211:8080/factory/update", {
			fac_name : factoryName,
			item_inout : itemInOut,
			wei_count : weightCount,
			tic_count : ticketCount,
			met_count : meterCount,
			is_noduty : isNoduty,
			nod_monitors : noDutyMonitors,
			person_count : material,
			qua_per_count : quality,
			ic_count : icCount,
			qua_ic_count : qIcCount,
			base_id : baseId,
			fa_index : index,
			id : factory.id
		},{}, function(response) {
			if (response.data == "false") {
				UM.alert({
					title : '数据保存失败',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {

					}
				});
			} else {
				operation();
			}
		}, function(response) {
			UM.alert({
				title : '访问网络失败，请稍后再试...',
				btnText : ["取消", "确定"],
				overlay : true,
				ok : function() {

				}
			});
		});
	} else {
		factory.fac_name = factoryName;
		factory.item_inout = itemInOut;
		factory.wei_count = weightCount;
		factory.tic_count = ticketCount;
		factory.met_count = meterCount;
		factory.is_noduty = isNoduty;
		factory.nod_monitors = noDutyMonitors;
		factory.person_count = material;
		factory.qua_per_count = quality;
		factory.ic_count = icCount;
		factory.qua_ic_count = qIcCount;
		factory.base_id = baseId;
		summer.post("http://123.103.9.211:8080/factory/save", {
			fac_name : factoryName,
			item_inout : itemInOut,
			wei_count : weightCount,
			tic_count : ticketCount,
			met_count : meterCount,
			is_noduty : isNoduty,
			nod_monitors : noDutyMonitors,
			person_count : material,
			qua_per_count : quality,
			ic_count : icCount,
			qua_ic_count : qIcCount,
			base_id : baseId,
			fa_index : index
		},{}, function(response) {
			if (response.data == -1) {
				UM.alert({
					title : '数据保存失败',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {

					}
				});
			} else {
				factory.id = response.data;
				factories.push(factory);
				operation();
			}
		}, function(response) {
			UM.alert({
				title : '访问网络失败，请稍后再试...',
				btnText : ["取消", "确定"],
				overlay : true,
				ok : function() {

				}
			});
		});
	}
}

/**
 * 上一步
 */
function pre() {
	index--;
	if (index < 1) {
		summer.closeWin();
	} else {
		updateH3();
		arrToValue();
	}
}

/**
 * 下一步
 */
function next() {
	valueToArray();
}

function operation() {
	index++;
	if (index <= factoryCount) {
		updateH3();
		if (index <= factories.length) {
			arrToValue();
		} else {
			$summer.byId("isNoduty").checked = true;
		}
	} else {
		index--;
		localStorage.setItem("factories", JSON.stringify(factories));
		summer.openWin({
			id : 'subMenu',
			url : 'html/subMenu.html'
		});
	}
}

