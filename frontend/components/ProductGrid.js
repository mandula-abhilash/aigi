'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BookmarkIcon, Loader2, ExternalLink } from 'lucide-react';

export default function ProductGrid({ products, loading }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = async (product) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to save products.',
        variant: 'default',
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Product saved successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Start searching to see gift recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
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
              <p className="text-primary font-medium text-lg mb-4">{product.price}</p>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleSave(product)}
                  className="flex items-center"
                >
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  Save
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