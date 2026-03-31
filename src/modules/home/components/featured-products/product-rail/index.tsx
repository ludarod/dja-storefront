import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts?.length) {
    return null
  }

  const spotlightProducts = pricedProducts.slice(0, 3)
  return (
    <div className="content-container py-10 small:py-16">
      <div className="flex flex-col gap-2 small:flex-row small:items-end small:justify-between mb-6">
        <div>
          <Text className="text-2xl font-black uppercase tracking-[5px]">
            {collection.title}
          </Text>
          <p className="text-[0.65rem] uppercase tracking-[3px] text-ui-fg-subtle mt-1">
            Productos destacados
          </p>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Ver catálogo
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 small:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlightProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
