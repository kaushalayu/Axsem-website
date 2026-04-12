import FAQ from "../Components/FAQ"
import PageHero from "../Components/PageHero"
import "../Styles/FAQPage.css"

export default function FAQPage() {
  return (
    <div className="faq-page">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        pill="Help Center"
        title={<>Frequently Asked <span className="ph-gradient">Questions</span></>}
        subtitle="Find answers to common questions about our services, pricing, and support."
        tag="FAQ"
      />
      <FAQ />
    </div>
  )
}