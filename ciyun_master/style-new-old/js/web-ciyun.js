window.onscroll = function() {
	if ($(document).scrollTop() > 105) {
		$("#health-nav").addClass("navFixed");
	} else {
		$("#health-nav").removeClass("navFixed");
	}
}



function joinUsDia() {
	var joinUsHtml = '<div id="join-us-dialog" >' +
		'<form action="../joinus" method="post" id="join-from">' +
		'<a href="javascript:void(0)" class="dia-close" onclick="x.Dialog.close(\'join-us-in\');"></a>' +
		'<div class="jo-tips">感谢您对我们的信任，请留下您的联系方式，我们会第一时间与您沟通，期待与您的合作！</div>' +
		'<div class="join-us-dialog">' +
		'	<div class="jo-row">' +
		'		<label class="jo-head"><em>*</em>联系人姓名：</label><div class="jo-text"><span class="sub-data"></span><input type="text"  class="mod-input {required:true}" id="j-name" name="name"  /></div>' +
		'	</div>' +
		'	<div class="jo-row phone-row">' +
		'		<label class="jo-head"><em>*</em>联系人电话：</label><div class="jo-text"><span class="sub-data"></span><input type="text"  class="mod-input {required:true,isTelMobile:true}" id="mobile" name="mobile"  /></div>' +
		'	</div>' +
		'	<div class="jo-row">' +
		'		<label class="jo-head"><em>*</em>公司名称：</label><div class="jo-text"><span class="sub-data"></span><input type="text"  class="mod-input {required:true}" id="j-company" name="cropName" /></div>' +
		'	</div>' +
		'	<div class="jo-row">' +
		'		<label class="jo-head">电子邮箱：</label><div class="jo-text"><span class="sub-data"></span><input type="text"  class="mod-input" id="j-email" name="mail" /></div>' +
		'	</div>' +
		'</div>' +
		'<div class="jo-row-btn">' +
		'<p class="must-item"><em>*</em>为必填项</p>' +
		'  <button type="submit" id="draft" class="jo-mod-btn">提交</button>' +
		'  <a href="javascript:void(0)" id="dia-back-btn" class="jo-mod-btn" style="display:none" onclick="x.Dialog.close(\'join-us-in\');">关闭</a>' +
		'</div>' +
		'</form>' +
		'</div>';
	x.Dialog({
		showtitle: "remomve",
		boxID: 'join-us-in',
		width: 620,
		height: 550,
		content: "text:" + joinUsHtml,
		ofns: function() {
			$("#join-from").validate({
				submitHandler: function(form) {
					var options = {
						type: "post",
						url: "../joinus", //自行处理action
						dataType: 'json',
						beforeSubmit: function(a, b, c) {
							x.miniAlert('loading', '正在保存数据，请稍等', true); //自行处理
						},
						success: function(data, status) {

							$(".jo-row").find("input").each(function() {
								$(this).prev(".sub-data").html($(this).val());
								$(this).hide();
							})
							$("#dia-back-btn").show();
							$("#draft").hide();
							$(".must-item").html("我们的工作人员会尽快与您联系").css("color", "red");
							//x.Dialog.close("join-us-in");
							x.Dialog.close("dialog-miniAlert-loading");
							//以下自行处理
							//x.miniAlert('hits','我们的工作人员会尽快与您联系',true);//自行处理

						}
					};
					$(form).ajaxSubmit(options);
					return false;
				}
			});

		}
	});
	return false;
}


$(function() {
	$(".wxImg-link").hover(function() {
		$(".wx-box-pic").show();
	}, function() {
		$(".wx-box-pic").hide();
	})
	if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
		$(".p-test").hide();
	}
	$(".ft-copy").append('&ensp;<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11030102010020"><img src="https://static.ciyun.cn/staticpage/record.png"/>京公网安备 11030102010020号</a>');
})

var copyrightYear = function(id) {
	var copyrightYear = new Date().getFullYear();
	if (copyrightYear < 2014) {
		document.getElementById(id).innerHTML = copyrightYear + "-2014";
	} else if (copyrightYear == 2014) {
		document.getElementById(id).innerHTML = copyrightYear;
	} else {
		document.getElementById(id).innerHTML = "2014-" + copyrightYear;
	}
};
window.onload = function() {
	copyrightYear("copyrightYear");
}