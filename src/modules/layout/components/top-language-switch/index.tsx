"use client"

import { updateLocale } from "@lib/data/locale-actions"
import { resolveUILanguage } from "@lib/i18n/ui"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"

type TopLanguageSwitchProps = {
  currentLocale: string | null
}

const TopLanguageSwitch = ({ currentLocale }: TopLanguageSwitchProps) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const current = useMemo(
    () => resolveUILanguage(currentLocale),
    [currentLocale]
  )

  const applyLocale = (localeCode: string) => {
    startTransition(async () => {
      await updateLocale(localeCode)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-[0.7rem] tracking-[1px] uppercase hover:text-gold"
        data-testid="top-language-switch"
      >
        <Globe size={14} />
        <span>{isPending ? "..." : current.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[110px] border border-white/20 bg-luxury-black text-luxury-white shadow-lg z-[60]">
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-xs hover:bg-white/10"
            onClick={() => applyLocale("es")}
          >
            Espanol
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-xs hover:bg-white/10"
            onClick={() => applyLocale("en")}
          >
            English
          </button>
        </div>
      )}
    </div>
  )
}

export default TopLanguageSwitch
