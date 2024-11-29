"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Check } from "lucide-react";
import { currencyMap } from "@/lib/marketplace";

export default function CurrencyModal({ isOpen, onClose }) {
  const { currency, setCurrency, currencySymbol, marketplace, userIp } =
    useCurrency();
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
            Confirm Your Location Settings
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Your Currency
            </label>
            <Select
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                position="popper"
                sideOffset={5}
                align="start"
              >
                <div className="max-h-[300px] overflow-y-auto">
                  {Object.entries(currencyMap).map(
                    ([country, { code, symbol, name }]) => (
                      <SelectItem
                        key={code + country}
                        value={code}
                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <Check className="h-4 w-4 opacity-0 data-[state=checked]:opacity-100" />
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="font-medium">{code}</span>
                          <span className="text-gray-500">({symbol})</span>
                          <span className="text-gray-500">- {name}</span>
                        </span>
                      </SelectItem>
                    )
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>
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
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
