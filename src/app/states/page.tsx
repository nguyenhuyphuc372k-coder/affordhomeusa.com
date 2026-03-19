import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { statesData } from "@/lib/states-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Housing Costs by State in 2026",
  description:
    "Browse home affordability, housing costs, property taxes, and cost-of-living data by state in 2026.",
  alternates: {
    canonical: "/states",
  },
  openGraph: {
    title: "Housing Costs by State in 2026",
    description:
      "Compare home prices, property taxes, and cost of living across U.S. states.",
    url: "/states",
  },
};

export default function StatesIndexPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Housing Costs by State in 2026",
    url: "https://affordhomeusa.com/states",
    description:
      "Compare state-level affordability, home prices, taxes, and cost of living across major U.S. housing markets.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-sky-600 mb-2">State Hub</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Housing Costs by State
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-7">
            Compare average home prices, median incomes, property tax rates, and cost-of-living data
            across the U.S. states currently covered on AffordHomeUSA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {statesData.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="block rounded-2xl border bg-white p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                    {state.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{state.cities.length} tracked cities</p>
                </div>
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between gap-4">
                  <span>Average home price</span>
                  <span className="font-medium text-gray-900">{formatCurrency(state.avgHomePrice)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Median income</span>
                  <span className="font-medium text-gray-900">{formatCurrency(state.medianIncome)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Property tax rate</span>
                  <span className="font-medium text-gray-900">{state.propertyTaxRate}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Cost of living index</span>
                  <span className="font-medium text-gray-900">{state.costOfLivingIndex}</span>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600">
                View state guide <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}