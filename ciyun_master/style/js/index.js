var numl = 0;
(function (win,dow) {
    var ciyunIndex= {
        init:function(){
            this.footerTemplate();
            ciyun.passholder();
        },
        shenqingtiyan:function(name,tel,fun){
            if(!name || ciyun.chkSpcWord(name)){
                ciyun.Toast('请输入名称',2000)
                return false;
            }
            if(!ciyun.chkTel(tel) || ciyun.chkSpcWord(tel)){
                ciyun.Toast('请输入正确的手机号',2000)
                return false;
            }
            var companyType=$('.footer-form-trade .form-text').attr('id')
            var companyPeople=$('.footer-form-num .form-text').attr('id')
            var mobile=$('#modal-tel').val()
            var cropName=$('#modal-name').val()
            var data={
                "companyPeople":parseInt(companyPeople),
                "companyType":parseInt(companyType),
                "mobile":ciyun.htmlReplace(mobile),
                "cropName":ciyun.htmlReplace(cropName)
            }
            ciyun.ajax('shenqingtiyan',ciyun.host+'joinus/add','post',data,function(res){
                $('#shenqingye').hide();
                $('.Prompt').show()
                $('#modal-name').val('');
                $('#modal-tel').val('');
                setTimeout(function () {
                    $(".Prompt").fadeOut();
                }, 2000);

            });
        },
        footerTemplate:function(){
            //底部管理人数；所在行业默认值
            ciyun.ajax('indexfooter',ciyun.host+'joinus/getInitInfo','post',null,function(result){
                //管理人数
                for(var i=0;i<result.datas.companyPeople.length;i++){
                    var str='<li><span id='+result.datas.companyPeople[i].key+'>'+result.datas.companyPeople[i].value+'</span></li>'
                    $('.footer-form-num .num-ul').append(str)
                }
                $('.footer-form-num .form-text').attr('id',result.datas.companyPeople[0].key)
                //所在行业
                for(var i=0;i<result.datas.companyType.length;i++){
                    var str='<li><span id='+result.datas.companyType[i].key+'>'+result.datas.companyType[i].value+'</span></li>'
                    $('.footer-form-trade .num-ul').append(str)
                }
                $('.footer-form-trade .form-text').attr('id',result.datas.companyType[0].key)
            });
        },
        
        // list公用
        modular:function(a,b,c,d){
            var len=a
            for(var i=0;i<len;i++){
                var str="<ul class='list_box'>"
                        +"</ul>"
                        +"<div class='ul_centent'>"
                            +"<div class='triangle_box'> "
                                +"<div class='triangle'></div>"
                            +"</div>"
                            +"<div class='floor2_centent'>"
                                +"<ul>"
                                +"</ul>"
                            +"</div>"
                        +"</div>"
                $(b).append(str)
                for(var j=0;j<5;j++){
                    var str_child="<li class='"+d+"'>"
                                +"<div class='float2_list_img'><img src=''></div>"
                                +"<div class='floor2_list_title'></div>"
                            +"</li>"
                    var floor_child=$(c)
                    $(floor_child[i]).append(str_child)
                }
            }
        },
        icon:function(a,b){
            $(a).children().eq(0).attr('src',"");
            
            $(a).children().eq(1).css({"color":"#444444"})
            for(var i=0;i<b.length;i++){
                $(a[i]).find('img').attr('src',b[i].icon); 
                $(a[i]).find('.floor2_list_title').text(b[i].title);
            }
            var a_len=$(a).length
            if(a_len>b.length){
                for(var i=b.length;i<a_len;i++){
                    $(a[i]).remove()
                }
            }
        },

        mouse:function(obj,even){
            var index=$(obj).index()
            var index_parent=$(obj).parent().index()
            var i=index_parent/2*5+index        
            if(i==even){
                return false
            }else{
                $(obj).find(".floor2_list_title").css({"color":"#6fba2c"})
            }
        },
        out:function(obj,even){
            // console.log(even)
            var index=$(obj).index()
            var index_parent=$(obj).parent().index()
            var i=index_parent/2*5+index
            if(i==even){
                return false
            }else{
                $(obj).find(".floor2_list_title").css({"color":"#000"})
            }
            
        },
        //机构合作伙伴
        partner:function(even,ind,name,obj){
            if(ind%5==0){
                name="<div class='floor6_list' style='margin-left:0'>"
                        +"<div class='floor6_icon'><img src='"+obj+"'></div>"
                    +"</div>"
            }else{
                name="<div class='floor6_list'>"
                        +"<div class='floor6_icon'><img src='"+obj+"'></div>"
                    +"</div>"
            }
            
            even.append(name);
        },
        Partner_click:function(even,parent){
            var text= $(even).text()
            if(text=="展开"){
                $(even).text('收起')
                parent.css({"height":"auto"})
            }else if(text=="收起"){
                $(even).text('展开')
                parent.css({"height":"288px"})
            }
        },
        showIframe:function(url,w,h){
            var if_w = w; 
            var if_h = h; 
            $("<iframe width='" + if_w + "' height='" + if_h + "' id='video' name='video' frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true' allowfullscreen='true'></iframe>").prependTo('.movie div');    
            $("#video").attr("src", url)
        },
        list_click:function(even,name,list,floor,centent,title,arr,h){
            var event=$(even).attr('class')
            this.indexs=0
            this.index_parents=0
            var index=$(even).index();
            var index_parent=$(even).parent().index();
            var i=index_parent/2*5+index;
            this.indexs=i;
            this.index_parents=index_parent
            $(name).find("img").css({"margin-top":"0"});
            $(even).find("img").css({"margin-top":"-60px"});    
            $(list).fadeOut(1000);
            $(list).remove();
            console.log(index_parent/2)
            console.log(floor)
            if(floor!==index_parent/2||floor==0){
                floor=index_parent/2;
                var len
                if(event=="floor3_list"){
                    len=Math.ceil(arr[i].list.length/5)*120+42;
                }else{
                    len=Math.ceil(arr[i].list.length/3)*77+128;
                }
                centent.css({"height":"0px","padding-top":"0","paddig-bottom":"0"});
                $(centent[floor]).show();
                $(centent[floor]).animate({"height":len+"px","padding-top":"22px","paddig-bottom":"42px"});
                console.log('111')
            }else{
                $(centent[floor]).css({"height":"0"});
                $(centent[floor]).css({"height":"auto"});
            }
            title.css({"color":"#444444"});
            $(even).children().eq(1).css({"color":"#6eba2c"});
            $(even).parent().next().children().eq(0).children().animate({"margin-left":index*236+108+"px"});
        }
    }
    ciyunIndex.init();
    win.ciyun.ciyunIndex = ciyunIndex;
})(window,document);

$(function(){
/*------------------链接效果-----------------*/
    $(".nav-list").click(function(e){
        var  offsetTop;
        var index = $(".nav-list").index(this);
        switch(index){
            case 1:offsetTop = $("#product").offset().top;
            break;
            case 2:offsetTop = $("#health-city").offset().top;
            break;
            case 3:offsetTop = $("#safe").offset().top;
            break;
            case 4:offsetTop = $("#safe").offset().top;
            break;
            case 5:offsetTop = $("#safe").offset().top;
            break;
            case 6:window.location.href=health-about-us.html;
            break;
        }
        $("html,body").animate({
            scrollTop:offsetTop
        },500);
        return false;
    });
    /*------------请选择区域---------------*/
    var winHeight = $(window).height();
    $(document).on("click",".num-ul li",function(){
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
        var html = $(this).text();
        var id = $(this).children().attr('id');
        var index = $('.num-ul').index($(this).closest(".num-ul"));
        if(index==0){
            $('.footer-form-num .form-text').html(html);
            $('.footer-form-num .form-text').attr('id',id)
        }else{
            $('.footer-form-trade .form-text').html(html);
            $('.footer-form-trade .form-text').attr('id',id);
        }       
        return false;
    });
    //底部滚动显示处理
    $(window).scroll(function(){
        var footerOffsetTop = $("#footer").offset().top;
        var footerHeight = $("#footer").height();
        var winScrollTop = $(window).scrollTop();
        if(winScrollTop > footerOffsetTop + footerHeight || winScrollTop <　footerOffsetTop - winHeight){
            $(".footer-form").addClass('active');
        }else{
            $(".footer-form").removeClass('active');
        }
    });
    //申请底部表单关闭
    $('.close-button').click(function(){
        $('#footer .footer-form').remove();
    });
    /*申请页面表单*/
    $('.apply-button').click(function() {
        $('#shenqingye').show();
    })
    /*申请页面关闭*/
    $("#shenqingye .modal-close").click(function(){
        $('#shenqingye').hide();
    })
    /*申请页面提交*/
    $("#shenqingye .modal-submit-button").click(function(){
        var name = $('#modal-name').val();
        var tel = $('#modal-tel').val();
        ciyun.ciyunIndex.shenqingtiyan(name,tel);

    });

// <<banner-start====================================================

    //申请体验
    $('.btn').click(function(){
        $('#shenqingye').show();
    })
    //视屏，只有在服务器下才能查看否则不能正常播放
    $(".movie div img").click(function(){
         $(".movie").css({"display":"none"})
         $(".movie div iframe").remove()    
     })
    // 視屏容器顯示
    $(".banner_box .img").click(function(){
        ciyun.ciyunIndex.showIframe('video.html',980,520)
        $(".movie").css({"display":"block"})
    })
// >>banner-end====================================================

// <<centent-start====================================================
    // 慈云焦点-start
    // 由于数据是动态的需要从后台获取数据，以下是自定义数据
    var news=[
        {
            "images":"style/images/Journalism_1.jpg",
            "title":"第七届全国健康管理示范基地研讨会中金慈云备受瞩目",
            "centent":"在为期3天的研讨会上，中金健康管理大数据应用研究院成立正式对外发布，获得了与会代表的广泛关注和一致好评。",
            "time":"2017-10-31 "
        },
        {
            "images":"style/images/Journalism.png",
            "title":"中金慈云将协力打造唐山健康管理服务平台",
            "centent":"10月25日上午，唐山市健康管理协会成立大会暨健康管理服务平台启动仪隆重举行，作为唐山健康管理服务平台运营商的中金慈云了出席本次大会。",
            "time":"2017-10-25"
        },
        {
            "images":"style/images/Journalism_1.jpg",
            "title":"“慈云健康”走进中海油，助力企业员工科学健步",
            "centent":"2017年9月14日，“海油发展健康督导员培训”在国际报告厅三楼举行，中金慈云应邀参加并向督导员做了相关培训。",
            "time":"2017-09-14 "
        },
        {
            "images":"style/images/Journalism.png",
            "title":"中金慈云亮相山城第十一届健康服务业大会",
            "centent":"2017年9月1-3日，中金慈云与来自全国各省市的5000余名健康管理学者、从业者和相关产业代表进行为期3天的交流和分享。",
            "time":"2017-09-13"
        }
    ]

    var news_variable={
        img:news[0].images

    } 
    // var img=Array[0].images
    $('.focus_left img').attr("src",news_variable.img)
    //添加新闻
    for(var i=0;i<news.length;i++){
        var title=news[i].title;
        var centent=news[i].centent;
        var time=news[i].time;
        var year=news[i].time.substring(0,7)
        var month=news[i].time.substring(8,10)
        var str='<li class="line"><i></i>'
                +'<div class="line_title">'+title+'</div>'
                +'<div class="line_time">'+time+'</div>'
            +'</li>'//默認
            +'<li class="block ">'//新聞詳細信息，鼠標移入顯示
                +'<div class="block_times">'
                    +'<div class="times_top">'+month+'</div>'
                    +'<div class="times_bottom">'+year+'</div>'
                +'</div>'
                +'<div class="block_left">'
                    +'<div class="block_title">'+title+'</div>'
                    +'<div class="block_centent">'+centent+'</div>'
                +'</div>'
            +'</li>'
        $('.focus_right ul').append(str)
    }

    var line=$('.line')
    var block=$('.block')
    $(line[0]).hide();
    $(block[0]).css({"display":"block"})
    // 移入变换
    $(line).mouseover(function(){
        var index=$(this).index()/2;
        $(block).hide();
        $(line).show();
        $(line[index]).hide();
        $(block[index]).show()
    })
    // 慈云焦点-end

    // 甩掉手工的繁琐，在云端继续你的健康管理——start 
    var platform=[
        {
            "id":"1",
            "icon":"style/images/p5.1.png",
            "title":"机构健康管理台",
            "list":[
                {
                    "title":"客户管理",
                    "centent":"可以按照企业团体的组织结构，对其员工进行统一管理"
                },
                {
                    "title":"体检、就医预约管理",
                    "centent":"体检、就医预约记录一目了然，排班日志让机构做到心中有数"
                },
                {
                    "title":"健康数据管理与统计分析",
                    "centent":"批量上传，单独录入皆可，提供《年度健康力分析报告》等多样健 康报告"
                },
                {
                    "title":"医生管理",
                    "centent":"由机构管理员为本机构医生/健管师开通账号，按照医生专长建立 不同工作组"
                },
                {
                    "title":"问卷库管理",
                    "centent":"由机构管理员为本机构医生/健管师开通账号，按照医生专长建立 不同工作组"
                },
                {
                    "title":"微官网内容管理",
                    "centent":"开通机构微信公众账号，定期推出专业知识资讯、产品信息、机构 活动等"
                },
                {
                    "title":"商品及订单管理",
                    "centent":"机构可以自由添加任何商品到线上商城，管理商品上架、下架、库 存等基本信息"
                },
                {
                    "title":"健康卡管理",
                    "centent":"整合机构服务资源，以健康卡的形式形成可执行落地的健康管理服 务产品"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.2.png",
            "title":"企业健康管理台",
            "list":[
                {
                    "title":"员工管理",
                    "centent":"根据企业组织结构手动或批量导入职工信息，为员工建立终身健康档案"
                },
                {
                    "title":"企业云医务室",
                    "centent":"配备健康一体机监测多项健康数据并自动上传云端，支持远程问诊、送药上门、就诊预约等服务"
                },
                {
                    "title":"健康活动管理",
                    "centent":"企业可组织多种健康促进活动，员工分组PK获得相应健康积分及奖品"
                },
                {
                    "title":"健康宣教",
                    "centent":"可有针对性提供在线直播、宣教手册、保健操等多形式健康内容"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.3.png",
            "title":"健康电商平台",
            "list":[
                {
                    "title":"健康产品快捷直达",
                    "centent":"健康产品功能分区，查找所需产品，分分钟搞定"
                },
                {
                    "title":"正品保证",
                    "centent":"正品保证，大牌云集，官方质保，值得信赖"
                },
                {
                    "title":"健康数据管理与统计分析",
                    "centent":"批量上传，单独录入皆可，提供《年度健康力分析报告》等多样健 康报告"
                },
                {
                    "title":"智能推荐",
                    "centent":"根据健康状况，推荐最适合的产品，单品或组合，数据让你选择更轻松"
                },
                {
                    "title":"极速发货",
                    "centent":"下单急速发货，客服7X24小时"
                },
                {
                    "title":"多种支付方式",
                    "centent":"支持多种支付方式，银联、支付宝、微信，一键支付，轻松购物"
                }
            ]
        },
        {
            "id":"1",
            "icon":"style/images/p5.4.png",
            "title":"健康数据转换平台",
            "list":[
                {
                    "title":"体检数据采集",
                    "centent":"支持非结构化个人体检数据采集，如WORD、PDF、纸质报告等。"
                },
                {
                    "title":"体检数据标准转化",
                    "centent":"收集个人在不同体检机构的体检数据，实施数据标准的转化，实现历年数据对比分析。"
                },
                {
                    "title":"数据库无缝对接",
                    "centent":"支持与不同体检软件数据库进行多种方式的无缝连接，如串口内网传输等。批量上传，单独录入皆可，提供《年度健康力分析报告》等多样健 康报告"
                },
                {
                    "title":"数据库格式转化",
                    "centent":"通过文字识别技术，对化验单、体检报告进行识别，转成标准数据库格式。"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.5.png",
            "title":"客制化微信公众号平台",
            "list":[
                {
                    "title":"查询体检报告",
                    "centent":"机构上传并推送体检报告给客户，客户轻松点击即可查看报告内容 "
                },
                {
                    "title":"专业知识宣教",
                    "centent":"定期推送健康宣教，提高健康素质、优化临床护理工作"
                },
                {
                    "title":"微信商城展示",
                    "centent":"上架更多健康商品，医生推荐更可靠"
                },
                {
                    "title":"满意度调查问卷",
                    "centent":"实现院级患者满意度调查、投诉建议和各科室满意度统计"
                },
                {
                    "title":"在线健康咨询",
                    "centent":"检后问题即时问医生，医生可量身推荐深度体检方案、健康管理服务等"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.6.png",
            "title":"远程医疗咨询平台",
            "list":[
                {
                    "title":"优质医疗资源共享",
                    "centent":"一线城市优质医疗资源触手可及"
                },
                {
                    "title":"提供便捷的咨询服务",
                    "centent":"通过远程视频与专家医生“面对面”"
                },
                {
                    "title":"预约医生",
                    "centent":"提前预约医生，节省宝贵时间"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.7.png",
            "title":"运营管理平台",
            "list":[
                {
                    "title":"数据转换管理",
                    "centent":"支持体检科室名称、项目名称、单位名称、疾病名称统一标准化管理"
                },
                {
                    "title":"数据统计分析",
                    "centent":"综合统计机构客户各种流量数据，如访问量、咨询量、订单交易数等，形成图文分析报告"
                },
                {
                    "title":"知识库管理",
                    "centent":"统一管理健康问卷、健康知识、教育课程、健康管理方案、食物库、智能医生等内容。批量上传，单独录入皆可，提供《年度健康力分析报告》等多样健 康报告"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.8.png",
            "title":"慈云健康APP",
            "list":[
                {
                    "title":"个性化体检方案定制、体检预约",
                    "centent":"量身定制体检筛查项目，在线购买体检方案，预约体检时间"
                },
                {
                    "title":"在线查询及自助解读体检报告",
                    "centent":"最短时间获取电子体检报告，异常指标智能提醒，历年健康数据变化一目了然。"
                },
                {
                    "title":"私人医生健康咨询",
                    "centent":"随时问医生，小病无需上医院，省心又安心"
                },
                {
                    "title":"预约就医、检查",
                    "centent":"就医、检查提前预约，医院、科室随心选"
                },
                {
                    "title":"健康风险自测评估",
                    "centent":"专业科学的评估模型提早预判各项疾病风险"
                },
                {
                    "title":"个性化健康促进方案",
                    "centent":"制定个性化的健康改善方案"
                },
                {
                    "title":"精品健康商城",
                    "centent":"健康卡、智能设备、基因检测等健康商品任挑选"
                },
                {
                    "title":"健康直播、健康资讯",
                    "centent":"专家讲座现场直播，在线提问互动"
                },
                {
                    "title":"健康活动PK",
                    "centent":"企业组织健康促进活动，员工分团队PK，获积分换惊喜大礼"
                }
            ]
        },
        {
            "id":"1",
            "icon":"style/images/p5.9.png",
            "title":"慈云医生APP ",
            "list":[
                {
                    "title":"及时受理健康咨询",
                    "centent":"不延迟、不遗漏，随时图文音视频远程处理客户咨询事宜"
                },
                {
                    "title":"异常健康数据报警",
                    "centent":"客户健康数据异常系统自动报警提示医生，即时叮嘱客户健康事宜"
                },
                {
                    "title":"查看客户健康档案",
                    "centent":"客户健康检查报告、健康监测数据等信息完整展示，让医生心中有数，有据可依"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.10.png",
            "title":"健康体检管理系统 ",
            "list":[
                {
                    "title":"系统字典词库",
                    "centent":"体检项目名称、体检词库、体检自测问卷严格遵循行业标准"
                },
                {
                    "title":"严格把控流程",
                    "centent":"各个岗位各个节点系统严格把控流程，如工作延期管理、指引单交接和回收确认管理、差错管理、体检报告交接管理等"
                },
                {
                    "title":"自动提取数据",
                    "centent":"支持多个异常结果合并、系统按异常结果按严重度自动排序、图文报告整体打印等"
                },
                {
                    "title":"自动生成个性化终检建议及图文对比报告",
                    "centent":"支持多个异常结果合并、系统按异常结果按严重度自动排序、图文报告整体打印等"
                },
                {
                    "title":"与微信和健康管理云平台互联互通",
                    "centent":"系统采用B/S架构，通过浏览器直接访问，体检系统与微信和健康管理云平台融为一体"
                }
            ]
        },
        {
            "id":"2",
            "icon":"style/images/p5.11.png",
            "title":"医生工作台",
            "list":[
                {
                    "title":"用户沟通",
                    "centent":"客户咨询实时提醒、未完事项标记跟进、常用语回复，便捷高效，提高服务品质"
                },
                {
                    "title":"查看客户健康信息",
                    "centent":"体检报告、健康评估全面了解客户健康信息，制定健康促进方案"
                },
                {
                    "title":"分析报告",
                    "centent":"帮助分析客户体检报告与日常监测数据，形成报告推送客户"
                },
                {
                    "title":"制定健康促进方案",
                    "centent":"制定个性化健康促进方案，引导客户执行方案，达到预期效果"
                },
                {
                    "title":"客户分组管理",
                    "centent":"按照疾病或危险因素进行分组，分群推送通知、叮嘱、问卷、健康计划、健康课程、设定管理目标等"
                },
                {
                    "title":"医生工作日志",
                    "centent":"医生工作时间表设定，自动提醒医生完成相应工作"
                }
            ]
        }
    ]
    // 添加模块
    var platform_variable={
        num:Math.ceil(platform.length/5),
        cl:".floor2",
        cla:".floor2 .list_box",
        clas:"floor2_list"
    }
    ciyun.ciyunIndex.modular(platform_variable.num,platform_variable.cl,platform_variable.cla,platform_variable.clas);
    // 向模块中添加数据
    // 甩掉手工的繁琐，在云端继续你的健康管理icon显示
    var floor2_list=$(".floor2_list");
    ciyun.ciyunIndex.icon(floor2_list,platform);
    $(floor2_list[0]).find('img').css({"margin-top":"-62px"});
    $(floor2_list[0]).find(".floor2_list_title").css({"color":"#6eba2c"});
    var ul_centent=$(".floor2 .ul_centent");
    $(ul_centent[0]).css({"display":"block"});
    var ul=$(".floor2_centent ul");
    //添加第一个list的内容
    for(var i=0;i<platform[0].list.length;i++){
        var str;
        if(i%3==0){
            str="<li style='margin-left:0'>"
                    +"<div class='floor2_list_titlea'>"+platform[0].list[i].title+"</div>"
                    +"<p class='floor2_list_cententa'>"+platform[0].list[i].centent+"</p>"
                +"</li>"
        }else{
            str="<li>"
                    +"<div class='floor2_list_titlea'>"+platform[0].list[i].title+"</div>"
                    +"<p class='floor2_list_cententa'>"+platform[0].list[i].centent+"</p>"
                +"</li>"
        };
        $(ul[0]).append(str);
    }
    // 点击list触发事件
    var leng=0;
    var index2=0;
    $(".floor2_list").click(function(){
        ciyun.ciyunIndex.icon(floor2_list,platform);
        var lists=$(".floor2 .floor2_centent ul li")
        var floor_len=leng
        var ul_centent=$(".floor2 .ul_centent")
        var title=$(".floor2_list .floor2_list_title")
        var floor3_list= $(".floor2_list")
        ciyun.ciyunIndex.list_click(this,floor3_list,lists,floor_len,ul_centent,title,platform)
        for(var j=0;j<platform[ciyun.ciyunIndex.indexs].list.length;j++){
            var str;
            if(j%3==0){
                str="<li style='display:none;margin-left:0'>"
                    +"<div class='floor2_list_titlea'>"+platform[ciyun.ciyunIndex.indexs].list[j].title+"</div>"
                    +"<div class='floor2_list_cententa'>"+platform[ciyun.ciyunIndex.indexs].list[j].centent+"</div>"
                +"</li>"
            }else{
                str="<li style='display:none;'>"
                    +"<div class='floor2_list_titlea'>"+platform[ciyun.ciyunIndex.indexs].list[j].title+"</div>"
                    +"<div class='floor2_list_cententa'>"+platform[ciyun.ciyunIndex.indexs].list[j].centent+"</div>"
                +"</li>"
            }
            $(ul[ciyun.ciyunIndex.index_parents/2]).append(str);
            $(".floor2 .floor2_centent ul li").fadeIn(1000);
        }
    })
    $(".floor2_list").hover(function(){
        ciyun.ciyunIndex.mouse(this,ciyun.ciyunIndex.indexs);
    },function(){
        ciyun.ciyunIndex.out(this,ciyun.ciyunIndex.indexs);
    })
    // 甩掉手工的繁琐，在云端继续你的健康管理——end

    //健康管理云服务，没你想的那么复杂-start
    var serve=[
        {
            "id":"12",
            "icon":"style/images/p6.1.png",
            "title":"高血压管理服务",
            "list":["动态血压监测及解读","云健康档案","健康APP 7X8小时咨询","血压数据及时通知亲人","高血压慢病干预计划"]
        },{
            "id":"13",
            "icon":"style/images/p6.2.png",
            "title":"糖尿病管理服务",
            "list":["血糖、尿糖、运动监测及解读","云健康档案","健康APP 7X8小时咨询","血糖数据及时通知亲人","糖尿病慢病干预计划"]
        },{
            "id":"14",
            "icon":"style/images/p6.3.png",
            "title":"呼吸睡眠暂停管理服务",
            "list":["呼吸睡眠暂停监测及解读","云健康档案","健康APP 7X8小时咨询","呼吸睡眠暂停干预计划"]
        },{
            "id":"15",
            "icon":"style/images/p6.4.png",
            "title":"冠心病管理服务",
            "list":["动态血压和心电图监测及解读","医用级云血压计、心电图仪","健康APP 7X8小时咨询","远程医嘱","冠心病慢病干预计划"]
        },{
            "id":"16",
            "icon":"style/images/p6.5.png",
            "title":"企业全员健康促进服务",
            "list":["个人排名及分阶段进行达标奖励","健康常识在线答题活动","团队PK"]
        },{
            "id":"17",
            "icon":"style/images/p6.6.png",
            "title":"减脂减重管理服务",
            "list":["开展“瘦商”评估","中医体质调理","健康管理师定期个性化指导"]
        },{
            "id":"18",
            "icon":"style/images/p6.7.png",
            "title":"睡眠专项管理服务",
            "list":["专业睡眠与压力水平评估","'天黑请闭眼'主题沙龙","冥想训练"]
        },{
            "id":"19",
            "icon":"style/images/p6.8.png",
            "title":"中医经络疏通服务",
            "list":["经络疏通补充气血","办公室疾病调理和改善","应季养生手段和方法"]
        },{
            "id":"20",
            "icon":"style/images/p6.9.png",
            "title":"控烟专项管理",
            "list":["控制吸烟危害因素","加强员工对吸烟危害的认识","生活方式戒烟法"]
        },{
            "id":"21",
            "icon":"style/images/p6.10.png",
            "title":"企业云医务室服务",
            "list":["综合检测服务","实时咨询服务","药品快递","医疗协助"]
        }
    ]
    var serve_variable={
        num2:Math.ceil(serve.length/5),
        cl2:".floor3",
        cla2:".floor3 .list_box",
        clas2:"floor3_list"
    }
    ciyun.ciyunIndex.modular(serve_variable.num2,serve_variable.cl2,serve_variable.cla2,serve_variable.clas2);
    var floor3_list=$(".floor3_list");
    ciyun.ciyunIndex.icon(floor3_list,serve);
    // 默认样式
    $(floor3_list[0]).find("img").css({"margin-top":"-60px"});
    $(floor3_list[0]).children().eq(1).css({"color":"#6eba2c"});
    var ul_centent3=$(".floor3 .ul_centent");
    $(ul_centent3[0]).css({"display":"block"});
    var ul3=$(".floor3 .ul_centent .floor2_centent ul");
    //添加第一个list的内容
    for(var i=0;i<serve[0].list.length;i++){
        var str="<li>"
                    +"<i></i>"
                    +"<div>"+serve[0].list[i]+"</div>"
                +"</li>"
        $(ul3[0]).append(str);
    }

    // 点击list触发事件
    var floor3_len=0;
    // var indexs=0;
    $(".floor3_list").click(function(){
        var floor3_list=$(".floor3_list");
        ciyun.ciyunIndex.icon(floor3_list,serve);
        
        var lists=$(".floor3 .floor2_centent ul li")
        var floor_len=floor3_len

        var ul_centent=$(".floor3 .ul_centent")
        var title=$(".floor3_list .floor2_list_title")
        ciyun.ciyunIndex.list_click(this,floor3_list,lists,floor_len,ul_centent,title,serve)
        for(var j=0;j<serve[ciyun.ciyunIndex.indexs].list.length;j++){
            var str="<li style='display:none'>"
                        +"<i></i>"
                        +"<div>"+serve[ciyun.ciyunIndex.indexs].list[j]+"</div>"
                    +"</li>"
            $(ul3[ciyun.ciyunIndex.index_parents/2]).append(str);
            $(".floor3 .floor2_centent ul li").fadeIn(1000);
        }
    })
    $(".floor3_list").hover(function(){
        ciyun.ciyunIndex.mouse(this,ciyun.ciyunIndex.indexs);
    },function(){
        ciyun.ciyunIndex.out(this,ciyun.ciyunIndex.indexs);
    })
    // 健康管理云服务，没你想的那么复杂-end


    // 多层级、多角度的互联网+健康管理解决方案——start
    var scheme=[
        {
            "bg":"style/images/bg1.png",
            "icon":"style/images/programme1.png",
            "title":"健康唐山",
            "centent":"基于对建设“健康唐山”的共识，唐山市人民医院医疗集团与中金慈云正式签署战略合作协议，双方将联合探索建立一条符合中国特色的“健联体”模式，共同打造“健康唐山”新名片。"
        },{
            "bg":"style/images/bg2.png",
            "icon":"style/images/programme2.png",
            "title":"云医务室",
            "centent":"2017年8月，由航天中心医院健康管理部与中金慈云合作，为广大职工搭建的“云医务室”，在航天科工二院二部正式投入使用，这标志着企业健康管理服务迈入了新的台阶。"
        },{
            "bg":"style/images/bg3.png",
            "icon":"style/images/programme3.png",
            "title":"健康保险",
            "centent":"构建基于“中金健康云”的“互联网健康管理平台”和“健康大数据评测体系”，为保险公司的精算、健康产品的设计与创新提供数据支持，促进商业健康险和健康管理的融合创新发展。"
        },{
            "bg":"style/images/bg4.png",
            "icon":"style/images/programme4.png",
            "title":"健康数据研究院",
            "centent":"以健康数据为基础，聚合行业知名专家，通过对健康数据的精准分析及学术研究，打造专业咨询品牌，发布精准行业资讯，助力科技成果的转化与应用，促进大健康产业的融合创新。"
        },{
            "bg":"style/images/bg5.png",
            "icon":"style/images/programme5.png",
            "title":"互联网+健康管理",
            "centent":"北京大学航天中心医院依托中金慈云健康管理平台，为用户建立可动态调用的健康档案，并使用健康数据存储与智能分析的专业健康管理工具，创建了基于互联网的服务路径和院内院外新模式。"
        }   
    ]
    for(var i=0;i<scheme.length;i++){
        var title_len=scheme[i].title.length;
        var len6;
        if(title_len>6){
            len6=scheme[i].title.substring(0,8)+"<br>"+scheme[i].title.substring(8,title_len);
        }else{
            len6=scheme[i].title;
        }
        var str="<div class='floor5_list' style='background-image:url("+scheme[i].bg+")'>"
                +"<div class='floor5_list_box'>"
                    +"<div class='floor5_icon'>"
                        +"<div class='img'>"
                            +"<img src='"+scheme[i].icon+"'>"
                        +"</div>"
                        
                        +"<div class='floor5_text'>"
                           +len6 
                        +"</div>"
                    +"</div>"
                    +"<div class='floor5_centent'><div>"+scheme[i].centent+"<div></div>"
                +"</div>"
            +"</div>"
        $(".floor5_box").append(str);
    }

    //鼠标移入效果
    $(".floor5_list").hover(function(){
        $(this).find('img').css({"margin-top":"-60px"})
        $(this).find('.img').stop().animate({"margin-top":"55px"});
        $(this).find(".floor5_icon").stop().animate({"height":"215px"});
    },function(){
        $(this).find('img').css({"margin-top":"0"})
        $(this).find('.img').stop().animate({"margin-top":"120px"});
        $(this).find(".floor5_icon").stop().animate({"height":"100%"});
    })
    // 多层级、多角度的互联网+健康管理解决方案——end

// 他们都在用中金慈云
    var organization=["style/images/organization6.png","style/images/organization7.png","style/images/organization8.png","style/images/organization9.png","style/images/organization10.png","style/images/organization11.png","style/images/organization12.png","style/images/organization13.png","style/images/organization14.png","style/images/organization15.png","style/images/organization16.png","style/images/organization17.png","style/images/organization18.png","style/images/organization19.png","style/images/organization20.png","style/images/organization22.png","style/images/organization23.png","style/images/organization24.png","style/images/organization25.png"]
    var Partners=["style/images/Partner1.png","style/images/Partner2.png","style/images/Partner3.png","style/images/Partner4.png","style/images/Partner5.png","style/images/Partner6.png","style/images/Partner7.png","style/images/Partner8.png","style/images/Partner9.png","style/images/Partner10.png","style/images/Partner11.png","style/images/Partner12.png","style/images/Partner13.png","style/images/Partner14.png","style/images/Partner15.png","style/images/Partner16.png","style/images/Partner17.png","style/images/Partner18.png","style/images/Partner19.png","style/images/Partner20.png","style/images/Partner21.png","style/images/Partner22.png","style/images/Partner23.png","style/images/Partner24.png"]
    var Partners_list=$(".Partners_list")
    $(Partners_list[0]).css({"border-bottom":"2px solid #6fba2c","color":"#6fba2c"})
    for(var i=0;i<organization.length;i++){
        var organizationobj=$('.organization')
        var index=i
        var organization_str
        var icon=organization[i]
        var leng=organization.length
        ciyun.ciyunIndex. partner(organizationobj,index,organization_str,icon)
    }
    if(organization.length>=15){
        var str="<div class='tbnicon'><div>展开</div></div>"
        $('.organization').append(str)
        $('.organization').css({"height":"288px"})
        $('.floor6').css({"padding-bottom":"188px"})
    }
    for(var i=0;i<Partners.length;i++){
        var Partner=$('.partner')
        var index=i
        var Partner_str
        var icon=Partners[i]
        var leng=Partners.length
        ciyun.ciyunIndex.partner(Partner,index,Partner_str,icon)
    }
    if(Partners.length>=15){
        var str="<div class='tbnicon'><div>展开</div></div>"
        $('.partner').append(str)
        $('.partner').css({"height":"288px"})
        $('.floor6').css({"padding-bottom":"188px"})
    }
    $('.organization .tbnicon div').click(function(){
        var organization=$('.organization')
         ciyun.ciyunIndex.Partner_click(this,organization)
    })
    $('.partner .tbnicon div').click(function(){
        var organization=$('.partner')
         ciyun.ciyunIndex.Partner_click(this,organization)
    })
    $(Partners_list).click(function(){
        var show=$(".floor6_box")
        $('.tbnicon div').text("展开")
        var i=$(this).index();
        $(Partners_list).css({"border-bottom":"0","color":"#666666"})
        $(Partners_list[i]).css({"border-bottom":"2px solid #6fba2c","color":"#6fba2c"})
        $(show).hide()
        $(show[i]).show()
        var len= $(show[i]).find('.floor6_list').length;
        if(len>=15){
            $('.partner').css({"height":"288px"})
            $('.organization').css({"height":"288px"})
            $('.floor6').css({"padding-bottom":"188px"})
        }else{
            $('.floor6').css({"padding-bottom":"84px"})
        }

    })
// >>centent-end====================================================
});