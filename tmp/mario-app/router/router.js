const router = require('koa-router')();

// module.exports = ctx => {
//     const { router, controller } = ctx;
//     console.log(router);
router.get('/user', async (ctx, next) => await ctx.controller.user.page(ctx, next))
    .get('/user/:id', async (ctx, next) => await ctx.controller.user.get(ctx, next))
    .post('/user', async (ctx, next) => await ctx.controller.user.post(ctx, next))
    .put('/user/:id', async (ctx, next) => await ctx.controller.user.put(ctx, next))
    .del('/user/:id', async (ctx, next) => await ctx.controller.user.del(ctx, next));
//     return router;
// };

module.exports = router