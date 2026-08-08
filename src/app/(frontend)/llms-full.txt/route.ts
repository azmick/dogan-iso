import { buildLlmsFullTxt } from '@/lib/llms'

export const revalidate = 3600

/**
 * /llms-full.txt — llms.txt'in tam metin sürümü.
 * Tüm hizmet, sayfa, haber, etkinlik ve SSS içeriğini tek markdown belgesinde verir.
 */
export async function GET(): Promise<Response> {
  return new Response(await buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
