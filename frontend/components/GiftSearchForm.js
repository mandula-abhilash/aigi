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
import { Search, X, Loader2, DollarSign, Plus } from "lucide-react";
import { getFieldSuggestions, getGiftSuggestions } from "@/services/api";
import GiftGrid from "@/components/suggestions/GiftGrid";
import AIFormField from "@/components/form/AIFormField";
import { Input } from "@/components/ui/input";

const searchSchema = z.object({
  recipient: z.string().min(1, "Please specify who the gift is for"),
  occasion: z.string().min(1, "Please specify the occasion"),
  interest: z.string(),
  maxBudget: z.number().min(1, "Please specify a maximum budget"),
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
      maxBudget: 100,
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
          maxBudget: formValues.maxBudget,
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
      const giftSuggestions = await getGiftSuggestions({
        ...data,
        interests,
      });
      setResults(giftSuggestions);
    } catch (error) {
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
    <div className="max-w-6xl mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
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
            />

            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-2 hover:text-primary/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {/* <label htmlFor="maxBudget" className="text-sm font-medium">
              Maximum Budget ({currencySymbol})
            </label> */}
            <div className="relative">
              {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" /> */}
              {/* <Input
                id="maxBudget"
                type="number"
                min="1"
                placeholder="Enter maximum budget"
                {...register("maxBudget", { valueAsNumber: true })}
                className={`pl-4 ${errors.maxBudget ? "border-red-500" : ""}`}
              />
              {errors.maxBudget && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.maxBudget.message}
                </p>
              )} */}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Find Gifts
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={loading}
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* {!user && (
          <p className="text-sm text-muted-foreground text-center">
            Sign in to save your searches and get personalized recommendations
          </p>
        )} */}
      </form>

      <GiftGrid results={results} />
    </div>
  );
}
