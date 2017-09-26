#!/usr/bin/env node

//引入用到的模块
var shell = require("shelljs");
var fs = require('fs');
var nunjucks = require('nunjucks');
var path = require('path');
var dateFormat = require('dateformat'); 
//定义变量
var tpl_path = 'D:/GitHubRepo/Blog/post_tpl/A-mrd-temp.md';
var gen_path = 'D:/GitHubRepo/Blog/source/_posts';
var fname;
var title="temp";
var now = new Date();
var dtime=dateFormat(now);//使用挺好看的默认格式
var fnamePre=dateFormat(now,"yymmdd");//生成文件名前缀
var tags;

//逻辑部分
var argv = require('yargs')
	.option('f',{
		alias: 'from',
		demand: false,
		default: tpl_path,
		describe: 'template path',
		type: 'string'
	})
	.option('t',{
		alias: 'to',
		demand: false,
		default: gen_path,
		describe: 'generate path',
		type: 'string'
	})
	.usage('Usage: mrd <fileName> [title] [tag1 tag2 ……]')
	.example('mrd test', '根据默认模板在默认路径下创建test.md')
	.help('h')
	.alias('h', 'help')
	.epilog('copyright 2017')
	.argv;

// fileName 如果没有任何命令和参数则打印帮助
if(argv._[0]){
	fname=fnamePre+"-"+argv._[0];
}else{
	//shell.exec("node mrd.js -h");//开发环境
	shell.exec("mrd -h");//生产环境
	process.exit(0);
	
}
// title
if(argv._[1]){
	title = argv._[1];
}
//tags
if(argv._[2]){
	tags=argv._.slice(2);

}

//路径规范化
argv.f=path.normalize(argv.f);
argv.t=path.normalize(argv.t);
//判断生成文件的路径是否存在
if(!fs.existsSync(argv.t)){
	fs.mkdirSync(argv.t);
}
//读取模板文件
var tpl = fs.readFileSync(argv.f).toString();
//填充模板数据
var compiledData = nunjucks.renderString(tpl,{title:title,dtime:dtime,tags:tags});
var fpath= path.join(argv.t,fname+'.md');//合成生成文件的路径
//根据模板生成文件
fs.writeFileSync(fpath, compiledData);
//用默认程序打开新生成的文件
shell.exec(fpath);