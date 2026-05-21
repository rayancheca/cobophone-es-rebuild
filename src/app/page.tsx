import { HomeHero } from '@/components/sections/HomeHero';
import { PhoneJourney } from '@/components/sections/PhoneJourney';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Services } from '@/components/sections/Services';
import { Brands } from '@/components/sections/Brands';
import { Reviews } from '@/components/sections/Reviews';
import { WholesaleTeaser } from '@/components/sections/WholesaleTeaser';
import { LocationBlock } from '@/components/sections/LocationBlock';
import { ContactForm } from '@/components/sections/ContactForm';
import { FinalCta } from '@/components/sections/FinalCta';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PhoneJourney />
      <HowItWorks />
      <Services />
      <Brands />
      <Reviews />
      <WholesaleTeaser />
      <LocationBlock />
      <ContactForm />
      <FinalCta />
    </>
  );
}
