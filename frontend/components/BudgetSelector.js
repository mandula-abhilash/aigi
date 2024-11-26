'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

const predefinedRanges = [
  { label: 'Under $25', values: [0, 25] },
  { label: '$25-$50', values: [25, 50] },
  { label: '$50-$100', values: [50, 100] },
  { label: '$100-$200', values: [100, 200] },
  { label: '$200-$500', values: [200, 500] },
  { label: '$500+', values: [500, 1000] },
];

export default function BudgetSelector({ value, onChange, error }) {
  const [isCustom, setIsCustom] = useState(false);
  const [customMin, setCustomMin] = useState(value?.[0] || '');
  const [customMax, setCustomMax] = useState(value?.[1] || '');

  const handleRangeClick = (range) => {
    setIsCustom(false);
    onChange(range.values);
  };

  const handleCustomSubmit = () => {
    const min = Number(customMin);
    const max = Number(customMax);
    if (min >= 0 && max > min) {
      onChange([min, max]);
    }
  };

  const isRangeActive = (range) => {
    return !isCustom && value?.[0] === range.values[0] && value?.[1] === range.values[1];
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">Budget Range</Label>
      
      {/* Predefined Ranges */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {predefinedRanges.map((range) => (
          <Button
            key={range.label}
            type="button"
            variant={isRangeActive(range) ? "default" : "outline"}
            className="w-full"
            onClick={() => handleRangeClick(range)}
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Custom Range Toggle */}
      <Button
        type="button"
        variant={isCustom ? "default" : "outline"}
        className="w-full"
        onClick={() => setIsCustom(true)}
      >
        Custom Range
      </Button>

      {/* Custom Range Inputs */}
      {isCustom && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="minBudget">Minimum ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="minBudget"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={customMin}
                  onChange={(e) => setCustomMin(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="maxBudget">Maximum ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="maxBudget"
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={customMax}
                  onChange={(e) => setCustomMax(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleCustomSubmit}
            className="w-full"
          >
            Apply Custom Range
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}