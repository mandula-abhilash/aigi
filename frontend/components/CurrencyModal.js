'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Check } from 'lucide-react';

export default function CurrencyModal({ isOpen, onClose }) {
  const { currency, setCurrency, currencyMap } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const handleSave = () => {
    setCurrency(selectedCurrency);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Select Your Currency
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {Object.entries(currencyMap).map(([country, { code, symbol }]) => (
                <SelectItem 
                  key={code} 
                  value={code}
                  className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4 opacity-0 data-[state=checked]:opacity-100" />
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{code}</span>
                    <span className="text-gray-500">({symbol})</span>
                    <span className="text-gray-500">- {country}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Save Preference
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}