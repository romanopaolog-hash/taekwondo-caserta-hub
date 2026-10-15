import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, CalendarDays, Camera, Check, Clock3, ImagePlus, MapPin, Phone, ShieldCheck, Upload, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.jpg.asset.json';

const phone = '+39 327 622 6136';
const tel = 'tel:+393276226136';
const maps = 'https://www.google.com/maps/search/?api=1&query=Santangelo+Sport+Village+Via+Eugenio+Ruggiero+12+Caserta';
const whatsapp = 'https://wa.me/393276226136';
const title = 'Taekwondo Ispanico Caserta — Team Rago | Corsi e orari';
const description = 'Taekwondo Ispanico Caserta: corsi per bambini, ragazzi, adulti e amatori con M. Antonio Rago, 8° Dan. Orari, sede e telefono al Santangelo Sport Village.';
export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SportsActivityLocation', name: 'Taekwondo Ispanico Caserta (Team Rago)', slogan: 'Volere è potere con il Taekwondo Ispanico', telephone: phone, sport: 'Taekwondo', address: { '@type': 'PostalAddress', streetAddress: 'Via Eugenio Ruggiero 12', postalCode: '81100', addressLocality: 'Caserta', addressRegion: 'CE', addressCountry: 'IT' }, sameAs: ['https://www.instagram.com/taekwondo.ispanico'], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Friday'], opens: '18:00', closes: '21:30' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Thursday'], opens: '19:15', closes: '20:15' }] }) }],
  }),
});

type Photo = { url: string; caption: string };
function Index() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);
  useEffect(() => () => { urls.current.forEach((url) => URL.revokeObjectURL(url)); }, []);
  async function addPhoto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) { setMessage('Scegli una foto prima di continuare.'); return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setMessage('Formato non supportato. Scegli una foto JPG, PNG o WebP.'); return; }
    if (file.size > 10 * 1024 * 1024) { setMessage('La foto è troppo grande. Il limite è 10 MB.'); return; }
    if (!caption.trim()) { setMessage('Scrivi una breve descrizione della foto.'); return; }
    setBusy(true);
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      urls.current.push(url);
      setPhotos((previous) => [...previous, { url, caption: caption.trim() }]);
      setMessage('Foto aggiunta all’anteprima. Non è ancora pubblicata: inviala al responsabile su WhatsApp.');
      setCaption('');
      if (fileInput.current) fileInput.current.value = '';
    } catch {
      URL.revokeObjectURL(url);
      setMessage('Non riusciamo ad aprire questa foto. Prova con un altro file JPG, PNG o WebP.');
    } finally { setBusy(false); }
  }
  return <>
    <a className="skip-link" href="#contenuto">Vai al contenuto</a>
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="#inizio" aria-label="Taekwondo Ispanico Caserta, inizio pagina"><img src={logo.url} alt="Logo Taekwondo Ispanico Caserta, Team Rago" width="62" height="62" /><span className="brand-name">Taekwondo Ispanico<span className="brand-subtitle">CASERTA · TEAM RAGO</span></span></a>
      <nav className="site-nav" aria-label="Menu principale"><a href="#chi-siamo">La scuola</a><a href="#orari">Orari</a><a href="#contatti">Contatti</a></nav>
      <a className="header-phone" href={tel}><Phone size={19} aria-hidden="true" />{phone}</a>
    </div></header>
    <main id="contenuto">
      <section id="inizio" className="hero shell" aria-labelledby="hero-title"><div className="hero-layout"><div>
        <p className="eyebrow">Taekwondo Ispanico Caserta</p>
        <h1 id="hero-title">Volere è potere<br />con il Taekwondo<br />Ispanico</h1>
        <p className="hero-description">Corsi per bambini, ragazzi e adulti, con il Maestro Antonio Rago.</p>
        <div className="actions"><Button asChild variant="school" size="school"><a href={tel}><Phone aria-hidden="true" />Chiama ora</a></Button><Button asChild variant="schoolOutline" size="school"><a href="#orari">Vedi gli orari<ArrowDown aria-hidden="true" /></a></Button></div>
        <p className="hero-phone">Parliamone insieme: <a href={tel}>{phone}</a></p>
      </div><img className="hero-logo" src={logo.url} alt="Emblema della scuola Taekwondo Ispanico Caserta — Team Rago" width="420" height="420" /></div>
      <div className="quick-info"><div className="quick-item"><MapPin aria-hidden="true" /><div><strong>Ci trovi a Caserta</strong><span>Santangelo Sport Village</span></div></div><div className="quick-item"><ShieldCheck aria-hidden="true" /><div><strong>M. Antonio Rago · 8° Dan</strong><span>Direttore tecnico</span></div></div><div className="quick-item"><CalendarDays aria-hidden="true" /><div><strong>Corsi dal 1° settembre</strong><span>Per tutte le fasce d’età</span></div></div></div>
      </section>
      <section id="chi-siamo" className="section" aria-labelledby="about-title"><div className="shell"><div className="section-heading"><div><span className="section-number">01 / LA SCUOLA</span><h2 id="about-title">Una passione che ci unisce.</h2></div></div><div className="about-grid"><div className="about-text"><p>Il Taekwondo Ispanico Caserta, Team Rago, accoglie bambini, ragazzi, adulti e amatori. Un percorso di pratica e crescita sotto la direzione tecnica del M. Antonio Rago, 8° Dan.</p><p>I corsi sono iniziati il <strong>1° settembre</strong>, presso il Santangelo Sport Village di Caserta.</p></div><div><div className="affiliations"><div className="affiliation">WT<small>World Taekwondo</small></div><div className="affiliation">FITA<small>Federazione Italiana Taekwondo</small></div></div><p className="placeholder">[Storia della scuola e risultati da inserire]</p><p className="placeholder">[Quote e prezzi dei corsi da inserire]</p></div></div></div></section>
      <section id="orari" className="section" aria-labelledby="schedule-title"><div className="shell"><div className="section-heading"><div><span className="section-number">02 / CORSI E ORARI</span><h2 id="schedule-title">Il tuo momento sul tatami.</h2><p className="section-intro">Trova il turno per la tua età. Per qualsiasi dubbio, chiamaci.</p></div></div>
        <div className="schedule-group"><h3 className="schedule-title"><CalendarDays size={24} aria-hidden="true" />Lunedì, mercoledì e venerdì</h3><div className="table-wrap"><table aria-label="Orari lunedì, mercoledì e venerdì"><thead><tr><th scope="col">Turno</th><th scope="col">Orario</th><th scope="col">Età</th></tr></thead><tbody><tr><td>Primo turno</td><td>18:00–19:00</td><td>5–10 anni</td></tr><tr><td>Secondo turno</td><td>19:00–20:15</td><td>10–14 anni</td></tr><tr><td>Terzo turno</td><td>20:15–21:30</td><td>Dai 14 anni</td></tr></tbody></table></div></div>
        <div className="schedule-group"><h3 className="schedule-title"><CalendarDays size={24} aria-hidden="true" />Martedì e giovedì</h3><div className="table-wrap"><table aria-label="Orari martedì e giovedì"><thead><tr><th scope="col">Turno</th><th scope="col">Orario</th><th scope="col">Partecipanti</th></tr></thead><tbody><tr><td>Turno unico</td><td>19:15–20:15</td><td>Over e amatori</td></tr></tbody></table></div></div>
        <div className="actions"><Button asChild variant="school" size="school"><a href={tel}><Phone aria-hidden="true" />Chiama per informazioni</a></Button></div>
      </div></section>
      <section id="istruttori" className="section" aria-labelledby="instructors-title"><div className="shell"><div className="section-heading"><div><span className="section-number">03 / ISTRUTTORI</span><h2 id="instructors-title">Esperienza. Passione. Rispetto.</h2></div></div><div className="instructors"><article className="instructor"><div className="photo-placeholder"><UserRound aria-hidden="true" /><span>[Foto del Maestro]</span></div><div><h3>M. Antonio Rago</h3><p className="instructor-role">Direttore tecnico<br /><strong>8° Dan</strong></p><p className="placeholder">[Breve biografia da inserire]</p></div></article><article className="instructor"><div className="photo-placeholder"><UserRound aria-hidden="true" /><span>[Foto istruttore]</span></div><div><h3>[Nome istruttore]</h3><p className="placeholder">[Ruolo e grado]</p><p className="placeholder">[Breve biografia da inserire]</p></div></article></div></div></section>
      <section id="galleria" className="section" aria-labelledby="gallery-title"><div className="shell"><div className="section-heading"><div><span className="section-number">04 / GALLERIA</span><h2 id="gallery-title">La nostra squadra, in immagini.</h2></div><Camera size={28} aria-hidden="true" /></div>{photos.length === 0 ? <div className="empty-gallery"><Camera aria-hidden="true" /><p>Non ci sono ancora foto.</p><p className="placeholder">[Foto e didascalie della scuola da inserire]</p></div> : <div className="gallery-grid">{photos.map((photo) => <figure key={photo.url}><img src={photo.url} alt={photo.caption} /><figcaption>{photo.caption}<span className="preview-label">Anteprima privata · non pubblicata</span></figcaption></figure>)}</div>}</div></section>
      <section id="foto-eventi" className="section" aria-labelledby="upload-title"><div className="shell"><div className="section-heading"><div><span className="section-number">05 / EVENTI E GARE</span><h2 id="upload-title">Condividi un momento di squadra.</h2><p className="section-intro">Prepara una foto e una breve descrizione dell’evento.</p></div></div><div className="upload-layout"><form className="upload-form" onSubmit={addPhoto} noValidate><div className="field"><label htmlFor="event-photo">Scegli una foto</label><input ref={fileInput} id="event-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="photo-help" /><p id="photo-help" className="help-text">JPG, PNG o WebP. Massimo 10 MB.</p></div><div className="field"><label htmlFor="photo-description">Descrizione della foto</label><textarea id="photo-description" name="description" rows={3} maxLength={500} placeholder="Nome dell’evento, luogo e data" value={caption} onChange={(event) => setCaption(event.target.value)} /></div><Button type="submit" variant="school" size="school" disabled={busy}><ImagePlus aria-hidden="true" />{busy ? 'Preparazione della foto…' : 'Aggiungi all’anteprima'}</Button><div aria-live="polite" aria-atomic="true">{message && <p className="form-message">{message}</p>}</div></form><aside className="upload-aside"><h3>Per pubblicare la tua foto</h3><p>L’anteprima è visibile solo qui e scompare quando ricarichi la pagina. Invia la foto e la descrizione al responsabile su WhatsApp: sarà lui a pubblicarla.</p><div className="actions"><Button asChild variant="schoolOutline" size="school"><a href={`${whatsapp}?text=${encodeURIComponent('Buongiorno, vorrei inviare una foto di un evento o di una gara per la galleria della scuola.')}`} target="_blank" rel="noopener noreferrer">Invia su WhatsApp<ArrowUpRight aria-hidden="true" /></a></Button></div><p className="help-text">Allega la foto nella conversazione. Invia solo immagini che hai il permesso di condividere; per i minori serve il consenso dei genitori.</p></aside></div></div></section>
      <section id="contatti" className="section" aria-labelledby="contact-title"><div className="shell"><div className="section-heading"><div><span className="section-number">06 / CONTATTI E SEDE</span><h2 id="contact-title">Ti aspettiamo a Caserta.</h2></div></div><div className="contact-grid"><div className="contact-list"><div className="contact-item"><Phone aria-hidden="true" /><div><strong>Chiamaci</strong><a className="contact-phone" href={tel}>{phone}</a></div></div><div className="contact-item"><MapPin aria-hidden="true" /><div><strong>Santangelo Sport Village</strong><p>Via Eugenio Ruggiero 12<br />81100 Caserta (CE)</p></div></div><div className="contact-item"><ArrowUpRight aria-hidden="true" /><div><strong>Seguici su Instagram</strong><a href="https://www.instagram.com/taekwondo.ispanico" target="_blank" rel="noopener noreferrer">@taekwondo.ispanico</a></div></div><p className="placeholder">[Email della scuola da inserire]</p></div><div className="location-panel"><MapPin size={34} aria-hidden="true" /><h3>La nostra sede</h3><p>Santangelo Sport Village<br />Via Eugenio Ruggiero 12, Caserta</p><Button asChild variant="school" size="school"><a href={maps} target="_blank" rel="noopener noreferrer">Apri la mappa<ArrowUpRight aria-hidden="true" /></a></Button></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><div><p className="footer-name">Taekwondo Ispanico Caserta · Team Rago</p><p className="footer-detail">Volere è potere con il Taekwondo Ispanico</p></div><p className="footer-detail">World Taekwondo · FITA</p></div></footer>
  </>;
}
