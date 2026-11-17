// Logo do bycauazin (SVG em /public/logo.svg, já nas cores do site).
export default function BrandLogo({ className, size = 34 }) {
  // eslint-disable-next-line @next/next/no-img-element -- SVG pequeno e estático; não precisa do next/image
  return <img className={className} src="/logo.svg" alt="" width={size} height={size} />;
}
