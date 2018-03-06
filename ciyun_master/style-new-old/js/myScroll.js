/*
<div class="tbkt_scroll" id="tbkt_scroll">
	<input type="button" id="Tleft" class="left_tb_btn" />
	<input type="button" id="Tright" class="right_tb_btn" />
	<div class="tbkt_in">
		<ul id="tbkt_in_list">
			<li><a href="javascript:void(0)"  ><img src="../style/images/temp/manhua_1.jpg" /></a></li>
			<li><a href="javascript:void(0)"  ><img src="../style/images/temp/manhua_2.jpg" /></a></li>
			<li><a href="javascript:void(0)"  ><img src="../style/images/temp/manhua_3.jpg" /></a></li>
			<li><a href="javascript:void(0)"  ><img src="../style/images/temp/manhua_4.jpg" /></a></li>
			<li><a href="javascript:void(0)"  ><img src="../style/images/temp/manhua_5.jpg" /></a></li>
		</ul>
	</div>
</div>
*/


var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}

var myScroll = Class.create();
myScroll.prototype = {
	 SetOptions: function(_options) {
		this.options = {//默认值
			scrollWrap:     _options.scrollWrap,
			leftBtn:		$(_options.leftT),
			rightBtn:		$(_options.rightT),
			scrollBox:      _options.scrollBox,
			colNum:			_options.rowNum,
			oneScrollNum:   _options.oneScrollNum,
			slength:		$(_options.scrollBox+' li').length,    //滚动内容总个数
			liWidth:		$(_options.scrollBox+' li').outerWidth(true)*_options.oneScrollNum, //一个滚动内容的width+padding+border
			m:			    0,        //记录滚动
			stop:	        _options.autoRun,     //默认自动滚动
			Rspeed:         "normal", //滚动的速度
			Rtime:          3000      //每次滚动间隔时间
		};
	 },
	 initialize: function(_options) {
		var opSize = 0;
		for(var n in _options){opSize++;}
		//if(opSize!=5){alert('函数参数输入有误！');return false};
		this.SetOptions(_options);
		this.bindBtn(this.options.scrollBox);
		this.checkRoll();
		this.run =	setInterval(function(_this){ return function(){_this.autoRoll(_this.options.scrollBox);}}(this),this.options.Rtime)
		this.options.stop && this.runHover(this.options.scrollWrap,this.options.scrollBox);
	  },
	 autoRoll: function(box){
		if(this.options.stop){
			if(this.options.slength-this.options.m>this.options.colNum){
				var mgLeft = $(box).css('left');
				$(box).animate( { left:parseInt(mgLeft)-(this.options.liWidth*this.options.colNum)+'px' }, this.options.Rspeed);
				this.options.m+=parseInt(this.options.colNum);
				this.checkRoll();
			}else{
				$(box).animate( { left:'0px' }, this.options.Rspeed);
				this.options.m=0;
				this.checkRoll();
			}
		}
	  },
	  bindBtn: function(box){
		var self =this;
		this.options.leftBtn.bind('click',{a : 'left', b : box , c : self},self.Gobtn);
		this.options.rightBtn.bind('click',{a : 'right', b : box , c : self},self.Gobtn);
	  },
	  Gobtn: function(e){
			if($(e.data.b).is(":animated")) return ;
			var mgLeft = $(e.data.b).css('left');
			if(e.data.a=="left"){
				$(e.data.b).animate( { left:parseInt(mgLeft)+e.data.c.options.liWidth+'px' }, 'fast');
				//e.data.c.options.m--;
				e.data.c.options.m=e.data.c.options.m-e.data.c.options.oneScrollNum;
			}else{
				$(e.data.b).animate( { left:parseInt(mgLeft)-e.data.c.options.liWidth+'px' } , 'fast');
				e.data.c.options.m=e.data.c.options.m+e.data.c.options.oneScrollNum;
				//e.data.c.options.m++;
			}
			e.data.c.checkRoll();
	  },
	  checkRoll: function(){
		var opt = this.options;
		if(opt.slength <=opt.colNum || opt.slength-opt.m<=opt.colNum){
			opt.rightBtn.addClass('no_right').attr('disabled','disabled');
		}
		else{
			opt.rightBtn.removeClass('no_right').removeAttr('disabled');;
		}
		if(opt.m==0){
			opt.leftBtn.addClass('no_left').attr('disabled','disabled');
		}
		else{
			opt.leftBtn.removeClass('no_left').removeAttr('disabled');
		}
	  },
	  runHover: function(Sbox,box){
		var self=this;
		$(Sbox).hover(function(){
				self.options.stop = false;
				clearInterval(self.run);
			},function(){
				self.options.stop = true;
				self.run = setInterval(function(_this){ return function(){_this.autoRoll(box);}}(self),self.options.Rtime)
		});
	  }
}
var scrollWid = $("#tbkt_scroll").width();
var scrollNum = parseInt(scrollWid/300);
if($("#tbkt_in_list li").length<scrollNum){
	scrollNum = $("#tbkt_in_list li").length;
}
//alert(scrollNum);
new myScroll({
	scrollWrap:'#tbkt_scroll', //外层scroll容器id
	leftT:'#Tleft',          //向左滚动按钮id
	rightT:'#Tright',        //向右滚动按钮id
	scrollBox:'#tbkt_in_list',//滚动容器id
	rowNum:scrollNum,	//展示个数或滚动个数
	autoRun:false,
	oneScrollNum:3 //一次性滚动个数
});

/*new myScroll({
	scrollWrap:'#ms_scroll', //外层scroll容器id
	leftT:'#ms_Tleft',          //向左滚动按钮id
	rightT:'#ms_Tright',        //向右滚动按钮id
	scrollBox:'#ms_in_list',//滚动容器id
	rowNum:'5'               
});*/

