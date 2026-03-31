"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import { signout } from "@lib/data/customer"
import { useParams } from "next/navigation"
import { ui, UILanguage } from "@lib/i18n/ui"
import {
  House,
  LogOut,
  Menu,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  isLoggedIn?: boolean
  uiLanguage: UILanguage
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  isLoggedIn = false,
  uiLanguage,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()
  const { countryCode } = useParams() as { countryCode: string }
  const t = ui(uiLanguage)

  const sideMenuItems = [
    { label: t.home, href: "/", icon: <House size={16} className="text-gold" /> },
    { label: t.store, href: "/store", icon: <Store size={16} className="text-gold" /> },
    {
      label: t.account,
      href: "/account",
      icon: <UserRound size={16} className="text-gold" />,
    },
    {
      label: t.cart,
      href: "/cart",
      icon: <ShoppingCart size={16} className="text-gold" />,
    },
  ]

  const handleSignout = async () => {
    await signout(countryCode)
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full inline-flex items-center gap-2 transition-colors duration-200 focus:outline-none hover:text-gold text-small-regular font-semibold"
                >
                  <Menu size={16} className="text-gold" />
                  {t.menu}
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/0 pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-[51] inset-x-0 text-sm m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white text-ui-fg-base rounded-xl justify-between p-5 border border-ui-border-base shadow-2xl"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 rounded-md hover:bg-gray-50"
                      >
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-2 items-start justify-start">
                      {sideMenuItems.map((item) => {
                        return (
                          <li key={item.label} className="w-full">
                            <LocalizedClientLink
                              href={item.href}
                              className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                              onClick={close}
                              data-testid={`${item.label.toLowerCase()}-link`}
                            >
                              {item.icon}
                              {item.label}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                      {isLoggedIn && (
                        <li className="w-full pt-2 mt-2 border-t border-ui-border-base">
                          <button
                            type="button"
                            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors text-red-600"
                            onClick={handleSignout}
                            data-testid="menu-signout-button"
                          >
                            <LogOut size={16} />
                            {t.switchUser}
                          </button>
                        </li>
                      )}
                    </ul>
                    <div className="flex flex-col gap-y-5">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                            uiLanguage={uiLanguage}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                      <div
                        className="flex justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small text-ui-fg-subtle px-1">
                        © {new Date().getFullYear()} Sabor Cubano Express. {t.copyright}
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
