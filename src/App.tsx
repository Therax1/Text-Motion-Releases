import { useLayoutEffect, useState } from 'react'
import { AmbientField } from './components/AmbientField'
import { Brand } from './components/Brand'
import { ArrowIcon, DownloadIcon } from './components/Icons'
import { DownloadSection, FAQSection, FeaturesSection, PricingSection, SafeZonesSection, WorkflowSection } from './components/Sections'
import { copy, type Locale } from './data/copy'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return window.localStorage.getItem('text-motion-locale') === 'en' ? 'en' : 'fr'
    } catch {
      return 'fr'
    }
  })
  const t = copy[locale]

  useLayoutEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem('text-motion-locale', locale)
    } catch {
      // The language switch still works when storage is unavailable.
    }
  }, [locale, t.meta.description, t.meta.title])

  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }),
      { threshold: 0.08, rootMargin: '0px 0px -35px 0px' },
    )
    const ambientObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)),
      { rootMargin: '120px 0px' },
    )
    document.documentElement.classList.add('motion-ready')
    elements.forEach((element) => observer.observe(element))
    document.querySelectorAll('.ambient-mark, .safe-spark').forEach((element) => ambientObserver.observe(element))
    return () => {
      observer.disconnect()
      ambientObserver.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">{t.nav.skip}</a>
      <header className="navbar">
        <Brand locale={locale} />
        <nav className={menuOpen ? 'open' : ''} aria-label={t.nav.label}>
          <a href="#features" onClick={() => setMenuOpen(false)}>{t.nav.features}</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>{t.nav.plans}</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <div className="nav-actions">
          <button className="language-toggle" type="button" aria-label={t.nav.switchLanguage} title={t.nav.switchLanguage} onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}>
            <span className={locale === 'fr' ? 'active' : ''} lang="fr">FR</span><span className="language-separator" aria-hidden="true">/</span><span className={locale === 'en' ? 'active' : ''} lang="en">EN</span>
          </button>
          <a className="nav-download" href="#download" aria-label={t.nav.download}><DownloadIcon /> <span>{t.nav.download}</span></a>
          <button className="menu-button" type="button" aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero ambient-section">
          <AmbientField variant="hero" />
          <div className="hero-grid" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <h1><span className="hero-title-line">{t.hero.titleFirst}</span><br /><span className="hero-title-line">{t.hero.titleSecond}<em>{t.hero.titleEmphasis}</em></span></h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-actions">
            <a href="#download" className="button button-primary"><DownloadIcon />{t.hero.download}</a>
            <a href="#workflow" className="button button-ghost">{t.hero.workflow} <ArrowIcon /></a>
          </div>
          <div className="hero-meta"><span><i />Windows x64</span><span><i />Premiere Pro 2026</span><span><i />{t.hero.freePresets}</span></div>
          <a className="scroll-cue" href="#workflow" aria-label={t.hero.scrollLabel}><span>{t.hero.scroll}</span><i><ArrowIcon /></i></a>
        </section>

        <WorkflowSection locale={locale} />
        <FeaturesSection locale={locale} />
        <SafeZonesSection locale={locale} />
        <PricingSection locale={locale} />
        <DownloadSection locale={locale} />
        <FAQSection locale={locale} />
      </main>

      <footer className="footer">
        <div className="footer-top"><Brand locale={locale} /><p>{t.footer.description}</p><a href="#top">{t.footer.backToTop} <ArrowIcon /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Text Motion</span><span>Version 1.0.0 · Windows x64</span><span>{t.footer.builtFor}</span></div>
      </footer>
    </div>
  )
}

export default App
