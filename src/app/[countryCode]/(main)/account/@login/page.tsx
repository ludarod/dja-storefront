import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import LoginTemplate from "@modules/account/templates/login-template"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return {
    title: t.signIn,
    description: t.signInMetaDescription,
  }
}

export default async function Login() {
  const language = resolveUILanguage(await getLocale())
  return <LoginTemplate uiLanguage={language} />
}
