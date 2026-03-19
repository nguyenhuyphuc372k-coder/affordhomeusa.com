import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, DollarSign, MapPin, TrendingUp, ChevronRight, ShieldCheck, LineChart, Map } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import { featuredStates, statesData } from "@/lib/states-data";
import { getBlogCategories, getSortedBlogPosts } from "@/lib/blog-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AffordHomeUSA – Home Affordability Calculator 2026",
  description:
    "Estimate home affordability, compare mortgage payments, and explore housing costs by state across the U.S. in 2026.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AffordHomeUSA – Home Affordability Calculator 2026",
    description:
      "Estimate home affordability, compare mortgage payments, and explore housing costs by state across the U.S. in 2026.",
    url: "/",
  },
};

const tools = [
  {
    title: "Home Affordability",
    desc: "How much house can you afford?",
    icon: Calculator,
    href: "/calculator",
  },
  {
    title: "Mortgage Calculator",
    desc: "Calculate monthly payments",
    icon: DollarSign,
    href: "/mortgage",
  },
  {
    title: "By State",
    desc: "Cost of living by state",
    icon: MapPin,
    href: "/states",
  },
  {
    title: "Rent vs Buy",
    desc: "Compare renting vs buying",
    icon: TrendingUp,
    href: "/mortgage",
  },
];

const highlights = [
  {
    title: "Transparent affordability logic",
    text: "Calculations are built around the 28/36 debt-to-income framework with taxes, insurance, and PMI considered where relevant.",
    icon: ShieldCheck,
  },
  {
    title: "State-by-state context",
    text: "Compare affordability using home prices, property taxes, and cost-of-living data across major U.S. housing markets.",
    icon: Map,
  },
  {
    title: "Scenario planning tools",
    text: "Use affordability, mortgage, and rent-vs-buy tools together to pressure-test your budget before talking to lenders.",
    icon: LineChart,
  },
];

const faqs = [
  {
    q: "How much house can I afford on a $75,000 salary?",
    a: "With a $75,000 salary, 10% down payment, and 6.5% interest rate, you can typically afford a home priced between $250,000–$320,000, depending on your debts and location. Use our calculator for a personalized estimate.",
  },
  {
    q: "What is the 28/36 rule?",
    a: "The 28/36 rule means your monthly housing costs should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. Most lenders use this guideline to determine loan eligibility.",
  },
  {
    q: "How much should I save for a down payment?",
    a: "While 20% is ideal (to avoid PMI), many programs allow 3–3.5% down. FHA loans require 3.5%, and VA/USDA loans offer 0% down for eligible buyers.",
  },
  {
    q: "Are the calculations on this site accurate?",
    a: "Our calculators use industry-standard formulas based on the 28/36 DTI rule. However, actual loan terms depend on your credit score, lender, and other factors. Always consult a mortgage professional for exact numbers.",
  },
];

export default function HomePage() {
  const blogCategories = getBlogCategories().slice(0, 6);
  const latestGuides = getSortedBlogPosts().slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-sky-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            How Much House Can You
            <span className="text-sky-500"> Really Afford </span>
            in 2026?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Estimate your home budget with practical mortgage math, state-by-state housing context,
            and calculators designed to help you plan before you start house hunting.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-sky-500/25"
          >
            <Calculator className="w-5 h-5" />
            Calculate Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <t.icon className="w-8 h-8 text-sky-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.title}</h3>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-sky-600">{statesData.length}</p>
            <p className="text-sm text-gray-500">Live State Guides</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-sky-600">28/36</p>
            <p className="text-sm text-gray-500">DTI Framework</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-sky-600">Free</p>
            <p className="text-sm text-gray-500">Planning Tools</p>
          </div>
        </div>
      </section>

      <AdBanner slot="in-article" className="my-4" />

      {/* Featured States */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          Explore Housing Costs by State
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredStates.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="bg-white rounded-xl border p-5 hover:shadow-lg hover:border-sky-200 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{state.name}</h3>
              <p className="text-sky-600 font-bold text-lg">{formatCurrency(state.avgHomePrice)}</p>
              <p className="text-xs text-gray-500 mt-1">Avg. Home Price 2026</p>
              <div className="flex items-center text-sky-500 text-xs font-medium mt-3">
                Explore <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Built for practical housing decisions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white rounded-xl border p-6">
                <item.icon className="w-8 h-8 text-sky-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic hubs */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-2">
              Topic Hubs
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Explore affordability by topic
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-sky-600 hover:underline">
            Visit the full blog →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {blogCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 hover:border-sky-200 hover:bg-sky-50 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-900 mb-2">{category.name}</p>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <p className="text-xs font-medium text-sky-600">{category.postCount} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest guides */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-2">
                Latest Guides
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                New articles for 2026 planning
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-sky-600 hover:underline">
              Browse all articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {latestGuides.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border bg-white p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                <p className="text-xs font-medium text-sky-600 mb-3">{post.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600">
                  Read guide <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white border rounded-xl group">
              <summary className="cursor-pointer px-6 py-4 font-medium text-gray-800 flex items-center justify-between">
                {f.q}
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-4xl mx-auto px-4 pb-12 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span>Transparent Methodology</span>
          <span>State-Level Housing Data</span>
          <span>Calculator-First Planning</span>
          <span>Free Educational Tools</span>
        </div>
      </section>
    </>
  );
}
