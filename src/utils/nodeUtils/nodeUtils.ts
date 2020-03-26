import { Dictionary, Node } from './types'
export class Config {
  public readonly tag: string
  public readonly props: Dictionary<Node.Prop>
  public readonly children: Array<Config | string>
  constructor(tag: string, props?: Dictionary<Node.Prop>, children?: Array<Config | string>) {
    this.tag = tag
    this.props = props || {}
    this.children = children || []
  }

  public addProp(key: string, type: Node.PropType, value: string): this {
    const prop: Node.Prop = { type, value }
    Object.assign(this.props, { [key]: prop })
    return this
  }
  public deleteProp(key: string): this {
    delete this.props[key]
    return this
  }
  public appendChild(children: Config | string | Array<Config | string>): this {
    if (Array.isArray(children)) {
      this.children.push(...children)
    } else {
      this.children.push(children)
    }
    return this
  }
  public removeChild(pos: number | Array<number>): this {
    if (Array.isArray(pos)) {
      pos.forEach(p => this.children.splice(p, 1))
      return this
    } else {
      this.children.splice(pos, 1)
    }
    return this
  }
}
