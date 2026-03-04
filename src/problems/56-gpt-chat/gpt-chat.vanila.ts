import { AbstractComponent, type TComponentConfig } from '../18-abstract-component/component'
import styles from './gpt-chat.module.css'
import flex from '@course/styles'
import cx from '@course/cx'

type TProps = {}

export class GptChat extends AbstractComponent<TProps> {
  constructor(config: TComponentConfig<TProps>) {
    super(config)
  }

  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
