/**
 * 认证控制器
 * 处理用户登录、注册、token管理等
 */

const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

class AuthController {
  constructor() {
    this.userService = new UserService();
    this.tokenBlacklist = new Set(); // 简单的token黑名单
  }

  /**
   * 用户登录
   */
  async login(ctx) {
    try {
      const { username, password } = ctx.request.body;

      if (!username || !password) {
        ctx.error('用户名和密码不能为空', 400);
        return;
      }

      // 简单的用户验证（实际项目中应该连接数据库）
      const user = await this.validateUser(username, password);

      if (!user) {
        ctx.error('用户名或密码错误', 401);
        return;
      }

      // 生成JWT token
      const token = ctx.generateToken({
        id: user.id,
        username: user.username,
        role: user.role || 'user'
      });

      // 生成refresh token
      const refreshToken = this.generateRefreshToken(user.id);

      ctx.success({
        token,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role || 'user'
        }
      }, '登录成功');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 用户注册
   */
  async register(ctx) {
    try {
      const { username, email, password, confirmPassword } = ctx.request.body;

      // 验证输入
      if (!username || !email || !password) {
        ctx.error('用户名、邮箱和密码不能为空', 400);
        return;
      }

      if (password !== confirmPassword) {
        ctx.error('两次输入的密码不一致', 400);
        return;
      }

      if (password.length < 6) {
        ctx.error('密码长度不能少于6位', 400);
        return;
      }

      // 检查用户名是否已存在
      const existingUser = await this.userService.findByUsername(username);
      if (existingUser) {
        ctx.error('用户名已存在', 400);
        return;
      }

      // 检查邮箱是否已存在
      const existingEmail = await this.userService.findByEmail(email);
      if (existingEmail) {
        ctx.error('邮箱已被注册', 400);
        return;
      }

      // 创建用户
      const user = await this.userService.create({
        username,
        email,
        password: this.hashPassword(password), // 实际项目中应该加密密码
        role: 'user'
      });

      ctx.success({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }, '注册成功');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 刷新token
   */
  async refresh(ctx) {
    try {
      const { refreshToken } = ctx.request.body;

      if (!refreshToken) {
        ctx.error('refresh token不能为空', 400);
        return;
      }

      // 验证refresh token
      const decoded = this.verifyRefreshToken(refreshToken);
      if (!decoded) {
        ctx.error('refresh token无效或已过期', 401);
        return;
      }

      // 检查用户是否存在
      const user = await this.userService.findById(decoded.userId);
      if (!user) {
        ctx.error('用户不存在', 401);
        return;
      }

      // 生成新的access token
      const token = ctx.generateToken({
        id: user.id,
        username: user.username,
        role: user.role || 'user'
      });

      ctx.success({ token }, 'token刷新成功');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 退出登录
   */
  async logout(ctx) {
    try {
      const token = ctx.header.authorization?.replace('Bearer ', '');

      if (token) {
        // 将token加入黑名单
        this.tokenBlacklist.add(token);
      }

      ctx.success(null, '退出登录成功');

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 获取当前用户信息
   */
  async me(ctx) {
    try {
      const user = ctx.getUser();

      if (!user) {
        ctx.error('用户未登录', 401);
        return;
      }

      const userInfo = await this.userService.findById(user.id);
      if (!userInfo) {
        ctx.error('用户不存在', 404);
        return;
      }

      ctx.success({
        user: {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          role: userInfo.role,
          createdAt: userInfo.createdAt,
          updatedAt: userInfo.updatedAt
        }
      });

    } catch (error) {
      ctx.error(error.message, 500);
    }
  }

  /**
   * 验证用户（简单实现）
   */
  async validateUser(username, password) {
    // 这里应该连接真实的数据库进行验证
    // 这里只是示例实现
    const users = await this.userService.findAll();

    return users.find(user =>
      user.username === username &&
      user.password === this.hashPassword(password)
    );
  }

  /**
   * 生成refresh token
   */
  generateRefreshToken(userId) {
    return jwt.sign(
      { userId, type: 'refresh' },
      ctx.app.getConfig('jwt.secret', 'default-secret'),
      { expiresIn: '7d' }
    );
  }

  /**
   * 验证refresh token
   */
  verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, ctx.app.getConfig('jwt.secret', 'default-secret'));
      return decoded.type === 'refresh' ? decoded : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 简单的密码哈希（仅示例，实际项目请使用bcrypt等）
   */
  hashPassword(password) {
    // 实际项目中应该使用bcrypt等安全的哈希算法
    return password; // 这里只是示例，不进行实际哈希
  }
}

module.exports = new AuthController();