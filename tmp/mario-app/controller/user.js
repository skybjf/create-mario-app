const user = function () {
    const config = {}
    // 页面
    config.page = async (ctx, next) => {
        const { pool } = ctx;
        const result = await ctx.service.user.getAll(pool);
        await ctx.render('./user.html', {
            user: result
        });
    }
    // 查询
    config.get = async (ctx, next) => {
        const { pool } = ctx;
        const result = await ctx.service.user.getById(pool, ctx.params.id);
        ctx.body = result
    }
    // 增加
    config.post = async (ctx, next) => {
        ctx.body = ctx.request.body
    }
    // 删除
    config.del = async (ctx, next) => {
        ctx.body = ctx.params
    }
    // 更新
    config.put = async (ctx, next) => {
        ctx.body = ctx.params
    }
    return config
}()
module.exports = user;