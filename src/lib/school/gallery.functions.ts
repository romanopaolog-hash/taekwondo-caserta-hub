import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
export const getGallery = createServerFn({ method: 'GET' }).handler(async () => {
 const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
 if (!url || !key) throw new Error('La galleria non è disponibile. Riprova più tardi.');
 const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_')) headers.delete('Authorization'); headers.set('apikey', key); return fetch(input, { ...init, headers }); } } });
 const { data, error } = await client.from('competition_photos').select('id, storage_path, caption, event_name, created_at').order('created_at', { ascending: false });
 if (error) throw new Error('Non riusciamo a caricare le foto. Riprova tra poco.');
 return data;
});
