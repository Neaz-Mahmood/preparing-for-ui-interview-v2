import { AbstractComponent, type TComponentConfig } from '../18-abstract-component/component'

export class GoogleSheet extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement Google Sheet</div>'
  }
}
