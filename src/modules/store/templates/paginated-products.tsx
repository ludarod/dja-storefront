import { listProductsWithSort } from "@lib/data/products"
import { getLocale } from "@lib/data/locale-actions"
import { getRegion } from "@lib/data/regions"
import { resolveUILanguage, ui } from "@lib/i18n/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  q?: string
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (q?.trim()) {
    queryParams["q"] = q.trim()
  }

  const [region, currentLocale] = await Promise.all([
    getRegion(countryCode),
    getLocale(),
  ])

  if (!region) {
    return null
  }
  const language = resolveUILanguage(currentLocale)
  const t = ui(language)

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      {products.length ? (
        <ul
          className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-4"
          data-testid="products-list"
        >
          {products.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} variant="compact" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full rounded-xl border border-ui-border-base bg-ui-bg-subtle p-8 text-center">
          <p className="text-xl-semi">{t.noProductsFound}</p>
          <p className="text-ui-fg-subtle mt-2">{t.tryAnotherSearch}</p>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
