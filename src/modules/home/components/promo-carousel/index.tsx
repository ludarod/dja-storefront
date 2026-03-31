"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Slide = {
  title: string
  subtitle: string
  tag: string
  badge: string
  description: string
  priceHint: string
  image: string
  order?: number
  ctaUrl?: string
  ctaText?: string
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80"

const defaultSlides: Slide[] = [
  {
    title: "Pizzas y pastas",
    subtitle: "Purés y salsas para cocinar en casa",
    tag: "Promoción semanal",
    badge: "Desde $0.66",
    description: "Entregas en La Habana, Artemisa y Mayabeque con stock confirmado.",
    priceHint: "Llena tu cesta y disfruta de la cocina cubana en minutos.",
    image: DEFAULT_IMAGE,
    order: 0,
  },
  {
    title: "La despensa del bodegón",
    subtitle: "Todo lo que necesitas para tu familia",
    tag: "Nuevos productos",
    badge: "Envíos 3-7 días",
    description: "Leche, café, snacks y más con garantía de sabor cubano.",
    priceHint: "Compra hoy y recibe en tu ciudad de EE.UU., Europa o Caribe.",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80",
    order: 1,
  },
  {
    title: "Edición gourmet",
    subtitle: "Especias y aceites de primera",
    tag: "Selección limitada",
    badge: "Unidades limitadas",
    description: "Sazonadores y miel artesanal para platos de autor.",
    priceHint: "Reserva tu pedido antes de que se agote.",
    image: "https://images.unsplash.com/photo-1481391050825-0c92e23e4b4f?auto=format&fit=crop&w=900&q=80",
    order: 2,
  },
]

const mapBannerToSlide = (banner: any): Slide => ({
  title: banner.title ?? "",
  subtitle: banner.subtitle ?? "",
  tag: banner.badge ?? "Promoción",
  badge: banner.badge ?? "",
  description: banner.description ?? "",
  priceHint: banner.price_hint ?? "",
  image: banner.image_url ?? DEFAULT_IMAGE,
  order: banner.order,
  ctaUrl: banner.cta_url ?? undefined,
  ctaText: banner.cta_text ?? undefined,
})

export default function PromoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const activeSlide = useMemo(() => slides[activeIndex] ?? slides[0], [activeIndex, slides])

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % slides.length)
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    let cancelled = false

    fetch("/store/promo-banners")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) {
          return
        }

        const banners = Array.isArray(data?.banners) ? data.banners : []

        if (!banners.length) {
          return
        }

        const mapped = banners
          .map(mapBannerToSlide)
          .sort((a: Slide, b: Slide) => (a.order ?? 0) - (b.order ?? 0))

        setSlides(mapped)
        setActiveIndex(0)
      })
      .catch(() => {
        /* keep fallback slides */
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="w-full py-8 border-b border-ui-border-base bg-[#fdfdf7]">
      <div className="content-container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[4px] text-ui-fg-subtle">{activeSlide.tag}</p>
            <h3 className="text-2xl md:text-3xl font-black tracking-[3px] leading-tight">
              {activeSlide.title}
            </h3>
            <p className="text-sm text-ui-fg-subtle mt-1">{activeSlide.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Anterior"
              className="rounded-full border border-ui-border-base bg-white/10 p-2 transition hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Siguiente"
              className="rounded-full border border-ui-border-base bg-white/10 p-2 transition hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 rounded-[36px] bg-gradient-to-r from-[#f8f7ef] to-[#f5f5f5] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.08)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8d0b7] bg-white px-4 py-1 text-[0.65rem] uppercase tracking-[3px] text-[#827655]">
              {activeSlide.badge}
            </span>
            <p className="text-lg text-[#0f3b1a] leading-relaxed">{activeSlide.description}</p>
            <p className="text-[0.75rem] uppercase tracking-[3px] text-[#827655]">
              {activeSlide.priceHint}
            </p>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-8 rounded-full transition ${
                    index === activeIndex ? "bg-[#0f3b1a]" : "bg-white/40"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            {activeSlide.ctaUrl && (
              <LocalizedClientLink
                href={activeSlide.ctaUrl}
                className="inline-flex items-center gap-2 rounded-full border border-luxury-black px-4 py-2 text-[0.75rem] uppercase tracking-[3px] transition hover:bg-luxury-black hover:text-gold"
              >
                {activeSlide.ctaText || "Ver más"}
              </LocalizedClientLink>
            )}
          </div>
          <div
            className="rounded-[28px] bg-black/70 p-6 shadow-xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${activeSlide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex h-full flex-col justify-between text-white">
              <p className="text-[0.65rem] uppercase tracking-[4px] text-white/70">
                Productos destacados
              </p>
              <p className="text-lg font-bold tracking-[3px] drop-shadow">{activeSlide.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
