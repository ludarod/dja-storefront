import { Metadata } from "next"

import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default async function NotFound() {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t.pageNotFound}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t.pageDoesNotExist}
      </p>
      <InteractiveLink href="/">{t.goToFrontpage}</InteractiveLink>
    </div>
  )
}
