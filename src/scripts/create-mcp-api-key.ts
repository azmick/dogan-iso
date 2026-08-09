import config from '@payload-config'
import crypto from 'crypto'
import { getPayload } from 'payload'

/**
 * MCP istemcileri (Claude Code vb.) için bir API anahtarı üretir.
 *
 *   pnpm mcp:key
 *
 * Aynı etiketle bir anahtar zaten varsa yeniden üretilir (rotasyon).
 * Anahtar yalnızca bu çıktıda görünür; veritabanında karma olarak saklanır.
 *
 * Yetenekler payload.config.ts'teki mcpPlugin yapılandırmasıyla sınırlıdır;
 * burada yalnızca o sınırların içinde hangilerinin açık olacağı seçilir.
 */

const LABEL = process.env.MCP_KEY_LABEL || 'Claude Code'

/** Alan adları koleksiyon/global slug'larının camelCase karşılığıdır. */
const capabilities = {
  services: { create: true, delete: true, find: true, update: true },
  posts: { create: true, delete: true, find: true, update: true },
  pages: { create: true, delete: true, find: true, update: true },
  faq: { create: true, delete: true, find: true, update: true },
  media: { find: true, update: true },
  contactSubmissions: { find: true },
  siteSettings: { find: true, update: true },
  contactInfo: { find: true, update: true },
}

const run = async () => {
  const payload = await getPayload({ config })

  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
    depth: 0,
    sort: 'createdAt',
  })

  const user = users[0]

  if (!user) {
    console.error('\n✖ Hiç kullanıcı yok. Önce `pnpm seed` çalıştırın veya panelden bir yönetici oluşturun.\n')
    process.exit(1)
  }

  const apiKey = crypto.randomUUID()

  const data = {
    ...capabilities,
    apiKey,
    description: 'İçerik yönetimi için MCP istemcisi erişimi.',
    enableAPIKey: true,
    label: LABEL,
    user: user.id,
  }

  const { docs: existing } = await payload.find({
    collection: 'payload-mcp-api-keys',
    limit: 1,
    depth: 0,
    where: { label: { equals: LABEL } },
  })

  if (existing[0]) {
    await payload.update({
      collection: 'payload-mcp-api-keys',
      id: existing[0].id,
      data,
    })
    console.log(`\n↻ "${LABEL}" anahtarı yenilendi (${user.email}).`)
  } else {
    await payload.create({
      collection: 'payload-mcp-api-keys',
      data,
    })
    console.log(`\n✔ "${LABEL}" anahtarı oluşturuldu (${user.email}).`)
  }

  console.log('\nPAYLOAD_MCP_API_KEY=' + apiKey)
  console.log('\nBu değeri .claude/settings.local.json içindeki env alanına yazın.\n')

  process.exit(0)
}

await run()
