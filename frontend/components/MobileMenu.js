"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Coins, LogOut, LogIn, UserPlus, BookmarkIcon, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu({
  isOpen,
  onClose,
  onTokenPurchase,
  onAuthClick,
  onCurrencyClick,
}) {
  const { user, tokens, logout } = useAuth();
  const { currency, currencySymbol } = useCurrency();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-800">
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-col p-6 pt-16 space-y-4">
        <Button
          variant="ghost"
          onClick={onCurrencyClick}
          className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300"
        >
          <span>{currencySymbol}</span>
          <span>{currency}</span>
        </Button>

        {user ? (
          <>
            <Link href="/saved" onClick={onClose}>
              <Button
                variant="ghost"
                className="flex items-center w-full justify-center"
              >
                <BookmarkIcon className="w-4 h-4 mr-2" />
                Saved Items
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={onTokenPurchase}
              className="flex items-center justify-between w-full"
            >
              <span className="flex items-center">
                <Coins className="w-4 h-4 mr-2" />
                Tokens
              </span>
              <span>{tokens}</span>
            </Button>
            <Button
              variant="destructive"
              className="flex items-center w-full justify-center"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="flex items-center w-full justify-center"
              onClick={() => onAuthClick("login")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button
              variant="default"
              className="flex items-center w-full justify-center"
              onClick={() => onAuthClick("register")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
