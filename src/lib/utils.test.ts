import { describe, expect, it } from "vitest";
import {
  calculateMaxHomePrice,
  calculateMonthlyPayment,
  calculateMonthlyPMI,
  estimateAnnualPMIRate,
  generateAmortizationSchedule,
} from "./utils";

describe("calculateMonthlyPayment", () => {
  it("calculates a standard fixed-rate monthly payment", () => {
    const payment = calculateMonthlyPayment(300000, 6.5, 30);
    expect(payment).toBeCloseTo(1896.2, 1);
  });

  it("handles a zero-interest loan", () => {
    const payment = calculateMonthlyPayment(120000, 0, 15);
    expect(payment).toBeCloseTo(666.67, 2);
  });
});

describe("PMI helpers", () => {
  it("returns zero PMI rate at or above 20 percent down", () => {
    expect(estimateAnnualPMIRate(20)).toBe(0);
    expect(calculateMonthlyPMI(300000, 20)).toBe(0);
  });

  it("uses higher PMI rates for lower down payments", () => {
    expect(estimateAnnualPMIRate(3)).toBe(1);
    expect(estimateAnnualPMIRate(10)).toBe(0.6);
    expect(calculateMonthlyPMI(300000, 10)).toBeCloseTo(150, 2);
  });
});

describe("calculateMaxHomePrice", () => {
  it("returns a reasonable home price for a typical borrower profile", () => {
    const homePrice = calculateMaxHomePrice(85000, 500, 10, 6.5, 30, 1.6, 1800);
    expect(homePrice).toBeGreaterThan(240000);
    expect(homePrice).toBeLessThan(250000);
  });

  it("accounts for taxes and PMI even when the interest rate is zero", () => {
    const zeroRatePrice = calculateMaxHomePrice(90000, 0, 5, 0, 30, 1.6, 1800);
    const noTaxPrice = calculateMaxHomePrice(90000, 0, 5, 0, 30, 0, 1800);

    expect(zeroRatePrice).toBeGreaterThan(0);
    expect(noTaxPrice).toBeGreaterThan(zeroRatePrice);
  });

  it("returns zero when debts and insurance consume the available budget", () => {
    const homePrice = calculateMaxHomePrice(30000, 2000, 5, 6.5, 30, 1.2, 4000);
    expect(homePrice).toBe(0);
  });
});

describe("generateAmortizationSchedule", () => {
  it("creates a full schedule and pays the balance down to zero", () => {
    const schedule = generateAmortizationSchedule(250000, 6, 30);
    expect(schedule).toHaveLength(360);
    expect(schedule[0].balance).toBeLessThan(250000);
    expect(schedule.at(-1)?.balance).toBe(0);
  });
});