import { ui, UILanguage } from "@lib/i18n/ui"
import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = ({ uiLanguage }: { uiLanguage: UILanguage }) => {
  const t = ui(uiLanguage)

  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {t.signInPromptTitle}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {t.signInPromptSubtitle}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {t.signIn}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
