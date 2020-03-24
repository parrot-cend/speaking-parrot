export interface Dictionary<T = string> {
  [index: string]: T
}

export enum PropType {
  String = 'string',
  Boolean = 'boolean',
  Expression = 'expression'
}

export interface Prop<T extends string = string, V extends string = string> {
  type: T
  value: V
}

export type Config =
  | {
      tag: string
      props?: Dictionary<Prop>
      children?: Array<Config | string>
    }
  | string

export type SourceConfig = Dictionary<Array<Config>>
