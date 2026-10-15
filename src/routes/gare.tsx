import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { Camera, ArrowUpRight } from 'lucide-react';
import { PageHeading } from '@/components/school/layout';
import { Gallery } from '@/components/school/gallery';
import { schoolHead } from '@/lib/school/info';
import { getGallery } from '@/lib/school/gallery.functions';
export const galleryOptions = queryOptions({ queryKey: ['competition-gallery'], queryFn: () => getGallery(), staleTime: 30000 });
export const Route = createFileRoute('/gare')({ component: Competitions, loader: ({ context }) => context.queryClient.ensureQueryData(galleryOptions), head: () => schoolHead('Gare e fotografie', 'Le fotografie degli eventi e delle gare del Team Rago, Taekwondo Ispanico Caserta.'), errorComponent: () => <section className="modern-shell content-page"><h1>Le foto non sono disponibili.</h1><p>Ricarica la pagina o riprova tra poco.</p></section> });
function Competitions() { const { data } = useSuspenseQuery(galleryOptions); return <section className="modern-shell content-page"><PageHeading number="04" title="Una squadra. Tanti momenti." description="Eventi, gare e ricordi del Team Rago, dentro e fuori dal tatami." />{data.length ? <Gallery photos={data} /> : <div className="empty-state"><Camera size={40} aria-hidden="true" /><p>Non ci sono ancora foto di gare.</p><p className="placeholder">[Foto e didascalie degli eventi da pubblicare]</p></div>}<div className="actions"><Link to="/amministratori" className="text-link">Accesso amministratori <ArrowUpRight aria-hidden="true" /></Link></div></section>; }
