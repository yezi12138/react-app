export class Renderer{
  constructor (data) {
    this.data = data
  }
  render (boundItem) {
    console.log('render something ...')
    let objValue = null
    let {type, expression, el, sf, bindData} = boundItem
    // 替换{{}}
    var pattern1 = new RegExp(/\{\{(\w){1,}([\.\w]*)(\w){1,}\}\}/g)
    // 绑定sf-
    var pattern2 = new RegExp(`/\{\{${type}\}\}/g`)
    if (bindData) {
      let expressionText = el.innerText.match(pattern1)
      console.log('expressionText:', expressionText)
      let expressionData  = expressionText.map((expressionItem) => {
        return expressionItem.match(/(\w){1,}([\.\w]*)(\w){1,}/g)[0]
      })
      console.log('expressionData:',expressionData)
      // 多重对象绑定 比如 arr.name.song
      let objArr = expressionData.map((expressionItem) => {
        return expressionItem.split('.')
      })
      console.log('objArr:',objArr)
      objValue = this.getValue(objArr)
      expressionText.map((expressionItem, index) => {
        el.innerText = el.innerText.replace(expressionItem, objValue[index])
      })
      boundItem.bindData = false
    }
    if (type === 'sf-text') {
      el.innerHTML = this.data[expression]
    } else if (type === 'sf-value') {
      el.value = this.data[expression]
    }
  }
  getValue (arr) {
    let results = []
    let objValue = null
    arr.map((objArr) => {
      objValue = this.data[objArr[0]]
      // 循环取值
      if (objArr.length >= 2) {
        objArr.forEach((obj, index) => {
          if (index >= 1) {
            objValue = objValue[obj]
          }
        })
      }
      results.push(objValue)
    })
    console.log('results', results)
    return results
  }
}