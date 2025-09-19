"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle, AlertCircle } from "lucide-react"
import { useCertificationContract } from "@/hooks/use-certification-contract"

export function MintingForm() {
  const { mintCertificate, isLoading, error, clearError } = useCertificationContract()
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    recipient: "",
    certificateType: "",
    title: "",
    description: "",
    issuer: "Alpha DAO", // Default to Alpha DAO
    issueDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setSuccess(false)

    try {
      const result = await mintCertificate(formData.recipient, {
        title: formData.title,
        description: formData.description,
        certificateType: formData.certificateType,
        issuer: formData.issuer,
        issueDate: formData.issueDate,
        issuedBy: "Alpha DAO Education Committee",
      })

      if (result) {
        setSuccess(true)
        setFormData({
          recipient: "",
          certificateType: "",
          title: "",
          description: "",
          issuer: "Alpha DAO",
          issueDate: "",
        })
      }
    } catch (err) {
      console.error("[v0] Error in form submission:", err)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="mint" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Mint New Certificate</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a new Soulbound Token certificate on the TON blockchain through Alpha DAO
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Certificate Details
            </CardTitle>
            <CardDescription>Fill in the information for the new certificate. All fields are required.</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Certificate minted successfully! The SBT has been created on the TON blockchain.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="EQD..."
                    value={formData.recipient}
                    onChange={(e) => handleInputChange("recipient", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select
                    value={formData.certificateType}
                    onValueChange={(value) => handleInputChange("certificateType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="participation">Participation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Certificate Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Blockchain Development Certification"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the achievement or qualification..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer Organization</Label>
                  <Input
                    id="issuer"
                    placeholder="Organization name"
                    value={formData.issuer}
                    onChange={(e) => handleInputChange("issuer", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Minting Certificate..." : "Mint Certificate"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
