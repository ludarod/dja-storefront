import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import { Mail, MapPinned, Phone, UserRound } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return {
    title: t.profile,
    description: t.profileMetaDescription,
  }
}

export default async function Profile() {
  const [customer, regions, currentLocale] = await Promise.all([
    retrieveCustomer(),
    listRegions(),
    getLocale(),
  ])

  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 rounded-xl border border-ui-border-base bg-ui-bg-subtle p-6">
        <h1 className="text-2xl-semi">{t.profile}</h1>
        <p className="text-base-regular text-ui-fg-subtle mt-2">{t.profileMetaDescription}</p>
      </div>

      <div className="flex flex-col gap-y-5 w-full">
        <SectionCard title={t.firstName + " / " + t.lastName} icon={<UserRound size={16} className="text-gold" />}>
          <ProfileName customer={customer} uiLanguage={language} />
        </SectionCard>

        <SectionCard title={t.email} icon={<Mail size={16} className="text-gold" />}>
          <ProfileEmail customer={customer} uiLanguage={language} />
        </SectionCard>

        <SectionCard title={t.phone} icon={<Phone size={16} className="text-gold" />}>
          <ProfilePhone customer={customer} uiLanguage={language} />
        </SectionCard>

        <SectionCard title={t.billingAddress} icon={<MapPinned size={16} className="text-gold" />}>
          <ProfileBillingAddress customer={customer} regions={regions} uiLanguage={language} />
        </SectionCard>
      </div>
    </div>
  )
}

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <section className="rounded-xl border border-ui-border-base bg-white p-5 small:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ui-border-base">
        {icon}
        <h2 className="text-base-semi uppercase tracking-wider text-ui-fg-subtle">{title}</h2>
      </div>
      {children}
    </section>
  )
}
