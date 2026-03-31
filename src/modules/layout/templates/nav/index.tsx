import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { retrieveCustomer } from "@lib/data/customer"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import { StoreRegion } from "@medusajs/types"
import BrandLogo from "@modules/common/components/brand-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import TopLanguageSwitch from "@modules/layout/components/top-language-switch"
import AccountMenu from "@modules/layout/components/account-menu"
import { House, ShoppingCart } from "lucide-react"

export default async function Nav() {
  const [regions, locales, currentLocale, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer().catch(() => null),
  ])

  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="bg-luxury-black text-luxury-white py-2 text-[0.75rem] uppercase tracking-[2px]">
        <div className="content-container relative flex items-center justify-center">
          <span className="text-center">{t.topBanner}</span>
          <div className="absolute right-0">
            <TopLanguageSwitch currentLocale={currentLocale} />
          </div>
        </div>
      </div>

      <header className="relative h-[90px] mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                isLoggedIn={Boolean(customer)}
                uiLanguage={language}
              />
              <LocalizedClientLink
                href="/"
                className="ml-4 hidden small:flex items-center gap-2 hover:text-gold uppercase tracking-wider font-semibold"
                data-testid="nav-home-link"
              >
                <House size={16} className="text-gold" />
                {t.home}
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center justify-center text-center gap-2">
            <LocalizedClientLink
              href="/"
              className="flex items-center justify-center gap-2"
              data-testid="nav-store-link"
            >
              <span className="text-gold uppercase tracking-[5px] text-[0.7rem] font-semibold">Sabor</span>
              <BrandLogo size="sm" priority className="mx-1" />
              <span className="uppercase tracking-[5px] text-[0.7rem] font-semibold text-ui-fg-base">Cubano</span>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full uppercase tracking-wider text-small-regular font-semibold">
              <AccountMenu customer={customer} uiLanguage={language} />
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-gold flex items-center gap-2 uppercase tracking-wider text-small-regular font-semibold"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart size={16} className="text-gold" />
                  {`${t.cart} (0)`}
                </LocalizedClientLink>
              }
            >
              <CartButton uiLanguage={language} />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
