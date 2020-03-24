import Taro, { Component, Config } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
// import {createScopedThreejs} from 'threejs-miniprogram'
// const { renderCubes } = require('./cube')
// import { renderCubes  } from "./cube"
import bee from "./bee.png"
import './index.scss'

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }
  _img = '';
  x = 0;
  y = 0;
  speed = 6;
  direction : 'up' | 'down' = 'down';
  ctx : any = '';

  // componentDidMount = () => {
  //   Taro.createSelectorQuery()
  //     .select('#webgl')
  //     .node()
  //     .exec((res) => {
  //       const canvas = res[0].node
  //       // 创建一个与 canvas 绑定的 three.js
  //       const THREE = createScopedThreejs(canvas)
  //       // 传递并使用 THREE 变量
  //       console.log(THREE)
  //       renderCubes(canvas, THREE)
  //     })
  // }

  componentDidMount = () => {
    const query = Taro.createSelectorQuery()
    query.select('#my')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        this.ctx = canvas.getContext('2d')

        const dpr = Taro.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr

        const renderLoop = () => {
          this.draw(canvas, this.ctx)
          canvas.requestAnimationFrame(renderLoop)
        }
        canvas.requestAnimationFrame(renderLoop)

        const img = canvas.createImage()
        console.log(img, this.ctx)
        img.onload = () => {
          this._img = img
          console.log(canvas)
          this.drawImage(0)
        }
        img.src = 'https://static-img.apluto.cn/bee.png'
      })
  }

  draw = (canvas, ctx) => {
    if (!canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawImage(0)
  }

  drawImage = (x) => {
    if (!this._img || !this.ctx) return
    if(this.x > 375) {
      this.x = 0
      return;
    }
    if (this.y > 300 && this.direction !== "up") {
      this.direction = "up"
    }
    if (this.y < 0 && this.direction !== "down") {
      this.direction = "down"
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.drawImage(this._img, 0, this.direction === "down" ? this.y += this.speed : this.y -= this.speed, 200, 200)
    this.ctx.restore()
  }

  onTouchMove = (e) => {
    const { x } = e.changedTouches[0]
    console.log(x)
    this.drawImage((x * 2) - 100)

  }

  render() {
    return (
      <View className='index'>
        <Canvas style={{
          width: "100%",
          height: "450px"
        }} onTouchMove={this.onTouchMove} type="2d" id="my" canvasId="my" />
        {/* <Canvas style={{
          width: "100%",
          height: "450px"
        }} type="webgl" id="webgl" canvasId="webgl" /> */}
      </View>
    )
  }
}
