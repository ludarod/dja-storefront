import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import { Text } from "@medusajs/ui"

import BrandLogo from "@modules/common/components/brand-logo"
import ContactForm from "@modules/layout/components/contact-form"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export default async function Footer() {
  const currentLocale = await getLocale()

  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  return (
    <footer className="bg-luxury-black border-t border-ui-border-base w-full mt-20 text-luxury-white">
      <div className="content-container flex flex-col w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <div className="flex flex-col gap-y-6">
            <LocalizedClientLink
              href="/"
              className="inline-flex"
            >
              <BrandLogo size="md" />
            </LocalizedClientLink>
            <Text className="text-white/60 leading-relaxed font-medium">
              {t.brandDescription}
            </Text>
            <div className="flex flex-col gap-1 text-xs text-white/40">
               <span>saborcubanoexpress.com</span>
               <span>@saborcubano</span>
            </div>
            <div className="flex flex-col gap-y-2 text-xs text-white/60 font-medium">
              <span className="font-bold text-gold uppercase tracking-widest text-[0.55rem]">
                {t.support}
              </span>
              <LocalizedClientLink href="/account" className="hover:text-gold transition-colors">
                {t.account}
              </LocalizedClientLink>
              <a href="https://wa.me/5358222742" className="hover:text-gold transition-colors">
                {t.whatsappSupport}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <span className="font-bold text-gold uppercase tracking-widest text-xs">{t.social}</span>
            <ul className="flex flex-col gap-y-3 text-white/60 font-medium">
              <li>
                <a
                  href="https://www.instagram.com/sabor_cubano_express?igsh=bXZ2bm5la2J5bm55&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Instagram size={16} />
                  {t.instagram}
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/saborcubanoexpress"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Facebook size={16} />
                  {t.facebook}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5358222742"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <MessageCircle size={16} />
                  {t.whatsapp}
                </a>
              </li>
            </ul>
            <p className="text-[0.65rem] uppercase tracking-[3px] text-white/40">{t.followUs}</p>
          </div>

          <ContactForm
            heading={t.contactHeading}
            description={t.contactDescription}
            nameLabel={t.contactName}
            emailLabel={t.contactEmail}
            messageLabel={t.contactMessage}
            submitLabel={t.sendMessage}
            successMessage={t.contactSubmitted}
          />
        </div>

        <div className="pt-6 text-center text-xs uppercase tracking-[2px] text-white/60">
          © {new Date().getFullYear()} SABOR CUBANO EXPRESS - BAYAMO, GRANMA.
        </div>
      </div>
    </footer>
  )
}
