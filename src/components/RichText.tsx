import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

type RichTextProps = {
  data: unknown
  className?: string
}

/** Payload Lexical içeriğini sunucuda HTML'e çevirir (SEO için ilk HTML'de gelir). */
export const RichText = ({ data, className = '' }: RichTextProps) => {
  if (!data) return null

  return (
    <div className={`rich-text ${className}`}>
      <LexicalRichText data={data as never} />
    </div>
  )
}
