export const school = {
 name: 'Taekwondo Ispanico Caserta', phone: '+39 327 622 6136', tel: 'tel:+393276226136',
 address: 'Via Eugenio Ruggiero 12, 81100 Caserta (CE)', venue: 'Santangelo Sport Village',
 maps: 'https://www.google.com/maps/search/?api=1&query=Santangelo+Sport+Village+Via+Eugenio+Ruggiero+12+Caserta',
 instagram: 'https://www.instagram.com/taekwondo.ispanico',
};
export function schoolHead(label: string, description: string) {
 const title = `${label} — Taekwondo Ispanico Caserta | Team Rago`;
 return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
