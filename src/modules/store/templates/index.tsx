import { Suspense } from "react"

import { getLocale } from "@lib/data/locale-actions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  q?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const language = resolveUILanguage(await getLocale())
  const t = ui(language)

  return (
    <div
      className="flex flex-col gap-y-8 small:gap-y-0 small:flex-row small:items-start small:gap-x-10 py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} uiLanguage={language} query={q} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">{t.allProducts}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            q={q}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
