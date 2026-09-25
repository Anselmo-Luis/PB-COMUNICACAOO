import { siteData } from '../../data/siteData';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteData.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="whatsapp-float-icon" />
    </a>
  );
}
