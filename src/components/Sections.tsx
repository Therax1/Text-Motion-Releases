import { useEffect, useRef, useState } from 'react'
import { AmbientField } from './AmbientField'
import { copy, type Locale } from '../data/copy'
import { featureMedia, posterFor } from '../data/product'
import { ArrowIcon, CheckIcon, DownloadIcon, SearchIcon, StarIcon } from './Icons'
import instagramArtwork from '../../Maquette iPhone avec zones sûres Instagram Reels.png'
import tiktokArtwork from '../../Maquette iPhone TikTok au lever du soleil.png'
import youtubeArtwork from '../../Smartphone affichant un Short YouTube de sable sculpté.png'

type LocalizedProps = { locale: Locale }

export function WorkflowSection({ locale }: LocalizedProps) {
  const t = copy[locale].workflow
  const icons = [<SearchIcon />, <span className="preview-eye">◉</span>, <ArrowIcon />]

  return (
    <section className="section workflow-section ambient-section" id="workflow">
      <AmbientField variant="workflow" />
      <div className="section-heading split-heading reveal">
        <div><span className="eyebrow">{t.eyebrow}</span><h2>{t.titleFirst}<br />{t.titleSecond}<em>{t.titleEmphasis}</em></h2></div>
        <p>{t.intro}</p>
      </div>
      <div className="workflow-grid">
        {t.steps.map((step, index) => (
          <article className="workflow-card reveal" key={index}>
            <div className="workflow-top"><span>{String(index + 1).padStart(2, '0')}</span><span className="workflow-icon">{icons[index]}</span></div>
            <h3>{step.verb}<span>.</span></h3>
            <p>{step.body}</p>
            {index < t.steps.length - 1 && <span className="flow-line" aria-hidden="true"><i /></span>}
          </article>
        ))}
      </div>
    </section>
  )
}

function PausedLoopPreview({ locale }: LocalizedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    let restartTimer: number | undefined

    const clearRestart = () => {
      if (restartTimer !== undefined) window.clearTimeout(restartTimer)
      restartTimer = undefined
    }
    const canPlay = () => inView && !document.hidden && !reducedMotion.matches
    const play = (fromStart: boolean) => {
      if (!canPlay()) return
      if (fromStart) video.currentTime = 0
      void video.play().catch(() => { /* Autoplay can be blocked by the browser. */ })
    }
    const scheduleRestart = () => {
      clearRestart()
      if (!canPlay()) return
      restartTimer = window.setTimeout(() => {
        restartTimer = undefined
        play(true)
      }, 2500)
    }
    const syncPlayback = () => {
      if (!canPlay()) {
        clearRestart()
        video.pause()
      } else if (video.ended) {
        scheduleRestart()
      } else if (video.paused) {
        play(false)
      }
    }

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting
          syncPlayback()
        }, { threshold: 0.25 })
      : null
    if (observer) observer.observe(video)
    else {
      inView = true
      syncPlayback()
    }
    video.addEventListener('ended', scheduleRestart)
    document.addEventListener('visibilitychange', syncPlayback)
    reducedMotion.addEventListener('change', syncPlayback)

    return () => {
      observer?.disconnect()
      clearRestart()
      video.pause()
      video.removeEventListener('ended', scheduleRestart)
      document.removeEventListener('visibilitychange', syncPlayback)
      reducedMotion.removeEventListener('change', syncPlayback)
    }
  }, [])

  return <video ref={videoRef} src={featureMedia.popIn} poster={posterFor(featureMedia.popIn)} muted playsInline preload="none" aria-label={copy[locale].features.previewLabel} />
}

function FeatureVisual({ kind, locale }: { kind: 'preview' | 'search' | 'apply'; locale: Locale }) {
  const t = copy[locale].features
  if (kind === 'search') {
    return (
      <div className="feature-ui search-ui" aria-hidden="true">
        <div className="mock-search"><SearchIcon /><span>blur fade</span></div>
        <div className="result-row"><img className="result-thumb" src={posterFor(featureMedia.blurFadeUp)} alt="" loading="lazy" /><span><strong>Blur Fade Up</strong><small>{t.animationType}</small></span><span className="result-tier">PRO</span></div>
        <div className="result-row dim"><img className="result-thumb" src={posterFor(featureMedia.blurBlink)} alt="" loading="lazy" /><span><strong>Blur Fade Up - Blink Glow</strong><small>{t.animationType} · FREE</small></span><StarIcon /></div>
      </div>
    )
  }
  if (kind === 'apply') {
    return (
      <div className="feature-ui apply-ui" aria-hidden="true">
        <div className="selection-line"><i /><span>{t.mainTitle}</span><small>{t.selected}</small></div>
        <div className="mock-preset-action">{t.clickPreset} <span>↵</span></div>
        <div className="applied-message"><CheckIcon /><span><strong>{t.applied}</strong><small>{t.illustration}</small></span></div>
      </div>
    )
  }
  return (
    <div className="feature-ui preview-ui" aria-hidden="true">
      <div className="preview-tile"><PausedLoopPreview locale={locale} /></div>
      <div className="mini-scrubber"><i /><span /></div>
      <div className="mini-labels"><small>00:00</small><small>00:18</small></div>
    </div>
  )
}

export function FeaturesSection({ locale }: LocalizedProps) {
  const t = copy[locale].features
  const kinds = ['preview', 'search', 'apply'] as const
  return (
    <section className="section features-section ambient-section" id="features">
      <AmbientField variant="features" />
      <div className="section-heading reveal">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2>{t.titleFirst}<br /><em>{t.titleEmphasis}</em></h2>
      </div>
      <div className="feature-list">
        {t.cards.map((feature, index) => (
          <article className="feature-row reveal" key={index}>
            <div className="feature-copy"><span className="feature-number">{String(index + 1).padStart(2, '0')}</span><h3>{feature.title}</h3><p>{feature.body}</p></div>
            <FeatureVisual kind={kinds[index]} locale={locale} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function SafeZonesSection({ locale }: LocalizedProps) {
  const t = copy[locale].safe
  return (
    <section className="section safe-section ambient-section" id="safe-zones">
      <AmbientField variant="safe" />
      <div className="safe-copy reveal">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2>{t.titleFirst}<br /><em>{t.titleEmphasis}</em></h2>
        <p>{t.description}</p>
        <div className="platform-list">
          <span><i className="platform-icon">♪</i>TikTok <b>FREE</b></span>
          <span><i className="platform-icon">◎</i>Instagram Reels <b>PRO</b></span>
          <span><i className="platform-icon">▶</i>YouTube Shorts <b>PRO</b></span>
        </div>
      </div>
      <div className="safe-visual reveal">
        <div className="safe-ambient" aria-hidden="true">
          <span className="safe-spark safe-spark--one" />
          <span className="safe-spark safe-spark--two" />
          <span className="safe-spark safe-spark--three" />
          <span className="safe-spark safe-spark--four" />
        </div>
        <img
          className="safe-phone safe-phone--tiktok"
          src={tiktokArtwork}
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
          alt={t.tiktokAlt}
        />
        <div className="safe-phone safe-phone--instagram">
          <img
            className="safe-phone-artwork"
            src={instagramArtwork}
            width="1024"
            height="1536"
            loading="lazy"
            decoding="async"
            alt={t.instagramAlt}
          />
        </div>
        <img
          className="safe-phone safe-phone--youtube"
          src={youtubeArtwork}
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
          alt={t.youtubeAlt}
        />
      </div>
    </section>
  )
}

export function PricingSection({ locale }: LocalizedProps) {
  const t = copy[locale].pricing
  return (
    <section className="section pricing-section ambient-section" id="plans">
      <AmbientField variant="pricing" />
      <div className="section-heading centered reveal">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2>{t.titleFirst}<br /><em>{t.titleEmphasis}</em></h2>
        <p>{t.description}</p>
      </div>
      <div className="plan-grid">
        {t.plans.map((plan) => (
          <article className={`plan-card ${plan.name.toLowerCase()} reveal`} key={plan.name}>
            <div className="plan-top"><span>{plan.eyebrow}</span>{plan.name === 'PRO' && <span className="recommended">{t.badge}</span>}</div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="plan-rule" />
            <ul>{plan.items.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
            {plan.name === 'PRO' ? (
              <button type="button" className="button button-primary disabled" disabled>{t.proSoon}</button>
            ) : (
              <a className="button button-secondary" href="#download">{t.freeDownload} <ArrowIcon /></a>
            )}
            <small className="plan-note">{plan.note}</small>
          </article>
        ))}
      </div>
      <p className="plan-fineprint reveal">{t.fineprint}</p>
    </section>
  )
}

export function DownloadSection({ locale }: LocalizedProps) {
  const t = copy[locale].download
  return (
    <section className="section download-section ambient-section" id="download">
      <AmbientField variant="download" />
      <div className="download-orbit" aria-hidden="true"><span /><i /><b /></div>
      <div className="download-content reveal">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2>{t.titleFirst}<br /><em>{t.titleEmphasis}</em></h2>
        <p>{t.compatibility}</p>
        <a className="button button-primary button-large" href="https://github.com/Therax1/Text-Motion-Releases/releases/download/v1.0.0-demo/TextMotionSetup.exe"><DownloadIcon /> {t.cta}</a>
        <span className="download-note">{t.warning}</span>
        <p className="install-steps"><strong>{t.installLabel}</strong> {t.install}</p>
      </div>
      <div className="system-card reveal">
        <div className="system-head"><span className="windows-logo"><i /><i /><i /><i /></span><span><small>{t.target}</small><strong>Windows</strong></span></div>
        <dl><div><dt>{t.architecture}</dt><dd>x64</dd></div><div><dt>{t.host}</dt><dd>Premiere Pro</dd></div><div><dt>{t.compatibilityLabel}</dt><dd>2026 / 26.x</dd></div><div><dt>{t.extension}</dt><dd>Adobe CEP</dd></div></dl>
        <div className="system-status"><i /> {t.status}</div>
      </div>
    </section>
  )
}

export function FAQSection({ locale }: LocalizedProps) {
  const [open, setOpen] = useState(0)
  const t = copy[locale].faq
  return (
    <section className="section faq-section ambient-section" id="faq">
      <AmbientField variant="faq" />
      <div className="faq-heading reveal"><span className="eyebrow">FAQ</span><h2>{t.titleFirst}<br /><em>{t.titleEmphasis}</em></h2></div>
      <div className="faq-list reveal">
        {t.items.map((item, index) => {
          const isOpen = open === index
          return (
            <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong><i>{isOpen ? '−' : '+'}</i></button>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
