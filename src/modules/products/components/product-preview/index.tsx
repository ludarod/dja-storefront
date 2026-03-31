import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  className,
  variant = "default",
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  className?: string
  variant?: "default" | "compact"
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const thumbnailSize = variant === "compact" ? "square" : "full"
  const paddingClass = variant === "compact" ? "p-3" : "p-4"
  const buttonSizeClass = variant === "compact" ? "text-[0.65rem] px-3 py-2" : "text-xs px-4 py-3"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className={`group luxury-card h-full ${className || ""}`}
    >
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size={thumbnailSize}
          isFeatured={isFeatured}
        />
        <div className={`flex flex-col ${paddingClass}`}>
          <Text className="text-luxury-black font-black uppercase tracking-widest text-lg" data-testid="product-title">
            {product.title}
          </Text>
          <div className="mt-2 text-gold font-black text-xl">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <button
            className={`luxury-btn mt-4 ${buttonSizeClass}`}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
