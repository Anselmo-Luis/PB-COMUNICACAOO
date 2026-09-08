export function buildWhatsAppLink(phone, message) {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}
