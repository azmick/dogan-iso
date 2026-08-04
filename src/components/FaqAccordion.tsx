import { RichText } from '@/components/RichText'
import type { Faq } from '@/payload-types'

type FaqAccordionProps = {
  items: Faq[]
}

/**
 * Soru-cevap listesi. <details>/<summary> kullanır:
 * JavaScript gerektirmez ve içerik ilk HTML'de bulunur (SEO).
 */
export const FaqAccordion = ({ items }: FaqAccordionProps) => (
  <div className="mx-auto max-w-3xl space-y-3">
    {items.map((item) => (
      <details
        key={item.id}
        name="sss"
        className="group card overflow-hidden [&[open]]:border-accent/40"
      >
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-primary transition-colors hover:bg-bg-soft md:px-6">
          {item.question}

          <span
            aria-hidden
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform group-open:rotate-45"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              width={14}
              height={14}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </summary>

        <div className="border-t border-border px-5 py-5 md:px-6">
          <RichText data={item.answer} className="text-[15px]" />
        </div>
      </details>
    ))}
  </div>
)
