const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaCors = require('koa2-cors');
const KoaBody = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// 初始化应用加载器
const AppLoader = require('./loader');
const loader = new AppLoader(app);

async function startServer() {
  try {
    // 加载所有模块
    await loader.initialize();

    // 基础中间件
    app.use(KoaCors(app.config.get('server.cors')));
    app.use(KoaBody());

    // 基础路由
    router.get('/', async (ctx) => {
      ctx.success({
        message: 'Welcome to VueTemp001 API',
        docs: '/api/health'
      });
    });

    router.get('/health', async (ctx) => {
      ctx.success(app.healthCheck());
    });

    // API 路由
    router.get('/api/users', async (ctx) => {
      const UserController = app.controllers.getController('UserController');
      if (UserController) {
        await UserController.list(ctx);
      } else {
        ctx.error('UserController not found', 500);
      }
    });

    router.post('/api/users', async (ctx) => {
      const UserController = app.controllers.getController('UserController');
      if (UserController) {
        await UserController.create(ctx);
      } else {
        ctx.error('UserController not found', 500);
      }
    });

    router.get('/api/users/:id', async (ctx) => {
      const UserController = app.controllers.getController('UserController');
      if (UserController) {
        await UserController.get(ctx);
      } else {
        ctx.error('UserController not found', 500);
      }
    });

    router.put('/api/users/:id', async (ctx) => {
      const UserController = app.controllers.getController('UserController');
      if (UserController) {
        await UserController.update(ctx);
      } else {
        ctx.error('UserController not found', 500);
      }
    });

    router.delete('/api/users/:id', async (ctx) => {
      const UserController = app.controllers.getController('UserController');
      if (UserController) {
        await UserController.delete(ctx);
      } else {
        ctx.error('UserController not found', 500);
      }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    // 启动服务器
    const port = app.config.get('server.port', 3000);
    const host = app.config.get('server.host', 'localhost');

    app.listen(port, host, () => {
      loader.onReady();
    });

  } catch (error) {
    console.error('❌ 应用启动失败:', error);
    process.exit(1);
  }
}

// 启动应用
startServer();

module.exports = app;