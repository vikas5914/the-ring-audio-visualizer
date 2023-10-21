import '../css/app.css'

import AutoBind from 'auto-bind'

import Background from './Background'
import Visualization from './Visualization'

import {
  WebGLRenderer,
  PerspectiveCamera,
  Math as THREEMath,
  Scene,
  Color,
  DirectionalLight
} from 'three'

document.addEventListener('DOMContentLoaded', () => {})

class App {
  constructor () {
    AutoBind(this)

    this.height = window.innerHeight
    this.width = window.innerWidth

    this.createRenderer()
    this.createScene()
    this.createLights()

    this.createVisualization()

    this.createBackground()

    this.render()

    this.addEventListeners()
  }

  createRenderer () {
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#canvas')
    })

    this.renderer.setSize(this.width, this.height)
  }

  createScene () {
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(65, this.width / this.height, 1, 10000)
    this.camera.position.z = 300

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.camera.position.z = 300

    const distance = this.camera.position.z
    const fov = THREEMath.degToRad(this.camera.fov)

    const height = 2 * Math.tan(fov / 2) * distance
    const width = height * this.camera.aspect

    this.size = width
  }

  createLights () {
    this.lightColor = new Color('#fff')

    this.lightOne = new DirectionalLight(this.lightColor, 1)
    this.lightOne.position.set(1, 1, 1)

    this.lightTwo = new DirectionalLight(this.lightColor, 1)
    this.lightTwo.position.set(-1, -1, 1)

    this.scene.add(this.lightOne)
    this.scene.add(this.lightTwo)
  }

  createVisualization () {
    this.visualization = new Visualization()
    this.scene.add(this.visualization.wrapper)
    this.visualization.show()
  }

  createBackground () {
    this.background = new Background({
      size: this.size
    })

    this.scene.add(this.background)
  }

  render () {
    window.requestAnimationFrame(this.render)

    const now = performance.now() / 1000
    const dt = Math.min(now - window.last, 1)
    window.last = now

    if (window.wallpaperSettings.fps > 0) {
      window.fpsThreshold += dt
      if (window.fpsThreshold < 1.0 / window.wallpaperSettings.fps) {
        return
      }
      window.fpsThreshold -= 1.0 / window.wallpaperSettings.fps
    }

    this.renderer.render(this.scene, this.camera)
    this.renderer.autoClear = false
    this.renderer.setPixelRatio((window.devicePixelRatio)
      ? window.devicePixelRatio
      : 1)

    this.background.update()
    this.visualization.update()
  }

  onResize () {
    this.height = window.innerHeight
    this.width = window.innerWidth

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.clear()
    this.renderer.setSize(this.width, this.height)
  }

  addEventListeners () {
    window.addEventListener('resize', this.onResize)
  }

  removeEventListeners () {
    window.removeEventListener('resize', this.onResize)
  }
}

// eslint-disable-next-line no-new
new App()
