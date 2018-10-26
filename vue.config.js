//自定义配置
module.exports = {
	baseUrl:'./',
	outputDir:'h5_util_pak',
    assetsDir:'static',
	css: {
		loaderOptions: {
      	sass: {
        		data: `@import "@/assets/sass/index.scss";`
        	}
        }
    },
    devServer:{
    	open:true,
    }
}