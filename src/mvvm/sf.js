import {Watcher} from './watcher'
import {Scanner} from './scanner';
import {Renderer} from './render'

let SegmentFault = class SegmentFault {
  constructor ({data = {}} = {}) {
    this.data = data
    // 用来维护viewModel和被绑定的view之间的关系
    this.viewViewModelMap = []
    this.init()
  }
  init () {
    // 监听sf-数据变化
    let watcher = new Watcher(this)
    let scanner = new Scanner(this)
    this.render = new Renderer(this.data)
    this.viewViewModelMap = scanner.scanBindDOM()
    this.viewViewModelMap.forEach((boundItem) => {
      this.render.render(boundItem)
    })
  }
  refresh () {
    console.log("refresh new value")
    this.viewViewModelMap.forEach((boundItem) => {
      this.render.render(boundItem)
    })
  }
}
var sf = new SegmentFault({
  data: {
    message1: '单向绑定',
    message2: 'this is message2',
    message3: '单向绑定2',
    value: '双向绑定',
    arr: {
      name: 'yezi',
      song: ['五月天', '知足', '倔强'],
      love:{
        live:{
          a:'yezi 3 time'
        }
      }
    }
  }
})

setTimeout(() => {
  console.log('setTimeout')
  sf.data.arr.name = 'feifei'
  // sf.data.value = 'change message2'
}, 3000);