import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Understand the affordability assumptions, debt-to-income approach, tax treatment, and scenario modeling used by AffordHomeUSA calculators and guides.",
  alternates: {
    canonical: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-600 mb-2">Methodology</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How AffordHomeUSA estimates affordability
        </h1>
        <p className="text-gray-600 leading-7 max-w-3xl">
          Affordability estimates on this site are designed to help users think in ranges and tradeoffs, not to
          replace formal underwriting. This page explains the logic behind the calculator and the assumptions used
          in educational articles.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-7">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Debt-to-income framework</h2>
          <p>
            A common starting point for affordability is the 28/36 rule. Under that framework, housing costs are
            generally targeted at roughly 28% of gross monthly income, while total monthly debt obligations are
            generally targeted at roughly 36% of gross monthly income. This is a planning heuristic, not a guarantee
            of loan approval.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Monthly housing cost assumptions</h2>
          <p>Affordability estimates should be based on full monthly ownership cost, not principal and interest alone. Where relevant, that includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Principal and interest</li>
            <li>Property taxes</li>
            <li>Homeowners insurance</li>
            <li>PMI or FHA mortgage insurance</li>
            <li>HOA dues when applicable</li>
          </ul>
          <p>
            Users should also budget separately for maintenance, repairs, and cash reserves, even when those costs
            are not embedded directly in a loan payment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">State and city context</h2>
          <p>
            State pages and location-based articles use housing and cost-of-living context maintained in the site’s
            structured state dataset. Those values are intended to provide comparison context, not a precise citywide
            appraisal standard or a substitute for current listing-level pricing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Scenario modeling</h2>
          <p>
            Salary ranges and affordability scenarios in blog articles are directional educational estimates built
            from home prices, taxes, and typical debt-to-income logic. Actual loan approval depends on borrower
            credit, lender overlays, employment history, reserves, property type, and current market pricing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to use the site correctly</h2>
          <p>
            Start with the <Link href="/calculator" className="text-sky-600 hover:underline">Home Affordability Calculator</Link> to estimate a range,
            compare loan structures in the <Link href="/mortgage" className="text-sky-600 hover:underline">Mortgage Calculator</Link>, and then review relevant blog and
            state pages to understand taxes, cost of living, and local tradeoffs.
          </p>
          <p>
            For questions about how content is written and maintained, read the <Link href="/editorial-policy" className="text-sky-600 hover:underline">Editorial Policy</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}