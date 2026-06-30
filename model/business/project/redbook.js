module.exports = {
  name: '小红书',
  desc: '小红书社交平台',
  homePage: '/todo?project_key=redbook&menu_key=page',
  menu: [{
    key: 'page',
    name: '页面管理',
    menuType: 'module',
    moduleType: 'schema',
    schemaConfig: {
      api: '/api/page/content',
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            label: '页面名称',
            tableOptions: {}
          },
          description: {
            type: 'string',
            label: '描述',
            tableOptions: {}
          },
          type: {
            type: 'string',
            label: '类型',
            tableOptions: {}
          },
          locale: {
            type: 'string',
            label: '语言',
            tableOptions: {}
          },
          status: {
            type: 'number',
            label: '状态',
            tableOptions: {}
          },
          mode: {
            type: 'number',
            label: '模式',
            tableOptions: {}
          }
        }
      },
      tableConfig: {
        headerButtons: [{
          label: '新建页面',
          eventKey: 'go',
          type: 'primary',
          eventOptions: {
            url: '/sider/editor?project_key=redbook&menu_key=page&sider_menu_key=Editor',
            query: {
              project_key: 'route::redbook',
              menu_key: 'route::page',
              sider_menu_key: 'route::Editor'
            }
          }
        }],
        rowButtons: [{
          label: '编辑',
          eventKey: 'go',
          type: 'warning',
          eventOptions: {
            url: '/sider/editor?project_key=redbook&menu_key=page&sider_menu_key=Editor',
            query: {
              project_key: 'route::redbook',
              menu_key: 'route::page',
              sider_menu_key: 'route::Editor'
            }
          }
        }, {
          label: '删除',
          eventKey: 'remove',
          type: 'danger',
          eventOptions: {
            params: {
              id: 'schema::id'
            }
          }
        }]
      }
    }
  }]
}
