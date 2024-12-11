"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">AIGI Gift Finder</h3>
            <p className="text-sm text-muted-foreground">
              A product by VISDAK. Helping you find the perfect gift using AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Questions? Reach out to us at{" "}
              <a
                href="mailto:contact.visdak@gmail.com"
                className="text-primary hover:underline"
              >
                contact.visdak@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="border-t mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VISDAK. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            As an Amazon Associate, we earn commissions from qualifying
            purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
