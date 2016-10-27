summerready = function() {
	var index = summer.pageParam.index;
	summer.get("http://123.103.9.211:8080/baseinfo/getUnitPrice", {}, {}, function(response) {
		var obj = JSON.parse(response.data);
		//软件折扣
		var softDiscount = localStorage.getItem("softDiscount");
		$summer.byId("softDiscount").innerHTML = softDiscount;
		//工厂信息
		var factories = JSON.parse(localStorage.getItem("factories"));
		var factory = factories[index - 1];
		var dataChanged_price,
		    dynamicModel_price,
		    report_price,
		    baseData_price,
		    leWeiCount_price,
		    leNoWeiCount_price,
		    softTotal,
		    softTotals;
		//数据交换平台
		$summer.byId("dataChanged_unit").innerHTML = obj.DATA_CHANGED;
		$summer.byId("dataChanged_count").innerHTML = 1;
		dataChanged_price = 1 * obj.DATA_CHANGED;
		$summer.byId("dataChanged_price").innerHTML = dataChanged_price.toFixed(2);
		//动态建模平台
		$summer.byId("dynamicModel_unit").innerHTML = obj.DYNAMIC_MODEL;
		$summer.byId("dynamicModel_count").innerHTML = 1;
		dynamicModel_price = 1 * obj.DYNAMIC_MODEL;
		$summer.byId("dynamicModel_price").innerHTML = dynamicModel_price.toFixed(2);
		//自由报表
		$summer.byId("report_unit").innerHTML = obj.REPORT;
		$summer.byId("report_count").innerHTML = 1;
		report_price = 1 * obj.REPORT
		$summer.byId("report_price").innerHTML = report_price.toFixed(2);
		//计量基础数据
		$summer.byId("baseData_unit").innerHTML = obj.BASE_DATA;
		$summer.byId("baseData_count").innerHTML = 1;
		baseData_price = 1 * obj.BASE_DATA;
		$summer.byId("baseData_price").innerHTML = baseData_price.toFixed(2);
		//计量衡器数
		$summer.byId("leWeiCount_unit").innerHTML = obj.LE_WEI_COUNT;
		$summer.byId("leWeiCount_count").innerHTML = factory.wei_count;
		leWeiCount_price = factory.wei_count * obj.LE_WEI_COUNT;
		$summer.byId("leWeiCount_price").innerHTML = leWeiCount_price.toFixed(2);
		//无人值守衡器数
		$summer.byId("leNoWeiCount_unit").innerHTML = obj.LE_NO_WEI_COUNT;
		$summer.byId("leNoWeiCount_count").innerHTML = factory.nod_monitors;
		leNoWeiCount_price = factory.nod_monitors * obj.LE_NO_WEI_COUNT;
		$summer.byId("leNoWeiCount_price").innerHTML = leNoWeiCount_price.toFixed(2);
		//软件小计
		softTotal = dataChanged_price + dynamicModel_price + report_price + baseData_price + leWeiCount_price + leNoWeiCount_price;
		$summer.byId("softTotal").innerHTML = softTotal.toFixed(2);
		//软件折扣后合计
		softTotals = softTotal * softDiscount;
		$summer.byId("softTotals").innerHTML = softTotals.toFixed(2);

		var hardwareTotal = 0.0;
		//开单室-计量IC卡
		var ticketHardwares = JSON.parse(localStorage.getItem("ticketHardware"));
		var ticket = ticketHardwares[index - 1];
		if (ticket != null) {
			if (ticket.indexOf("A") != -1) {
				//开单室-计量IC卡
				$summer.byId("ticketA_unit").innerHTML = obj.TICKETA;
				$summer.byId("ticketA_count").innerHTML = 400;
				$summer.byId("ticketA_price").innerHTML = (400 * obj.TICKETA).toFixed(2);
				hardwareTotal += 400 * obj.TICKETA;
			}
			if (ticket.indexOf("B") != -1) {
				//开单室-自助发卡机
				$summer.byId("ticketB_unit").innerHTML = obj.TICKETB;
				$summer.byId("ticketB_count").innerHTML = factory.tic_count;
				$summer.byId("ticketB_price").innerHTML = (factory.tic_count * obj.TICKETB).toFixed(2);
				hardwareTotal += factory.tic_count * obj.TICKETB;
			}
			if (ticket.indexOf("C:") != -1) {
				//开单室-IC卡读写器
				$summer.byId("ticketC_unit").innerHTML = obj.TICKETC;
				$summer.byId("ticketC_count").innerHTML = factory.item_inout;
				$summer.byId("ticketC_price").innerHTML = (factory.item_inout * obj.TICKETC).toFixed(2);
				hardwareTotal += factories[index - 1].item_inout * obj.TICKETC;
			}
		}
		//门岗
		var allDoors = JSON.parse(localStorage.getItem("doorHardware"));
		var doors = allDoors[index - 1];
		var doorA = 0;
		var doorB = 0;
		var doorC = 0;
		var doorD = 0;
		var doorE = 0;
		
		for (var i = 0; i < doors.length; i++) {
			if (doors[i] != null) {
				if (doors[i].indexOf("A") != -1) {
					doorA++;
				}
				if (doors[i].indexOf("B") != -1) {
					doorB++;
				}
				if (doors[i].indexOf("C:") != -1) {
					doorC++;
				}
				if (doors[i].indexOf("D") != -1) {
					doorD++;
				}
				if (doors[i].indexOf("E") != -1) {
					doorE++;
				}
			}
		}
		//门岗-A:IC卡读写器
		$summer.byId("doorA_unit").innerHTML = obj.DOORS_A;
		$summer.byId("doorA_count").innerHTML = doorA;
		$summer.byId("doorA_price").innerHTML = (doorA * obj.DOORS_A).toFixed(2);
		hardwareTotal += doorA * obj.DOORS_A;
		//门岗-B:道闸控制及防砸
		$summer.byId("doorB_unit").innerHTML = obj.DOORS_B;
		$summer.byId("doorB_count").innerHTML = doorB;
		$summer.byId("doorB_price").innerHTML = (doorB * obj.DOORS_B).toFixed(2);
		hardwareTotal += doorB * obj.DOORS_B;
		//门岗-C:门岗视频监控
		$summer.byId("doorC_unit").innerHTML = obj.DOORS_C;
		$summer.byId("doorC_count").innerHTML = doorC;
		$summer.byId("doorC_price").innerHTML = (doorC * obj.DOORS_C).toFixed(2);
		hardwareTotal += doorC * obj.DOORS_C;
		//门岗-D:自助收卡机
		$summer.byId("doorD_unit").innerHTML = obj.DOORS_D;
		$summer.byId("doorD_count").innerHTML = doorD;
		$summer.byId("doorD_price").innerHTML = (doorD * obj.DOORS_D).toFixed(2);
		hardwareTotal += doorD * obj.DOORS_D;
		//门岗-E:计量单打印终端
		$summer.byId("doorE_unit").innerHTML = obj.DOORS_E;
		$summer.byId("doorE_count").innerHTML = doorE;
		$summer.byId("doorE_price").innerHTML = (doorE * obj.DOORS_E).toFixed(2);
		hardwareTotal += doorE * obj.DOORS_E;
		//计量室硬件
		var allWeights = JSON.parse(localStorage.getItem("weightHardware"));
		var weights = allWeights[index - 1];
		var weightA = 0;
		var weightB = 0;
		var weightC = 0;
		var weightD = 0;
		var weightE = 0;
		for (var i = 0; i < weights.length; i++) {
			if (weights[i] != null) {
				if (weights[i].indexOf("A") != -1) {
					weightA++;
				}
				if (weights[i].indexOf("B") != -1) {
					weightB++;
				}
				if (weights[i].indexOf("C:") != -1) {
					weightC++;
				}
				if (weights[i].indexOf("D") != -1) {
					weightD++;
				}
				if (weights[i].indexOf("E") != -1) {
					weightE++;
				}
			}
		}
		//计量室-A:计量衡器数据采集
		$summer.byId("weightA_unit").innerHTML = obj.WEIGHTS_A;
		$summer.byId("weightA_count").innerHTML = weightA;
		$summer.byId("weightA_price").innerHTML = (weightA * obj.WEIGHTS_A).toFixed(2);
		hardwareTotal += weightA * obj.WEIGHTS_A;
		//计量室-B:无人值守计量一体机
		$summer.byId("weightB_unit").innerHTML = obj.WEIGHTS_B;
		$summer.byId("weightB_count").innerHTML = weightB;
		$summer.byId("weightB_price").innerHTML = (weightB * obj.WEIGHTS_B).toFixed(2);
		hardwareTotal += weightB * obj.WEIGHTS_B;
		//计量室-C:视频监控抓拍
		$summer.byId("weightC_unit").innerHTML = obj.WEIGHTS_C;
		$summer.byId("weightC_count").innerHTML = weightC;
		$summer.byId("weightC_price").innerHTML = (weightC * obj.WEIGHTS_C).toFixed(2);
		hardwareTotal += weightC * obj.WEIGHTS_C;
		//计量室-D:红外对射卡位
		$summer.byId("weightD_unit").innerHTML = obj.WEIGHTS_D;
		$summer.byId("weightD_count").innerHTML = weightD;
		$summer.byId("weightD_price").innerHTML = (weightD * obj.WEIGHTS_D).toFixed(2);
		hardwareTotal += weightD * obj.WEIGHTS_D;
		//计量室-E:IC卡读写器
		$summer.byId("weightE_unit").innerHTML = obj.WEIGHTS_E;
		$summer.byId("weightE_count").innerHTML = weightE;
		$summer.byId("weightE_price").innerHTML = (weightD * obj.WEIGHTS_E).toFixed(2);
		hardwareTotal += weightD * obj.WEIGHTS_E;
		//监控室-语音对讲中控主机
		var allMonitors = JSON.parse(localStorage.getItem("monitorHardware"));
		$summer.byId("monitorA_unit").innerHTML = obj.MONITORS;
		if (allMonitors[index - 1] != null) {
			$summer.byId("monitorA_count").innerHTML = factory.nod_monitors;
			$summer.byId("monitorA_price").innerHTML = (factory.nod_monitors * obj.MONITORS).toFixed(2);
			hardwareTotal += factory.nod_monitors * obj.MONITORS;
		}
		//手持收料
		var allMats = JSON.parse(localStorage.getItem("materialHardware"));
		if (allMats[index - 1] != null) {
			$summer.byId("material_unit").innerHTML = obj.MATERIAL;
			$summer.byId("material_count").innerHTML = factory.person_count;
			$summer.byId("material_price").innerHTML = (factory * obj.MATERIAL).toFixed(2);
			hardwareTotal += factory.person_count * obj.MATERIAL;
		}

		//质检加密-手持终端
		var allQuas = JSON.parse(localStorage.getItem("qualityHardware"));
		//质检加密-IC卡读写器
		$summer.byId("quaHardwareA_unit").innerHTML = obj.QUA_IC_COUNT;
		//质检加密-手持终端
		$summer.byId("quaHardwareB_unit").innerHTML = obj.QUAHARDWARE;
		//质检加密-质检IC卡
		$summer.byId("quaHardwareC_unit").innerHTML = obj.QUACOUNT;
		var qua = allQuas[index - 1];
		if (qua != null) {
			if (qua.indexOf("A") != -1) {
				$summer.byId("quaHardwareA_unit").innerHTML = obj.QUA_IC_COUNT;
				$summer.byId("quaHardwareA_count").innerHTML = factory.qua_per_count;
				$summer.byId("quaHardwareA_price").innerHTML = (factory.qua_per_count * obj.QUA_IC_COUNT).toFixed(2);
				hardwareTotal += factory.qua_per_count * obj.QUA_IC_COUNT;
			}
			if (qua.indexOf("B") != -1) {
				$summer.byId("quaHardwareB_unit").innerHTML = obj.QUAHARDWARE;
				$summer.byId("quaHardwareB_count").innerHTML = factory.qua_per_count;
				$summer.byId("quaHardwareB_price").innerHTML = (factory.qua_per_count * obj.QUAHARDWARE).toFixed(2);
				hardwareTotal += factory.qua_per_count * obj.QUAHARDWARE;
			}
			if (qua.indexOf("C:") != -1) {
				$summer.byId("quaHardwareC_unit").innerHTML = obj.QUACOUNT;
				$summer.byId("quaHardwareC_count").innerHTML = 200;
				$summer.byId("quaHardwareC_price").innerHTML = (200 * obj.QUACOUNT).toFixed(2);
				hardwareTotal += 200 * obj.QUACOUNT
			}
		}

		//施工
		$summer.byId("build").innerHTML = (hardwareTotal * 0.2).toFixed(2);
		//硬件小计
		$summer.byId("hardwareTotal").innerHTML = (hardwareTotal * 1.2).toFixed(2);
		//合计
		$summer.byId("total").innerHTML = (softTotals + hardwareTotal * 1.2).toFixed(2);
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

