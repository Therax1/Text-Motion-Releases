type AmbientVariant = 'hero' | 'workflow' | 'features' | 'safe' | 'pricing' | 'download' | 'faq'

const marks: Record<AmbientVariant, readonly string[]> = {
  hero: ['dot', 'ring', 'diamond', 'dash'],
  workflow: ['ring', 'dot', 'dash'],
  features: ['dot', 'dash', 'ring', 'diamond'],
  safe: ['dot', 'dash'],
  pricing: ['ring', 'dot', 'diamond'],
  download: ['dot', 'ring', 'dash'],
  faq: ['ring', 'dot'],
}

export function AmbientField({ variant }: { variant: AmbientVariant }) {
  return (
    <div className={`ambient-field ambient-field--${variant}`} aria-hidden="true">
      {marks[variant].map((shape, index) => (
        <span className={`ambient-mark ambient-mark--${shape} ambient-mark--${index + 1}`} key={`${shape}-${index}`} />
      ))}
    </div>
  )
}
