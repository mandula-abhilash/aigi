"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { debounce } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, Plus } from "lucide-react";
import { getFieldSuggestions, getGiftSuggestions } from "@/services/api";
import GiftGrid from "@/components/suggestions/GiftGrid";
import AIFormField from "@/components/form/AIFormField";
import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/use-analytics";

const searchSchema = z.object({
  recipient: z.string().min(1, "Please specify who the gift is for"),
  occasion: z.string().min(1, "Please specify the occasion"),
  interest: z.string(),
});

export default function GiftSearchForm() {
  const [suggestions, setSuggestions] = useState({
    recipient: [],
    occasion: [],
    interest: [],
  });
  const [loadingStates, setLoadingStates] = useState({
    recipient: false,
    occasion: false,
    interest: false,
  });
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { currencySymbol } = useCurrency();
  const { toast } = useToast();
  const [results, setResults] = useState([]);

  const { trackGiftFinder, trackForm } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      recipient: "",
      occasion: "",
      interest: "",
    },
  });

  const debouncedFetch = useCallback(
    debounce(async (field, value) => {
      if (!value.trim()) {
        setSuggestions((prev) => ({ ...prev, [field]: [] }));
        setLoadingStates((prev) => ({ ...prev, [field]: false }));
        return;
      }

      try {
        setLoadingStates((prev) => ({ ...prev, [field]: true }));
        const formValues = getValues();
        const context = {
          recipient: formValues.recipient,
          occasion: formValues.occasion,
          interest: formValues.interest,
        };

        const fieldSuggestions = await getFieldSuggestions(field, context);
        setSuggestions((prev) => ({
          ...prev,
          [field]: fieldSuggestions,
        }));
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch suggestions",
          variant: "destructive",
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, [field]: false }));
      }
    }, 300),
    [interests]
  );

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setValue(field, value);
    trackGiftFinder("field-interaction", {
      field,
      value,
      suggestions: suggestions[field],
    });
    debouncedFetch(field, value);
  };

  const addCustomInterest = () => {
    const interest = getValues("interest").trim();
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setValue("interest", "");
      setSuggestions((prev) => ({ ...prev, interest: [] }));
    }
  };

  const handleInterestKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomInterest();
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const onSubmit = async (data) => {
    if (interests.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one interest",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      trackGiftFinder("form-submit", {
        ...data,
        interests,
      });

      const giftSuggestions = await getGiftSuggestions({
        ...data,
        interests,
      });

      trackGiftFinder("suggestions-received", {
        results: giftSuggestions,
        criteria: { ...data, interests },
      });

      setResults(giftSuggestions);
    } catch (error) {
      // Track error
      trackForm("gift-finder", "error", { error: error.message });

      toast({
        title: "Error",
        description: error.message || "Failed to fetch gift suggestions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset();
    setInterests([]);
    setSuggestions({
      recipient: [],
      occasion: [],
      interest: [],
    });
    setResults([]);
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-4xl mx-auto dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
      >
        <div className="grid gap-4 sm:gap-6">
          <AIFormField
            id="recipient"
            label="Who is this gift for?"
            value={watch("recipient")}
            onChange={handleInputChange("recipient")}
            onSuggestionClick={(value) => setValue("recipient", value)}
            suggestions={suggestions.recipient}
            loading={loadingStates.recipient}
            error={errors.recipient?.message}
            placeholder="e.g., Mom, Friend, Colleague"
            className="w-full"
          />

          <AIFormField
            id="occasion"
            label="What's the occasion?"
            value={watch("occasion")}
            onChange={handleInputChange("occasion")}
            onSuggestionClick={(value) => setValue("occasion", value)}
            suggestions={suggestions.occasion}
            loading={loadingStates.occasion}
            error={errors.occasion?.message}
            placeholder="e.g., Birthday, Anniversary"
            className="w-full"
          />

          <div className="space-y-2">
            <AIFormField
              id="interest"
              label="What are their interests?"
              value={watch("interest")}
              onChange={handleInputChange("interest")}
              onSuggestionClick={(value) => {
                if (!interests.includes(value)) {
                  setInterests([...interests, value]);
                  setValue("interest", "");
                }
              }}
              suggestions={suggestions.interest}
              loading={loadingStates.interest}
              error={errors.interest?.message}
              placeholder="e.g., Reading, Cooking, Gaming"
              onKeyDown={handleInterestKeyDown}
              className="w-full"
            />

            {interests.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                {interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-2 hover:text-primary/70 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <Button
            type="submit"
            className="w-full min-h-[1.5rem] text-base sm:flex-[3]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="whitespace-nowrap">
                  Finding Perfect Gifts...
                </span>
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                <span className="whitespace-nowrap">Find Perfect Gifts</span>
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={loading}
            className="w-full min-h-[1.5rem] text-base sm:flex-1"
          >
            <X className="mr-2 h-5 w-5" />
            Clear
          </Button>
        </div>

        {!user && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Sign in to save your searches and get personalized recommendations
          </p>
        )}
      </motion.form>

      <GiftGrid results={results} />
    </div>
  );
}
