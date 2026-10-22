import { AboutExperience } from './components/AboutExperience';
import { Contact } from './components/Contact';
import { Evidence } from './components/Evidence';
import { Hero } from './components/Hero';
import { InsideTheBuild } from './components/InsideTheBuild';
import { Nav } from './components/Nav';
import { Notes } from './components/Notes';
import { Skills } from './components/Skills';
import { WorkSection } from './components/WorkSection';
import { NotePage } from './components/NotePage';
import { ProjectPage } from './components/ProjectPage';
import { navItems } from './data/nav';
import { getRoute } from './data/routes';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';

const SECTION_IDS = navItems.map((item) => item.id);

function HomePage() {
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

/**
 * The app has three kinds of page: the home composition, one page per project,
 * and one per note. They are selected from the pathname rather than a router
 * because every page is pre-rendered as a static file.
 */
export function App({ pathname }: { pathname?: string }) {
  const path =
    pathname ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const route = getRoute(path);

  if (route.kind === 'project') return <ProjectPage route={route} />;
  if (route.kind === 'note') return <NotePage route={route} />;
  return <HomePage />;
}
