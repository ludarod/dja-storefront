import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(): Promise<Metadata> {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return {
    title: t.cart,
    description: `${t.summary} ${t.cart.toLowerCase()}`,
  }
}

export default async function Cart() {
  const [cart, customer, currentLocale] = await Promise.all([
    retrieveCart().catch((error) => {
      console.error(error)
      return notFound()
    }),
    retrieveCustomer(),
    getLocale(),
  ])

  return (
    <CartTemplate
      cart={cart}
      customer={customer}
      uiLanguage={resolveUILanguage(currentLocale)}
    />
  )
}
