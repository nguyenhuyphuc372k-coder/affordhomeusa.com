import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AffordHomeUSA",
  description:
    "Learn how AffordHomeUSA helps Americans estimate home affordability, compare mortgage scenarios, and research state-by-state housing costs.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-600 mb-2">About AffordHomeUSA</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          A practical home affordability resource for U.S. buyers
        </h1>
        <p className="text-gray-600 leading-7 max-w-3xl">
          AffordHomeUSA exists to help Americans make better housing decisions with clearer numbers.
          We publish affordability guides, mortgage education, rent-vs-buy analysis, and state-level housing
          comparisons designed to make complex decisions easier to evaluate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What we do</h2>
          <p className="text-gray-600 leading-7">
            We build free tools and content that explain how income, debt, rates, taxes, insurance,
            and cost of living affect what buyers can reasonably afford. Our goal is to give users a more
            realistic starting point before they speak with lenders or agents.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Who it is for</h2>
          <p className="text-gray-600 leading-7">
            AffordHomeUSA is built for first-time buyers, move-up buyers, relocation shoppers, and anyone
            comparing the true cost of homeownership across U.S. states and cities.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How our content is created</h2>
        <div className="space-y-4 text-gray-600 leading-7">
          <p>
            Our editorial content is written to explain key housing concepts in plain English, with a focus on
            practical budgeting rather than hype. We combine mortgage math, publicly available housing context,
            and site-specific calculator logic to produce content that helps users understand tradeoffs.
          </p>
          <p>
            We do not provide personalized legal, tax, or financial advice. Our articles and calculators are
            educational tools intended to help users model scenarios before consulting licensed professionals.
          </p>
          <p>
            For more on how articles are written and reviewed, see our <Link href="/editorial-policy" className="text-sky-600 hover:underline">Editorial Policy</Link>.
            For more on how affordability assumptions are constructed, see our <Link href="/methodology" className="text-sky-600 hover:underline">Methodology</Link>.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Start with the calculator</h2>
        <p className="text-gray-700 mb-4 leading-7">
          If you want a fast estimate of how much home you can afford, begin with the calculator and then use the
          blog and state guides to compare scenarios in more detail.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculator" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Home Affordability Calculator
          </Link>
          <Link href="/blog" className="border border-sky-200 text-sky-700 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors">
            Explore the Blog
          </Link>
        </div>
      </section>
    </div>
  );
}