import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { siteData } from '../../data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll('a, button, [tabindex]');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    // Focus first element
    firstFocusable?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    drawer.addEventListener('keydown', handleKeyDown);
    return () => drawer.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.07] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src={siteData.company.logoSrc}
              alt={siteData.company.name}
              width={80}
              height={40}
              className="h-10 w-auto transition-[filter] duration-300"
              style={scrolled ? { filter: 'brightness(0)' } : undefined}
            />
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {siteData.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  scrolled
                    ? 'text-[var(--color-pb-ink-2)] hover:text-[var(--color-pb-ink)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right slot — hamburger on mobile, empty on desktop */}
          <div className="flex items-center justify-end">
          {/* Hamburger Button - Mobile */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              scrolled
                ? 'text-[var(--color-pb-ink-2)] hover:text-[var(--color-pb-ink)]'
                : 'text-white/70 hover:text-white'
            }`}
            aria-label="Menu"
            aria-controls="mobile-navigation-drawer"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          {/* Semi-transparent Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[99] transition-opacity duration-300 opacity-100"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed top-0 right-0 h-full w-72 z-[101] bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/5 transition-transform duration-300 translate-x-0"
          >
            {/* Close Button */}
            <div className="flex items-center justify-end px-6 py-5">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white transition-colors"
                aria-label={siteData.nav.mobileMenuCloseLabel}
                onClick={closeMenu}
              >
                <X size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Nav Links */}
            <nav aria-label="Menu mobile" className="flex flex-col px-6">
              {siteData.nav.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-base text-white/60 hover:text-white transition-colors ${
                    index < siteData.nav.links.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* WhatsApp CTA Button */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <a
                href={siteData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, var(--color-pb-accent), var(--color-pb-accent-blue))',
                  boxShadow: '0 4px 20px rgba(46, 167, 41, 0.25)',
                }}
                onClick={closeMenu}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {siteData.nav.cta.label}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
