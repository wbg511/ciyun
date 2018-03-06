(function(win,doc){
	var ciyun = {};
	ciyun.host = 'https://www-api.ciyun.cn/';
	ciyun.regEx={
        Strs:/^[\u0391-\uFFE5\w]+$/, //中文字、英文字母、数字和下划线
        Tel:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,//更新最新手机验证
        SpecialWord:/^[`\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\/\.\,\;\'\[\]\\]+$/,//检查特殊字符
    };
    ciyun.htmlReplace=function(str){  
            str = str.replace(/&/g, '＆');  
            str = str.replace(/</g, '＜');  
            str = str.replace(/>/g, '＞');  
            str = str.replace(/\!/g, '！');  
            str = str.replace(/\|/g, '｜');
            str = str.replace(/\./g, '．');  
            str = str.replace(/\^/g, '＾');  
            str = str.replace(/\$/g, '＄');  
            str = str.replace(/\&/g, '＆');  
            str = str.replace(/\*/g, '＊');  
            str = str.replace(/=/g, '＝');  
            return str;  
    }
    ciyun.chkSpcWord=function (str){
            if(this.regEx.SpecialWord.test(str)){
                return true;
            }else{
                return false;
            }
        };
    ciyun.chkTel=function (str){
            if(this.regEx.Tel.test(str)){
                return true;
            }else{
                return false;
            }
    }
    ciyun.ajax=function(type,url,method,data,callback){
            $.ajax({  
                type : method,  //提交方式  
                url : url,//路径  
                data:JSON.stringify(data),
                dataType:'json',
                xhrFieds:{
                    withCredentials:true
                },
                crossDomain:true,
                contentType:"application/json",
                success : function(result) {//返回数据根据结果进行相应的处理  
                    if(result.result==0){
                        callback(result);
                    }else if(result.result==100023){
                        this.Toast(result.message,2000)
                        // console.log(result.message)
                    }else{
                        // alert(result.message)
                        this.Toast(result.message,2000)
                    }
                },  
                error:function(){

                    console.log('请求失败')
                }
            });
    }
    ciyun.copyrightYear=function(id){
            var copyrightYear = new Date().getFullYear();
            if (copyrightYear < 2014) {
                document.getElementById(id).innerHTML = copyrightYear + "-2014";
            } else if (copyrightYear == 2014) {
                document.getElementById(id).innerHTML = copyrightYear;
            } else {
                document.getElementById(id).innerHTML = "2014-" + copyrightYear;
            }
        }
    ciyun.placeholderSupport=function placeholderSupport() {    // 判断浏览器是否支持 placeholder
                return 'placeholder' in document.createElement('input');
            }
    ciyun.passholder=function(){
        //处理passholder兼容ie8
            this.placeholderSupport();
            if(!this.placeholderSupport()){
                $(document).on('focus', '[placeholder]',function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                });
                $(document).on('blur', '[placeholder]',function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                });
                $('[placeholder]').blur();
            };
    }
    ciyun.Toast=function(msg,duration){  
            duration=isNaN(duration)?3000:duration;  
            var m = document.createElement('div');  
            m.innerHTML = msg;  
            m.style.cssText="width:200px; background:#000; opacity:0.8; height:80px; color:#fff; line-height:80px; text-align:center; border-radius:5px; position:fixed; top:40%; left:50%; margin-left:-100px;z-index:999999; font-weight:bold;";  
            document.body.appendChild(m);  
            setTimeout(function() {  
                var d = 0.5;  
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';  
                m.style.opacity = '0';  
                setTimeout(function() { document.body.removeChild(m) }, d * 1000);  
            }, duration);  
        }
    ciyun.copyrightYear('copyrightYear');
    win.ciyun = ciyun;


})(window,document);