"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CalculatorForm, { type CalculatorInputs } from "@/components/CalculatorForm";
import ResultsPanel from "@/components/ResultsPanel";
import AdBanner from "@/components/AdBanner";
import { statesData } from "@/lib/states-data";

export default function CalculatorClient() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<CalculatorInputs | null>(null);

  // Parse URL params for shared calculations
  const initialValues: Partial<CalculatorInputs> = {};
  const income = searchParams.get("income");
  if (income) initialValues.annualIncome = Number(income);
  const debt = searchParams.get("debt");
  if (debt) initialValues.monthlyDebt = Number(debt);
  const dp = searchParams.get("dp");
  if (dp) initialValues.downPaymentPercent = Number(dp);
  const rate = searchParams.get("rate");
  if (rate) initialValues.interestRate = Number(rate);
  const term = searchParams.get("term");
  if (term) initialValues.loanTerm = Number(term);
  const state = searchParams.get("state");
  if (state) initialValues.state = state;
  const tax = searchParams.get("tax");
  if (tax) initialValues.propertyTaxRate = Number(tax);
  const ins = searchParams.get("ins");
  if (ins) initialValues.annualInsurance = Number(ins);

  const selectedState = state || "Texas";
  const matchedState = statesData.find((entry) => entry.name === selectedState);
  const defaultTaxRate = matchedState?.propertyTaxRate ?? 1.6;
  if (!tax && (state || Object.keys(initialValues).length > 0)) {
    initialValues.propertyTaxRate = defaultTaxRate;
  }

  // Auto-calculate on load if URL params present
  useEffect(() => {
    if (income) {
      setResults({
        annualIncome: Number(income) || 85000,
        monthlyDebt: Number(debt) || 500,
        downPaymentPercent: Number(dp) || 10,
        interestRate: Number(rate) || 6.5,
        loanTerm: Number(term) || 30,
        state: selectedState,
        propertyTaxRate: Number(tax) || defaultTaxRate,
        annualInsurance: Number(ins) || 1800,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Affordability Calculator",
    description: "Calculate how much house you can afford based on your income, debts, and down payment.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Home Affordability Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your financial details below to see how much house you can afford.
            Our calculator uses the industry-standard 28/36 DTI rule.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <h2 className="font-semibold text-gray-800 mb-4">Your Financial Details</h2>
              <CalculatorForm
                onCalculate={setResults}
                initialValues={Object.keys(initialValues).length > 0 ? initialValues : undefined}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5">
            <ResultsPanel data={results} />
          </div>

          {/* Right sidebar ads */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <AdBanner slot="sidebar" />
            <div className="bg-sky-50 rounded-xl border border-sky-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">How to use this calculator</h3>
              <p className="text-sm text-gray-600 mb-3 leading-6">
                Start with your household income, debt, down payment, and state tax rate.
                Then compare the result against your comfort level, not just the maximum estimate.
              </p>
              <div className="space-y-2 text-sm">
                <Link href="/methodology" className="block text-sky-600 hover:underline">
                  View methodology
                </Link>
                <Link href="/editorial-policy" className="block text-sky-600 hover:underline">
                  Read editorial policy
                </Link>
              </div>
            </div>
            <AdBanner slot="sidebar" />
          </div>
        </div>
      </div>
    </>
  );
}
