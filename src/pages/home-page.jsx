import HeroSection from '../components/landing/hero-section';
import AboutMeSection from '../components/landing/about-me-section';
import SkillTreeSection from '../components/landing/skill-tree-section';
import ProjectsSection from '../components/landing/projects-section';
import ContactSection from '../components/landing/contact-section';

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
