export interface Dictionary<T = string> {
  [index: string]: T
}

export interface SelectOption<T = any> {
  label: string
  value: T
}
