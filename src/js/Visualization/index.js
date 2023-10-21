import { Group } from 'three'

import Triangle from './Triangle'

export default class Visualization {
  constructor () {
    this.wrapper = new Group()

    for (let index = 0; index < 128; index++) {
      const triangle = new Triangle({ index })
      this.wrapper.add(triangle)
    }
  }

  async show () {
    await new Promise(resolve => {
      Promise.all(
        this.wrapper.children.map((triangle) => {
          return triangle.appear()
        })
      ).then(() => resolve())
    })
  }

  async hide () {
    await new Promise(resolve => {
      Promise.all(
        this.wrapper.children.map((triangle) => {
          return triangle.disappear()
        })
      ).then(() => resolve())
    })
  }

  update () {
    this.wrapper.rotation.z += 0.0075

    const frequencies = window.audioArray
    if (!frequencies) return

    this.wrapper.children.forEach((triangle, index) => {
      triangle.update({
        frequency: frequencies[index]
      })
    })
  }
}
