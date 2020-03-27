import { FormItemNodeType } from './nodeUtils/types'
import { SelectOption } from './types'

export const formItemTypes: SelectOption<FormItemNodeType>[] = [
  { label: 'Input', value: FormItemNodeType.Input },
  { label: 'Select', value: FormItemNodeType.Select }
]
