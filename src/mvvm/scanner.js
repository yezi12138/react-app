import {BoundItem} from './boundItem'
export class Scanner {
  constructor (sf) {
    this.sf = sf
    this.results = []
  }
  findSf (dom) {
    let children = dom.children
    if (!children.push) {
      children = [].slice.call(children)
    } 
    children.forEach((key, index) => {
      let children = key.children
      if(children && children.length > 0) {
        this.findSf(key)
      } else {
        var atrs = key.attributes
        atrs = [].slice.call(atrs)
        let bindData = /\{\{(\w){1,}([\.\w]*)(\w){1,}\}\}/g.test(key.innerText)
        let type = null , expression = null, el = key
        if (atrs.length !== 0) {
          atrs.forEach((atr) => {
            if (/^(sf-)/g.test(atr.name)) {
              type = atr.name
              expression = atr.nodeValue
            }
          })
        }
        let item = new BoundItem(type, expression, el, this.sf, bindData)
        this.results.push(item)
      }
    })
  }
  scanBindDOM () {
    let body = document.getElementsByTagName('body')[0]
    this.findSf(body)
    console.log(this.results)
    return this.results
  }
}