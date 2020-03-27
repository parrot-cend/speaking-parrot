export interface Dictionary<T = any> {
  [index: string]: T
}

export enum FormSize {
  Medium = 'medium',
  Small = 'small',
  Mini = 'mini'
}

export enum FormItemNodeType {
  Form = 'form',
  FormItem = 'form-item',
  Input = 'input',
  Select = 'select',
  Option = 'option',
  Button = 'button'
}

export enum UIFramework {
  Element
}

export namespace Node {
  export interface Prop<T extends string = string, V extends string = string> {
    key: string
    type: T
    value: V
  }
  export type Config =
    | {
        tag: string
        props?: Array<Prop>
        children?: Array<Config | string>
      }
    | string
  export enum PropType {
    String = 'string',
    Boolean = 'boolean',
    Expression = 'expression'
  }
  export namespace Form {
    enum LabelPosition {
      Left = 'left',
      Right = 'right',
      Top = 'top'
    }
    export interface Props extends Dictionary<Prop> {
      model: Prop
      rules: Prop
      inline: Prop
      labelPosition: Prop<PropType.String, LabelPosition>
      labelWidth: Prop
      labelSuffix: Prop
      hideRequiredAsterisk: Prop<PropType.Boolean>
      size: Prop<PropType.String, FormSize>
    }
  }
  export namespace FormItem {
    export interface Props {
      label: Prop
      labelWidth: Prop
      required: Prop<PropType.Boolean>
      rules: Prop
      error: Prop
      size: Prop<PropType.String, FormSize>
    }
  }
  export namespace Input {
    enum Type {
      Text = 'text',
      Textarea = 'textarea',
      Number = 'number',
      Email = 'email'
    }
    export interface Props extends Dictionary<Prop> {
      type: Prop<PropType.String, Type>
      vModel: Prop<PropType.Expression>
      maxLength: Prop<PropType.Expression>
      minLength: Prop<PropType.Expression>
      showWordLimit: Prop<PropType.Boolean>
      placeholder: Prop
      clearable: Prop<PropType.Boolean>
      showPassword: Prop<PropType.Boolean>
      disabled: Prop<PropType.Boolean>
      size: Prop<PropType.String, FormSize>
      prefixIcon: Prop
      suffixIcon: Prop
      rows: Prop | Prop<PropType.Expression>
    }
  }
  export namespace Button {
    enum Type {
      Primary = 'primary',
      Success = 'success',
      Warning = 'warning',
      Danger = 'danger',
      Info = 'info',
      Text = 'text'
    }
    export interface Props extends Dictionary<Prop> {
      size: Prop<PropType.String, FormSize>
      type: Prop<PropType.String, Type>
      plain: Prop<PropType.Boolean>
      round: Prop<PropType.Boolean>
      circle: Prop<PropType.Boolean>
      loading: Prop<PropType.Boolean>
      disabled: Prop<PropType.Boolean>
      icon: Prop
      autofocus: Prop<PropType.Boolean>
    }
  }
}

export type SourceConfig = Array<Node.Config>
