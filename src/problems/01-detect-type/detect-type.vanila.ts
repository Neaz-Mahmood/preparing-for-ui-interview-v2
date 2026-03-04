// TODO: Implement detectType

export type TType =
  | 'null'
  | 'undefined'
  | 'string'
  | 'number'
  | 'boolean'
  | 'symbol'
  | 'bigint'
  | 'object'
  | 'array'
  | 'function'
  | 'date'
  | 'regexp'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'error'
  | 'promise'
  | 'arraybuffer'
  | string

export const detectType = (value: any): TType => {
  throw new Error('Not implemented')
}
