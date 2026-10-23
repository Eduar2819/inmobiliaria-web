import { Logo } from '@ds/index';
import { useCopy, type Dictionary } from '@shared/i18n/LocaleProvider';
import styles from './SiteFooter.module.css';

const copy: Dictionary<{ rights: string; privacy: string }> = {
  es: { rights: '© 2026 Terranova Inmobiliaria', privacy: 'Aviso de privacidad' },
  en: { rights: '© 2026 Terranova Real Estate', privacy: 'Privacy notice' },
};

export function SiteFooter() {
  const t = useCopy(copy);
  return (
    <footer className={styles.footer} data-surface="inverse">
      <Logo variant="lockup" />
      <div className={styles.meta}>
        <span>{t.rights}</span>
        {/* TODO: point to the published privacy notice (LFPDPPP). */}
        <a className={styles.link} href="#top">
          {t.privacy}
        </a>
      </div>
    </footer>
  );
}
