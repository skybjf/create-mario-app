var fs = require('fs');
var stat = fs.stat;
const path = require("path");

// 拷贝
var copy = function (src, dst) {
    //读取目录
    const paths = fs.readdirSync(src);
    // 目录循环
    paths.forEach(function (item) {
        // 读取目录和目标目录拼接
        var _src = path.resolve(src, item);
        var _dst = path.resolve(dst, item);
        // 获取文件状态
        // 目录或者文件
        const stats = fs.statSync(_src);
        if (stats.isFile()) {
            fs.copyFileSync(_src, _dst);
        } else if (stats.isDirectory()) {
            copyfileSync(_src, _dst, copy);
        }
    });
}

// 判断目标文件夹里 有没有 源文件的目录
// 有：去拷贝源文件夹里面的内容
// 无：去创建，并且再执行拷贝操作
var copyfileSync = function (src, dst) {
    //测试某个路径下文件是否存在
    const exists = fs.existsSync(dst);
    if (exists) {//不存在
        copy(src, dst);
    } else {//存在
        fs.mkdirSync(dst)//创建目录
        copy(src, dst);
    }
}

module.exports = copyfileSync;