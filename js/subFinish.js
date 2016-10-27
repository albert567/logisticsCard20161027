var factoryCount = 2;
var index = 1;
var baseId = 1;

summerready = function() {
	index = summer.pageParam.index;
	baseId = localStorage.getItem("baseinfoid");
	factoryCount = summer.pageParam.factoryCount;
	updateH3();
}
/**
 * 更新标题
 */
function updateH3() {
	$summer.byId("hh").innerHTML = index + "/" + factoryCount + "工厂硬件选择";
}

/**
 * 报价预览
 */
function pricePreview() {
	summer.openWin({
		id : 'pricePreview',
		url : 'html/pricePreview.html',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
}

/**
 * 上一步
 */
function pre() {
	summer.openWin({
		id : 'materialHardware',
		url : 'html/materialHardware.html',
		isKeep : 'false',
		pageParam : {
			index : index,
			factoryCount : factoryCount
		}
	});
}

/**
 * 下一家维护
 */
function next() {
	if (index < factoryCount) {++index;
		summer.openWin({
			id : 'ticket',
			url : 'html/ticket.html',
			isKeep : 'false',
			pageParam : {
				index : index,
				factoryCount : factoryCount
			}
		});
	} else {
		UM.alert({
			title : '维护完成',
			btnText : ["取消", "确定"],
			overlay : true,
			ok : function() {
				//保存数据到数据库JSON.stringify(obj)
				summer.post("http://123.103.9.211:8080/factory/saveOther", {
					base_id : baseId,
					fa_index : index,
					tic_hardware : localStorage.getItem("ticketHardware"),
					mon_hardware : localStorage.getItem("monitorHardware"),
					qua_hardware : localStorage.getItem("qualityHardware"),
					mat_hardware : localStorage.getItem("materialHardware"),
					door_hardware : localStorage.getItem("doorHardware"),
					wei_hardware : localStorage.getItem("weightHardware")
				}, {}, function(response) {
					if (response.data == "false") {
						UM.alert({
							title : '数据保存失败',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {

							}
						});
					} else {
						summer.openWin({
							id : 'finish',
							url : 'html/finish.html'
						});
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
		});
	}
}
