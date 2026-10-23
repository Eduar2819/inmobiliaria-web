import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, Chip, Display, TextField } from '@ds/index';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { leadCopy } from '../lead-capture.i18n';
import { INTEREST_KEYS, submitLead } from '../submitLead';
import styles from './LeadForm.module.css';

type FormState = 'idle' | 'sent' | 'error';

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" block disabled={pending} className={styles.submit}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function LeadForm() {
  const t = useCopy(leadCopy);
  const [interest, setInterest] = useState(0);

  const [state, formAction] = useActionState<FormState, FormData>(async (_prev, data) => {
    try {
      await submitLead({
        name: String(data.get('name') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        interest: INTEREST_KEYS[interest] ?? 'presale',
      });
      return 'sent';
    } catch {
      return 'error';
    }
  }, 'idle');

  if (state === 'sent') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
        <Display as="p" size="titleSm">
          {t.sentTitle}
        </Display>
        <p className={styles.successSub}>{t.sentSub}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} action={formAction}>
      <TextField label={t.name} name="name" required autoComplete="name" />
      <TextField label={t.phone} name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern={String.raw`[\d\s+\(\)\-]{8,}`} />
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{t.interest}</legend>
        <div className={styles.chips}>
          {t.interests.map((label, i) => (
            <Chip key={label} selected={i === interest} onClick={() => setInterest(i)}>
              {label}
            </Chip>
          ))}
        </div>
      </fieldset>
      {state === 'error' && (
        <p className={styles.error} role="alert">
          {t.error}
        </p>
      )}
      <SubmitButton label={t.send} pendingLabel={t.sending} />
    </form>
  );
}
