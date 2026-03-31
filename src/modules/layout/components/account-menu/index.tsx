"use client"

import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { signout } from "@lib/data/customer"
import { ui, UILanguage } from "@lib/i18n/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { ChevronDown, LogOut, User } from "lucide-react"
import { useParams } from "next/navigation"
import { Fragment } from "react"

type AccountMenuProps = {
  customer: HttpTypes.StoreCustomer | null
  uiLanguage: UILanguage
}

const AccountMenu = ({ customer, uiLanguage }: AccountMenuProps) => {
  const t = ui(uiLanguage)
  const { countryCode } = useParams() as { countryCode: string }

  if (!customer) {
    return (
      <LocalizedClientLink
        className="hover:text-gold transition-colors inline-flex items-center gap-2"
        href="/account"
        data-testid="nav-account-link"
      >
        <User size={16} className="text-gold" />
        {t.account}
      </LocalizedClientLink>
    )
  }

  const displayName = customer.first_name?.trim() || t.account

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <Popover className="relative">
      <PopoverButton
        className="hover:text-gold transition-colors inline-flex items-center gap-2"
        data-testid="nav-account-link"
      >
        <User size={16} className="text-gold" />
        <span className="max-w-[130px] truncate">{displayName}</span>
        <ChevronDown size={14} />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-[70]">
          <div className="px-4 py-3 border-b border-gray-100 text-xs uppercase tracking-widest text-ui-fg-subtle">
            {customer.email}
          </div>
          <div className="p-2">
            <LocalizedClientLink
              href="/account"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50"
            >
              <User size={15} />
              <span>{t.account}</span>
            </LocalizedClientLink>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-red-600"
              data-testid="nav-logout-button"
            >
              <LogOut size={15} />
              <span>{t.logout}</span>
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}

export default AccountMenu
