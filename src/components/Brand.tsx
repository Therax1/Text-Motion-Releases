import { copy, type Locale } from '../data/copy'

type BrandProps = {
  compact?: boolean
  locale: Locale
}

export function Brand({ compact = false, locale }: BrandProps) {
  return (
    <a className="brand" href="#top" aria-label={copy[locale].brandHome}>
      <img className="brand-mark" src={`${import.meta.env.BASE_URL}assets/brand/text-motion-logo-256.png`} alt="" />
      {!compact && <span>Text Motion</span>}
    </a>
  )
}
