"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => router.back()} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
