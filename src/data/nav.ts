export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'workshop', label: 'System design' },
  { id: 'notes', label: 'Notes' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'cv', label: 'CV' },
  { id: 'contact', label: 'Contact' },
];
