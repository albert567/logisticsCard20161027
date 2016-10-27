summerready = function() {

	$('.um-back').click(function() {
		summer.closeWin();
	});

	var data = [{
		"img" : "../img/a1.png",
		"title" : "采购进厂业务（简单）",
		"brief" : "1、采购部门与供应商签订采购订单，并进行审批；2、磅房检查信息，并进行重车计量；3、在原料仓库卸车；"
				+ "4、空车过磅，打印计量单；5、计量单保存，自动生成采购到货单。"
	}, {
		"img" : "../img/a2.png",
		"title" : "销售出厂业务（简单）",
		"brief" : "1、销售部门进行销售订单维护，信用检查；2、磅房刷卡，信息检查，进行空车计量；3、刷卡、装货；"
				+ "4、刷卡，重车过磅，信用检查，打印计量单；5、计量单保存，自动生成销售出库单。"
	}];
	var ViewModel = function() {
	};
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(data);
	ko.applyBindings(viewModel);
	var slider = $("#slider").swipeContent({
		auto : 2500,
		continuous : true
	});
}
//上一步
function pre() {
	summer.closeWin();
}

//下一步
function next() {
	var id = localStorage.getItem("baseinfoid");
	var plan = localStorage.getItem("plan");
	summer.post("http://123.103.9.211:8080/baseinfo/updatePlan", {
		id : id,
		plan : plan
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

