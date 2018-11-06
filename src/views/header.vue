<template>
	<div class="header">
		<ul>
			<li v-for="(item, index) in actionList" @click="action(item.title)">
				<i :class="item.icon"></i>
				<span>{{item.title}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name:'navbar',
	data() {
		return {
			actionList:[
				{title:'预览',icon:'fa fa-qrcode'},
				{title:'保存',icon:'fa fa-floppy-o'},
				{title:'发布',icon:'fa fa-paper-plane'},
			],
		};
	},
	methods:{
		action(title) {
			switch(title) {
				case '预览':
					this.$bus.$emit('actionPreview');
					break;
				case '保存':
					this.$bus.$emit('actionSave');
					break;
			}
		}
	},
}
</script>
<style lang="scss">
.header{
	height:80px;
	width:100%;
	background-color:#efefef;
	ul{
		height:100%;
		float:right;
		@include flex(row,center);
	}
	li{
		@include flex(column,center);
		align-items:center;
		height:100%;
		width:80px;
		text-align:center;
		cursor:pointer;
		&:hover{
			background-color:#666;
			color:#fff;
		}
		i{
			display:block;
			line-height:25px;
			text-align:center;
			font-size:20px;
			height:25px;
			margin-bottom:10px;
		}
	}
}
</style>
