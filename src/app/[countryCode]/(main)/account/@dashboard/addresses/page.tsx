import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"

export async function generateMetadata(): Promise<Metadata> {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return {
    title: t.addresses,
    description: t.addressesMetaDescription,
  }
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const [customer, region, currentLocale] = await Promise.all([
    retrieveCustomer(),
    getRegion(countryCode),
    getLocale(),
  ])

  if (!customer || !region) {
    notFound()
  }

  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t.shippingAddressesTitle}</h1>
        <p className="text-base-regular">{t.shippingAddressesDescription}</p>
      </div>
      <AddressBook customer={customer} region={region} uiLanguage={language} />
    </div>
  )
}
