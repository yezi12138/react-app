export class BoundItem {
  constructor(type = null, expression = null, element = null, sf = null, bindData = null) {
    this.type = type;
    this.expression = expression;
    this.el = element;
    this.bindData = bindData;
    this.sf = sf;
    this.listen()
  } 
  listen () {
    let el = this.el
    let sf = this.sf
    let expression = this.expression
    if (el.nodeName === 'INPUT') {
      el.addEventListener('input', () => {
        sf.data[expression] = el.value
      }, false)
    }
  }
}