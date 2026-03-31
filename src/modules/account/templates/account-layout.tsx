import React from "react"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { UILanguage } from "@lib/i18n/ui"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
  uiLanguage: UILanguage
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
  uiLanguage,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] small:gap-x-8 gap-y-6 py-12">
          <div>{customer && <AccountNav customer={customer} uiLanguage={uiLanguage} />}</div>
          <div className="flex-1 small:pl-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
