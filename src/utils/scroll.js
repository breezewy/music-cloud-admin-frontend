const scroll = {
  // isEnd 为true时表示当前滚动到最下边，服务器端数据已经取完
  isEnd: false,
  start(callback) {
    // 防抖
    let timer = null
    callback && window.addEventListener('scroll', () => {
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        // 浏览器向上滚动的高度
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 文档真实的高度
        const scrollHeight = document.documentElement.scrollHeight
        // 浏览器窗口的可视高度，就是肉眼可见的那部分全屏高度
        const clientHeight = document.documentElement.clientHeight
        if (!this.isEnd && scrollHeight == scrollTop + clientHeight) {
          window.scrollTo(0, scrollTop - 100)
          // 请求数据
          callback()
        }
      },300)
    })
  },
  end() {
    this.isEnd = true
  }
}

export default scroll