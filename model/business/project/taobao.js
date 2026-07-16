module.exports = {
   name: '淘宝',
   desc: '淘宝',
   homePage: '/todo?project_key=taobao&menu_key=product',
   menu: [
   {
      key: 'cupon',
      name: '优惠券',
      menuType: 'group',
      homePage: '',
      redirectKey: 'overCupen',
      subMenu: [{
         key: 'overCupen',
         name: '国补',
         menuType: 'module',
         moduleType: 'custom',
         customConfig: {
            path: '/todo'
         }
      }, {
         key: 'limit',
         name: '双11',
         menuType: 'module',
         moduleType: 'schema',
         schemaConfig: {
            api: '/api/page/content',
            schema: {}
         }
      }, {
         key: 'festival',
         name: '节日活动',
         menuType: 'module',
         moduleType: 'iframe',
         iframeConfig: {
            path: 'https://www.qianwen.com/'
         }
      }]
   }, {
      key: 'operation',
      name: '运营活动',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
         menu: [{
            key: 'operation1',
            name: '广告投放',
            menuType: 'group',
            subMenu: [{
               key: 'redbook',
               name: '小红书',
               menuType: 'module',
               moduleType: 'schema',
               schemaConfig: {
                  api: '/api/page/content',
                  schema: {
                     type: 'objcet',
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
                     },
                  },
                  tableConfig: {
                     headerButtons: [{
                        label: '新建页面',
                        eventKey: 'go',
                        type: 'primary',
                        eventOptions: {
                           url: '/sider/editor?project_key=taobao&menu_key=operation&sider_menu_key=Editor',
                           query: {
                              project_key: 'route::taobao',
                              menu_key: 'route::operation',
                              sider_menu_key: 'route::Editor'
                           }
                        }
                     }],
                     rowButtons: [{
                        label: '编辑',
                        eventKey: 'go',
                        type: 'warning',
                        eventOptions: {
                           url: '/sider/editor?project_key=taobao&menu_key=operation&sider_menu_key=Editor',
                           query: {
                              project_key: 'route::taobao',
                              menu_key: 'route::operation',
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
                  },
               },
            }, {
               key: 'douyin',
               name: '抖音',
               menuType: 'module',
               moduleType: 'schema',
               schemaConfig: {
                  api: '/api/page/content',
                  schema: {}
               }
            }, {
               key: 'bilibili',
               name: 'bilibili',
               menuType: 'module',
               moduleType: 'iframe',
               iframeConfig: {
                  path: 'https://www.qianwen.com/'
               }
            }]
      }, {
            key: 'limit',
            name: '视频投放',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/todo'
            }
         }, {
            key: 'festival',
            name: '节日活动',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/todo'
            }
         }, {
            key: 'agent',
            name: 'Agent',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/agent'
            }
         }, {
            key: 'Editor',
            name: 'Editor',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/editor'
            }
         }, ]
      }
   },]
}