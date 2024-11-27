"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Menu,
  X,
  Coins,
  LogOut,
  UserPlus,
  LogIn,
  BookmarkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TokenPurchaseModal from "@/components/TokenPurchaseModal";
import MobileMenu from "@/components/MobileMenu";
import AuthDialog from "@/components/auth/AuthDialog";
import CurrencyModal from "@/components/CurrencyModal";
import Link from "next/link";

export default function Header() {
  const { user, tokens, logout } = useAuth();
  const { currency, currencySymbol } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState("login");

  const openAuth = (tab) => {
    setInitialAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            AIGI Gift Finder
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsCurrencyModalOpen(true)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <span>{currencySymbol}</span>
              <span>{currency}</span>
            </Button>

            {user ? (
              <>
                <Link href="/saved">
                  <Button variant="ghost" className="flex items-center">
                    <BookmarkIcon className="w-4 h-4 mr-2" />
                    Saved Items
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsTokenModalOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>{tokens} Tokens</span>
                </Button>
                <Button variant="ghost" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => openAuth("login")}
                  className="flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => openAuth("register")}
                  className="flex items-center"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onTokenPurchase={() => {
          setIsMenuOpen(false);
          setIsTokenModalOpen(true);
        }}
        onCurrencyClick={() => {
          setIsMenuOpen(false);
          setIsCurrencyModalOpen(true);
        }}
        onAuthClick={(tab) => {
          setIsMenuOpen(false);
          openAuth(tab);
        }}
      />

      <TokenPurchaseModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
      />

      <AuthDialog
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialAuthTab}
      />

      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />
    </header>
  );
}
