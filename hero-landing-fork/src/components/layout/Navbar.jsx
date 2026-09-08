import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteData } from '../../data/siteData';

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
        <div className="site-navbar__inner mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-6">
          <a href="#" className="site-navbar__brand flex shrink-0 items-center" aria-label="Voltar ao início">
            <img
              src={siteData.company.logoSrc}
              alt={siteData.company.name}
              width={200}
              height={144}
              className="site-navbar__logo h-14 w-auto md:h-16"
            />
          </a>

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
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-pb-ink-2)] transition-colors hover:text-[var(--color-pb-ink)]"
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
            className="fixed inset-0 z-[99] bg-black/35 transition-opacity duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed right-0 top-0 z-[101] h-full w-72 border-l border-black/10 bg-white text-[var(--color-pb-ink)] shadow-2xl"
          >
            <div className="flex items-center justify-end px-6 py-5">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-pb-ink-2)] transition-colors hover:text-[var(--color-pb-ink)]"
                aria-label={siteData.nav.mobileMenuCloseLabel}
                onClick={closeMenu}
              >
                <X size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu mobile" className="flex flex-col px-6">
              {siteData.nav.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-base text-[var(--color-pb-ink-2)] transition-colors hover:text-[var(--color-pb-ink)] ${
                    index < siteData.nav.links.length - 1 ? 'border-b border-black/10' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
