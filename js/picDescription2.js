summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});
	var data = [{
		"img" : "../img/b1.png",
		"title" : "采购进厂业务（一般）",
		"brief" : "1、采购部门与供应商签订采购订单，并进行审批；2、登记室参照采购订单制作送货通知单，维护车号、发放IC卡；"
				+ "3、门岗自助刷卡，抬杆进厂；4、磅房刷卡，信息检查，重车计量；5、刷卡，卸车；6.1、刷卡，信息检查，空车计量，打印计量单；"
				+ "6.2、计量单保存，自动生成采购到货单；7、出厂确认，收取门岗联，刷卡抬杆放行。"
	}, {
		"img" : "../img/b2.png",
		"title" : "销售出厂业务（一般）",
		"brief" : "1、销售部门销售订单维护，信用检查；2、登记室发放IC卡；3、门岗自助刷卡，校验进厂；"
				+ "4、磅房刷卡，信息检查，进行空车计量；5、刷卡，装货；6.1、磅房刷卡，重车过磅，"
				+ "信用检查，打印计量单；6.2、计量当保存，自动生成销售出库单；7、门岗交卡确认，出厂"
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

