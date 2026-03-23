/**
 * 系统控制器
 * 处理系统相关信息和操作
 */

class SystemController {
  constructor() {
    this.startTime = new Date();
  }

  /**
   * 获取系统信息
   */
  async info(ctx) {
    try {
      const os = require('os');
      const pkg = require('../../package.json');

      const systemInfo = {
        application: {
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          nodeVersion: process.version,
          environment: process.env.NODE_ENV || 'development',
          startTime: this.startTime,
          uptime: process.uptime()
        },
        system: {
          platform: os.platform(),
          arch: os.arch(),
          cpus: os.cpus().length,
          totalMemory: os.totalmem(),
          freeMemory: os.freemem(),
          hostname: os.hostname()
        },
        memory: process.memoryUsage(),
        loadAverage: os.loadavg()
      };

      ctx.success(systemInfo);

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 获取系统状态
   */
  async status(ctx) {
    try {
      const os = require('os');

      const status = {
        status: 'running',
        timestamp: new Date().toISOString(),
        uptime: {
          process: process.uptime(),
          system: os.uptime()
        },
        memory: {
          process: process.memoryUsage(),
          system: {
            total: os.totalmem(),
            free: os.freemem(),
            usage: (1 - os.freemem() / os.totalmem()) * 100
          }
        },
        cpu: {
          cores: os.cpus().length,
          loadAverage: os.loadavg()
        },
        network: this.getNetworkInfo(),
        disk: this.getDiskInfo()
      };

      ctx.success(status);

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 清理缓存
   */
  async clearCache(ctx) {
    try {
      const cacheType = ctx.request.body.type || 'all';
      const result = {};

      switch (cacheType) {
        case 'memory':
          // 触发垃圾回收（如果可用）
          if (global.gc) {
            global.gc();
            result.memory = 'Memory cache cleared';
          } else {
            result.memory = 'Garbage collection not available';
          }
          break;

        case 'require':
          // 清理require缓存（谨慎使用）
          const moduleCount = Object.keys(require.cache).length;
          if (ctx.request.body.force) {
            Object.keys(require.cache).forEach(key => {
              if (!key.includes('node_modules')) {
                delete require.cache[key];
              }
            });
            result.require = `Cleared ${moduleCount} modules from require cache`;
          } else {
            result.require = 'Use force=true to clear require cache';
          }
          break;

        case 'all':
        default:
          // 清理内存缓存
          if (global.gc) {
            global.gc();
            result.memory = 'Memory cache cleared';
          }

          // 重置启动时间
          this.startTime = new Date();
          result.system = 'System cache reset';
          break;
      }

      ctx.success(result, 'Cache cleared successfully');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 获取网络信息
   */
  getNetworkInfo() {
    try {
      const os = require('os');
      const interfaces = os.networkInterfaces();

      const networkInfo = {};
      Object.keys(interfaces).forEach(name => {
        interfaces[name].forEach(iface => {
          if (!iface.internal) {
            networkInfo[name] = {
              address: iface.address,
              family: iface.family,
              mac: iface.mac
            };
          }
        });
      });

      return networkInfo;
    } catch (error) {
      return { error: 'Unable to get network info' };
    }
  }

  /**
   * 获取磁盘信息（简化版）
   */
  getDiskInfo() {
    try {
      const fs = require('fs');
      const path = require('path');

      const diskInfo = {
        current: {
          path: process.cwd(),
          free: 'N/A', // 需要第三方库获取准确信息
          size: 'N/A'
        }
      };

      // 简单的文件大小检查
      try {
        const stats = fs.statSync(process.cwd());
        diskInfo.current.accessTime = stats.atime;
        diskInfo.current.modifyTime = stats.mtime;
      } catch (e) {
        // 忽略错误
      }

      return diskInfo;
    } catch (error) {
      return { error: 'Unable to get disk info' };
    }
  }

  /**
   * 性能测试
   */
  async performance(ctx) {
    try {
      const iterations = parseInt(ctx.query.iterations) || 1000000;

      // CPU性能测试
      const cpuStart = process.hrtime.bigint();
      let sum = 0;
      for (let i = 0; i < iterations; i++) {
        sum += Math.sqrt(i);
      }
      const cpuEnd = process.hrtime.bigint();

      // 内存分配测试
      const memStart = process.memoryUsage();
      const arrays = [];
      for (let i = 0; i < 1000; i++) {
        arrays.push(new Array(1000).fill(i));
      }
      const memEnd = process.memoryUsage();

      const performance = {
        cpu: {
          iterations,
          result: sum,
          timeNs: Number(cpuEnd - cpuStart),
          timeMs: Number(cpuEnd - cpuStart) / 1000000
        },
        memory: {
          heapUsed: memEnd.heapUsed - memStart.heapUsed,
          external: memEnd.external - memStart.external
        }
      };

      ctx.success(performance, 'Performance test completed');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }
}

module.exports = new SystemController();