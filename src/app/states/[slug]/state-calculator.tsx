"use client";

import { useState } from "react";
import CalculatorForm, { type CalculatorInputs } from "@/components/CalculatorForm";
import ResultsPanel from "@/components/ResultsPanel";

export default function StateCalculator({
  defaultState,
  defaultTaxRate,
}: {
  defaultState: string;
  defaultTaxRate: number;
}) {
  const [results, setResults] = useState<CalculatorInputs | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CalculatorForm
        onCalculate={setResults}
        initialValues={{ state: defaultState, propertyTaxRate: defaultTaxRate }}
      />
      <ResultsPanel data={results} />
    </div>
  );
}
