import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Home Affordability Calculator 2026 – How Much House Can You Afford?",
  description:
    "Free home affordability calculator. Enter your income, debts, and down payment to instantly see how much house you can afford in any US state.",
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: "Home Affordability Calculator 2026",
    description: "Find out exactly how much house you can afford with our free calculator.",
    url: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Loading calculator...</div>}>
      <CalculatorClient />
    </Suspense>
  );
}
