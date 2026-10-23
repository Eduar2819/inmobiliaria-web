import { useCopy } from '@shared/i18n/LocaleProvider';
import { whatsappUrl } from '@shared/config/contact';
import { useActiveSection } from '@shared/hooks/useActiveSection';
import { cx } from '@ds/index';
import { leadCopy } from '../lead-capture.i18n';
import { WhatsAppIcon } from './WhatsAppIcon';
import styles from './WhatsAppFab.module.css';

const CONTACT = ['contacto'] as const;

export function WhatsAppFab() {
  const t = useCopy(leadCopy);
  // The contact section has its own WhatsApp button; the FAB would only cover the form there.
  const hidden = useActiveSection(CONTACT) !== null;
  return (
    <a
      className={cx(styles.fab, hidden && styles.hidden)}
      href={whatsappUrl(t.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className={styles.pulse} aria-hidden="true" />
      {/* White glyph on the deeper WhatsApp green: 3.52:1, above the 3:1 needed for icons. */}
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
}
