import { listCartShippingMethods } from "@lib/data/fulfillment"
import { getLocale } from "@lib/data/locale-actions"
import { listCartPaymentMethods } from "@lib/data/payment"
import { resolveUILanguage } from "@lib/i18n/ui"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const [shippingMethods, paymentMethods, currentLocale] = await Promise.all([
    listCartShippingMethods(cart.id),
    listCartPaymentMethods(cart.region?.id ?? ""),
    getLocale(),
  ])

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  const uiLanguage = resolveUILanguage(currentLocale)

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} uiLanguage={uiLanguage} />

      <Shipping
        cart={cart}
        availableShippingMethods={shippingMethods}
        uiLanguage={uiLanguage}
      />

      <Payment
        cart={cart}
        availablePaymentMethods={paymentMethods}
        uiLanguage={uiLanguage}
      />

      <Review cart={cart} uiLanguage={uiLanguage} />
    </div>
  )
}
