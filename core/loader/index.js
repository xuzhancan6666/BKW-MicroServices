/**
 * 应用加载器主入口
 * 统一管理所有加载器
 */

const path = require('path');

class AppLoader {
  constructor(app) {
    this.app = app;
    this.loaders = {};
  }

  /**
   * 初始化所有加载器
   */
  async initialize() {
    console.log('🚀 开始加载应用模块...');

    // 1. 加载配置（最先加载）
    await this.loadConfig();

    // 2. 加载扩展
    await this.loadExtend();

    // 3. 加载服务
    await this.loadServices();

    // 4. 加载控制器
    await this.loadControllers();

    // 5. 加载路由schema
    await this.loadRouterSchemas();

    // 6. 加载路由
    await this.loadRoutes();

    // 7. 加载中间件（最后加载）
    await this.loadMiddleware();

    console.log('✅ 应用模块加载完成');
  }

  /**
   * 加载配置
   */
  async loadConfig() {
    console.log('📋 加载配置...');
    const ConfigLoader = require('./config');
    this.loaders.config = new ConfigLoader();
    this.loaders.config.load();
    this.app.config = this.loaders.config;
  }

  /**
   * 加载扩展
   */
  async loadExtend() {
    console.log('🔧 加载扩展...');
    const ExtendLoader = require('./extend');
    this.loaders.extend = new ExtendLoader();
    this.loaders.extend.load(this.app);
  }

  /**
   * 加载服务
   */
  async loadServices() {
    console.log('🔧 加载服务...');
    const ServiceLoader = require('./service');
    this.loaders.service = new ServiceLoader();
    this.loaders.service.load();
    this.app.services = this.loaders.service;
  }

  /**
   * 加载控制器
   */
  async loadControllers() {
    console.log('🎮 加载控制器...');
    const ControllerLoader = require('./controller');
    this.loaders.controller = new ControllerLoader();
    this.loaders.controller.load();
    this.app.controllers = this.loaders.controller;
  }

  /**
   * 加载路由schema
   */
  async loadRouterSchemas() {
    console.log('📐 加载路由schema...');
    const RouterSchemaLoader = require('./router-schema');
    this.loaders.schema = new RouterSchemaLoader();
    this.loaders.schema.load();
    this.app.schemas = this.loaders.schema;
  }

  /**
   * 加载路由
   */
  async loadRoutes() {
    console.log('🛣️  加载路由...');
    const RouterLoader = require('./router');
    this.loaders.router = new RouterLoader(this.app);
    this.loaders.router.load();
    this.app.router = this.loaders.router;
  }

  /**
   * 加载中间件
   */
  async loadMiddleware() {
    console.log('🔄 加载中间件...');
    const MiddlewareLoader = require('./middleware');
    this.loaders.middleware = new MiddlewareLoader(this.app);
    this.loaders.middleware.load();
  }

  /**
   * 获取加载器
   */
  getLoader(name) {
    return this.loaders[name];
  }

  /**
   * 应用启动完成
   */
  onReady() {
    console.log('🎉 应用启动完成');
    console.log(`🌐 服务器运行在: http://${this.app.config.get('server.host', 'localhost')}:${this.app.config.get('server.port', 3000)}`);
    console.log(`📱 应用名称: ${this.app.config.get('app.name')}`);
    console.log(`🏷️  版本: ${this.app.config.get('app.version')}`);
    console.log(`🌍 环境: ${this.app.config.env}`);
  }
}

module.exports = AppLoader;