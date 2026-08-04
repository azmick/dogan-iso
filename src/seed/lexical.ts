/**
 * Payload Lexical zengin metin yapısını elle üretmek için küçük yardımcılar.
 * Seed verisi dışında kullanılmaz.
 */

type LexicalNode = Record<string, unknown>

const textNode = (text: string, format = 0): LexicalNode => ({
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  type: 'text',
  version: 1,
})

export const p = (text: string): LexicalNode => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  type: 'paragraph',
  version: 1,
})

export const h = (tag: 'h2' | 'h3' | 'h4', text: string): LexicalNode => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  type: 'heading',
  version: 1,
})

export const ul = (items: string[]): LexicalNode => ({
  children: items.map((item, index) => ({
    children: [textNode(item)],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  type: 'list',
  version: 1,
})

export const ol = (items: string[]): LexicalNode => ({
  children: items.map((item, index) => ({
    children: [textNode(item)],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'number',
  start: 1,
  tag: 'ol',
  type: 'list',
  version: 1,
})

/** Blokları Payload'ın beklediği kök yapıya sarar. */
export const doc = (...children: LexicalNode[]) => ({
  root: {
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})
