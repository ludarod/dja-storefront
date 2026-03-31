import { ui, UILanguage } from "@lib/i18n/ui"
import { Button, Heading, Text } from "@medusajs/ui"
import { PackageX } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = ({ uiLanguage }: { uiLanguage: UILanguage }) => {
  const t = ui(uiLanguage)

  return (
    <div
      className="py-16 small:py-24 px-2 flex items-center justify-center"
      data-testid="empty-cart-message"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-ui-border-base bg-ui-bg-subtle px-6 py-10 small:px-10 small:py-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
          <PackageX size={36} />
        </div>
        <Heading level="h1" className="text-2xl-semi small:text-3xl-semi">
          {t.emptyCartTitle}
        </Heading>
        <Text className="text-base-regular mt-4 mb-8 text-ui-fg-subtle max-w-[34rem] mx-auto">
          {t.emptyCartDescription}
        </Text>
        <LocalizedClientLink href="/store" data-testid="empty-cart-home-button">
          <Button className="h-11 px-8 !bg-luxury-black !text-luxury-white hover:!bg-gold hover:!text-luxury-black rounded-none">
            {t.browseProducts}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
