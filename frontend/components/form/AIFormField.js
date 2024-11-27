import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIFormField({
  id,
  label,
  value,
  onChange,
  onSuggestionClick,
  suggestions,
  loading,
  error,
  placeholder,
  className,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.startsWith('Create "')) {
      const newValue = suggestion.slice(8, -1);
      onSuggestionClick(newValue);
    } else {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className={cn(error ? "border-red-500" : "", loading ? "pr-10" : "")}
          placeholder={placeholder}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
        {suggestions.length > 0 && isFocused && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
            {value && (
              <button
                type="button"
                onClick={() => handleSuggestionClick(`Create "${value}"`)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-primary font-medium flex items-center gap-2"
              >
                Create "{value}"
              </button>
            )}
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
