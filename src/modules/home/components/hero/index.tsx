import { ShoppingBag } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div
      className="min-h-[48vh] md:min-h-[55vh] w-full border-b border-ui-border-base relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center gap-6 small:px-10 px-6 text-luxury-white items-center text-center">
        <Heading
          level="h1"
          className="text-3xl md:text-4xl font-black uppercase tracking-[4px]"
        >
          El corazón de <span className="gold-text">Bayamo</span>
        </Heading>
        <Heading
          level="h2"
          className="text-base md:text-lg font-semibold tracking-[2px]"
        >
          Tradición y sabor de Granma directo a tu puerta con envíos premium a EE.UU.,
          Europa y el Caribe.
        </Heading>
        <LocalizedClientLink href="/store">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-black uppercase tracking-[3px] text-[#111] shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition hover:scale-105 hover:bg-white">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.2} />
            Explorar tienda
          </div>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
