import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { siteData } from '../../data/siteData';

const WHATSAPP_ICON_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

function WhatsAppGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={WHATSAPP_ICON_PATH} />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((previous) => (previous === isScrolled ? previous : isScrolled));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return undefined;

    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    firstFocusable?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !focusable.length) return;

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    drawer.addEventListener('keydown', handleKeyDown);
    return () => drawer.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      hamburgerRef.current?.focus();
    });
  };

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className={`site-navbar site-navbar--liquid fixed left-0 right-0 top-0 z-[100] transition-shadow duration-300 ${
          scrolled ? 'is-scrolled' : ''
        }`}
      >
        <div className="site-navbar__inner flex items-center justify-end gap-4">
          <div className="site-navbar__links hidden items-center justify-end gap-2 md:flex lg:gap-2.5">
            {siteData.nav.links.map((link) => (
              <a key={link.href} href={link.href} className="nav-chip">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end md:hidden">
            <button
              ref={hamburgerRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-pb-ink-2)] transition-colors hover:text-[var(--color-pb-ink)]"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-controls="mobile-navigation-drawer"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((previous) => !previous)}
            >
              {menuOpen ? (
                <X size={24} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div
            className="nav-drawer-backdrop fixed inset-0 z-[99] bg-[rgba(10,14,30,0.45)] backdrop-blur-[2px] md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="nav-drawer fixed right-0 top-0 z-[101] flex h-full flex-col border-l border-black/[0.08] bg-white text-[var(--color-pb-ink)] shadow-2xl md:hidden"
            style={{ right: 0, left: 'auto', width: 'min(20rem, 88vw)', maxWidth: '100vw' }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-pb-accent)] to-[var(--color-pb-accent-blue)]"
            />
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
              <img
                src={siteData.company.logoSrc}
                alt={siteData.company.name}
                className="h-9 w-auto"
              />
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-[#fbfbfc] text-[var(--color-pb-ink-2)] transition-colors hover:border-[rgba(0,4,225,0.25)] hover:text-[var(--color-pb-accent-blue)]"
                aria-label={siteData.nav.mobileMenuCloseLabel}
                onClick={closeMenu}
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu mobile" className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-5">
              <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-[#fcfcfd] shadow-[0_10px_28px_rgba(29,29,31,0.05)]">
                {siteData.nav.links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-drawer-link group flex items-center gap-4 px-4 py-3.5 ${
                      index < siteData.nav.links.length - 1 ? 'border-b border-black/[0.06]' : ''
                    }`}
                    style={{ animationDelay: `${90 + index * 50}ms` }}
                    onClick={closeMenu}
                  >
                    <span className="nav-drawer-link-index font-[var(--font-display)] text-[0.7rem] font-bold tracking-[0.2em] text-[var(--color-pb-accent)] transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-[var(--font-display)] text-[1rem] font-semibold tracking-tight text-[var(--color-pb-ink)]">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={17}
                      strokeWidth={2}
                      className="nav-drawer-link-arrow text-[var(--color-pb-accent-blue)]"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </nav>

            <div className="border-t border-black/[0.06] px-5 py-5">
              <a
                href={siteData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-[var(--font-display)] text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#1fae55]"
              >
                <WhatsAppGlyph size={19} />
                Solicite seu Orçamento
              </a>
              <a
                href={siteData.contact.phoneLink}
                className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] font-medium text-[var(--color-pb-ink-2)] transition-colors hover:text-[var(--color-pb-ink)]"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                {siteData.contact.phones}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
