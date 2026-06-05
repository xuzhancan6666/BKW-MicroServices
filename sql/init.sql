-- ============================================================
-- 初始化数据库和表
-- 用法：mysql -u root -p < sql/init.sql
-- ============================================================

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS bkw_micro
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE bkw_micro;

-- ============================================================
-- page_content：页面内容管理表
-- 用于存储 GrapesJS 编辑器产出的页面数据
-- ============================================================
CREATE TABLE IF NOT EXISTS page_content (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '主键',
  project_key     VARCHAR(64)     DEFAULT ''               COMMENT '所属项目标识（如 taobao），预留多项目过滤',
  ref_type        VARCHAR(32)     DEFAULT ''               COMMENT '关联业务类型（activity / product），预留',
  ref_id          INT             DEFAULT NULL             COMMENT '关联业务 ID，预留',
  title           VARCHAR(255)    NOT NULL                 COMMENT '页面标题',
  description     VARCHAR(500)    DEFAULT ''               COMMENT '页面描述 / 备注',
  content_json    LONGTEXT                                 COMMENT 'GrapesJS 项目 JSON（用于恢复编辑）',
  content_html    LONGTEXT                                 COMMENT '渲染后的 HTML 片段（用于最终展示）',
  locale          VARCHAR(16)     DEFAULT 'zh_CN'          COMMENT '语言版本（zh_CN / zh_HK / en_US）',
  version         INT             DEFAULT 1                COMMENT '版本号，每次保存 +1',
  status          TINYINT         DEFAULT 0                COMMENT '状态：0=草稿 1=已发布',
  created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  KEY idx_project_key (project_key),
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='页面内容管理表';
