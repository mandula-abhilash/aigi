"use client";

import GiftSearchForm from "@/components/GiftSearchForm";

export default function FormPage() {
  return (
    <div className="mx-auto px-4 py-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Gift Finder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let our AI help you discover the perfect gift based on your specific
            requirements
          </p>
        </div>

        <GiftSearchForm />
      </div>
    </div>
  );
}
