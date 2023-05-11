let proxyObj={};


proxyObj['/']={
	// target:'http://43.138.9.213:8090', 
	target:'http://localhost:8090', 
	chageOrigin:true,
	pathRewrite:{
	  '^/api':'/'
	}
  },

module.exports = {
	publicPath: "/",
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	assetsDir: 'assets',
	// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
	indexPath: 'index.html',
  
	devServer:{
	  host: 'localhost',
	  port: 8080,
	  proxy: proxyObj
	},


	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'api': '@/api',
				'views': '@/views',
				'plugins': '@/plugins'
			}
		}
	},
	
}





