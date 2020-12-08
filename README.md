# JestTest 前端自动化测试初探
1.为什么前端要做自动化测试--“质量第一，稳定压倒一切”

		* 前端常见的问题:



		1. 修改某个模块功能时，其它模块（如：前端登陆页、前端注册页等。）也受影响，很难快速定位bug
		2. 多人开发代码越来越难以维护--不通过黑盒或白盒的自动化测试覆盖，很难在有限时间内，复现和检查到这些问题，
		3. 不方便迭代，代码无法重构

 

		* 增加自动化测试后：



		1. 我们为核心功能编写测试后可以保障项目的可靠性
		2. 强迫开发者编写更容易被测试的代码，提高代码质量
		3. 编写的测试有文档的作用，方便维护

 

		* 适合引入自动化测试的场景：



		1. 公共库类的开发维护
		2.  中长期项目的迭代/重构
		3. 引用了不可控的第三方依赖

这些场景是需要引入自动化测试来对现有代码进行约束的。尤其是中长期项目，迭代/重构时人力回归困难，自动化测试就显得尤为重要！

		* 使用前端自动化测试的项目

2.前端自动化测试分类1、单元测试 定义：对应用中的最小可测试单元进行检查和验证，通常指的是独立测试单个函数举例：改造一个老前端框架，并根据其开发一个向后兼容的新框架。此时老框架针对其内部API函数，写了充分的单测用例。那么，在开发新框架时，直接运行老前端框架的单测用例，偌所有测试用例都通过，则可快速保证内部API函数的一致性，快速验证了所有功能场景。工具： Mocha, Ava, Karma, Jest, Jasmine 等。PS：前端单元测试，是所有类型的前端自动化测试中成本较低，且90%以上前端逻辑场景都可覆盖的，非常有效的自动化测试手段。大流量前端业务，务必应接入单测。2、集成测试定义：测试应用中完全不同的模块(组件)间，如何集成、如何一起工作。即，用来确保不同组件间互相合作的正确性。举例：测试在接收到特定的 post 请求以后，数据库会添加对应的记录，那么这就是集成测试，而不是单元测试。 远端发起post请求的服务和数据库，就是完全不同的模块。3、UI 测试定义：对图形交互界面的测试。UI层是用户使用产品的入口，所有功能通过这一层提供给用户。举例：视觉稿验收，就涉及到了ui测试。一般会涉及到UI界面的快照(界面截图)对比等。工具：ReactTestUtils, Test Render, Enzyme, React-Testing-Library, Vue-Test-Utils 等。4、端到端(e2e)测试定义：站在用户角度的测试，把我们的程序看成是一个黑盒子，用来确保整个应用会按照用户期望的那样运行。举例：不关心代码内部的实现，只负责打开浏览器，把测试用例中设置的内容在页面上输入一遍，测试与预期是否相符。工具： Nightwatch, Cypress, Phantomjs, Puppeteer 等。自动化测试中的测试金字塔（敏捷大师Mike Cohn提出该概念，后由Martin Fowler大师在此基础上提出了测试分层概念）。按照测试金字塔模型以及投入/产出比，越向下，回报率越高。3.Jest介绍-目前最流行的前端测试框架
	* 优势：速度快、API简单、配置简单 、快出覆盖率、 IDE整合；React/Vue 官方推荐的单元测试工具都是 Jest
	* 准备工作
  	* 环境搭建：



		1. 使用npm init -y 初始化
		2. 安装jest npm install --save-dev jest（安装可以参考官网）
		3. 运行npx jest --init命令，生成一份jest的配置文件jest.config.js
		4.  前置： Jest 不支持 ES Module 语法，需要安装 babel

npm install -D @babel/core @babel/preset-env// .babelrc{ "presets": [ ["@babel/preset-env", { "target": { "node": "current" } }] ] } 
	* 常用匹配器 

// 匹配值相等expect(a).toEqual(b)// 匹配 nullexpect(a).toBeNull()// 匹配 undefinedexpect(a).toBeUndefined()// 是否定义expect(a).toBeDefined()// 是否为真expect(a).toBeTruthy()// 是否为假expect(a).toBeFalsy()// not 匹配器 (取反)expect(a).not.toBeFalsy()// 数字大小 a > bexpect(a).toBeGreaterThan(b)  // toBeGreaterThanOrEqual// 数字大小 a < bexpect(a).toBeLessThan(b)  // toBeLessThanOrEqual// 小数近似expect(a).toBeCloseTo(b)// 字符串匹配expect(a).toMatch('string')// 数组匹配expect(arr).toContain(obj)// 异常检测expect(fn).toThrow()
	* 监听模式

npx jest --watchAllnpx jest --watch  // 与 git 联合使用，自动检测修改过代码的文件
	* 测试异步代码

对于异步代码测试，时机很重要，必须保证我们的测试用例在异步代码走完之后才结束。有以下几种办法：1. done，控制测试用例结束的时机2. 如果函数执行的返回值是 Promise，将这个 Promise return 出去3. async + awaitimport axios from 'axios'export function getData1() {  return axios.get('http://rap2api.taobao.org/app/mock/270835/success')}export function getData2(fn) {  axios.get('http://rap2api.taobao.org/app/mock/270835/success').then(res => {    fn(res)  })}export function get404() {  return axios.get('http://rap2api.taobao.org/app/mock/270835/404success')} import {getData1, getData2, get404} from './request'test('getData1 方法1', (done) => {  getData1().then(res => {    expect(res.data).toEqual({      success: false    })    done()  // 如果不加 done，还没执行到 .then 方法，测试用例已经结束了  })})test('getData1 方法2', () => {  return getData1().then(res => {    expect(res.data).toEqual({      success: true    })  })})test('getData2 方法2', (done) => {  getData2((res) => {    expect(res.data).toEqual({      success: true    })    done()  })})test('getData1 方法3', async () => {  const res = await getData1()  expect(res.data).toEqual({    success: true  })})/*********** 重点关注 ***********/test('get404', (done) => {  expect.assertions(1)  get404().catch(r => {    expect(r.toString()).toMatch('404')    done()  })}) 最后一个测试用例，假设我们现在有一个返回的是 404 的接口，我们需要对这个接口测试，期望他返回 404。 我们用 catch 捕获，在 catch 中判断。但是，假如这个接口返回的不是 404，而是正常返回 200，这个 catch 则不会执行，expect 也不会执行，测试依然是通过的。这不符合我们的预期！所以，我们需要加上 expect.assertions(1) 进行断言：下面一定会执行一个 expect
	* Jest 中的一些钩子函数

* beforeAll：所有用例开始执行前* beforeEach：每个用例执行前* afterEach* afterAll* describe 进行用例分组
	*  Jest 中的 mock


