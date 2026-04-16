import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0';
    }
  }, [open]);

  return (
    <div className="border-b border-black/[0.07] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full cursor-pointer items-center justify-between py-6 text-left"
        aria-expanded={open}
        aria-controls={`faq-content-${index}`}
      >
        <span className="pr-4 font-[var(--font-display)] text-base font-medium text-[var(--color-pb-ink)] transition-colors group-hover:text-[var(--color-pb-accent-on-light)] sm:text-lg">
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className={`flex-shrink-0 text-[var(--color-pb-ink-2)] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        id={`faq-content-${index}`}
        className="faq-content"
        role="region"
        aria-hidden={!open}
      >
        <p className="pb-6 text-sm leading-7 text-[var(--color-pb-ink-2)]">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const revealRef = useReveal();
  const { faq } = siteData;

  return (
    <section id="faq" className="relative z-10 bg-[var(--color-pb-white)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{faq.label}</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              {faq.headline.before} <span className="accent-gradient-light">{faq.headline.accent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {faq.subheadline}
            </p>

            <div className="editorial-surface-soft-light mt-8 rounded-[1.5rem] p-6">
              <div className="space-y-4 text-sm text-[var(--color-pb-ink-2)]">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>Telefone</div>
                  <a href={siteData.contact.phoneLink} className="mt-1 inline-block text-[var(--color-pb-ink)] transition-colors hover:text-[var(--color-pb-accent-on-light)]">
                    {siteData.contact.phones}
                  </a>
                </div>
                <div className="border-t border-black/8 pt-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>Email</div>
                  <a href={`mailto:${siteData.contact.email}`} className="mt-1 inline-block text-[var(--color-pb-ink)] transition-colors hover:text-[var(--color-pb-accent-on-light)]">
                    {siteData.contact.email}
                  </a>
                </div>
                <div className="border-t border-black/8 pt-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>Endereco</div>
                  <p className="mt-1 text-[var(--color-pb-ink)]">{siteData.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-frame-light rounded-[1.8rem] px-6 sm:px-8">
            {faq.items.map((item, index) => (
              <FAQItem key={index} faq={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
