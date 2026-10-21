import { AboutExperience } from './components/AboutExperience';
import { Contact } from './components/Contact';
import { Evidence } from './components/Evidence';
import { Hero } from './components/Hero';
import { InsideTheBuild } from './components/InsideTheBuild';
import { Nav } from './components/Nav';
import { Notes } from './components/Notes';
import { Skills } from './components/Skills';
import { WorkSection } from './components/WorkSection';
import { navItems } from './data/nav';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = navItems.map((item) => item.id);

export function App() {
  const reducedMotion = useReducedMotion();
  useReveal(!reducedMotion);
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <>
      <Nav activeId={activeId} />
      <main id="main">
        <Hero />
        <WorkSection />
        <InsideTheBuild />
        <Evidence />
        <Notes />
        <AboutExperience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
