"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { debounce } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X, Loader2, DollarSign, Plus } from "lucide-react";
import { getFieldSuggestions, getGiftSuggestions } from "@/services/api";

const searchSchema = z.object({
  recipient: z.string().min(1, "Please specify who the gift is for"),
  occasion: z.string().min(1, "Please specify the occasion"),
  interests: z.array(z.string()).min(1, "Please specify at least one interest"),
  maxBudget: z.number().min(1, "Please specify a maximum budget"),
});

export default function GiftSearchForm({ onSearch }) {
  const [suggestions, setSuggestions] = useState({
    recipient: [],
    occasion: [],
    interest: [],
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [currentInterest, setCurrentInterest] = useState("");
  const { user } = useAuth();
  const { currencySymbol } = useCurrency();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      recipient: "",
      occasion: "",
      interests: [],
      maxBudget: 100,
    },
  });

  const debouncedFetch = useCallback(
    debounce(async (field, value) => {
      if (!value.trim()) {
        setSuggestions((prev) => ({ ...prev, [field]: [] }));
        return;
      }

      try {
        // Get current form values for context
        const formValues = getValues();
        const context = {
          ...formValues,
          currentField: field,
        };

        const fieldSuggestions = await getFieldSuggestions(field, context);
        setSuggestions((prev) => ({ ...prev, [field]: fieldSuggestions }));
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch suggestions",
          variant: "destructive",
        });
      }
    }, 300),
    [getValues, toast]
  );

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "interest") {
      setCurrentInterest(value);
    } else {
      setValue(field, value);
    }
    debouncedFetch(field, value);
  };

  const handleSuggestionClick = (field, value) => {
    if (field === "interest") {
      const currentInterests = getValues("interests") || [];
      if (!currentInterests.includes(value)) {
        setValue("interests", [...currentInterests, value]);
        setCurrentInterest("");
        setSuggestions((prev) => ({ ...prev, interest: [] }));
      }
    } else {
      setValue(field, value);
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleAddInterest = () => {
    if (currentInterest.trim()) {
      const currentInterests = getValues("interests") || [];
      if (!currentInterests.includes(currentInterest)) {
        setValue("interests", [...currentInterests, currentInterest.trim()]);
        setCurrentInterest("");
        setSuggestions((prev) => ({ ...prev, interest: [] }));
      }
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    const currentInterests = getValues("interests");
    setValue(
      "interests",
      currentInterests.filter((interest) => interest !== interestToRemove)
    );
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const suggestions = await getGiftSuggestions(data);
      onSearch(suggestions);
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
    setCurrentInterest("");
    setSuggestions({
      recipient: [],
      occasion: [],
      interest: [],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Find the Perfect Gift
        </h2>
        <p className="text-muted-foreground">
          Tell us about your gift recipient and we'll help you find something
          special
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="recipient">Who is this gift for?</Label>
          <div className="relative">
            <Input
              id="recipient"
              placeholder="e.g., Mom, Friend, Colleague"
              {...register("recipient")}
              onChange={handleInputChange("recipient")}
              onFocus={() => setFocusedField("recipient")}
              onBlur={() => setTimeout(() => setFocusedField(null), 200)}
              className={errors.recipient ? "border-red-500" : ""}
            />
            {suggestions.recipient.length > 0 &&
              focusedField === "recipient" && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  {suggestions.recipient.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        handleSuggestionClick("recipient", suggestion)
                      }
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            {errors.recipient && (
              <p className="mt-1 text-sm text-red-500">
                {errors.recipient.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occasion">What's the occasion?</Label>
          <div className="relative">
            <Input
              id="occasion"
              placeholder="e.g., Birthday, Anniversary"
              {...register("occasion")}
              onChange={handleInputChange("occasion")}
              onFocus={() => setFocusedField("occasion")}
              onBlur={() => setTimeout(() => setFocusedField(null), 200)}
              className={errors.occasion ? "border-red-500" : ""}
            />
            {suggestions.occasion.length > 0 && focusedField === "occasion" && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                {suggestions.occasion.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      handleSuggestionClick("occasion", suggestion)
                    }
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {errors.occasion && (
              <p className="mt-1 text-sm text-red-500">
                {errors.occasion.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest">What are their interests?</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="interest"
                  placeholder="Add an interest"
                  value={currentInterest}
                  onChange={handleInputChange("interest")}
                  onFocus={() => setFocusedField("interest")}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                />
                {suggestions.interest.length > 0 &&
                  focusedField === "interest" && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      {suggestions.interest.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            handleSuggestionClick("interest", suggestion)
                          }
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
              <Button
                type="button"
                onClick={handleAddInterest}
                disabled={!currentInterest.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {getValues("interests")?.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="mt-1 text-sm text-red-500">
                {errors.interests.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxBudget">Maximum Budget ({currencySymbol})</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="maxBudget"
              type="number"
              min="1"
              placeholder="Enter maximum budget"
              {...register("maxBudget", { valueAsNumber: true })}
              className={`pl-8 ${errors.maxBudget ? "border-red-500" : ""}`}
            />
            {errors.maxBudget && (
              <p className="mt-1 text-sm text-red-500">
                {errors.maxBudget.message}
              </p>
            )}
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

      {!user && (
        <p className="text-sm text-muted-foreground text-center">
          Sign in to save your searches and get personalized recommendations
        </p>
      )}
    </form>
  );
}
