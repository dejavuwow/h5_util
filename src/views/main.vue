<template>
	<div class="left_content">
		<el-tabs v-model="current" type="card" @tab-click="handleClick" stretch class="tabs">
			<el-tab-pane label="活动页面" name="item">
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
					<div class="logo_img">
						<img src="../assets/image/hhd.png" alt="">
						<label for="file"><span>+</span></label>
						<input id="file" title="" type="file">
					</div>
					<div class="logo">
						<div class="logo_main">商户名称</div>
					</div>
					<div class="rule_img">
						<img src="../assets/image/rule.png" alt="">
						<label for="rule"><span>+</span></label>
						<input id="rule" title="" type="file">
					</div>
					<div class="rule_modal">
						<div class="rule_wrap">
							<p>活动说明</p>
							<div>
								<p class="rule_text">请填入活动时间、活动说明、相关规则、客服电话等告知参与者的信息，以上信息消费者可在手机页面下的活动规则中查看</p>
							</div>
							<button class="confirm">确定</button>
						</div>
					</div>
					<div class="roller">
						<div><span></span><span></span></div>
						<div><span></span><span></span></div>
						<div><span></span><span></span></div>
						<div><span></span><span></span></div>
					</div>
				</div>
				<div class="phone_bottom"></div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	name:'main_content',
	data() {
		return {
			current: 'item',
			baseUrl: process.env.BASE_URL,
			themeList:[
				{text:'主题1',img:require('../assets/image/theme1.jpg'),active:true},
				{text:'主题2',img:require('../assets/image/theme2.jpg'),active:false},
				{text:'主题3',img:require('../assets/image/theme3.jpg'),active:false},
				{text:'主题4',img:require('../assets/image/theme4.jpg'),active:false},
				{text:'主题5',img:require('../assets/image/theme5.jpg'),active:false},
			],
			activeImage:require('../assets/image/theme1.jpg'),
		};
	},
	computed:{
		phoneTheme(){
			return {
				backgroundImage:`url(${this.activeImage})`
			}
		}
	},
	methods: {
		selectTheme(item) {
			for (let i of this.themeList) {
				i.active = false;
			}
			this.activeImage = item.img;
			item.active = true;
		},
		handleClick(tab, event) {
			console.log(tab, event);
		}
	},
	created() {
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
		height:30px;
		width:100px;
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
		display:none;
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
		position:absolute;
		bottom:20px;
		left:8%;
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
</style>
