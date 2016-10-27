var viewModel;
var jsonArray = [];
var listview;
summerready = function() {

	$('.um-back').click(function() {
		summer.closeWin();
	});

	//构造控件实例
	listview = UM.listview("#listview");
	//Knockout绑定
	var ViewModel = function() {
	};
	var index = 1;
	var myemail = localStorage.getItem("myemail");
	viewModel = new ViewModel();
	summer.get("http://123.103.9.211:8080/baseinfo?index=" + index, {}, {}, function(response) {
		jsonArray = JSON.parse(response.data).list;
		viewModel.data = ko.observableArray(jsonArray);

		viewModel.rowCollect = function(data, e) {
			localStorage.clear();
			localStorage.setItem("myemail",myemail);
			//数据初始化
			//邮箱
			localStorage.setItem("email", data.EMAIL)
			//报价主表id
			localStorage.setItem("baseinfoid", data.ID);
			//报价主表id
			localStorage.setItem("industry", data.INDUSTRY);
			//行业选择
			localStorage.setItem("company", data.COMPANY);
			//公司名称
			localStorage.setItem("saleCompany", data.SALE_COMPANY);
			//销售分公司
			localStorage.setItem("saleAdviser", data.SALE_ADVISER);
			//销售顾问
			localStorage.setItem("saftDiscount", data.SOFT_DISCOUNT);
			//软件折扣
			localStorage.setItem("factoryCount", data.FACTORY_COUNT);
			//报价工厂数
			localStorage.setItem("isBuyReport", data.IS_BUY_REPORT);
			//是否按工厂购买自由报表

			summer.get("http://123.103.9.211:8080/history/" + data.ID, {}, {}, function(response) {
				jsonArray = JSON.parse(response.data);
				var facList = [];
				var x;
				var factories = [];
				var ticketHardware = [];
				var monitorHardware = [];
				var qualityHardware = [];
				var materialHardware = [];
				facList = JSON.parse(response.data).facList;

				for (x in facList) {
					var factory = {};
					ticketHardware.push(facList[x].TIC_HARDWARE);
					monitorHardware.push(facList[x].MON_HARDWARE);
					qualityHardware.push(facList[x].QUA_HARDWARE);
					materialHardware.push(facList[x].MAT_HARDWARE);
					factory.fac_name = facList[x].FAC_NAME;
					factory.item_inout = facList[x].ITEM_INOUT;
					factory.wei_count = facList[x].WEI_COUNT;
					factory.tic_count = facList[x].TIC_COUNT;
					factory.met_count = facList[x].MET_COUNT;
					factory.is_noduty = facList[x].IS_NODUTY;
					factory.nod_monitors = facList[x].NOD_MONITORS;
					factory.person_count = facList[x].PERSON_COUNT;
					factory.qua_per_count = facList[x].QUA_PER_COUNT;
					factory.ic_count = facList[x].IC_COUNT;
					factory.qua_ic_count = facList[x].QUA_IC_COUNT;
					factory.id = facList[x].ID;
					factory.base_id = facList[x].BASE_ID
					factories.push(factory);
				}
				localStorage.setItem("factories", JSON.stringify(factories));
				localStorage.setItem("doorHardware", JSON.stringify(data.allDoors));
				localStorage.setItem("weightHardware", JSON.stringify(data.allWeights));
				localStorage.setItem("ticketHardware", JSON.stringify(ticketHardware));
				localStorage.setItem("monitorHardware", JSON.stringify(monitorHardware));
				localStorage.setItem("qualityHardware", JSON.stringify(qualityHardware));
				localStorage.setItem("materialHardware", JSON.stringify(materialHardware));

				summer.openWin({
					id : 'subMenu',
					url : 'html/subMenu.html'
				});
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
		ko.applyBindings(viewModel);
	}, function(response) {
		UM.alert({
			title : '访问网络失败，请稍后再试...',
			btnText : ["取消", "确定"],
			overlay : true,
			ok : function() {

			}
		});
	});

	//添加控件方法
	listview.on("pullUp", function(sender) {
		//这是可以编写列表下拉加载逻辑，参数sender即为当前列表实例对象
		index++;
		summer.get("http://123.103.9.211:8080/baseinfo?index=" + index, {}, {}, function(response) {
			jsonArray = JSON.parse(response.data).list;
			for (var i = 0; i < jsonArray.length; i++) {
				viewModel.data.push(jsonArray[i]);
			}
			sender.refresh();
		}, function(response) {
			UM.alert({
				title : '访问网络失败，请稍后再试...',
				btnText : ["取消", "确定"],
				overlay : true,
				ok : function() {

				}
			});
		});
	});

	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var data = viewModel.data()[args.rowIndex];
		var url;
		var plan = data.PLAN;
		if (plan != null) {
			if (plan.indexOf("D") != -1) {
				url = "http://123.103.9.211:8080/baseinfo/updateExcel?id=" + data.ID;
			} else {
				url = "http://123.103.9.211:8080/baseinfo/updateExcelA?id=" + data.ID;
			}
			//下载代码
			summer.UMFile.download({
				"url" : url, //下载文件的url
				"locate" : "download", //下载后文件存放的路径
				"filename" : "1.xlsx", //下载后重命名的文件名
				"override" : true, //下载后是否覆盖同名文件
				"callback" : "downloadCallback()"
			});
		}else{
			UM.alert({
				title : '报价单填写不完整，请左滑编辑',
				btnText : ["取消", "确定"],
				overlay : true,
				ok : function() {

				}
			});
		}
	});
	listview.on("itemDelete", function(sender, args) {
		//这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		UM.confirm({
			title : '提示：',
			text : '您确定要删除这条报价记录吗？',
			btnText : ["取消", "确定"],
			overlay : true,
			ok : function() {
				summer.post("http://123.103.9.211:8080/baseinfo/delete", {
					id : item.ID
				}, {}, function(response) {
					if (response.data == "true") {
						args.$target.slideUp(500, function() {
							viewModel.data.remove(item);
						});
					} else {
						UM.alert({
							title : '数据删除失败',
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
			},
			cancle : function() {
			}
		});

	});

	listview.on("itemSwipeLeft", function(sender, args) {
		//这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		sender.showItemMenu(args.$target);
	});
	listview.on("tapHold", function() {
		//这里可以处理长按事件
		/*console.log("您长按了列表！");*/
	});

};

function downloadCallback(args) {
	if (args.isfinish) {
		var path = args.savePath;
		path = path.substring(0, path.lastIndexOf('/') + 1);
		summer.UMFile.open({
			"filename" : "1.xlsx", //文件全路径
			"filetype" : "xlsx", //支持手机能打开的格式*.txt,*.doc,*.pdf等
			"filepath" : path
		});
	}
}

function search() {
	var key = $summer.byId("search").value;

	summer.get("http://123.103.9.211:8080/baseinfo/findByKey?&key=" + key, {}, {}, function(response) {
		jsonArray = JSON.parse(response.data);
		viewModel.data.removeAll();
		for (var i = 0; i < jsonArray.length; i++) {
			viewModel.data.push(jsonArray[i]);
		}
		listview.refresh();
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