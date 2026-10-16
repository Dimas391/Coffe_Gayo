> [!IMPORTANT]
> Avoid rewriting published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed.

- Keep shared navigation, language state and order-message dialogs in `site-shell`; all pages share one consistent experience.
- Maintain products, articles and unverified business contact fields in `src/lib/content.ts`; central data prevents conflicting product and contact information.
- Use public frontend message preparation for retail and partner requests without storing submissions; the supplied PRD permits WhatsApp link-based form handling.
- Keep prices and generated photos explicitly marked as samples until the owner provides verified content; never substitute fake contact destinations.
- Give shareable sections individual TanStack routes and leaf metadata; catalogs and journals use Outlet layouts for detail pages.
