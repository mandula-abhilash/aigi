"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ExternalLink, Loader2 } from "lucide-react";

export default function SavedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedProducts();
  }, []);

  const fetchSavedProducts = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts([
        {
          id: 1,
          title: "Premium Maternity Pillow",
          image:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&h=500&fit=crop",
          price: "$49.99",
          link: "#",
          savedAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch saved products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(products.filter((p) => p.id !== productId));
      toast({
        title: "Success",
        description: "Product removed from saved items",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No saved products yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h3>
              <p className="text-primary font-medium text-lg mb-4">
                {product.price}
              </p>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleRemove(product.id)}
                  className="flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
