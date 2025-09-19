"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useCertificationContract, type Certificate } from "@/hooks/use-certification-contract"

export function VerificationSection() {
  const { verifyCertificate, isLoading } = useCertificationContract()
  const [tokenId, setTokenId] = useState("")
  const [verificationResult, setVerificationResult] = useState<{
    status: "valid" | "invalid" | "not-found" | null
    certificate?: Certificate
    error?: string
  }>({ status: null })

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tokenId.trim()) {
      setVerificationResult({
        status: "invalid",
        error: "Please enter a valid token ID or transaction hash",
      })
      return
    }

    try {
      console.log("[v0] Starting certificate verification for:", tokenId)

      const certificate = await verifyCertificate(tokenId.trim())

      if (certificate) {
        setVerificationResult({
          status: "valid",
          certificate,
        })
        console.log("[v0] Certificate verification successful")
      } else {
        setVerificationResult({
          status: "not-found",
          error: "Certificate not found on the blockchain",
        })
        console.log("[v0] Certificate not found")
      }
    } catch (error) {
      console.error("[v0] Verification error:", error)
      setVerificationResult({
        status: "invalid",
        error: "Verification failed. Please check the token ID and try again.",
      })
    }
  }

  const getStatusIcon = () => {
    switch (verificationResult.status) {
      case "valid":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "invalid":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "not-found":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (verificationResult.status) {
      case "valid":
        return "Certificate is valid and verified on the TON blockchain"
      case "invalid":
        return verificationResult.error || "Certificate verification failed"
      case "not-found":
        return verificationResult.error || "Certificate not found on the blockchain"
      default:
        return ""
    }
  }

  return (
    <section id="verify" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Verify Certificate</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly verify the authenticity of any Alpha DAO certificate using its token ID or transaction hash
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Certificate Verification
              </CardTitle>
              <CardDescription>
                Enter the certificate token ID or transaction hash to verify its authenticity on the TON blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenId">Token ID or Transaction Hash</Label>
                  <Input
                    id="tokenId"
                    placeholder="Enter token ID or transaction hash..."
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Certificate"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {verificationResult.status && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon()}
                  Verification Result
                </CardTitle>
                <CardDescription>{getStatusText()}</CardDescription>
              </CardHeader>
              {verificationResult.certificate && (
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Certificate Title</Label>
                      <p className="text-sm text-muted-foreground">{verificationResult.certificate.metadata.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Issuer</Label>
                      <p className="text-sm text-muted-foreground">{verificationResult.certificate.metadata.issuer}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Recipient</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        {verificationResult.certificate.studentAddress}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Issue Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {verificationResult.certificate.mintedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Certificate Type</Label>
                      <p className="text-sm text-muted-foreground">
                        {verificationResult.certificate.metadata.certificateType}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Token ID</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        #{verificationResult.certificate.tokenId.toString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {verificationResult.certificate.metadata.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Verified on TON Blockchain
                    </Badge>
                    <Badge variant="outline">Alpha DAO Certified</Badge>
                  </div>
                </CardContent>
              )}

              {verificationResult.status !== "valid" && verificationResult.error && (
                <CardContent>
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">{verificationResult.error}</AlertDescription>
                  </Alert>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
