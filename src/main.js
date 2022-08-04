import count from './js/count.js'
import sum from './js/sum.js'
import './media/iconfont.js'
// 想要webpack打包资源，必须要引入该资源
import './css/index.css'
import './less/index.less'
import './scss/index.sass'
import './scss/index2.scss'
import './stylus/index.styl'
import './css/iconfont.css'

count()
let a = 7
console.log('a', a)
console.log(sum(3, 4, 5, 6, 7))
// ----------------测试eslint规则--------------------

// function test(arg) {
//     if (arg) {
//         return;
//     } else if (arg == '2') {
//         console.log('90')
//     } else {
//         console.log('90')
//     }
//     if (arg) {
//         debugger;
//         var colors = ["red", , "blue"];
//     }
// }
// function foo() {
// }
// test(3)
// foo()
// ----------------测试eslint规则--------------------

// css的HMR判断是否支持HMR功能，可以使用vue-loader, react-hot-loader进行快捷

// if (module.hot) {
//     module.hot.accept("./js/count.js")
//     module.hot.accept("./js/sum.js")
// }