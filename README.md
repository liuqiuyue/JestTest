#  前端自动化测试初探
## 为什么前端要做自动化测试
###   前端常见的问题:
1. 修改某个模块功能时，其它模块（如：前端登陆页、前端注册页等。）也受影响，很难快速定位bug；
2. 多人开发代码越来越难以维护--不通过黑盒或白盒的自动化测试覆盖，很难在有限时间内，复现和检查到这些问题；
3. 不方便迭代，代码无法重构

### 增加自动化测试后：
1. 我们为核心功能编写测试后可以保障项目的可靠性
2. 强迫开发者编写更容易被测试的代码，提高代码质量
3. 编写的测试有文档的作用，方便维护

### 适合引入自动化测试的场景：
1. 公共库类的开发维护
2. 中长期项目的迭代/重构
3. 引用了不可控的第三方依赖

这些场景是需要引入自动化测试来对现有代码进行约束的。尤其是中长期项目，迭代/重构时人力回归困难，自动化测试就显得尤为重要！

## 使用前端自动化测试的项目

![](undefined)

## 前端自动化测试分类
### 1、单元测试
定义：对应用中的最小可测试单元进行检查和验证，通常指的是独立测试单个函数。
举例：改造一个老前端框架，并根据其开发一个向后兼容的新框架。此时老框架针对其内部API函数，写了充分的单测用例。那么，在开发新框架时，直接运行老前端框架的单测用例，偌所有测试用例都通过，则可快速保证内部API函数的一致性，快速验证了所有功能场景。
工具： Mocha, Ava, Karma, Jest, Jasmine 等。
PS：前端单元测试，是所有类型的前端自动化测试中成本较低，且90%以上前端逻辑场景都可覆盖的，非常有效的自动化测试手段。大流量前端业务，务必应接入单测。
### 2、集成测试
定义：测试应用中完全不同的模块(组件)间，如何集成、如何一起工作。即，用来确保不同组件间互相合作的正确性。
举例：测试在接收到特定的 post 请求以后，数据库会添加对应的记录，那么这就是集成测试，而不是单元测试。 远端发起post请求的服务和数据库，就是完全不同的模块。
### 3、UI 测试
定义：对图形交互界面的测试。UI层是用户使用产品的入口，所有功能通过这一层提供给用户。举例：视觉稿验收，就涉及到了ui测试。一般会涉及到UI界面的快照(界面截图)对比等。
工具：ReactTestUtils, Test Render, Enzyme, React-Testing-Library, Vue-Test-Utils 等。
### 4、端到端(e2e)测试
定义：站在用户角度的测试，把我们的程序看成是一个黑盒子，用来确保整个应用会按照用户期望的那样运行。举例：不关心代码内部的实现，只负责打开浏览器，把测试用例中设置的内容在页面上输入一遍，测试与预期是否相符。
工具： Nightwatch, Cypress, Phantomjs, Puppeteer 等。



*自动化测试中的测试金字塔（敏捷大师Mike Cohn提出该概念，后由Martin Fowler大师在此基础上提出了测试分层概念）。*
*按照测试金字塔模型以及投入/产出比，越向下，回报率越高。
## Jest介绍-目前最流行的前端测试框架
- 优势：速度快、API简单、配置简单 、快出覆盖率、 IDE整合；React/Vue 官方推荐的单元测试工具都是 Jest

###  准备工作
#### 环境搭建
	使用npm init -y 初始化
	安装jest， npm install --save-dev jest（安装可以参考官网）
	运行npx jest --init命令，生成一份jest的配置文件jest.config.js
	前置： Jest 不支持 ES Module 语法，需要安装 babel`

```javascript
npm install -D @babel/core @babel/preset-env// .babelrc{ "presets": [ ["@babel/preset-env", { "target": { "node": "current" } }] ] }
```
#### 常用匹配器

    // 匹配值相等
    expect(a).toEqual(b)
    // 匹配 null
    expect(a).toBeNull()
    // 匹配 undefined
    expect(a).toBeUndefined()
    // 是否定义
    expect(a).toBeDefined()
    // 是否为真
    expect(a).toBeTruthy()
    // 是否为假
    expect(a).toBeFalsy()
    // not 匹配器 (取反)
    expect(a).not.toBeFalsy()
    // 数字大小 a > b
    expect(a).toBeGreaterThan(b)  // toBeGreaterThanOrEqual
    // 数字大小 a < b
    expect(a).toBeLessThan(b)  // toBeLessThanOrEqual
    // 小数近似
    expect(a).toBeCloseTo(b)
    // 字符串匹配
    expect(a).toMatch('string')
    // 数组匹配
    expect(arr).toContain(obj)
    // 异常检测
    expect(fn).toThrow()


#### 监听模式

`npx jest --watchAll`

`npx jest --watch  // 与 git 联合使用，自动检测修改过代码的文件`


#### Jest 中的一些钩子函数
    beforeAll：所有用例开始执行前
    beforeEach：每个用例执行前
    afterEach
    afterAll
    describe 进行用例分组
 	beforeAll：所有用例开始执行前* beforeEach：每个用例执行前* afterEach* afterAll* describe 进行用例分组

#### 测试异步代码

对于异步代码测试，时机很重要，必须保证我们的测试用例在异步代码走完之后才结束。
有以下几种办法：
1. done，控制测试用例结束的时机；
2. 如果函数执行的返回值是 Promise，将这个 Promise return 出去；
3. async + await

#### Jest 中的 mock





