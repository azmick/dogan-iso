type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/** schema.org yapılandırılmış verisini sayfaya gömer. */
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    // Veri tamamen sunucuda üretiliyor; XSS riskine karşı </script> kaçışı yapılır.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
)
