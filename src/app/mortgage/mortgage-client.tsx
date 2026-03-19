"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  calculateMonthlyPayment,
  calculateMonthlyPMI,
  generateAmortizationSchedule,
  formatCurrency,
} from "@/lib/utils";
import AdBanner from "@/components/AdBanner";

export default function MortgageClient() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(1.1);
  const [insurance, setInsurance] = useState(1800);
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  const safeHomePrice = Math.max(0, homePrice);
  const safeDownPayment = Math.min(Math.max(0, downPayment), safeHomePrice);
  const loanAmount = safeHomePrice - safeDownPayment;
  const downPaymentPercent = safeHomePrice > 0 ? (safeDownPayment / safeHomePrice) * 100 : 0;

  const results = useMemo(() => {
    const monthlyPI = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const monthlyTax = (safeHomePrice * propertyTax) / 100 / 12;
    const monthlyIns = insurance / 12;
    const monthlyPMI = calculateMonthlyPMI(loanAmount, downPaymentPercent);
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPMI;
    const amortization = generateAmortizationSchedule(loanAmount, interestRate, loanTerm);
    const totalInterest = monthlyPI * loanTerm * 12 - loanAmount;
    return { monthlyPI, monthlyTax, monthlyIns, monthlyPMI, totalMonthly, amortization, totalInterest };
  }, [loanAmount, interestRate, loanTerm, safeHomePrice, propertyTax, insurance, downPaymentPercent]);

  const pieData = [
    { name: "Principal & Interest", value: Math.round(results.monthlyPI), color: "#0ea5e9" },
    { name: "Property Tax", value: Math.round(results.monthlyTax), color: "#f59e0b" },
    { name: "Insurance", value: Math.round(results.monthlyIns), color: "#8b5cf6" },
    ...(results.monthlyPMI > 0
      ? [{ name: "PMI", value: Math.round(results.monthlyPMI), color: "#ec4899" }]
      : []),
  ];

  // Rent vs Buy comparison (3% annual rent increase)
  const rentVsBuyData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const cumulativeRent = monthlyRent * 12 * (Math.pow(1.03, year) - 1) / 0.03;
    const cumulativeBuy = results.totalMonthly * 12 * year;
    const equity = safeHomePrice * Math.pow(1.03, year) - safeHomePrice +
      (results.amortization[Math.min(year * 12 - 1, results.amortization.length - 1)]
        ? loanAmount - results.amortization[Math.min(year * 12 - 1, results.amortization.length - 1)].balance
        : 0);
    return { year, Rent: Math.round(cumulativeRent), Buy: Math.round(cumulativeBuy), "Equity Built": Math.round(equity) };
  });

  const yearlyAmort = results.amortization
    .filter((_, i) => (i + 1) % 12 === 0)
    .map((row) => ({
      year: row.month / 12,
      Balance: row.balance,
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        Mortgage Calculator
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Calculate your monthly mortgage payment, view the amortization schedule, and compare renting vs buying.
      </p>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl border p-6 sticky top-20 space-y-5">
            <h2 className="font-semibold text-gray-800">Loan Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label>
              <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none" />
              <p className="text-xs text-gray-400 mt-1">{downPaymentPercent.toFixed(1)}% of home price</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate: {interestRate}%</label>
              <input type="range" min={2} max={10} step={0.125} value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 30].map((t) => (
                  <button key={t} type="button" onClick={() => setLoanTerm(t)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                      loanTerm === t ? "bg-sky-500 text-white border-sky-500" : "border-gray-300 text-gray-600"
                    }`}>
                    {t} yr
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate %</label>
                <input type="number" step="0.01" value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance $/yr</label>
                <input type="number" value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none" />
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (for comparison)</label>
              <input type="number" value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 space-y-6">
          {/* Payment summary */}
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100 p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-sky-600">{formatCurrency(Math.round(results.totalMonthly))}</p>
            <p className="text-sm text-gray-500 mt-2">
              Loan: {formatCurrency(loanAmount)} • Total Interest: {formatCurrency(Math.round(results.totalInterest))}
            </p>
            {results.monthlyPMI > 0 ? (
              <p className="text-xs text-gray-500 mt-1">Includes estimated PMI until 20% equity is reached.</p>
            ) : null}
          </div>

          {/* Pie chart */}
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Breakdown</h3>
            <div className="h-48">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                      {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-lg bg-gray-50 animate-pulse" />
              )}
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name}: {formatCurrency(d.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <AdBanner slot="in-article" />

          {/* Rent vs Buy */}
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Rent vs Buy Comparison</h3>
            <div className="h-64">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rentVsBuyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                    <Line type="monotone" dataKey="Rent" stroke="#ef4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Buy" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Equity Built" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-lg bg-gray-50 animate-pulse" />
              )}
            </div>
          </div>

          {/* Amortization */}
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Loan Balance Over Time</h3>
            <div className="h-48">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyAmort}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                    <Line type="monotone" dataKey="Balance" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-lg bg-gray-50 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Ad sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <AdBanner slot="sidebar" />
          <AdBanner slot="sidebar" />
        </div>
      </div>
    </div>
  );
}
