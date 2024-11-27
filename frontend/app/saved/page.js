"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedProducts from "@/components/saved/SavedProducts";
import SavedSearches from "@/components/saved/SavedSearches";
import { BookmarkIcon, SearchIcon } from "lucide-react";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Saved Items</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <BookmarkIcon className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="searches" className="flex items-center gap-2">
            <SearchIcon className="w-4 h-4" />
            Searches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <SavedProducts />
        </TabsContent>

        <TabsContent value="searches">
          <SavedSearches />
        </TabsContent>
      </Tabs>
    </div>
  );
}
