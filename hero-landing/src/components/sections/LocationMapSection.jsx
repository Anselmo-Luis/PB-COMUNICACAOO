import { useRef, useEffect } from 'react';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';
import '@maptiler/sdk/dist/maptiler-sdk.css';

export default function LocationMapSection() {
  const revealRef = useReveal();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { contact } = siteData;
  const { location } = contact;
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // apiKey and siteData.location are build-time constants — empty dep array is intentional
    if (!apiKey) return;

    let cancelled = false;

    const initMap = async () => {
      const maptilersdk = await import('@maptiler/sdk');
      if (cancelled || !mapContainerRef.current) return;

      maptilersdk.config.apiKey = apiKey;

      const map = new maptilersdk.Map({
        container: mapContainerRef.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [location.lng, location.lat],
        zoom: location.zoom,
        scrollZoom: false,
        dragPan: true,
        attributionControl: false,
      });

      // Assign immediately so cleanup can always reach this instance [fix #1]
      if (cancelled) { map.remove(); return; }
      mapRef.current = map;

      map.addControl(new maptilersdk.AttributionControl({ compact: true }), 'bottom-right');

      const pinEl = document.createElement('div');
      pinEl.className = 'map-pin-marker';

      const popup = new maptilersdk.Popup({ offset: 44, closeButton: false, closeOnClick: false })
        .setHTML(
          `<div class="map-popup">
            <strong>${siteData.company.name.replace('&', '&amp;')}</strong>
            <p>${contact.address}</p>
          </div>`
        );

      const marker = new maptilersdk.Marker({ element: pinEl })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map);

      // Guard against cleanup firing before the load event [fix #2]
      map.on('load', () => {
        if (!cancelled) marker.togglePopup();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          initMap();
        }
      },
      { rootMargin: '200px' }
    );

    if (mapContainerRef.current) observer.observe(mapContainerRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      mapRef.current?.remove();
    };
  }, []);

  return (
    <section
      id="localizacao"
      className="relative z-10 bg-[var(--color-pb-surface)] px-6 py-24 sm:py-32"
    >
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-start lg:gap-16">

          {/* Editorial column */}
          <div>
            <span className="section-kicker-light">Nossa Localização</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              Estamos na{' '}
              <span className="accent-gradient-light">Lapa</span>,{' '}
              <br className="hidden sm:block" />
              São Paulo
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-[var(--color-pb-accent-on-light)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-base text-[var(--color-pb-ink)]">{contact.address}</p>
                  <p className="mt-1 text-sm text-[var(--color-pb-ink-2)]">{contact.cep}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[var(--color-pb-ink-2)]">
                <span
                  className="mt-[5px] h-[10px] w-[10px] flex-shrink-0 rounded-full bg-[var(--color-pb-accent-blue)] opacity-60"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed">{contact.addressHint}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-action-btn-light editorial-surface-soft-light"
              >
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                Abrir no Google Maps
              </a>
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-action-btn-light editorial-surface-soft-light"
              >
                <Navigation size={16} strokeWidth={1.5} aria-hidden="true" />
                Traçar rota
              </a>
            </div>
          </div>

          {/* Map column */}
          <div className="map-frame-light rounded-[1.75rem] overflow-hidden">
            {apiKey ? (
              <div
                ref={mapContainerRef}
                className="h-[320px] sm:h-[420px] lg:h-[520px]"
                role="application"
                aria-label="Mapa de localização da P&B Comunicação Visual"
              />
            ) : (
              <div className="h-[320px] sm:h-[420px] lg:h-[520px] map-fallback-light">
                <MapPin size={32} strokeWidth={1.5} aria-hidden="true" />
                <p className="text-sm">Rua Antonio Raposo, 149 — Lapa, SP</p>
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-pb-accent-on-light)] hover:underline"
                >
                  Ver no Google Maps →
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
