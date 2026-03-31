"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Información del Producto",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Envío y Devoluciones",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-dja-blue">Material</span>
            <p className="text-dja-graphite">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-dja-blue">País de origen</span>
            <p className="text-dja-graphite">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-dja-blue">Tipo</span>
            <p className="text-dja-graphite">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-dja-blue">Peso</span>
            <p className="text-dja-graphite">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-dja-blue">Dimensiones</span>
            <p className="text-dja-graphite">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold text-dja-blue">Entrega rápida</span>
            <p className="max-w-sm text-dja-graphite">
              Tu paquete llegará en 3 a 5 días hábiles a tu punto de recogida o a la comodidad de tu hogar.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold text-dja-blue">Cambios sencillos</span>
            <p className="max-w-sm text-dja-graphite">
              ¿No es exactamente lo que buscabas? No te preocupes, cambiaremos tu producto por uno nuevo.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold text-dja-blue">Devoluciones fáciles</span>
            <p className="max-w-sm text-dja-graphite">
              Simplemente devuelve tu producto y te reembolsaremos tu dinero. Sin preguntas: haremos lo mejor para asegurar que tu devolución sea sin problemas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
