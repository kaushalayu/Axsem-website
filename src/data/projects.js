/**
 * ============================================================
 *  Axsem SOFTWARES — Projects Data Store
 *  All project data lives here. Add / edit projects easily.
 * ============================================================
 *
 *  To add a new project:
 *  1. Copy one object from the array below
 *  2. Give it a unique `id` (slug-style, e.g. "my-new-project")
 *  3. Fill in all fields
 *  4. Add the id to the correct category in CATEGORIES if needed
 *
 *  Fields:
 *  - id           : unique slug used in URL  /projects/:id
 *  - title        : project name
 *  - tagline      : one-liner subtitle
 *  - category     : "Web App" | "Mobile" | "ERP" | "UI/UX" | "Cloud" | "E-Commerce"
 *  - tags         : array of tech/keyword strings
 *  - color        : primary accent color for this project card
 *  - year         : string, e.g. "2024"
 *  - duration     : e.g. "4 months"
 *  - client       : client name (can be "Confidential")
 *  - industry     : e.g. "Retail", "Healthcare"
 *  - status       : "Live" | "In Progress" | "Completed"
 *  - featured     : boolean — show in homepage recent projects
 *  - links.live   : URL string or null
 *  - links.github : URL string or null
 *  - overview     : short paragraph shown on listing card
 *  - description  : longer text shown on detail page
 *  - challenge    : problem statement paragraph
 *  - solution     : what Axsem built paragraph
 *  - results      : array of { metric, label }
 *  - techStack    : array of { category, items:[] }
 *  - gallery      : array of placeholder labels (replace with real image URLs)
 *  - testimonial  : { quote, author, role } or null
 * ============================================================
 */

export const PROJECTS = [
  {
    id: 'retailflow-erp',
    title: 'RetailFlow ERP',
    tagline: 'End-to-end inventory & billing platform for retail chains',
    category: 'ERP',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    color: '#f05a28',
    year: '2024',
    duration: '6 months',
    client: 'RetailFlow Pvt. Ltd.',
    industry: 'Retail',
    status: 'Live',
    featured: true,
    links: { live: 'https://retailflow.in', github: null },
    overview:
      'A comprehensive ERP solution built for a 40-store retail chain — covering inventory, billing, staff management, and real-time analytics dashboards.',
    description:
      'RetailFlow needed to replace their fragmented spreadsheet-based operations with a unified platform. We designed and built a full ERP system covering every touchpoint of their retail operations — from procurement and inventory to POS billing and executive reporting.',
    challenge:
      'The client was running 40 stores across 3 states with no centralized system. Inventory was tracked in Excel, billing was done on legacy desktop software, and there was zero visibility into cross-store performance. Data was always 24–48 hours behind reality.',
    solution:
      'We built a React + Node.js ERP with real-time inventory sync across all stores using WebSockets and Redis. A custom POS interface replaced the legacy system with zero training friction. An executive dashboard gave management live cross-store KPIs for the first time.',
    results: [
      { metric: '40%', label: 'Reduction in stockouts' },
      { metric: '3x', label: 'Faster billing per transaction' },
      { metric: '₹2.4Cr', label: 'Recovered from inventory leakages' },
      { metric: '99.8%', label: 'System uptime in first 6 months' },
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['React 18', 'TypeScript', 'Zustand', 'Chart.js'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      },
      { category: 'Infra', items: ['AWS EC2', 'RDS', 'S3', 'CloudFront'] },
      { category: 'Other', items: ['WebSockets', 'PM2', 'Nginx', 'Docker'] },
    ],
    gallery: ['Dashboard Overview', 'POS Interface', 'Inventory Module', 'Analytics Report'],
    testimonial: {
      quote:
        "Axsem didn't just build software — they understood our business and built exactly what we needed. The ROI was visible within the first quarter.",
      author: 'Rajesh Mehta',
      role: 'CEO, RetailFlow Pvt. Ltd.',
    },
  },

  {
    id: 'swiftdeliver-app',
    title: 'SwiftDeliver',
    tagline: 'Last-mile delivery tracking app for logistics companies',
    category: 'Mobile',
    tags: ['Flutter', 'Firebase', 'Google Maps', 'Node.js'],
    color: '#3d3d9e',
    year: '2023',
    duration: '4 months',
    client: 'SwiftDeliver Logistics',
    industry: 'Logistics',
    status: 'Live',
    featured: true,
    links: { live: null, github: null },
    overview:
      'A Flutter-based delivery tracking app with real-time GPS tracking, driver management, and customer-facing delivery ETA notifications.',
    description:
      'SwiftDeliver was struggling with manual dispatch coordination and zero customer-facing transparency. We built a full-stack mobile ecosystem — a driver app, a dispatcher dashboard, and a customer tracking page — all synchronized in real time.',
    challenge:
      'Dispatch was done over WhatsApp. Customers had no visibility into delivery status and called support constantly. Drivers had no optimized routing. The operations team spent 40% of their time on manual coordination calls.',
    solution:
      'A Flutter app for drivers with live GPS updates, optimized routes via Google Maps Directions API, and one-tap delivery confirmation. A web dashboard for dispatchers with drag-drop order assignment. Customers get a live tracking link via SMS — no app install needed.',
    results: [
      { metric: '65%', label: 'Drop in customer support calls' },
      { metric: '28%', label: 'Faster average delivery time' },
      { metric: '4.8★', label: 'App store rating' },
      { metric: '10k+', label: 'Deliveries tracked per day' },
    ],
    techStack: [
      {
        category: 'Mobile',
        items: ['Flutter 3', 'Dart', 'Provider', 'Google Maps SDK'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Firebase Realtime DB', 'FCM'],
      },
      { category: 'Web', items: ['React', 'Leaflet.js', 'Socket.IO'] },
      { category: 'Infra', items: ['Firebase', 'GCP', 'Twilio SMS'] },
    ],
    gallery: [
      'Driver App Home',
      'Live Tracking Map',
      'Dispatcher Dashboard',
      'Customer Tracking Page',
    ],
    testimonial: {
      quote:
        'The app transformed how we operate. Our customers love the live tracking and our team finally has visibility into everything.',
      author: 'Priya Sharma',
      role: 'COO, SwiftDeliver Logistics',
    },
  },

  {
    id: 'hireboard-ats',
    title: 'HireBoard ATS',
    tagline: 'Applicant tracking system for fast-growing startups',
    category: 'Web App',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    color: '#6b3fa0',
    year: '2023',
    duration: '3 months',
    client: 'HireBoard (SaaS)',
    industry: 'HR Tech',
    status: 'Live',
    featured: true,
    links: { live: 'https://hireboard.io', github: null },
    overview:
      'A lightweight but powerful ATS built for startups who find enterprise tools too bloated. Kanban-style pipeline, email integration, and AI-assisted resume screening.',
    description:
      'HireBoard was born out of frustration with expensive, overengineered ATS tools. We built a product that does exactly what a 20–200 person startup needs — clean Kanban pipeline, one-click job posting, automated email follow-ups, and resume parsing — without the enterprise price tag.',
    challenge:
      'Most ATS tools in the market cost ₹50k+/month and take weeks to set up. Startups end up tracking candidates in Notion or Sheets, losing applicants in the chaos. There was a clear gap for a focused, affordable, and easy-to-use tool.',
    solution:
      'Next.js SaaS with a Kanban board for pipeline management, Prisma + PostgreSQL for robust data, automated email sequences, and an AI layer (OpenAI API) for resume screening and candidate ranking. Multi-tenant architecture with per-seat pricing.',
    results: [
      { metric: '200+', label: 'Startups onboarded in year 1' },
      { metric: '85%', label: 'Reduction in time-to-hire reported' },
      { metric: '4.9★', label: 'G2 product rating' },
      { metric: '₹0', label: 'Infra cost per user (serverless)' },
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Zustand'],
      },
      {
        category: 'Backend',
        items: ['Next.js API Routes', 'Prisma ORM', 'PostgreSQL'],
      },
      { category: 'AI', items: ['OpenAI GPT-4', 'LangChain', 'Embeddings'] },
      { category: 'Infra', items: ['Vercel', 'Supabase', 'Resend', 'Stripe'] },
    ],
    gallery: ['Pipeline Kanban', 'Job Posting Form', 'Candidate Profile', 'Analytics Dashboard'],
    testimonial: {
      quote:
        "We went from Notion chaos to a proper hiring pipeline in one afternoon. It's exactly what a growing startup needs.",
      author: 'Ankita Joshi',
      role: 'Head of People, Series A Startup',
    },
  },

  {
    id: 'luxcart-ecommerce',
    title: 'LuxCart',
    tagline: 'Premium D2C e-commerce platform for luxury lifestyle brand',
    category: 'E-Commerce',
    tags: ['Next.js', 'Shopify API', 'Stripe', 'Framer Motion'],
    color: '#e63b2a',
    year: '2024',
    duration: '3 months',
    client: 'LuxCart India',
    industry: 'E-Commerce / Lifestyle',
    status: 'Live',
    featured: true,
    links: { live: 'https://luxcart.in', github: null },
    overview:
      'A conversion-optimized D2C storefront for a premium lifestyle brand — custom product configurator, luxury UX, and Stripe checkout with EMI options.',
    description:
      "LuxCart needed a storefront that matched their premium positioning — not a generic Shopify theme, but a fully custom experience. We built a Next.js frontend backed by Shopify's Storefront API, with a product configurator, story-driven product pages, and a checkout flow optimized for high AOV purchases.",
    challenge:
      "Their existing Shopify theme was generic and didn't reflect their luxury brand positioning. Conversion rate was 0.8% — far below the 2.5% industry benchmark for premium brands. Mobile experience was especially weak.",
    solution:
      'Custom Next.js storefront with Shopify headless API. Micro-animation on every product interaction. A 3-step guided configurator for personalized products. Social proof widgets and urgency signals placed strategically. Mobile-first redesign. EMI options via Stripe + Cashfree integration.',
    results: [
      { metric: '3.1%', label: 'Conversion rate (was 0.8%)' },
      { metric: '₹4,200', label: 'Average order value increase' },
      { metric: '58%', label: 'Mobile revenue growth' },
      { metric: '2.1s', label: 'Page load time (was 6.8s)' },
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['Next.js 14', 'Framer Motion', 'Tailwind CSS'],
      },
      { category: 'Commerce', items: ['Shopify Storefront API', 'GraphQL'] },
      { category: 'Payments', items: ['Stripe', 'Cashfree', 'Razorpay'] },
      { category: 'Infra', items: ['Vercel Edge', 'Cloudflare', 'Sanity CMS'] },
    ],
    gallery: ['Homepage Hero', 'Product Configurator', 'Product Detail Page', 'Checkout Flow'],
    testimonial: {
      quote:
        'Our old website felt like a bazaar stall. Now it feels like walking into a luxury boutique. The conversion numbers prove it.',
      author: 'Sneha Kapoor',
      role: 'Founder, LuxCart India',
    },
  },

  {
    id: 'meditrack-health',
    title: 'MediTrack',
    tagline: 'Patient management & appointment system for clinics',
    category: 'Web App',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    color: '#0e9e6e',
    year: '2024',
    duration: '5 months',
    client: 'MediTrack Health',
    industry: 'Healthcare',
    status: 'Live',
    featured: false,
    links: { live: null, github: null },
    overview:
      'A HIPAA-compliant clinic management platform with patient records, appointment scheduling, doctor dashboards, and billing.',
    description:
      'MediTrack needed to modernize a chain of 12 clinics from paper-based records to a digital-first platform, while maintaining strict data privacy compliance.',
    challenge:
      '12 clinics with paper records, no appointment system, and zero data sharing between locations. Patient history was unavailable at point of care. Billing was done manually.',
    solution:
      'React dashboard for doctors and front desk. Node.js API with MongoDB for flexible medical records. Role-based access control. Appointment booking with SMS reminders. Billing module with insurance claim support.',
    results: [
      { metric: '70%', label: 'Reduction in wait time' },
      { metric: '12', label: 'Clinics onboarded' },
      { metric: '50k+', label: 'Patient records digitized' },
      { metric: '98%', label: 'Appointment show-up rate' },
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'React Query'] },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
      },
      { category: 'Realtime', items: ['Socket.IO', 'Redis'] },
      { category: 'Infra', items: ['AWS', 'S3', 'SES', 'Twilio'] },
    ],
    gallery: ['Doctor Dashboard', 'Patient Profile', 'Appointment Calendar', 'Billing Module'],
    testimonial: null,
  },

  {
    id: 'buildwise-crm',
    title: 'BuildWise CRM',
    tagline: 'Construction project & client management platform',
    category: 'ERP',
    tags: ['React', 'Django', 'PostgreSQL', 'Celery'],
    color: '#f5a623',
    year: '2023',
    duration: '5 months',
    client: 'BuildWise Construction',
    industry: 'Construction',
    status: 'Completed',
    featured: false,
    links: { live: null, github: null },
    overview:
      'A CRM + project tracker built for a mid-size construction company — site progress, client communication, payment milestones, and material procurement in one platform.',
    description:
      'BuildWise was tracking 40+ concurrent construction projects across 3 cities with no centralized visibility. Client communication happened over WhatsApp. Payment milestones were tracked in spreadsheets.',
    challenge:
      'No visibility into multi-site progress. Client disputes over payment timelines. Material procurement had no audit trail. Project managers were spending 3+ hours daily on status update calls.',
    solution:
      'Django REST API with React frontend. Kanban-style project pipeline. Client portal for progress visibility and document sign-off. Automated payment milestone reminders. Procurement module with vendor management.',
    results: [
      { metric: '40+', label: 'Projects managed simultaneously' },
      { metric: '60%', label: 'Less time on status calls' },
      { metric: 'Zero', label: 'Payment disputes since launch' },
      { metric: '3 cities', label: 'Operations unified' },
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'Redux Toolkit', 'Ant Design'] },
      {
        category: 'Backend',
        items: ['Django', 'Django REST', 'PostgreSQL', 'Celery'],
      },
      {
        category: 'Infra',
        items: ['DigitalOcean', 'Redis', 'Nginx', 'Docker'],
      },
      { category: 'Other', items: ['AWS S3', 'SendGrid', 'Twilio'] },
    ],
    gallery: ['Project Pipeline', 'Site Progress View', 'Client Portal', 'Procurement Tracker'],
    testimonial: {
      quote:
        "We finally know what's happening on every site without picking up the phone. BuildWise CRM paid for itself in 2 months.",
      author: 'Vikram Tiwari',
      role: 'MD, BuildWise Construction',
    },
  },
];

/* ── Helper to get project by id ── */
export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id) || null;
}

/* ── Unique categories derived from data ── */
export const CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))];
