export const navMenu = [
  { name: "Home", path: "/" },

  {
    name: "About Us",
    mega: [
      { name: "CEO and Founder  ", path: "/about/company" },
      { name: "Our Journey", path: "/about/journay" },
      { name: "Our Team", path: "/about/team" },
      { name: "Careers", path: "/about/careers" },
    ],
  },

  {
    name: "Our Services",
    mega: [
      { name: "Web Development", path: "/services/web-development" },
      { name: "Mobile App Development", path: "/services/mobile-apps" },
      { name: "UI/UX Design", path: "/services/ui-ux" },
      { name: "Digital Marketing", path: "/services/digital-marketing" },
      { name: "It Maintenance", path: "/services/it-maintenance" },
      { name: "Software Development", path: "/services/software-development" },
      { name: "Graphic Design", path: "/services/graphic-design" },
      { name: "SEO Services", path: "/services/seo" },
    ],
  },

  {
    name: "Our Product",
    mega: [
      { name: "CRM Software", path: "/products/crm" },
      { name: "LMS System", path: "/products/lms" },
      { name: "Ecommerce Platform", path: "/products/ecommerce" },
      { name: "Real Estate Platform", path: "/products/real-estate" },
      { name: "HR & Payroll System", path: "/products/hr-payroll" },
      { name: "School Management System", path: "/products/school-management" },
      { name: "Tour Booking Platform", path: "/products/tour-booking" },
      { name: "AI Solutions", path: "/products/ai-solutions" },
      { name: "Ngo Managment System", path: "/products/ngo-management" },
      { name: "Offline & Online Tuition Software", path: "/products/offline" },
      { name: "Attendance System", path: "/products/attendance" },
    ],
  },

  {
    name: "Our Portfolio",
    mega: [
      { name: "Our Projects", path: "/portfolio" },
      { name: "Our Clients", path: "/portfolio/clients" },
    ],
  },

  {
    name: "Packages",
    megaNested: [
      {
        title: "Website Packages",
        items: [
          { name: "Basic Website", path: "/packages/website-basic" },
          { name: "Standard Website", path: "/packages/website-standard" },
          { name: "Dynamic Website", path: "/packages/website-dynamic" },
        ],
      },
      {
        title: "Software Packages",
        items: [
          { name: "Basic Software", path: "/packages/basic-software" },
          { name: "Premium Software", path: "/packages/premium-software" },
        ],
      },
      {
        title: "Digital Marketing Packages",
        items: [
          { name: "Basic SEO", path: "/packages/digital-basic" },
          { name: "Advanced SEO", path: "/packages/digital-advanced" },
          { name: "Social Media", path: "/packages/digital-social" },
        ],
      },
      {
        title: "Graphic Design Packages",
        items: [
          { name: "Logo Design", path: "/packages/graphic-logo" },
          { name: "Graphic Design", path: "/packages/graphic-design" },
          { name: "Branding", path: "/packages/graphic-design/branding" },
        ],
      },
    ],
  },

  { name: "Blogs", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
  {
    name: "Growth Hub",
    mega: [
      { name: "Marketing Strategy", path: "/marketing" },
      { name: "Product Strategy", path: "/product" },
      { name: "Partner Registration", path: "/partner/register" },
      { name: "Partner Login", path: "/partner/login" },
      { name: "Client Registration", path: "/client/register" },
      { name: "Employee Verification", path: "/verify/employee" },
      { name: "Raise Support Ticket", path: "/support/ticket" },
    ],
  },
];
