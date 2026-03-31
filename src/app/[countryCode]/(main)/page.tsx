import { Metadata } from "next"

import FeaturedCategories from "@modules/home/components/featured-categories"
import Hero from "@modules/home/components/hero"
import PromoCarousel from "@modules/home/components/promo-carousel"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Sabor Cubano Express",
  description:
    "Compra productos cubanos premium con envío rápido a Estados Unidos, Europa y el Caribe.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const categories = await listCategories({ limit: 6 })

  if (!categories.length || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <PromoCarousel />
      <section className="content-container mx-auto py-10 small:py-12 space-y-6">
        <div className="flex flex-col gap-3">
          <p className="text-[0.7rem] uppercase tracking-[4px] text-ui-fg-subtle">
            Productos destacados
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-[3px]">
            Lo mejor de cada categoría
          </h2>
        </div>
        <FeaturedCategories categories={categories} region={region} />
      </section>
    </>
  )
}
