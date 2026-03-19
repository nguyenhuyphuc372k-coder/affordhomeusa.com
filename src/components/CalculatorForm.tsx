"use client";

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { statesData } from "@/lib/states-data";

const schema = z.object({
  annualIncome: z.number().min(10000).max(1000000),
  monthlyDebt: z.number().min(0).max(50000),
  downPaymentPercent: z.number().min(0).max(50),
  interestRate: z.number().min(1).max(12),
  loanTerm: z.number(),
  state: z.string(),
  propertyTaxRate: z.number().min(0).max(5),
  annualInsurance: z.number().min(0).max(20000),
});

export type CalculatorInputs = z.infer<typeof schema>;

const defaultValues: CalculatorInputs = {
  annualIncome: 85000,
  monthlyDebt: 500,
  downPaymentPercent: 10,
  interestRate: 6.5,
  loanTerm: 30,
  state: "Texas",
  propertyTaxRate: 1.6,
  annualInsurance: 1800,
};

export default function CalculatorForm({
  onCalculate,
  initialValues,
}: {
  onCalculate: (data: CalculatorInputs) => void;
  initialValues?: Partial<CalculatorInputs>;
}) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CalculatorInputs>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...initialValues },
  });

  const annualIncome = watch("annualIncome");
  const downPaymentPercent = watch("downPaymentPercent");
  const interestRate = watch("interestRate");
  const selectedState = watch("state");
  const stateField = register("state");

  const onSubmit = useCallback((data: CalculatorInputs) => onCalculate(data), [onCalculate]);

  // Auto-calculate on any field change
  useEffect(() => {
    const sub = watch(() => {
      handleSubmit(onSubmit)();
    });
    return () => sub.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Annual Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Annual Household Income
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={20000}
            max={500000}
            step={5000}
            value={annualIncome}
            onChange={(e) => setValue("annualIncome", Number(e.target.value))}
            className="flex-1 accent-sky-500"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              {...register("annualIncome", { valueAsNumber: true })}
              className="w-28 pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
        {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome.message}</p>}
      </div>

      {/* Monthly Debt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Debt Payments
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            {...register("monthlyDebt", { valueAsNumber: true })}
            className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            placeholder="Car loans, student loans, credit cards..."
          />
        </div>
      </div>

      {/* Down Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Down Payment: {downPaymentPercent}%
        </label>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={downPaymentPercent}
          onChange={(e) => setValue("downPaymentPercent", Number(e.target.value))}
          className="w-full accent-sky-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>20%</span>
          <span>50%</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interest Rate: {interestRate}%
        </label>
        <input
          type="range"
          min={2}
          max={10}
          step={0.125}
          value={interestRate}
          onChange={(e) => setValue("interestRate", Number(e.target.value))}
          className="w-full accent-sky-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>2%</span>
          <span>6%</span>
          <span>10%</span>
        </div>
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
        <div className="grid grid-cols-3 gap-2">
          {[15, 20, 30].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setValue("loanTerm", term)}
              className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                watch("loanTerm") === term
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-gray-300 text-gray-600 hover:border-sky-300"
              }`}
            >
              {term} Years
            </button>
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <select
          {...stateField}
          value={selectedState}
          onChange={(e) => {
            stateField.onChange(e);
            const matchedState = statesData.find((state) => state.name === e.target.value);
            if (!matchedState) return;
            setValue("propertyTaxRate", matchedState.propertyTaxRate, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
        >
          {statesData.map((state) => (
            <option key={state.slug} value={state.name}>{state.name}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">State-specific tax defaults are currently available for {statesData.length} live state guides.</p>
      </div>

      {/* Property Tax & Insurance */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Tax %</label>
          <input
            type="number"
            step="0.01"
            {...register("propertyTaxRate", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance $/yr</label>
          <input
            type="number"
            {...register("annualInsurance", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold text-base transition-colors"
      >
        Calculate Affordability
      </button>
    </form>
  );
}
