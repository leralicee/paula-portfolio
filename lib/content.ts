export const SITE = {
  name: 'Paula',
  role: 'Web Developer',
  tagline: 'I build websites that feel like places.',
  location: 'Spain',
  timezone: 'Europe/Madrid',
  linkedin: 'https://www.linkedin.com/in/paula-romero-garc%C3%ADa-a0a4a8330/',
  github: 'https://github.com/leralicee',
  status: 'Available for projects',
} as const;

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export const ABOUT = {
  heading: 'A developer who sweats the details most people scroll past.',
  paragraphs: [
    "I'm Paula, a web developer based in Spain, currently studying Multiplatform Application Development. I spend my days turning ideas into interfaces — and my evenings making them move.",
    'I care about the easing of a transition, the weight of a headline, the way a page breathes between sections. The goal is always the same: sites that are fast, accessible, and hard to forget.',
  ],
  photoAlt: 'Portrait of Paula',
  photoSrc: '/images/paula.jpg',
} as const;

export const PATH = {
  supporting:
    'The plan is simple: keep shipping, keep studying, keep raising the bar for what a page can feel like.',
  currently: ['Studying DAM', 'Building immersive websites', 'Polishing this portfolio'],
  photo: {
    src: '/images/path-desk.jpg',
    alt: 'Paula’s workspace — notebook, keyboard and soft morning light',
    spec: '4:3 · min 1600×1200 · warm workspace shot',
  },
  education: [
    {
      period: 'Now',
      title: 'Multiplatform Application Development',
      place: 'Higher technical degree',
      note: 'In progress',
    },
  ],
  certifications: [
    {
      period: 'Certified',
      title: 'English — C2 Proficiency',
      place: 'CEFR — Common European Framework',
      note: 'C2',
    },
  ],
  next: {
    title: 'More certifications',
    note: 'In progress — this space is reserved for what comes next.',
  },
} as const;

export const SERVICES = [
  {
    index: '01',
    title: 'Interactive front-end',
    line: 'Interfaces built with React and Next.js, engineered for motion and feel.',
  },
  {
    index: '02',
    title: 'Immersive experiences',
    line: 'WebGL, shaders and scroll choreography that make a page feel alive.',
  },
  {
    index: '03',
    title: 'Design to code',
    line: 'From art direction to a pixel-perfect, production-ready build.',
  },
  {
    index: '04',
    title: 'Performance & accessibility',
    line: 'Fast, inclusive and solid at every screen size.',
  },
] as const;

export const TOOLS = [
  'Next.js',
  'React',
  'TypeScript',
  'Three.js',
  'GSAP',
  'Framer Motion',
  'Tailwind CSS',
  'WebGL',
  'Node.js',
  'Java',
] as const;

export interface Project {
  index: string;
  name: string;
  kind: string;
  year: string;
  description: string;
  stack: string[];
  url: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Forno Nero',
    kind: 'Artisan pizzeria',
    year: '2026',
    description:
      'A wood-fired pizzeria taken to the screen — ember particles that follow the cursor, a film-grain shader, and a menu that ignites on touch.',
    stack: ['Next.js', 'Three.js', 'GSAP'],
    url: 'https://forno-nero.vercel.app',
    accent: '#E85D04',
  },
  {
    index: '02',
    name: 'VANTA',
    kind: 'Watch maison',
    year: '2026',
    description:
      'A luxury watch house in a near-perfect void — a WebGL watch you can turn with the cursor, a magnetic reticle, and a live configurator.',
    stack: ['Next.js', 'Three.js', 'GSAP'],
    url: 'https://vanta-ecru.vercel.app',
    accent: '#C9A84C',
  },
  {
    index: '03',
    name: 'Atelier Forma',
    kind: 'Architecture studio',
    year: '2026',
    description:
      'An architecture studio drawn in light — a self-drawing blueprint grid, editorial type at 8vw, and a filterable archive of built work.',
    stack: ['Next.js', 'GSAP', 'Framer Motion'],
    url: 'https://atelier-forma-eight.vercel.app',
    accent: '#B87333',
  },
];

export interface Review {
  quote: string;
  name: string;
  role: string;
}

export const REVIEWS: Review[] = [
  {
    quote:
      'Paula turned a vague idea into a website people actually ask us about. The attention to motion and detail is unreal.',
    name: 'Marta Serrano',
    role: 'Founder, Studio Norte',
  },
  {
    quote:
      'Fast, meticulous and genuinely creative. She delivered beyond the brief — and ahead of the deadline.',
    name: 'Adrià Costa',
    role: 'Marketing Lead, Habitat CO',
  },
  {
    quote:
      'Every revision landed exactly where we hoped it would. Working with Paula felt effortless from day one.',
    name: 'Lucía Ferrer',
    role: 'Owner, Ferrer & Co',
  },
  {
    quote:
      'Our site finally feels like our brand. Visitors stay longer, and it shows in the numbers.',
    name: 'Daniel Roig',
    role: 'Director, Roig Estudi',
  },
];

export const CONTACT = {
  heading: "LET'S TALK",
  line: "Have a project in mind? Tell me about it — I'll get back to you within a day or two.",
  success: 'Message sent. Talk soon.',
} as const;
