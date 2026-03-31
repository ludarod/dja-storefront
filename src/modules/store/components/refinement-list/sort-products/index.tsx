"use client"

import { ui, UILanguage } from "@lib/i18n/ui"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  uiLanguage: UILanguage
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
  uiLanguage,
}: SortProductsProps) => {
  const t = ui(uiLanguage)
  const sortOptions = [
    {
      value: "created_at",
      label: t.latestArrivals,
    },
    {
      value: "price_asc",
      label: t.priceLowHigh,
    },
    {
      value: "price_desc",
      label: t.priceHighLow,
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={t.sortBy}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
