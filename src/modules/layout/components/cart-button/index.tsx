import { UILanguage } from "@lib/i18n/ui"
import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"

export default async function CartButton({
  uiLanguage,
}: {
  uiLanguage: UILanguage
}) {
  const cart = await retrieveCart().catch(() => null)

  return <CartDropdown cart={cart} uiLanguage={uiLanguage} />
}
