<template>
	<div class="left_content">
		<el-tabs v-model="current" type="card" stretch class="tabs">
			<el-tab-pane label="活动页面" name="item">
				<ul class="page_item">
					<li v-for="i in itemList" :data-id="i.id" @click="showItem(i.id)">
						<div></div>
						<span>{{i.title}}</span>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="页面主题" name="theme">
				<ul class="theme_page">
					<li v-for="(item, index) in themeList" @click="selectTheme(item)" >
						<img :src="item.img" alt="" :class="[item.active ? 'select_item' :'']">
						<span>{{item.text}}</span>
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
		<section class="panel_phone">
			<div class="phone_wrap">
				<div class="p_head"></div>
				<div class="p_name">幸运大转盘</div>
				<div class="main_content" :style="phoneTheme">
					<vue-drag-resize @resizing="resize_logo_img" @dragging="resize_logo_img" class="logo_img" :isActive="false" :w="toBeSend.logo_img.width" :h="toBeSend.logo_img.height" :x="toBeSend.logo_img.left" :y="toBeSend.logo_img.top" @dblclick.native="displayControl.logo_img = true">
						<my-upload field="img"
								   :value.sync="show"
								   @crop-success="load_logo_img"
								   @src-file-set="getFile"
								   v-model="displayControl.logo_img"
								   :width="30"
								   :height="30"
								   ></my-upload>
						<label><span>+</span></label>
						<img :src="toBeSend.logo_img.img" alt="">
						<span ></span>
					</vue-drag-resize>
					<div class="logo" contenteditable="true" @keyup="bindTitleText($event)">
						<div class="logo_main">{{toBeSend.logo.content}}</div>
					</div>
					<vue-drag-resize @resizing="resize_rule_img" @dragging="resize_rule_img" class="rule_img" :x="toBeSend.rule_img.left" :y="toBeSend.rule_img.top" :isActive="false" :w="toBeSend.rule_img.width" :h="toBeSend.rule_img.height" @dblclick.native="displayControl.rule_img = true">
						<my-upload field="img"
								   @crop-success="load_rule_img"
								   v-model="displayControl.rule_img"
								   :width="30"
								   :height="30"
								   ></my-upload>
						<label><span>+</span></label>
						<img :src="toBeSend.rule_img.img" alt="">
					</vue-drag-resize>
					<div class="rule_modal" v-show="isShow">
						<div class="rule_wrap">
							<p>活动说明</p>
							<div :contenteditable="edit.rule" @click="edit.rule = true" @keyup="bindRuleText($event)">
								<p class="rule_text" >{{toBeSend.ruleContent}}</p>
							</div>
							<button class="confirm">确定</button>
						</div>
					</div>
					<vue-drag-resize @resizing="resize_roller" @dragging="resize_roller" :x="toBeSend.roller.left" :y="toBeSend.roller.top" :isActive="false" :w="toBeSend.roller.width" :h="toBeSend.roller.height" :isResizable="false">
						<div class="roller">
							<div><span></span><span></span></div>
							<div><span></span><span></span></div>
							<div><span></span><span></span></div>
							<div><span></span><span></span></div>
						</div>
					</vue-drag-resize>
				</div>
				<div class="phone_bottom"></div>
			</div>
		</section>
	</div>
</template>
<script>
import myUpload from 'vue-image-crop-upload';
import $ from "jquery";
export default {
	name:'main_content',
	components: {
		'my-upload': myUpload
	},
	data() {
		return {
			isShow:false,
			edit:{
				store_name:false,
				rule:false
			},
			show:true,
			current: 'item',
			itemList:[
				{title:'活动首页',id:'index'},
				{title:'活动规则',id:'rule'}
			],
			displayControl:{
				logo_img:false,
				rule_img:false,
			},
			themeList:[
				{text:'主题1',img:require('../assets/image/theme1.jpg'),active:true},
				{text:'主题2',img:require('../assets/image/theme2.jpg'),active:false},
				{text:'主题3',img:require('../assets/image/theme3.jpg'),active:false},
				{text:'主题4',img:require('../assets/image/theme4.jpg'),active:false},
				{text:'主题5',img:require('../assets/image/theme5.jpg'),active:false},
			],
			toBeSend:{
				background_image:require('../assets/image/theme1.jpg'),
				ruleContent:'请填入活动时间、活动说明、相关规则、客服电话等告知参与者的信息，以上信息消费者可在手机页面下的活动规则中查看',
				logo_img:{
					height:50,
					width:50,
					top:0,
					left:0,
					img:require('../assets/image/hhd.png')
				},
				logo:{
					height:30,
					width:100,
					top:20,
					left:80,
					content:'商户名称'
				},
				rule_img:{
					height:30,
					width:70,
					top:10,
					left:250,
					img:require('../assets/image/rule.png')
				},
				roller:{
					height:270,
					width:270,
					top:250,
					left:30
				}
			}

		};
	},
	computed:{
		phoneTheme(){
			return {
				backgroundImage:`url(${this.toBeSend.background_image})`
			}
		}
	},
	methods: {
		getFile(fileName, fileType, fileSize){
		},
		//监听输入事件，绑定输入的活动规则内容到对象中
		bindRuleText(e) {
			this.toBeSend.ruleContent = e.target.textContent;
		},
		bindTitleText(e) {
			this.toBeSend.logo.content = e.target.textContent;
		},

		//控制页面元素的显示状态
		showItem(id) {
			switch(id) {
				case 'index':
					this.isShow = false;
					break;
				case 'rule':
					this.isShow = true;
					break;
			}
		},
		BindPageSnapshot() {
			$('.page_item li').map((k, v) => {
				let modal = document.createElement('div');
				modal = $(modal).css({
					'height':'100%',
					'width':'100%',
					'position':'absolute',
					'top':'0',
					'left':'0',
					'z-index':'999',
					'background-color':'transparent'
				});
				let node;
				switch(v.dataset.id) { //根据元素绑定的data-id判断页面的快照内容

					case 'index'://首页
						node = $('.main_content')[0].cloneNode(true);
						$(node).find('.roller').css('animation-play-state', 'paused'); //将快照内的动画停止
						$(node).append(modal); //给快照页面加入modal层，屏蔽元素
						$(node).find('.rule_modal').css('display','none');
						$(node).prependTo($(v).children('div'));
						break;

					case 'rule'://活动规则说明
						node = $('.main_content')[0].cloneNode(true);
						$(node).find('.roller').css('animation-play-state', 'paused');
						$(node).append(modal);
						$(node).find('.rule_modal').css('display','flex');
						$(node).prependTo($(v).children('div'));
						break;
				}
			})
		},
		load_logo_img(imgDataUrl, field){
			console.log(field)
			this.toBeSend.logo_img.img = imgDataUrl;
		},
		load_rule_img(imgDataUrl, field) {
			this.toBeSend.rule_img.img = imgDataUrl;
		},
		selectTheme(item) {
			for (let i of this.themeList) {
				i.active = false;
			}
			this.toBeSend.background_image = item.img;
			item.active = true;
			$(".page_item li .main_content").css('background-image',`url(${item.img})`);
		},
		bindEvent() {
			this.$bus.$on('actionSave',() => {
				console.log(this.toBeSend);
				console.log('save');
			});
			this.$bus.$on('actionPreview',() => {
				console.log('preview');
			})
		},

		//获取调整过的元素的位置和大小
		resize_logo_img(element) {
			const target = this.toBeSend.logo_img;
			target.height = element.height;
			target.width = element.width;
			target.top = element.top;
			target.left = element.left;
		},

		resize_logo(element) {
			const target = this.toBeSend.logo;
			target.height = element.height;
			target.width = element.width;
			target.top = element.top;
			target.left = element.left;
		},
		resize_rule_img(element) {
			const target = this.toBeSend.rule_img;
			target.height = element.height;
			target.width = element.width;
			target.top = element.top;
			target.left = element.left;
		},
		resize_roller(element) {
			const target = this.toBeSend.roller;
			target.top = element.top;
			target.left = element.left;
		}
	},
	mounted() {
		this.BindPageSnapshot();
		this.bindEvent();
		console.log(this)
	}
}
</script>
<style lang="scss">
.left_content{
	float:left;
	height:calc(100% - 80px);
	.el-tabs__content{
		width:260px;
		padding:20px;
		box-sizing:border-box;
	}
	.theme_page{
		li:nth-of-type(odd){
			margin-right:20px;
		}
		li{
			cursor:pointer;
			height:180px;
			width:100px;
			float:left;
			box-sizing:border-box;
			img{
				width:100%;
				height:80%;
				display:block;
				border:2px solid transparent;
			}
			.select_item{
				border-color:#f54545;
			}

			span{
				display:block;
				height:20%;
				text-align:center;
				line-height:2.5;
			}
		}
	}
	.tabs{
		float:left;
		height:100%;
	}
	.el-tabs__header{
		margin:0;
	}
	.panel_phone{
		height:100%;
		float:left;
		overflow: hidden;
		background-color:#38373c;
		display:flex;
		justify-content:center;
		align-content:center;
	}
	.phone_wrap{
		margin-top:20px;
		margin-left:50px;
		margin-right:50px;
	}
	.p_head{
		width:326px;
		height:45px;
		background-color:#fff;
		border-radius:45px 45px 0 0;
	}
	.p_name{
		background-color:#000;
		line-height:40px;
		color:#fff;
		text-align:center;
	}
	.main_content .logo{
		position:absolute;
		top:20px;
		left:80px;
		outline: none;
		min-height:30px;
		min-width:100px;
		border:1px solid transparent;
	}
	.logo:hover{
		border-style:dashed;
		border-color:#aaa;
		cursor:move
	}
	.logo:hover .ui-resizable-se{
		display:block !important;
	}
	.main_content{
		position:relative;
		width:326px;
		height:550px;
		background:url(../assets/image/theme1.jpg) no-repeat 0 0;
		background-size:100% 100%;
	}
	.logo_main{
		color:#fff;
		z-index:100;
		word-wrap:break-word;
		word-break:break-all;
	}
	.logo .ui-resizable-se{
		display:none !important;
	}
	.phone_bottom{
		width:326px;
		height:55px;
		background-color:#fff;
		border-radius:0 0 45px 45px;
	}
	.logo_img{
		position:absolute !important;
		top:10px;
		left:10px;
		height:50px;
		width:50px;
	}
	.rule_img{
		position:absolute !important;
		top:10px;
		right:10px;
		height:40px;
		width:70px;
	}
	.logo_img img, .rule_img img{
		width:100%;
		height:100%;
	}
	.logo_img input, .rule_img input{
		height:100%;
		width:100%;
		position:absolute;
		top:0;
		left:0;
		opacity:0;
		cursor:pointer;
		display:none;
	}
	.logo_img label, .rule_img label{
		height:100%;
		width:100%;
		position:absolute;
		top:0;
		left:0;
		background:#aaa;
		opacity:0.4;
		display:none;
		align-items:center;
		justify-content:center;
		font-size:25px;
		line-height:50px;
		color:#fff;
		cursor:pointer;
	}
	.logo_img:hover label, .rule_img:hover label{
		display:flex;
	}
	.logo_img .ui-resizable-se, .rule_img .ui-resizable-se{
		display:none !important;
	}
	.logo_img:hover .ui-resizable-se, .rule_img:hover .ui-resizable-se{
		display:block !important;
	}
	.rule_modal{
		width: 100%;
		height: 100%;
		min-height: 100%;
		margin: 0 auto;
		display:flex;
		justify-content:center;
		align-items:center;
		background: rgba(0,0,0,0.7);
		text-align: center;
		z-index:200;
		position:absolute;
	}
	.rule_wrap{
		position: relative;
		width: 300px;
		height: auto;
		margin: 0 auto;
		margin-top: -30px;
		background: #fff9eb;
		border-radius: 5px;
	}
	.rule_wrap>p{
		padding: 3% 3%;
		text-align: center;
		position: relative;
		background-color:#ed3f41;
		border-radius:5px 5px 0 0;
		color:#fff;
	}
	.rule_wrap div{
		text-align:left;
		height:130px;
		box-sizing:border-box;
		width:100%;
		padding:5%;
		overflow:hidden;
	}
	.rule_wrap .confirm{
		display:block;
		width:100%;
		padding: 3% 3%;
		text-align: center;
		position: relative;
		background-color:#ed3f41;
		border-radius:0 0 5px 5px;
		color:#fff;
	}
	.rule_wrap div p{
		box-sizing:border-box;
		padding:3%;
		height:100%;
		overflow:auto;
		color:#777;
		font-size:12px;
		text-align:left;
		border:1px solid transparent;
		outline:none;
	}
	.rule_wrap div p:hover{
		border:1px dashed #aaa;
	}
	.rule_wrap div p::-webkit-scrollbar {
		background-color:#eee;
		width:7px;
	}
	.rule_wrap div p::-webkit-scrollbar-thumb {
		width:5px;
		background-color:#aaa;
		border-radius:2.5px;
	}
	.roller{
		width:270px;
		height:270px;
		border-radius:135px;
		border:2px solid orange;
		cursor:move;
		animation:rollAnimation 8s linear 1s infinite;
	}
	.roller div{
		position:absolute;
		left:-1px;
		top:50%;
		transform:translateY(-50%);
		width:100%;
		height:3px;
	}
	.roller div span{
		position:absolute;
		width:8px;
		height:8px;
		border-radius:8px;
		border:2px solid orange;
		transform:translateY(-50%);
		background:orange;
	}
	.roller div span:nth-of-type(1){
		left:-7px;
	}
	.roller div span:nth-of-type(2){
		right:-7px;
	}
	.roller div:nth-of-type(2){
		transform:rotateZ(45deg);
	}
	.roller div:nth-of-type(3){
		transform:rotateZ(90deg);
	}
	.roller div:nth-of-type(4){
		transform:rotateZ(135deg);
	}
	@keyframes rollAnimation
	{
		from{
			transform-origin:center center;
			transform:rotateZ(0deg);
		}
		to{
			transform-origin:center center;
			transform:rotateZ(360deg);
		}
	}
}
.page_item li{
	margin-right: 10px;
	cursor: pointer;
	height: 180px;
	width: 100px;
	float: left;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	div{
		height:165px;

	}
	span{
		display:block;
		text-align:center;
	}

}
.page_item li .main_content{
	transform:scale(0.3);
	transform-origin:left top;
}
</style>
<style>
.left_content .theme_page li {
	cursor: pointer;
	height: 180px;
	width: 100px;
	float: left;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
</style>
