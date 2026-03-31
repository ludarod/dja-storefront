import Image from "next/image"

type BrandLogoVariant = "full" | "icon"
type BrandLogoSize = "sm" | "md" | "lg"

type BrandLogoProps = {
  variant?: BrandLogoVariant
  size?: BrandLogoSize
  className?: string
  imageClassName?: string
  priority?: boolean
}

const DIMENSIONS: Record<BrandLogoVariant, Record<BrandLogoSize, { width: number; height: number }>> = {
  full: {
    sm: { width: 72, height: 72 },
    md: { width: 96, height: 96 },
    lg: { width: 128, height: 128 },
  },
  icon: {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 44, height: 44 },
  },
}

export default function BrandLogo({
  variant = "full",
  size = "md",
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === "icon"
      ? "/branding/store-icon-gold.svg"
      : "/branding/logo-sabor-cubano-express-v2.svg"

  const alt =
    variant === "icon"
      ? "Sabor Cubano Express icon"
      : "Sabor Cubano Express logo"

  const { width, height } = DIMENSIONS[variant][size]

  return (
    <span className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={imageClassName}
      />
    </span>
  )
}
