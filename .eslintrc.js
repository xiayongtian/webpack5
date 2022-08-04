module.exports = {
    extends: ["eslint:recommended"],   // 继承Eslint规则
    env: {
        node: true,//启用node中全局变量
        browser: true,//启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6,//es6
        sourceType: "module",//es module
    },
    rules: {  //用户可以自定义规则，弥补继承规则的不足
        "no-var": 2,  //不能使用var定义变量
        "consistent-return": 2,
        "indent": [1, 4],
        "space-unary-ops": 2,
        "no-empty-function": 0,
    }
}