/***
 *
 * @param url   要读取的URL地址
 * @param callback   回调函数
 * 读取URL中的响应体 并且提取其中的电影列表并传给callback
 */
var request=require('request');
var iconv=require('iconv-lite');
var cheerio=require('cheerio');
var debug=require('debug');//写日志
var logger=debug('crawl:read');//日志记录器：项目名：模块名
module.exports=function (url, callback) {
    //读取传入的URL地址 并得到响应体body
    request({url,encoding:null},function (err, response, body) {
        //响应体是gbk   转成utf8格式       、
        body=iconv.decode(body,'gbk');
        var movies=[];
        //响应体字符串转换成类似jQuery的对象
        var $=cheerio.load(body);
        //通过筛选找出我们想要的电影标题
        $('.keyword .list-title').each(function () {
            var $this=$(this);
            var movie={
                name:$this.text(),//电影名称
                url:$this.attr('href')//电影URL地址
            };

            logger(`读取到电影:${movie.name}`);
            movies.push(movie);
        });
        callback(err,movies);
    })
};

/*
var url='http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
module.exports(url,function (err, movies) {
    console.log(movies);
});*/
