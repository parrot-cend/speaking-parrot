import { FormItemNodeType, Node } from './types'
export class Config {
  public readonly tag: string
  public readonly props: Array<Node.Prop>
  public readonly children: Array<Config | string>
  constructor(tag: string, props?: Array<Node.Prop>, children?: Array<Config | string>) {
    this.tag = tag
    this.props = props || []
    this.children = children || []
  }

  public addProp(prop: Node.Prop): this {
    this.props.push(prop)
    return this
  }
  public deleteProp(key: string): this {
    const idx = this.props.findIndex(prop => prop.key === key)
    this.props.splice(idx, 1)
    return this
  }
  public updateProp(key: string, value: string): this {
    const target = this.props.find(prop => prop.key === key)
    if (target) {
      target.value = value
    }
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

export function createProp(key: string, type: Node.PropType, value: string): Node.Prop {
  return { key, type, value }
}

export function createConfig(tag: string, props?: Array<Node.Prop>, children?: Array<Config | string>): Config {
  return new Config(tag, props, children)
}

export function createFormItem(type: FormItemNodeType): Config {
  const formItem = new Config('el-form-item')
  const children = new Config(`el-${type}`)
  formItem.appendChild(children)
  return formItem
}
