"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  calculateMaxHomePrice,
  calculateMonthlyPayment,
  calculateMonthlyPMI,
  generateAmortizationSchedule,
  getAffordabilityScore,
  formatCurrency,
} from "@/lib/utils";
import type { CalculatorInputs } from "./CalculatorForm";
import AdBanner from "./AdBanner";

type Tab = "breakdown" | "rentvsbuy" | "amortization";

export default function ResultsPanel({ data }: { data: CalculatorInputs | null }) {
  const [tab, setTab] = useState<Tab>("breakdown");
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  const results = useMemo(() => {
    if (!data) return null;

    const maxPrice = calculateMaxHomePrice(
      data.annualIncome,
      data.monthlyDebt,
      data.downPaymentPercent,
      data.interestRate,
      data.loanTerm,
      data.propertyTaxRate,
      data.annualInsurance
    );

    const loanAmount = maxPrice * (1 - data.downPaymentPercent / 100);
    const monthlyPI = calculateMonthlyPayment(loanAmount, data.interestRate, data.loanTerm);
    const monthlyTax = (maxPrice * data.propertyTaxRate) / 100 / 12;
    const monthlyInsurance = data.annualInsurance / 12;
    const monthlyPMI = calculateMonthlyPMI(loanAmount, data.downPaymentPercent);
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;

    const score = getAffordabilityScore(maxPrice, data.annualIncome);
    const amortization = generateAmortizationSchedule(loanAmount, data.interestRate, data.loanTerm);

    return {
      maxPrice,
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      score,
      amortization,
    };
  }, [data]);

  if (!results || !data) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-400 text-center">
          Adjust the inputs and click<br /><strong>Calculate Affordability</strong> to see results
        </p>
      </div>
    );
  }

  const pieData = [
    { name: "Principal & Interest", value: Math.round(results.monthlyPI), color: "#0ea5e9" },
    { name: "Property Tax", value: Math.round(results.monthlyTax), color: "#f59e0b" },
    { name: "Insurance", value: Math.round(results.monthlyInsurance), color: "#8b5cf6" },
    ...(results.monthlyPMI > 0
      ? [{ name: "PMI", value: Math.round(results.monthlyPMI), color: "#ec4899" }]
      : []),
  ];

  // Rent vs Buy simplified
  const monthlyRent = Math.round(results.totalMonthly * 0.85);
  const rentVsBuyData = Array.from({ length: 30 }, (_, i) => {
    const year = i + 1;
    const totalRent = monthlyRent * 12 * (Math.pow(1.03, year) - 1) / 0.03;
    const totalBuy =
      results.totalMonthly * 12 * year +
      (results.maxPrice * data.downPaymentPercent) / 100;
    const equity = results.maxPrice * Math.pow(1.03, year) -
      (results.amortization[Math.min(year * 12 - 1, results.amortization.length - 1)]?.balance ?? 0);
    return {
      year,
      "Total Rent Cost": Math.round(totalRent),
      "Total Buy Cost": Math.round(totalBuy),
      "Home Equity": Math.round(equity),
    };
  });

  // Yearly amortization summary
  const yearlyAmort = results.amortization
    .filter((_, i) => (i + 1) % 12 === 0)
    .map((row) => ({
      year: row.month / 12,
      Balance: row.balance,
      "Principal Paid": results.loanAmount - row.balance,
    }));

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("income", String(data.annualIncome));
    params.set("debt", String(data.monthlyDebt));
    params.set("dp", String(data.downPaymentPercent));
    params.set("rate", String(data.interestRate));
    params.set("term", String(data.loanTerm));
    params.set("state", data.state);
    params.set("tax", String(data.propertyTaxRate));
    params.set("ins", String(data.annualInsurance));
    const url = `${window.location.origin}/calculator?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("affordhome_calcs") || "[]");
      saved.unshift({
        date: new Date().toISOString(),
        maxPrice: results.maxPrice,
        monthly: Math.round(results.totalMonthly),
        inputs: data,
      });
      localStorage.setItem("affordhome_calcs", JSON.stringify(saved.slice(0, 5)));
      alert("Calculation saved!");
    } catch {
      alert("Could not save calculation.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Big number */}
      <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100 p-6 text-center">
        <p className="text-sm text-gray-500 mb-1">Maximum Home Price</p>
        <p className="text-4xl md:text-5xl font-bold text-sky-600 tabular-nums">
          {formatCurrency(results.maxPrice)}
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Monthly Payment: <span className="font-semibold">{formatCurrency(Math.round(results.totalMonthly))}</span>
        </p>
      </div>

      {/* Affordability Score */}
      <div className="flex items-center gap-4 bg-white rounded-xl border p-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: results.score.color }}
        >
          {results.score.score}
        </div>
        <div>
          <p className="font-semibold text-gray-800">Affordability: {results.score.label}</p>
          <p className="text-sm text-gray-500">
            Home price is {(results.maxPrice / data.annualIncome).toFixed(1)}x your annual income
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          💾 Save Calculation
        </button>
        <button
          onClick={handleShare}
          className="py-2 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          🔗 Share Link
        </button>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Monthly Payment Breakdown</h3>
        <div className="h-48">
          {chartsReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
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

      {/* Ad placement */}
      <AdBanner slot="in-article" />

      {/* Tabs */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="flex border-b">
          {([
            ["breakdown", "Payment Details"],
            ["rentvsbuy", "Rent vs Buy"],
            ["amortization", "Amortization"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === key
                  ? "text-sky-600 border-b-2 border-sky-500 bg-sky-50/50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tab === "breakdown" && (
            <div className="space-y-3">
              <Row label="Home Price" value={formatCurrency(results.maxPrice)} />
              <Row label="Down Payment" value={formatCurrency(results.maxPrice * data.downPaymentPercent / 100)} />
              <Row label="Loan Amount" value={formatCurrency(Math.round(results.loanAmount))} />
              <div className="border-t pt-3 mt-3" />
              <Row label="Principal & Interest" value={formatCurrency(Math.round(results.monthlyPI))} />
              <Row label="Property Tax" value={formatCurrency(Math.round(results.monthlyTax))} />
              <Row label="Home Insurance" value={formatCurrency(Math.round(results.monthlyInsurance))} />
              {results.monthlyPMI > 0 ? (
                <Row label="Estimated PMI" value={formatCurrency(Math.round(results.monthlyPMI))} />
              ) : null}
              <div className="border-t pt-3 mt-3" />
              <Row label="Total Monthly" value={formatCurrency(Math.round(results.totalMonthly))} bold />
              <Row label="Total Interest Paid" value={formatCurrency(Math.round(results.monthlyPI * data.loanTerm * 12 - results.loanAmount))} />
            </div>
          )}

          {tab === "rentvsbuy" && (
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Estimated rent: {formatCurrency(monthlyRent)}/mo vs buying at {formatCurrency(Math.round(results.totalMonthly))}/mo
              </p>
              <div className="h-64">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rentVsBuyData.filter((_, i) => i % 2 === 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: "Years", position: "bottom" }} />
                      <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                      <Line type="monotone" dataKey="Total Rent Cost" stroke="#ef4444" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Total Buy Cost" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Home Equity" stroke="#22c55e" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full rounded-lg bg-gray-50 animate-pulse" />
                )}
              </div>
            </div>
          )}

          {tab === "amortization" && (
            <div>
              <div className="h-64 mb-4">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yearlyAmort}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: "Year", position: "bottom" }} />
                      <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                      <Line type="monotone" dataKey="Balance" stroke="#ef4444" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Principal Paid" stroke="#22c55e" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full rounded-lg bg-gray-50 animate-pulse" />
                )}
              </div>
              <div className="max-h-60 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-left py-2 px-3 font-medium text-gray-600">Year</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">Balance</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">Principal</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyAmort.map((row) => (
                      <tr key={row.year} className="border-t">
                        <td className="py-2 px-3">{row.year}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(row.Balance)}</td>
                        <td className="py-2 px-3 text-right text-green-600">{formatCurrency(row["Principal Paid"])}</td>
                        <td className="py-2 px-3 text-right text-red-500">
                          {formatCurrency(Math.round(results.monthlyPI * row.year * 12 - row["Principal Paid"]))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? "font-semibold text-gray-800" : "text-gray-600"}`}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-sky-600" : "font-medium text-gray-800"}`}>{value}</span>
    </div>
  );
}
