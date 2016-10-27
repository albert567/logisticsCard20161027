summerready = function() {
	// 设置输入框文字清除的事件监听
	$(".um-input-clear").click(function() {
		$(this).prev("input").val("");
	});

};
/**
 * 正则表达式验证邮箱格式
 */
function checkMail(mail) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(mail))
		return true;
	else {
		UM.modal("alert", {
			title : window.location.host || "",
			text : "您的邮箱格式不正确",
			overlay : true,
			ok : function(data) {
				return false;
			},
			delay : 300, //Number
			callback : null
		});
	}
}
/**
 * 登录 
 */
function login() {
	var email = $summer.byId("email");
	if (checkMail(email.value)) {
		localStorage.setItem("myemail", email.value)
		summer.openWin({
			id : 'menu',
			url : 'html/menu.html'
		});
	}
}

/**
 * 忘记密码
 */
function logout() {
var	url2 = 'http://opentest.yonyoutelecom.cn/mobile/queryConvience.do?region_type=2&q=';
	summer.get(url2, {}, {
		}, function(response) {
			alert("服务器端返回值的类型为" + typeof response);
			alert(response);//结果为[objet Object],[objet Object],[objet Object]这些
			alert(JSON.stringify(response));//
			
			alert(response.data);//response.data是字符串类型
			alert("共返回"+JSON.parse(response.data).length+"条数据");//获取返回数据的长度
			alert(JSON.parse(response.data)[2].text);//获取返回值的第三条数据的text值
		}, function(response) {
			alert("err");
			alert(typeof response);//结果为object
			
			alert(JSON.stringify(response));
			alert(response.error);//查看错误信息
		});
}