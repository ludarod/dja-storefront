"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { ui, UILanguage } from "@lib/i18n/ui"
import { LayoutDashboard, LogOut, MapPinned, PackageSearch, UserRound } from "lucide-react"

const AccountNav = ({
  customer,
  uiLanguage,
}: {
  customer: HttpTypes.StoreCustomer | null
  uiLanguage: UILanguage
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }
  const t = ui(uiLanguage)

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>{t.account}</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              {t.hello} {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>{t.profile}</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>{t.addresses}</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>{t.orders}</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>{t.logout}</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div className="rounded-xl border border-ui-border-base bg-white p-5">
          <div className="pb-4 border-b border-ui-border-base mb-4">
            <h3 className="text-base-semi uppercase tracking-wider text-ui-fg-subtle">{t.account}</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-2">
              <li className="w-full">
                <AccountNavLink
                  href="/account"
                  route={route!}
                  icon={<LayoutDashboard size={16} className="text-gold" />}
                  data-testid="overview-link"
                >
                  {t.overview}
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  icon={<UserRound size={16} className="text-gold" />}
                  data-testid="profile-link"
                >
                  {t.profile}
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  icon={<MapPinned size={16} className="text-gold" />}
                  data-testid="addresses-link"
                >
                  {t.addresses}
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  icon={<PackageSearch size={16} className="text-gold" />}
                  data-testid="orders-link"
                >
                  {t.orders}
                </AccountNavLink>
              </li>
              <li className="w-full pt-2 mt-2 border-t border-ui-border-base">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors text-red-600"
                  data-testid="logout-button"
                >
                  <LogOut size={16} />
                  {t.logout}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  icon?: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  icon,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "w-full inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
        {
          "text-ui-fg-subtle hover:text-ui-fg-base hover:bg-gray-50": !active,
          "text-ui-fg-base font-semibold bg-gray-50": active,
        }
      )}
      data-testid={dataTestId}
    >
      {icon}
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
