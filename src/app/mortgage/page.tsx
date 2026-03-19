import type { Metadata } from "next";
import MortgageClient from "./mortgage-client";

export const metadata: Metadata = {
  title: "Mortgage Calculator 2026 – Calculate Your Monthly Payment",
  description:
    "Free mortgage payment calculator. Compare 15, 20, and 30-year loans, see amortization schedules, and use our Rent vs Buy comparison tool.",
  openGraph: {
    title: "Mortgage Calculator 2026",
    description: "Calculate your monthly mortgage payment and compare rent vs buy.",
  },
};

export default function MortgagePage() {
  return <MortgageClient />;
}
