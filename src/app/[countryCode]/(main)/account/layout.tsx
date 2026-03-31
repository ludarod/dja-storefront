import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage } from "@lib/i18n/ui"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const [customer, currentLocale] = await Promise.all([
    retrieveCustomer().catch(() => null),
    getLocale(),
  ])

  return (
    <AccountLayout customer={customer} uiLanguage={resolveUILanguage(currentLocale)}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
