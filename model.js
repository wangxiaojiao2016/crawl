let mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/zfCrawl');
var MovieSchema=new mongoose.Schema({
    name:String,
    url:String
});
//定义模型
module.exports=mongoose.model('Movie',MovieSchema);