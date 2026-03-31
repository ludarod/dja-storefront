"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useCallback, useState } from "react"

import { ui, UILanguage } from "@lib/i18n/ui"
import SortProducts, { SortOptions } from "./sort-products"
import { Search } from "lucide-react"

type RefinementListProps = {
  sortBy: SortOptions
  uiLanguage?: UILanguage
  query?: string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({
  sortBy,
  uiLanguage = "en",
  query = "",
  'data-testid': dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = ui(uiLanguage)
  const [searchTerm, setSearchTerm] = useState(query)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams(searchParams)

    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim())
    } else {
      params.delete("q")
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex small:flex-col gap-8 py-4 mb-12 small:mb-0 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-fg-subtle"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-10 rounded-md border border-ui-border-base bg-white pl-9 pr-3 text-small-regular focus:outline-none focus:ring-1 focus:ring-ui-fg-base"
              data-testid="store-search-input"
            />
          </div>
          <button
            type="submit"
            className="h-10 px-4 rounded-md bg-luxury-black text-luxury-white hover:bg-gold hover:text-luxury-black transition-colors text-small-semi"
            data-testid="store-search-button"
          >
            {t.searchButton}
          </button>
        </div>
      </form>
      <SortProducts
        sortBy={sortBy}
        setQueryParams={setQueryParams}
        uiLanguage={uiLanguage}
        data-testid={dataTestId}
      />
    </div>
  )
}

export default RefinementList
