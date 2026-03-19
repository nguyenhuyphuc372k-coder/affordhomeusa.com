import type { Metadata } from "next";
import Link from "next/link";
import { statesData, getStateBySlug } from "@/lib/states-data";
import { formatCurrency } from "@/lib/utils";
import AdBanner from "@/components/AdBanner";
import StateCalculator from "./state-calculator";

export function generateStaticParams() {
  return statesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "State Not Found" };
  const canonicalPath = `/states/${state.slug}`;
  return {
    title: `${state.name} Home Affordability & Housing Costs 2026`,
    description: `Explore ${state.name} housing market in 2026. Average home price ${formatCurrency(state.avgHomePrice)}, property tax ${state.propertyTaxRate}%, and cost of living data for top cities.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${state.name} Housing Costs 2026 | AffordHomeUSA`,
      description: `Average home price in ${state.name}: ${formatCurrency(state.avgHomePrice)}. Calculate your affordability now.`,
      url: canonicalPath,
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">State Not Found</h1>
        <p className="text-gray-600 mb-6">We don&apos;t have data for this state yet.</p>
        <Link href="/" className="text-sky-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const lowestPricedCity = state.cities.reduce(
    (lowest, city) => (city.avgHomePrice < lowest.avgHomePrice ? city : lowest),
    state.cities[0]
  );
  const highestPricedCity = state.cities.reduce(
    (highest, city) => (city.avgHomePrice > highest.avgHomePrice ? city : highest),
    state.cities[0]
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${state.name} Home Affordability & Housing Costs 2026`,
    description: `Comprehensive guide to ${state.name} housing market including average home prices, property taxes, and affordability calculator.`,
    datePublished: "2026-01-15",
    dateModified: "2026-03-15",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {state.name} Housing Market 2026
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Average Home Price: <span className="text-sky-600 font-bold text-2xl">{formatCurrency(state.avgHomePrice)}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="bg-white rounded-lg border px-4 py-2">
              <span className="text-gray-500">Median Income:</span>{" "}
              <span className="font-semibold">{formatCurrency(state.medianIncome)}</span>
            </div>
            <div className="bg-white rounded-lg border px-4 py-2">
              <span className="text-gray-500">Property Tax:</span>{" "}
              <span className="font-semibold">{state.propertyTaxRate}%</span>
            </div>
            <div className="bg-white rounded-lg border px-4 py-2">
              <span className="text-gray-500">Cost of Living:</span>{" "}
              <span className="font-semibold">{state.costOfLivingIndex}/100</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        {/* Main content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Calculator embed */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Calculate Your {state.name} Home Budget
            </h2>
            <StateCalculator
              defaultState={state.name}
              defaultTaxRate={state.propertyTaxRate}
            />
          </div>

          <AdBanner slot="in-article" />

          {/* Top cities table */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Top 5 Cities in {state.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Avg. Home Price</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Cost of Living Index</th>
                  </tr>
                </thead>
                <tbody>
                  {state.cities.map((city) => (
                    <tr key={city.name} className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-800">{city.name}</td>
                      <td className="py-3 px-4 text-right text-sky-600 font-semibold">
                        {formatCurrency(city.avgHomePrice)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          city.costOfLivingIndex > 110
                            ? "bg-red-50 text-red-700"
                            : city.costOfLivingIndex > 95
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                        }`}>
                          {city.costOfLivingIndex}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Content */}
          <article className="prose prose-gray max-w-none">
            <h2>Buying a Home in {state.name} in 2026</h2>
            <p>
              {state.name} remains one of the most popular states for home buyers in 2026. With an
              average home price of {formatCurrency(state.avgHomePrice)} and a median household income
              of {formatCurrency(state.medianIncome)}, the state offers {state.costOfLivingIndex < 100
                ? "affordable living compared to the national average"
                : "a higher cost of living than the national average, though many areas remain accessible"}.
            </p>

            <h3>Property Taxes in {state.name}</h3>
            <p>
              {state.name} homeowners pay an average property tax rate of {state.propertyTaxRate}%.
              On a {formatCurrency(state.avgHomePrice)} home, that translates to approximately{" "}
              {formatCurrency(Math.round(state.avgHomePrice * state.propertyTaxRate / 100))} per year
              or {formatCurrency(Math.round(state.avgHomePrice * state.propertyTaxRate / 100 / 12))} per
              month. This is{" "}
              {state.propertyTaxRate < 1.0
                ? "below the national average of 1.1%"
                : state.propertyTaxRate < 1.3
                ? "near the national average of 1.1%"
                : "above the national average of 1.1%"}.
            </p>

            <h3>Cost of Living</h3>
            <p>
              With a cost of living index of {state.costOfLivingIndex} (where 100 is the national
              average), {state.name} is{" "}
              {state.costOfLivingIndex < 95
                ? "significantly more affordable than average"
                : state.costOfLivingIndex < 105
                ? "close to the national average"
                : "more expensive than the national average"}.
              This index factors in housing, transportation, groceries, utilities, and healthcare costs.
            </p>

            <h3>Best Cities for Home Buyers</h3>
            <p>
              Among {state.name}&apos;s top cities, {lowestPricedCity.name} offers
              the most affordable entry point at {formatCurrency(lowestPricedCity.avgHomePrice)},
              while {highestPricedCity.name} is the highest-priced major market in our current dataset at{" "}
              {formatCurrency(highestPricedCity.avgHomePrice)}. Each city offers unique advantages depending
              on your priorities—whether that is job opportunities, school districts, or outdoor recreation.
            </p>

            <h3>How to Afford a Home in {state.name}</h3>
            <p>
              To comfortably afford the average {state.name} home at {formatCurrency(state.avgHomePrice)},
              you would need a household income of approximately{" "}
              {formatCurrency(Math.round(state.avgHomePrice / 4))} per year (assuming a 4x income-to-price
              ratio). Use our calculator above to see your personalized budget based on your exact financial
              situation, including your income, existing debts, down payment savings, and current interest rates.
            </p>

            <h3>Market Outlook 2026</h3>
            <p>
              Experts predict {state.costOfLivingIndex > 110
                ? "moderate price growth in " + state.name + " as inventory slowly increases"
                : "continued affordability in " + state.name + " with steady demand from both local and relocating buyers"}.
              Remote work trends continue to influence migration patterns, with many buyers looking for
              value in {state.costOfLivingIndex < 100 ? state.name + "'s affordable markets" : "more affordable areas within " + state.name}.
            </p>
          </article>

          {/* Other states */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Explore Other States</h3>
            <div className="flex flex-wrap gap-2">
              {statesData
                .filter((s) => s.slug !== state.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/states/${s.slug}`}
                    className="px-3 py-1.5 bg-white border rounded-lg text-sm text-gray-600 hover:border-sky-300 hover:text-sky-600 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <AdBanner slot="sidebar" />

          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">State</span>
                <span className="font-medium">{state.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Avg. Price</span>
                <span className="font-medium">{formatCurrency(state.avgHomePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Median Income</span>
                <span className="font-medium">{formatCurrency(state.medianIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price/Income Ratio</span>
                <span className="font-medium">{(state.avgHomePrice / state.medianIncome).toFixed(1)}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Property Tax</span>
                <span className="font-medium">{state.propertyTaxRate}%</span>
              </div>
            </div>
          </div>

          <AdBanner slot="sidebar" />
        </div>
      </div>
    </>
  );
}
