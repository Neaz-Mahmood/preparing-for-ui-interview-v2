import { AbstractComponent, type TComponentConfig } from '../18-abstract-component/component'

export class Toast extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement Toast</div>'
  }
  toast(item: any) {}
}
