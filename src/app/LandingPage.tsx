import { useEffect } from 'react';
import { SiteNav } from '@features/site-navigation';
import { Hero, KeyStats } from '@features/hero';
import { WhyTerranova } from '@features/why-terranova';
import { ServicesSection } from '@features/services';
import { ServicesMarquee } from '@features/services-marquee';
import { DevelopmentFilterProvider, DevelopmentsSection } from '@features/developments';
import { ZonesSection } from '@features/zones';
import { ContactSection, WhatsAppFab } from '@features/lead-capture';
import { SiteFooter } from '@features/site-footer';
import styles from './LandingPage.module.css';

export function LandingPage() {
  // Deep links (/#zonas): the browser looks for the anchor before React has rendered it.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <DevelopmentFilterProvider>
      <div className={styles.page}>
        <SiteNav />
        <main id="main" tabIndex={-1} className={styles.main}>
          {/* Rhythm: dark hero → raised stats card → light services → dark “why” → bronze band → light inventory → dark zones. */}
          <Hero />
          <KeyStats />
          <ServicesSection />
          <WhyTerranova />
          <ServicesMarquee />
          <DevelopmentsSection />
          <ZonesSection />
          <ContactSection />
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </div>
    </DevelopmentFilterProvider>
  );
}
