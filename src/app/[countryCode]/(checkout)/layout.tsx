import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import BrandLogo from "@modules/common/components/brand-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentLocale = await getLocale()
  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="bg-luxury-black text-luxury-white text-center py-2 text-[0.75rem] uppercase tracking-[2px]">
        <span>{t.topBanner}</span>
      </div>
      <div className="h-[90px] bg-white border-b">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase tracking-wider flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              {t.backToCart}
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              {t.back}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center justify-center gap-2"
            data-testid="store-link"
          >
            <span className="text-gold uppercase tracking-[5px] text-[0.75rem] font-semibold">Sabor</span>
            <BrandLogo size="sm" />
            <span className="uppercase tracking-[5px] text-[0.75rem] font-semibold text-ui-fg-base">Cubano</span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center text-xs text-ui-fg-subtle uppercase tracking-wider">
        © {new Date().getFullYear()} Sabor Cubano Express
      </div>
    </div>
  )
}
