"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ExternalLink, User, RefreshCw } from "lucide-react"
import { useCertificationContract } from "@/hooks/use-certification-contract"

export function CertificateGrid() {
  const { certificates, contractState, isLoading, loadCertificates } = useCertificationContract()
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  useEffect(() => {
    loadCertificates()
  }, [loadCertificates])

  const handleViewDetails = (certificateId: string) => {
    setSelectedCertificate(certificateId)
    console.log("[v0] Viewing certificate details:", certificateId)
  }

  const handleExternalLink = (certificate: any) => {
    const explorerUrl = `https://tonscan.org/nft/${certificate.tokenId}`
    window.open(explorerUrl, "_blank")
  }

  return (
    <section id="certificates" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Certificate Registry</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse all certificates issued by Alpha DAO on the TON blockchain
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>Total Supply: {contractState.totalSupply.toString()}</span>
            <span>Max Supply: {contractState.maxSupply.toString()}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Award className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{cert.metadata.certificateType}</Badge>
                </div>
                <CardTitle className="text-lg text-balance">{cert.metadata.title}</CardTitle>
                <CardDescription>{cert.metadata.issuer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{cert.metadata.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-xs">{cert.studentAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{cert.mintedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Token #{cert.tokenId.toString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleViewDetails(cert.id)}
                  >
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExternalLink(cert)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certificates Found</h3>
            <p className="text-muted-foreground">No certificates have been minted yet.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={loadCertificates}
            disabled={isLoading}
            className="gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Loading..." : "Refresh Certificates"}
          </Button>
        </div>
      </div>
    </section>
  )
}
