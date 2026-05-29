import HeroSection from '../components/landing/hero-section';
import AboutMeSection from '../components/landing/about-me-section';
import SkillTreeSection from '../components/landing/skill-tree-section';
import ProjectsSection from '../components/landing/projects-section';
import ContactSection from '../components/landing/contact-section';
import FadeInSection from '../components/ui/fade-in-section';

function HomePage() {
  return (
    <>
      <HeroSection />
      <FadeInSection direction='up' delay={0}>
        <AboutMeSection />
      </FadeInSection>
      <FadeInSection direction='up' delay={0}>
        <SkillTreeSection />
      </FadeInSection>
      <FadeInSection direction='up' delay={0}>
        <ProjectsSection />
      </FadeInSection>
      <FadeInSection direction='up' delay={0}>
        <ContactSection />
      </FadeInSection>
    </>
  );
}

export default HomePage;
