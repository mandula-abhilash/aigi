"use client";

import { useState } from "react";
import GiftSearchForm from "@/components/GiftSearchForm";
import ProductGrid from "@/components/ProductGrid";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { GiftIcon } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, tokens } = useAuth();
  const { toast } = useToast();

  const handleSearch = async (suggestions) => {
    try {
      setLoading(true);
      // Transform suggestions into product format
      const transformedProducts = suggestions.map((suggestion, index) => ({
        id: index + 1,
        title: suggestion,
        image: `https://source.unsplash.com/500x500/?gift,${encodeURIComponent(
          suggestion
        )}`,
        price: "$49.99", // You might want to generate this based on budget
        link: "#",
      }));

      setProducts(transformedProducts);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <GiftIcon className="w-12 h-12 text-primary" />
        </div>
        {user && (
          <p className="text-sm text-primary mt-2">
            Tokens remaining: {tokens}
          </p>
        )}
      </header>

      <div className="max-w-2xl mx-auto mb-12">
        <GiftSearchForm onSearch={handleSearch} />
      </div>

      <div className="max-w-3xl mx-auto">
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
}
