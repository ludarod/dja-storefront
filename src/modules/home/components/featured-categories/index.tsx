import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type FeaturedCategoriesProps = {
  categories: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
}

export default function FeaturedCategories({ categories, region }: FeaturedCategoriesProps) {
  if (!categories.length) {
    return null
  }

  return (
    <ul className="space-y-10">
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryRail category={category} region={region} />
        </li>
      ))}
    </ul>
  )
}

async function CategoryRail({
  category,
  region,
}: {
  category: HttpTypes.StoreProductCategory
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      category_id: [category.id],
      limit: 6,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) {
    return null
  }

  const spotlight = products.slice(0, 3)

  return (
    <div className="content-container py-5 md:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <Text className="text-2xl font-black uppercase tracking-[5px]">
            {category.name}
          </Text>
          {category.description && (
            <p className="text-[0.65rem] uppercase tracking-[3px] text-ui-fg-subtle mt-1 max-w-[480px]">
              {category.description}
            </p>
          )}
        </div>
        <LocalizedClientLink
          href={`/categories/${category.handle}`}
          className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-[0.65rem] uppercase tracking-[3px] transition hover:bg-gold hover:text-black"
        >
          Ver categoría
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {spotlight.map((product) => (
          <li key={product.id} className="h-full">
            <ProductPreview
              product={product}
              region={region}
              isFeatured
              variant="compact"
              className="mx-auto max-w-[280px] w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
