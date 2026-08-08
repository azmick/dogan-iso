import { buildLlmsTxt } from '@/lib/llms'

export const revalidate = 3600

/**
 * /llms.txt — llmstxt.org biçiminde site dizini.
 * Dil modelleri sitenin neyi kapsadığını bu dosyadan okur.
 */
export async function GET(): Promise<Response> {
  return new Response(await buildLlmsTxt(), {
    headers: {
      // Markdown içerik, tarayıcıda indirilmek yerine görüntülensin diye text/plain.
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
