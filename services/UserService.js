const BaseService = require('./BaseService');

class UserService extends BaseService {
  constructor() {
    super();
    // 初始化一些测试数据
    this.initializeData();
  }

  initializeData() {
    const testUsers = [
      {
        username: 'admin',
        name: '管理员',
        email: 'admin@example.com',
        password: 'admin123', // 实际项目中应该加密
        age: 30,
        role: 'admin'
      },
      {
        username: 'test',
        name: '测试用户',
        email: 'test@example.com',
        password: 'test123',
        age: 25,
        role: 'user'
      }
    ];

    testUsers.forEach(user => {
      const id = this.generateId();
      this.data.set(id, {
        ...user,
        id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  }

  async findByEmail(email) {
    for (let [id, user] of this.data) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findByUsername(username) {
    for (let [id, user] of this.data) {
      if (user.username === username) {
        return user;
      }
    }
    return null;
  }

  async findByAgeRange(minAge, maxAge) {
    let results = [];
    for (let [id, user] of this.data) {
      if (user.age >= minAge && user.age <= maxAge) {
        results.push(user);
      }
    }
    return results;
  }

  async validateUser(user) {
    if (!user.name || user.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    if (!user.email || !this.isValidEmail(user.email)) {
      throw new Error('Valid email is required');
    }

    if (user.age && (user.age < 0 || user.age > 150)) {
      throw new Error('Age must be between 0 and 150');
    }

    if (!user.username || user.username.trim().length === 0) {
      throw new Error('Username is required');
    }

    // 检查邮箱是否已存在
    if (user.email) {
      const existingEmail = await this.findByEmail(user.email);
      if (existingEmail && existingEmail.id !== user.id) {
        throw new Error('Email already exists');
      }
    }

    // 检查用户名是否已存在
    if (user.username) {
      const existingUsername = await this.findByUsername(user.username);
      if (existingUsername && existingUsername.id !== user.id) {
        throw new Error('Username already exists');
      }
    }
  }

  async create(data) {
    // 验证用户数据
    await this.validateUser(data);

    const id = this.generateId();
    const user = {
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.data.set(id, user);
    return user;
  }

  async update(id, data) {
    const existing = this.data.get(parseInt(id));
    if (!existing) {
      throw new Error('User not found');
    }

    // 验证用户数据
    await this.validateUser({ ...existing, ...data, id: parseInt(id) });

    const updated = {
      ...existing,
      ...data,
      id: parseInt(id),
      updatedAt: new Date()
    };

    this.data.set(parseInt(id), updated);
    return updated;
  }

  async delete(id) {
    const existing = this.data.get(parseInt(id));
    if (!existing) {
      throw new Error('User not found');
    }

    this.data.delete(parseInt(id));
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 获取用户统计信息
  async getStats() {
    const users = Array.from(this.data.values());
    return {
      total: users.length,
      byRole: users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {}),
      byAgeRange: {
        '18-25': users.filter(u => u.age >= 18 && u.age <= 25).length,
        '26-35': users.filter(u => u.age >= 26 && u.age <= 35).length,
        '36-50': users.filter(u => u.age >= 36 && u.age <= 50).length,
        '50+': users.filter(u => u.age > 50).length
      }
    };
  }
}

module.exports = UserService;