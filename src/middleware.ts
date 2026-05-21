// Pass-through middleware.
//
// FOUNDATION-PASS DECISION: routes are served from the root in Spanish (the
// canonical locale per the brief). The next-intl message system still loads
// the requested locale via the cookie set by LocaleSwitcher.
//
// PRODUCTION MIGRATION (see HANDOFF.md): move pages under `app/[locale]/...`
// and re-enable next-intl middleware with `localePrefix: 'as-needed'` so
// `/en/...` and `/zh/...` get their own URLs and Google can index them
// with hreflang. The message JSON files and i18n/request.ts are already
// structured for that move.
export const config = {
  matcher: []
};

export default function middleware() {
  // intentionally empty for the foundation pass
}
