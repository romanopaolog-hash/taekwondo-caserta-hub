import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Upload, Trash2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/school/layout';
import { schoolHead } from '@/lib/school/info';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { Gallery, type GalleryPhoto } from '@/components/school/gallery';
export const Route = createFileRoute('/amministratori')({ component: Administrators, head: () => schoolHead('Accesso amministratori', 'Area riservata ai responsabili del Team Rago per pubblicare e gestire le fotografie di gare ed eventi.') });
function Administrators() {
 const queryClient = useQueryClient(); const fileInput = useRef<HTMLInputElement>(null);
 const [userId, setUserId] = useState(''); const [admin, setAdmin] = useState(false); const [checking, setChecking] = useState(true);
 const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
 const [eventName, setEventName] = useState(''); const [caption, setCaption] = useState(''); const [consent, setConsent] = useState(false); const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
 const [deleting, setDeleting] = useState('');
 async function checkAccess() {
  setChecking(true);
  try {
   const { data: { user }, error } = await supabase.auth.getUser();
   if (!user || error) { setUserId(''); setAdmin(false); return; }
   setUserId(user.id);
   const { data: role, error: roleError } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
   if (roleError) throw roleError;
   setAdmin(role === true);
   if (role) await refreshPhotos();
  } catch { setMessage('Non riusciamo a verificare l’accesso. Riprova tra poco.'); }
  finally { setChecking(false); }
 }
 async function refreshPhotos() {
  const { data, error } = await supabase.from('competition_photos').select('id, storage_path, caption, event_name, created_at').order('created_at', { ascending: false });
  if (error) throw error;
  setPhotos(data); await queryClient.invalidateQueries({ queryKey: ['competition-gallery'] });
 }
 useEffect(() => { void checkAccess(); }, []);
 async function signIn(e: React.FormEvent) {
  e.preventDefault(); setBusy(true); setMessage('');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) setMessage('Accesso non riuscito. Controlla email e password oppure la conferma della tua email.');
  else { setPassword(''); await checkAccess(); }
  setBusy(false);
 }
 async function googleSignIn() {
  setBusy(true); setMessage('');
  try { const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/amministratori` }); if (result.error) setMessage('Accesso con Google non riuscito. Riprova.'); else if (!result.redirected) await checkAccess(); }
  catch { setMessage('Accesso con Google non disponibile. Riprova.'); }
  finally { setBusy(false); }
 }
 async function signOut() { const { error } = await supabase.auth.signOut(); if (error) { setMessage('Uscita non riuscita. Riprova.'); return; } setAdmin(false); setUserId(''); setPhotos([]); setMessage(''); }
 async function resetPassword() {
  if (!email.trim()) { setMessage('Scrivi la tua email per recuperare la password.'); return; }
  setBusy(true); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/recupero-password` });
  setMessage(error ? 'Non riusciamo a inviare l’email di recupero. Riprova tra poco.' : 'Se l’indirizzo è registrato, riceverai un’email per scegliere una nuova password.'); setBusy(false);
 }
 async function publishPhoto(e: React.FormEvent) {
  e.preventDefault(); setMessage('');
  const file = fileInput.current?.files?.[0];
  if (!file) { setMessage('Scegli una foto da pubblicare.'); return; }
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { setMessage('Scegli un file JPG, PNG o WebP.'); return; }
  if (file.size > 10*1024*1024) { setMessage('La foto supera il limite di 10 MB.'); return; }
  if (!eventName.trim() || !caption.trim()) { setMessage('Inserisci il nome dell’evento e la descrizione della foto.'); return; }
  if (!consent) { setMessage('Conferma di avere il consenso alla pubblicazione.'); return; }
  setBusy(true);
  let path = ''; let published = false;
  try {
   const image = new Image(); const objectURL = URL.createObjectURL(file); image.src=objectURL; try { await image.decode(); } finally { URL.revokeObjectURL(objectURL); }
   const { data: allowed, error: roleError } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
   if (roleError || !allowed) throw new Error('Non hai il permesso di pubblicare foto.');
   const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp'; path = `${userId}/${crypto.randomUUID()}.${extension}`;
   const { error: uploadError } = await supabase.storage.from('competition-photos').upload(path, file, { contentType: file.type }); if (uploadError) throw uploadError;
   const { error: insertError } = await supabase.from('competition_photos').insert({ storage_path: path, event_name: eventName.trim(), caption: caption.trim(), created_by: userId }); if (insertError) throw insertError;
   published = true; setEventName(''); setCaption(''); setConsent(false); if (fileInput.current) fileInput.current.value='';
   await refreshPhotos(); setMessage('Foto pubblicata. È ora visibile nella pagina Gare e fotografie.');
  } catch {
   if (path && !published) await supabase.storage.from('competition-photos').remove([path]);
   setMessage(published ? 'Foto pubblicata, ma l’elenco non si è aggiornato. Ricarica la pagina.' : 'La foto non è stata pubblicata. Controlla il file e i permessi, poi riprova.');
  } finally { setBusy(false); }
 }
 async function deletePhoto(photo: GalleryPhoto) {
  setBusy(true); setMessage('');
  try {
   const { error } = await supabase.from('competition_photos').delete().eq('id',photo.id); if (error) throw error;
   const { error: storageError } = await supabase.storage.from('competition-photos').remove([photo.storage_path]);
   await refreshPhotos(); setDeleting(''); setMessage(storageError ? 'Foto rimossa dalla galleria. La pulizia dell’archivio non è riuscita.' : 'Foto rimossa dalla galleria.');
  } catch { setMessage('Non riusciamo a rimuovere la foto. Riprova.'); } finally { setBusy(false); }
 }
 return <section className="modern-shell content-page"><PageHeading number="06" title="Area amministratori." description="Accesso riservato ai responsabili della scuola per gestire le fotografie di eventi e gare." />
 {checking ? <p role="status">Verifica dell’accesso…</p> : !userId ? <div className="auth-panel"><form className="form-stack" onSubmit={signIn}><div className="field"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} /></div><div className="field"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} /></div><Button variant="school" size="school" type="submit" disabled={busy}><LogIn aria-hidden="true" />{busy ? 'Accesso in corso…' : 'Accedi'}</Button><Button type="button" variant="schoolOutline" size="school" disabled={busy} onClick={resetPassword}>Password dimenticata?</Button></form><div className="form-divider" /><Button variant="schoolOutline" size="school" disabled={busy} onClick={googleSignIn}>Accedi con Google</Button><p className="help-text">Solo gli account autorizzati dal responsabile possono pubblicare foto.</p></div> : !admin ? <div className="empty-state"><ShieldCheck size={36} aria-hidden="true" /><h2>Account non abilitato.</h2><p>Il tuo account non ha i permessi di amministratore. Chiedi al responsabile della scuola di autorizzarlo.</p><Button variant="schoolOutline" size="school" onClick={signOut}><LogOut aria-hidden="true" />Esci</Button></div> : <><div className="admin-top"><h2>Pubblica una foto</h2><Button variant="schoolOutline" size="school" onClick={signOut}><LogOut aria-hidden="true" />Esci</Button></div><form className="form-stack auth-panel" onSubmit={publishPhoto} noValidate><div className="field"><label htmlFor="competition-file">Foto della gara</label><input id="competition-file" type="file" ref={fileInput} accept="image/jpeg,image/png,image/webp" /><p className="help-text">JPG, PNG o WebP · massimo 10 MB</p></div><div className="field"><label htmlFor="event-name">Nome dell’evento</label><input id="event-name" maxLength={150} value={eventName} onChange={e=>setEventName(e.target.value)} /></div><div className="field"><label htmlFor="event-caption">Descrizione della foto</label><textarea id="event-caption" rows={3} maxLength={500} value={caption} onChange={e=>setCaption(e.target.value)} /></div><label className="consent-label"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />Confermo di avere il permesso di pubblicare questa foto e il consenso dei genitori per eventuali minori.</label><Button type="submit" variant="school" size="school" disabled={busy}><Upload aria-hidden="true" />{busy ? 'Pubblicazione in corso…' : 'Pubblica foto'}</Button></form><div className="form-divider" /><h2>Foto pubblicate</h2>{photos.map(photo=><div key={photo.id} className="gallery-admin-item"><span>{photo.event_name} — {photo.caption}</span>{deleting===photo.id ? <div className="actions"><Button variant="school" size="school" disabled={busy} onClick={()=>deletePhoto(photo)}>Conferma rimozione</Button><Button variant="schoolOutline" size="school" onClick={()=>setDeleting('')}>Annulla</Button></div> : <Button variant="schoolOutline" size="school" onClick={()=>setDeleting(photo.id)}><Trash2 aria-hidden="true" />Rimuovi</Button>}</div>)}{photos.length>0 && <Gallery photos={photos} />}</>}
 <div role="status" aria-live="polite">{message && <p className="form-message">{message}</p>}</div></section>;
}
