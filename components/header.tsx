"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Alpha DAO</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#mint" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Mint Certificate
            </a>
            <a
              href="#certificates"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              View Certificates
            </a>
            <a
              href="#verify"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Verify
            </a>
            <Button variant="default" size="sm">
              Connect Wallet
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="#mint"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Mint Certificate
              </a>
              <a
                href="#certificates"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                View Certificates
              </a>
              <a
                href="#verify"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Verify
              </a>
              <Button variant="default" size="sm" className="w-fit">
                Connect Wallet
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
