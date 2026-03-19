import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Mortgage calculation formulas ──

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  return (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1);
}

export function estimateAnnualPMIRate(downPaymentPercent: number): number {
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15) return 0.4;
  if (downPaymentPercent >= 10) return 0.6;
  if (downPaymentPercent >= 5) return 0.8;
  return 1.0;
}

export function calculateMonthlyPMI(
  loanAmount: number,
  downPaymentPercent: number
): number {
  if (loanAmount <= 0) return 0;
  const annualPMIRate = estimateAnnualPMIRate(downPaymentPercent);
  return (loanAmount * annualPMIRate) / 100 / 12;
}

export function calculateMaxHomePrice(
  annualIncome: number,
  monthlyDebt: number,
  downPaymentPercent: number,
  interestRate: number,
  loanTermYears: number,
  propertyTaxRate: number,
  annualInsurance: number
): number {
  // Use 28% DTI ratio for housing expenses
  const maxMonthlyHousing = (annualIncome / 12) * 0.28;
  const availableForMortgage =
    maxMonthlyHousing - annualInsurance / 12;

  // Also check 36% total DTI
  const maxTotalDebt = (annualIncome / 12) * 0.36;
  const availableAfterDebt = maxTotalDebt - monthlyDebt - annualInsurance / 12;

  const effectiveMonthly = Math.min(availableForMortgage, availableAfterDebt);
  if (effectiveMonthly <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const n = loanTermYears * 12;
  const downPaymentFactor = 1 - downPaymentPercent / 100;
  const monthlyTaxFactor = (propertyTaxRate / 100 / 12) / downPaymentFactor;
  const monthlyPMIFactor = estimateAnnualPMIRate(downPaymentPercent) / 100 / 12;

  // Monthly payment includes P&I + property tax + estimated PMI when applicable.
  // Solve for loan amount using factors that are proportional to the loan amount.
  let loanAmount: number;
  if (monthlyRate === 0) {
    const zeroRateFactor = 1 / n + monthlyTaxFactor + monthlyPMIFactor;
    loanAmount = effectiveMonthly / zeroRateFactor;
  } else {
    const factor = (monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);
    const totalFactor = factor + monthlyTaxFactor + monthlyPMIFactor;
    loanAmount = effectiveMonthly / totalFactor;
  }

  const homePrice = loanAmount / downPaymentFactor;
  return Math.max(0, Math.round(homePrice));
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  years: number
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const monthlyRate = annualRate / 100 / 12;
  const n = years * 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= n; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }
  return schedule;
}

export function getAffordabilityScore(
  homePrice: number,
  annualIncome: number
): { score: number; label: string; color: string } {
  const ratio = homePrice / annualIncome;
  if (ratio <= 3) return { score: 95, label: "Excellent", color: "#22c55e" };
  if (ratio <= 4) return { score: 75, label: "Good", color: "#84cc16" };
  if (ratio <= 5) return { score: 55, label: "Moderate", color: "#eab308" };
  if (ratio <= 6) return { score: 35, label: "Stretched", color: "#f97316" };
  return { score: 15, label: "Unaffordable", color: "#ef4444" };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
