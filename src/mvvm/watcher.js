export class Watcher {
  constructor(sf) {
    this.sf = sf
    this.data = sf.data;
    this.observe(sf.refresh)
  }
  observe(callback) {
    let data = this.data;
    let sf = this.sf;
    var define = function (data) {
      Object.keys(data).forEach((key) => {
        let value = data[key]
        Object.defineProperty(data, key, {
          get: function () {
            return value
          },
          set: function (newValue) {
            if (newValue === value) {
              return
            }
            value = newValue
            callback.call(sf)
          }
        })
        if (Object.prototype.toString.call(data[key]) === '[object Object]' || Object.prototype.toString.call(data[key]) === '[object Array]') {
          define(data[key])
        }
      })
    }
    define(data)
  }
}