import { Button, Display } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { useReveal } from '@shared/hooks/useReveal';
import { whatsappUrl } from '@shared/config/contact';
import { leadCopy } from '../lead-capture.i18n';
import { LeadForm } from './LeadForm';
import { WhatsAppIcon } from './WhatsAppIcon';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const t = useCopy(leadCopy);
  const reveal = useReveal();

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
      <div className={styles.panel} data-surface="accent" {...reveal}>
        <div className={styles.copy}>
          <Display id="contacto-title" size="lg" balance className={styles.title}>
            {t.title}
          </Display>
          <p className={styles.sub}>{t.sub}</p>
          <Button href={whatsappUrl(t.waMessage)} target="_blank" rel="noopener noreferrer" variant="outline" icon={<WhatsAppIcon />}>
            {t.wa}
          </Button>
        </div>
        <div className={styles.card}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
