'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Search, Loader2 } from 'lucide-react';

export default function SavedSearches() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const fetchSavedSearches = async () => {
    try {
      setLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSearches([
        {
          id: 1,
          query: "Birthday gift for mom",
          savedAt: new Date().toISOString(),
        },
        // Add more mock saved searches as needed
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch saved searches',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (searchId) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSearches(searches.filter(s => s.id !== searchId));
      toast({
        title: 'Success',
        description: 'Search removed from saved items',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove search',
        variant: 'destructive',
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

  if (!searches.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No saved searches yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {searches.map((search) => (
        <div
          key={search.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{search.query}</p>
              <p className="text-sm text-gray-500">
                Saved on {new Date(search.savedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemove(search.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}