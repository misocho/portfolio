import HomePage from '../pages/HomePage';
import AboutPage from "../pages/AboutPage";
import WorkPage from "../pages/WorkPage";
import ContactPage from "../pages/ContactPage";
const routes = [
  {
    path: '',
    name: 'HomePage',
    component: HomePage,
    exact: true,
  },
  {
    path: 'about',
    name: 'AboutPage',
    component: AboutPage,
    exact: true,
  },
  {
    path: 'work',
    name: 'WorkPage',
    component: WorkPage,
    exact: true,
  },
  {
    path: 'contact',
    name: 'ContactPage',
    component: ContactPage,
    exact: true,
  }
];

export default routes;