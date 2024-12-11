"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Coins, Check, Gift, Star, Crown, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/services/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { getActivePlans } from "@/services/plans";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAnalytics } from "@/hooks/use-analytics";
import { motion } from "framer-motion";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const planStyles = {
  "Starter Plan": {
    icon: Gift,
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-500",
  },
  "Premium Plan": {
    icon: Star,
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-500",
  },
  "Enterprise Plan": {
    icon: Crown,
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
};

export default function TokenPurchaseModal({ isOpen, onClose }) {
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const { toast } = useToast();
  const { currencySymbol } = useCurrency();
  const { trackUser } = useAnalytics();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const activePlans = await getActivePlans();
        setPlans(activePlans);
      } catch (error) {
        console.error("Error in fetchPlans:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load pricing plans",
          variant: "destructive",
        });
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen, toast]);

  const handlePurchase = async (plan) => {
    try {
      setLoadingPlanId(plan._id);

      trackUser("purchase-start", user?._id, {
        planId: plan._id,
        planName: plan.name,
        price: plan.price,
        tokens: plan.tokens,
      });

      const { sessionId } = await createCheckoutSession({
        planId: plan._id,
        paymentGateway: "stripe",
        quantity: 1,
      });

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        trackUser("purchase-error", user?._id, {
          planId: plan._id,
          error: error.message,
        });
        throw error;
      }
    } catch (error) {
      console.error("Purchase error:", error);
      trackUser("purchase-error", user?._id, {
        planId: plan._id,
        error: error.message,
      });
      toast({
        title: "Error",
        description:
          error.message || "Failed to process purchase. Please try again.",
        variant: "destructive",
      });
      setLoadingPlanId(null);
    }
  };

  if (loadingPlans) return null;

  if (!plans.length) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>No Plans Available</DialogTitle>
            <DialogDescription>
              Sorry, there are no plans available at the moment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center">
            Purchase Tokens
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Choose the perfect plan for your gifting needs
          </DialogDescription>
        </DialogHeader>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {plans.map((plan) => {
            const {
              icon: PlanIcon,
              bgColor,
              iconColor,
            } = planStyles[plan.name] || {
              icon: Gift,
              bgColor: "bg-gray-50 dark:bg-gray-800",
              iconColor: "text-gray-500",
            };
            const isPopular = plan.name === "Premium Plan";
            const isLoading = loadingPlanId === plan._id;

            return (
              <motion.div
                key={plan._id}
                variants={item}
                whileHover="hover"
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${bgColor} ${
                  isPopular
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium px-4 py-1 text-center">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`${iconColor} bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm`}
                      >
                        <PlanIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-3xl font-bold">
                        {currencySymbol}
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.tokens} tokens included
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">
                        {plan.tokens} AI gift suggestions
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">24/7 support</span>
                    </li>
                    {isPopular && (
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 flex-shrink-0 text-primary" />
                        <span className="text-sm">Priority support</span>
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(plan)}
                    disabled={isLoading || loadingPlanId !== null}
                    variant={isPopular ? "default" : "outline"}
                    className="w-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
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
              </motion.div>
            );
          })}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
