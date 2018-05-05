// 引入包装口的koa
const Mario = require('mario-node');
// 其他的koa组件
const KoaStatic = require('koa-static');
const views = require('koa-views');
const bodyPaser = require('koa-bodyparser');
const path = require('path');

const app = new Mario({
    baseDir: path.resolve(__dirname)
});

app.loadMysql();
/** 
 * bodyPaser
 * 格式化完之后放在 ctx.request.body
 */
app.use(bodyPaser());

/**
 * 模板 中间件
 * 且必须放在路由前面
 */
app.use(views(path.resolve(__dirname, 'view'), {
    map: {
        html: 'nunjucks' // 选用的模板语言
    }
}));

/**
 * 静态文件  中间件
 */
app.use(KoaStatic(path.resolve(__dirname, 'static')))

const router = require('./router/router.js');
app.use(router.routes());


app.listen(3000)