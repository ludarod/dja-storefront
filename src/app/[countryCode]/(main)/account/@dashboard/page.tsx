import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"

export async function generateMetadata(): Promise<Metadata> {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return {
    title: t.account,
    description: t.accountMetaDescription,
  }
}

export default async function OverviewTemplate() {
  const [customer, orders, currentLocale] = await Promise.all([
    retrieveCustomer().catch(() => null),
    listOrders().catch(() => null),
    getLocale(),
  ])

  if (!customer) {
    notFound()
  }

  const language = resolveUILanguage(currentLocale)

  return <Overview customer={customer} orders={orders || null} uiLanguage={language} />
}
