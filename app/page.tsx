import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CertificateGrid } from "@/components/certificate-grid"
import { MintingForm } from "@/components/minting-form"
import { VerificationSection } from "@/components/verification-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-12 space-y-16">
          <MintingForm />
          <CertificateGrid />
          <VerificationSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
