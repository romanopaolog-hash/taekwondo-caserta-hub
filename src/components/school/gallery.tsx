import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
export type GalleryPhoto = { id: string; storage_path: string; caption: string; event_name: string; created_at: string };
function GalleryImage({ photo }: { photo: GalleryPhoto }) {
 const [url, setUrl] = useState(''); const [failed, setFailed] = useState(false);
 useEffect(() => { let active = true; supabase.storage.from('competition-photos').createSignedUrl(photo.storage_path, 3600).then(({ data, error }) => { if (!active) return; if (error) setFailed(true); else setUrl(data.signedUrl); }); return () => { active = false; }; }, [photo.storage_path]);
 return <figure>{url ? <img src={url} alt={photo.caption} loading="lazy" width={640} height={480} /> : <div className="teacher-art"><p className="help-text">{failed ? 'Foto non disponibile. Ricarica la pagina.' : 'Caricamento foto…'}</p></div>}<h2>{photo.event_name}</h2><figcaption>{photo.caption}</figcaption></figure>;
}
export function Gallery({ photos }: { photos: GalleryPhoto[] }) { return <div className="gallery-grid">{photos.map((photo) => <GalleryImage key={photo.id} photo={photo} />)}</div>; }
