/**
 * 路由加载器
 * 负责加载和注册所有路由
 */

const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');

class RouterLoader {
  constructor(app) {
    this.app = app;
    this.routerPath = path.join(__dirname, '../routes');
    this.routes = new Map();
    this.router = new KoaRouter();
  }

  /**
   * 加载所有路由
   */
  load() {
    if (!fs.existsSync(this.routerPath)) {
      fs.mkdirSync(this.routerPath, { recursive: true });
      this.createDefaultRoutes();
      return;
    }

    const routeFiles = fs.readdirSync(this.routerPath)
      .filter(file => file.endsWith('.js') && !file.startsWith('_'));

    // 先加载基础路由
    this.loadCoreRoutes();

    // 加载用户定义的路由
    routeFiles.forEach(file => {
      try {
        const routeName = path.basename(file, '.js');
        const routeModule = require(path.join(this.routerPath, file));

        if (typeof routeModule === 'function') {
          // 如果是函数，直接作为中间件使用
          this.router.use(routeModule);
        } else if (typeof routeModule === 'object') {
          // 如果是对象，注册路由
          this.registerRoutes(routeName, routeModule);
        }

        this.routes.set(routeName, routeModule);
        console.log(`✓ 已加载路由: ${routeName}`);
      } catch (error) {
        console.error(`✗ 加载路由失败 ${file}:`, error.message);
      }
    });

    // 将路由中间件添加到应用
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  /**
   * 注册路由组
   */
  registerRoutes(prefix, routes) {
    Object.keys(routes).forEach(routeKey => {
      const route = routes[routeKey];

      if (this.isValidRoute(route)) {
        const fullPath = route.prefix ? `/${prefix}${route.prefix}` : `/${prefix}`;
        const method = route.method.toLowerCase();

        if (typeof this.router[method] === 'function') {
          this.router[method](fullPath, ...(route.middleware || []), route.handler);
          console.log(`  └─ ${route.method.toUpperCase()} ${fullPath}`);
        }
      }
    });
  }

  /**
   * 验证路由配置
   */
  isValidRoute(route) {
    return route &&
           typeof route === 'object' &&
           route.method &&
           route.handler &&
           typeof route.handler === 'function';
  }

  /**
   * 加载核心路由
   */
  loadCoreRoutes() {
    // 健康检查路由
    this.router.get('/health', async (ctx) => {
      ctx.success({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // 根路由
    this.router.get('/', async (ctx) => {
      ctx.success({
        message: 'Welcome to VueTemp001 API',
        version: '1.0.0',
        documentation: '/docs',
        health: '/health',
        api: {
          users: '/api/users',
          auth: '/api/auth'
        }
      });
    });

    // 404 处理
    this.router.all('(.*)', async (ctx) => {
      ctx.error('Route not found', 404);
    });

    console.log('✓ 已加载核心路由: health, root, 404');
  }

  /**
   * 创建默认路由文件
   */
  createDefaultRoutes() {
    // 用户路由
    const userRoutes = `
const UserController = require('../controllers/UserController');

module.exports = {
  // 获取用户列表
  list: {
    method: 'GET',
    prefix: '/api/users',
    handler: UserController.list.bind(UserController)
  },

  // 创建用户
  create: {
    method: 'POST',
    prefix: '/api/users',
    handler: UserController.create.bind(UserController)
  },

  // 获取单个用户
  get: {
    method: 'GET',
    prefix: '/api/users/:id',
    handler: UserController.get.bind(UserController)
  },

  // 更新用户
  update: {
    method: 'PUT',
    prefix: '/api/users/:id',
    handler: UserController.update.bind(UserController)
  },

  // 删除用户
  delete: {
    method: 'DELETE',
    prefix: '/api/users/:id',
    handler: UserController.delete.bind(UserController)
  }
};
`;

    // 认证路由
    const authRoutes = `
const AuthController = require('../controllers/AuthController');

module.exports = {
  // 用户登录
  login: {
    method: 'POST',
    prefix: '/api/auth/login',
    handler: AuthController.login.bind(AuthController)
  },

  // 用户注册
  register: {
    method: 'POST',
    prefix: '/api/auth/register',
    handler: AuthController.register.bind(AuthController)
  },

  // 刷新token
  refresh: {
    method: 'POST',
    prefix: '/api/auth/refresh',
    handler: AuthController.refresh.bind(AuthController)
  },

  // 退出登录
  logout: {
    method: 'POST',
    prefix: '/api/auth/logout',
    handler: AuthController.logout.bind(AuthController)
  }
};
`;

    // 系统路由
    const systemRoutes = `
const SystemController = require('../controllers/SystemController');

module.exports = {
  // 获取系统信息
  info: {
    method: 'GET',
    prefix: '/api/system/info',
    handler: SystemController.info.bind(SystemController)
  },

  // 获取系统状态
  status: {
    method: 'GET',
    prefix: '/api/system/status',
    handler: SystemController.status.bind(SystemController)
  },

  // 清理缓存
  clearCache: {
    method: 'POST',
    prefix: '/api/system/clear-cache',
    handler: SystemController.clearCache.bind(SystemController)
  }
};
`;

    fs.writeFileSync(path.join(this.routerPath, 'user.js'), userRoutes);
    fs.writeFileSync(path.join(this.routerPath, 'auth.js'), authRoutes);
    fs.writeFileSync(path.join(this.routerPath, 'system.js'), systemRoutes);

    console.log('✓ 已创建默认路由文件: user.js, auth.js, system.js');
  }

  /**
   * 注册单个路由
   */
  register(method, path, ...handlers) {
    if (typeof this.router[method.toLowerCase()] === 'function') {
      this.router[method.toLowerCase()](path, ...handlers);
      console.log(`✓ 已注册路由: ${method.toUpperCase()} ${path}`);
    }
  }

  /**
   * 批量注册路由
   */
  registerBatch(routes) {
    routes.forEach(route => {
      if (route.method && route.path && route.handler) {
        this.register(route.method, route.path, route.handler);
      }
    });
  }

  /**
   * 获取路由统计信息
   */
  getStats() {
    return {
      totalRoutes: this.routes.size,
      routes: Array.from(this.routes.keys()),
      routerStackSize: this.router.stack ? this.router.stack.length : 0
    };
  }
}

module.exports = RouterLoader;