import { CalendarBlank } from '@ds/icons';
import { Button, Logo, SegmentedControl, cx } from '@ds/index';
import { LOCALES, useLocale, type Dictionary } from '@shared/i18n/LocaleProvider';
import { useScrolled } from '@shared/hooks/useScrolled';
import { useActiveSection } from '@shared/hooks/useActiveSection';
import { useDevelopmentFilter, type DevelopmentFilter } from '@features/developments';
import styles from './SiteNav.module.css';

type NavLink = { href: string; label: string; filter?: DevelopmentFilter };

const SECTION_IDS = ['servicios', 'nosotros', 'desarrollos', 'zonas', 'contacto'] as const;

const copy: Dictionary<{ links: NavLink[]; cta: string; home: string; nav: string; lang: string; skip: string }> = {
  es: {
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#nosotros', label: 'Nosotros' },
      { href: '#desarrollos', label: 'Desarrollos', filter: 'all' },
      { href: '#zonas', label: 'Zonas' },
      { href: '#contacto', label: 'Contacto' },
    ],
    cta: 'Agenda una cita',
    home: 'Terranova, inicio',
    nav: 'Principal',
    lang: 'Idioma',
    skip: 'Saltar al contenido',
  },
  en: {
    links: [
      { href: '#servicios', label: 'Services' },
      { href: '#nosotros', label: 'About' },
      { href: '#desarrollos', label: 'Developments', filter: 'all' },
      { href: '#zonas', label: 'Areas' },
      { href: '#contacto', label: 'Contact' },
    ],
    cta: 'Book a meeting',
    home: 'Terranova, home',
    nav: 'Main',
    lang: 'Language',
    skip: 'Skip to content',
  },
};

export function SiteNav() {
  const { locale, setLocale } = useLocale();
  const { setFilter, setZone } = useDevelopmentFilter();
  const scrolled = useScrolled(30);
  const activeSection = useActiveSection(SECTION_IDS);
  const t = copy[locale];

  const isCurrent = (link: NavLink) => link.href === `#${activeSection}`;

  const onLinkClick = (link: NavLink) => {
    if (!link.filter) return;
    setFilter(link.filter);
    setZone(null);
  };

  return (
    <>
      <a className={styles.skip} href="#main">
        {t.skip}
      </a>
      {/* Until the page scrolls, the nav floats over the hero photo in light type. */}
      <nav className={cx(styles.nav, scrolled ? styles.scrolled : styles.overHero)} aria-label={t.nav}>
        <a href="#top" className={styles.brand} aria-label={t.home}>
          <Logo />
        </a>
        <div className={styles.linksWrap}>
          <ul className={styles.links}>
            {t.links.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.link}
                  href={link.href}
                  aria-current={isCurrent(link) ? 'location' : undefined}
                  onClick={() => onLinkClick(link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.actions}>
          <SegmentedControl
            label={t.lang}
            size="mono"
            value={locale}
            onChange={setLocale}
            options={LOCALES.map((l) => ({ value: l, label: l.toUpperCase() }))}
          />
          <Button
            href="#contacto"
            size="sm"
            variant="accent"
            icon={<CalendarBlank weight="regular" />}
            className={styles.cta}
            aria-label={t.cta}
          >
            {t.cta}
          </Button>
        </div>
      </nav>
    </>
  );
}
