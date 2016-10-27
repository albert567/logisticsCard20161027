summerready = function() {
	$('.um-back').click(function() {
		summer.closeWin();
	});
	//行业选择
	if (localStorage.getItem("industry") != null) {
		$summer.byId("industry").value = localStorage.getItem("industry");
	}
	//公司名称
	if (localStorage.getItem("company") != null) {
		$summer.byId("company").value = localStorage.getItem("company");
	}
	//销售分公司
	if (localStorage.getItem("saleCompany") != null) {
		$summer.byId("saleCompany").value = localStorage.getItem("saleCompany");
	}
	//销售顾问
	if (localStorage.getItem("saleAdviser") != null) {
		$summer.byId("saleAdviser").value = localStorage.getItem("saleAdviser");
	}
	//软件折扣
	if (localStorage.getItem("softDiscount") != null) {
		$summer.byId("softDiscount").value = localStorage.getItem("softDiscount");
	}
	//报价工厂数
	if (localStorage.getItem("factoryCount") != null) {
		$summer.byId("factoryCount").value = localStorage.getItem("factoryCount");
	}
	//是否按工厂购买自由报表
	if (localStorage.getItem("isBuyReport") != null) {
		$summer.byId("isBuyReport").checked = localStorage.getItem("isBuyReport") == "true" ? true : false;
	} else {
		$summer.byId("isBuyReport").checked = true;
	}
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
 * 保存信息
 */
function saveInfo() {
	//行业选择
	var industry = $summer.byId("industry").value;
	if(industry == ""){
		alertInfo("行业不能为空！");
		return false;
	}
	//公司名称
	var company = $summer.byId("company").value;
	if(company == ""){
		alertInfo("公司名称不能为空！");
		return false;
	}
	//销售分公司
	var saleCompany = $summer.byId("saleCompany").value;
	if(saleCompany == ""){
		alertInfo("销售分公司不能为空！");
		return false;
	}
	//销售顾问
	var saleAdviser = $summer.byId("saleAdviser").value;
	if(saleAdviser == ""){
		alertInfo("销售顾问不能为空！");
		return false;
	}
	//软件折扣
	var softDiscount = $summer.byId("softDiscount").value;
	if(softDiscount == ""){
		alertInfo("软件折扣不能为空！");
		return false;
	}
	//报价工厂数
	var factoryCount = $summer.byId("factoryCount").value;
	if(factoryCount == ""){
		alertInfo("报价工厂数不能为空！");
		return false;
	}
	//是否按工厂购买自由报表
	var isBuyReport = $summer.byId("isBuyReport").checked;
	localStorage.setItem("industry", industry);
	localStorage.setItem("company", company);
	localStorage.setItem("saleCompany", saleCompany);
	localStorage.setItem("saleAdviser", saleAdviser);
	localStorage.setItem("softDiscount", softDiscount);
	localStorage.setItem("factoryCount", factoryCount);
	localStorage.setItem("isBuyReport", isBuyReport);
	if (localStorage.getItem("baseinfoid") != null) {
		//更新数据到数据库
		summer.post("http://123.103.9.211:8080/baseinfo/update", {
			id : localStorage.getItem("baseinfoid"),
			industry : industry,
			company : company,
			sale_company : saleCompany,
			sale_adviser : saleAdviser,
			soft_discount : softDiscount,
			factory_count : factoryCount,
			is_buy_report : isBuyReport
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
					id : 'noduty',
					url : 'html/noduty.html',
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
	} else {
		//保存数据到数据库
		summer.post("http://123.103.9.211:8080/baseinfo/save", {
			email : localStorage.getItem("myemail"),
			industry : industry,
			company : company,
			sale_company : saleCompany,
			sale_adviser : saleAdviser,
			soft_discount : softDiscount,
			factory_count : factoryCount,
			is_buy_report : isBuyReport
		}, {}, function(response) {
			if (response.data != -1) {
				localStorage.setItem("baseinfoid", response.data);
				summer.openWin({
					id : 'noduty',
					url : 'html/noduty.html'
				});
			} else {
				UM.alert({
					title : '数据保存失败',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {

					}
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

}

/**
 * 上一步
 */
function pre() {
	summer.closeWin();
}

/**
 * 下一步
 */
function next() {
	saveInfo();
}

