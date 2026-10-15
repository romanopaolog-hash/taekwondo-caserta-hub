<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the index presentational; dedicated content routes share the root school layout and an accessible right-side Radix navigation drawer.
- Keep school styling in the global semantic design system and use the school Button variants for large accessible actions.
- Competition photos persist in private Cloud storage with published metadata in a public gallery; server-side RLS allows writes only to users with a separate admin role, assigned explicitly by the owner.
- Public gallery metadata loads through a publishable server function and TanStack Query; browser-safe signed storage links expose only published images, never storage credentials.
- Provide an independent HTML export with Italian instructions when source delivery is requested; do not replace the TanStack application framework.
