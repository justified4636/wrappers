import { Button } from "@/components/ui/button"
import { Award, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
            <span className="text-primary">Alpha DAO</span> Secure Digital Certificates on TON Blockchain
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Issue, manage, and verify tamper-proof Soulbound Token certificates through Alpha DAO. Built for educational
            institutions, organizations, and professionals seeking blockchain-verified credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8">
              Mint Your First Certificate
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tamper-Proof</h3>
              <p className="text-muted-foreground">
                Certificates are permanently stored on TON blockchain, ensuring authenticity and preventing fraud.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Soulbound Tokens</h3>
              <p className="text-muted-foreground">
                Non-transferable certificates that represent achievements, qualifications, and credentials.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Verification</h3>
              <p className="text-muted-foreground">
                Verify any certificate instantly using blockchain technology without intermediaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
