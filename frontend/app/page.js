"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Gift, Search, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Find the Perfect Gift with AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Discover thoughtful and personalized gift ideas for your loved
              ones using our AI-powered recommendation system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/form">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try AI Gift Finder
                </Button>
              </Link>
              <Link href="/profiles">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Gift Profiles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Gift className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Suggestions</CardTitle>
                <CardDescription>
                  Get personalized gift recommendations based on recipient,
                  occasion, and interests
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Curated Profiles</CardTitle>
                <CardDescription>
                  Browse our handpicked collection of gift ideas for specific
                  occasions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  Our AI understands preferences and matches them with perfect
                  gift ideas
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find the Perfect Gift?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let our AI help you discover thoughtful and unique gift ideas that
            will bring joy to your loved ones
          </p>
          <Link href="/form">
            <Button size="lg" className="w-full sm:w-auto">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Using AI Gift Finder
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
