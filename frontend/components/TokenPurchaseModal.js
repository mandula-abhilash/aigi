"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Coins, Check, Gift, Star, Crown } from "lucide-react";
import { createCheckoutSession } from "@/services/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/contexts/AuthContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const tokenPlans = [
  {
    id: "basic",
    tokens: 10,
    price: 9.99,
    popular: false,
    icon: Gift,
    color: "from-emerald-500 to-teal-600",
    features: ["Basic gift recommendations", "24/7 support"],
    planId: "674d525261b8004913d92311",
  },
  {
    id: "pro",
    tokens: 100,
    price: 49.99,
    popular: true,
    icon: Star,
    color: "from-violet-500 to-purple-600",
    features: ["Advanced AI suggestions", "Priority support", "Save searches"],
    planId: "674d525261b8004913d92312",
  },
  {
    id: "enterprise",
    tokens: 500,
    price: 199.99,
    popular: false,
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    features: [
      "Unlimited recommendations",
      "Dedicated support",
      "Custom categories",
    ],
    planId: "674d525261b8004913d92313",
  },
];

export default function TokenPurchaseModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { fetchTokens } = useAuth();

  const handlePurchase = async (plan) => {
    try {
      setLoading(true);

      // Create checkout session
      const { sessionId } = await createCheckoutSession({
        planId: plan.planId,
        paymentGateway: "stripe",
        quantity: 1,
      });

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to process purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            Purchase Tokens
          </DialogTitle>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your gifting needs
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {tokenPlans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden transition-transform hover:scale-105 ${
                  plan.popular ? "ring-2 ring-violet-500 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-violet-500 text-white text-sm font-medium px-4 py-1 text-center transform">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br ${plan.color} p-6 text-white h-full flex flex-col`}
                >
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <PlanIcon className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {plan.tokens} Tokens
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(plan)}
                    disabled={loading}
                    className={`w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 
                      hover:border-white transition-all duration-200`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4 animate-bounce" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        Purchase Now
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
