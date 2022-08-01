module.exports = {
    types: [
      { name: 'feature:   一个新功能', value: 'feature' },
      { name: 'fix:       一个 bug 修复', value: 'fix' },
      { name: 'docs:      文档更新', value: 'docs' },
      { name: 'style:     代码规范修改', value: 'style' },
      { name: 'refactor:  代码重构', value: 'refactor' },
      { name: 'perf:      性能优化', value: 'perf' },
      { name: 'test:      测试代码，测试样例', value: 'test' },
      { name: 'misc:      工程杂项', value: 'misc' },
      { name: 'submodule: git 子模块更新', value: 'submodule' },
    ],
  
    typePrefix: '<',
    typeSuffix: '>',
    subjectSeparator: ' ',
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',
  
    // it needs to match the value for field type. Eg.: 'fix'
    /*
      scopeOverrides: {
        fix: [
          {name: 'merge'},
          {name: 'style'},
          {name: 'e2eTest'},
          {name: 'unitTest'}
        ]
      },
      */
    // override the messages, defaults are as follows
    messages: {
      type: '选择一种提交类型:',
      scope: '选择一个 scope (可选):',
      // used if allowCustomScopes is true
      customScope: '描述当前 scope 的改变:',
      subject: '简短直观说明:\n',
      body: '长说明，使用"|"换行(可选)：\n',
      breaking: '非兼容性改变的说明 (可选):\n',
      footer: '关联关闭的issue，例如：#31, #34(可选):\n',
      confirmCommit: '确定提交?',
    },
  
    allowCustomScopes: true,
    allowBreakingChanges: ['feature', 'fix'],
    // skip any questions you want
    skipQuestions: ['body', 'footer'],
  
    // limit subject length
    subjectLimit: 100,
  };