import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollingPlaceholder from "./ScrollingPlaceholder";

const placeholderSuggestions = {
  recipient: [
    "Wife",
    "Brother",
    "Cousin's dog",
    "Female school friend met after many years",
    "Mentor who shaped my career",
    "College roommate",
  ],
  occasion: [
    "Anniversary",
    "Birthday",
    "Adoption Day",
    "Reunion Celebration",
    "Career Milestone",
    "College Farewell Party",
  ],
  interest: [
    ["Cooking", "Gardening", "Yoga", "Baking"],
    ["Gaming", "Reading", "Photography"],
    ["Playing fetch", "Chewing toys", "Running in the park"],
    ["Dancing", "Music", "Art", "Movies"],
    ["Public speaking", "Leadership books", "Networking events"],
    ["Gaming marathons", "Late-night talks", "Board games"],
  ],
};

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
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShowSuggestions(
      isFocused && (loading || suggestions.length > 0 || value)
    );
  }, [isFocused, loading, suggestions.length, value]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.startsWith('Create "')) {
      const newValue = suggestion.slice(8, -1);
      onSuggestionClick(newValue);
    } else {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className={cn("space-y-2 relative", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className={cn(
            error ? "border-red-500" : "",
            "bg-transparent transition-colors",
            !value && "text-transparent"
          )}
          {...props}
        />

        {!value && (
          <div className="absolute inset-0 pointer-events-none pl-3 flex items-center">
            <ScrollingPlaceholder
              suggestions={placeholderSuggestions[id] || [placeholder]}
            />
          </div>
        )}

        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="p-4 flex items-center justify-center text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Fetching suggestions...
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {value &&
                  !suggestions.some(
                    (s) => s.toLowerCase() === value.toLowerCase()
                  ) && (
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(`Create "${value}"`)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-primary font-medium flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
                    >
                      Create "{value}"
                    </button>
                  )}
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700",
                      suggestion.toLowerCase() === value.toLowerCase() &&
                        "bg-gray-50 dark:bg-gray-700/50"
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
                {!loading && suggestions.length === 0 && value && (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No suggestions found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
