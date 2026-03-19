import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Read AffordHomeUSA's editorial policy for housing content, calculator assumptions, content updates, and reader trust standards.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-600 mb-2">Editorial Policy</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How AffordHomeUSA creates and maintains content
        </h1>
        <p className="text-gray-600 leading-7 max-w-3xl">
          Our editorial process is built around clarity, practical usefulness, and transparent assumptions.
          The goal is not to publish the most sensational housing content. The goal is to publish content that
          helps readers make better housing decisions.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-7">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Editorial principles</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Explain affordability, mortgage, and cost-of-living topics in plain English.</li>
            <li>Prefer realistic budgeting guidance over maximum-borrowing guidance.</li>
            <li>Use consistent assumptions where possible and disclose when results are estimates.</li>
            <li>Update time-sensitive content when market conditions or assumptions materially change.</li>
            <li>Avoid publishing content designed primarily to trigger clicks without helping the reader.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">How articles are developed</h2>
          <p>
            Articles are built from a combination of calculator logic, state-level housing data maintained in the
            site, public economic context, and standard mortgage concepts such as debt-to-income ratios, down
            payment thresholds, insurance, taxes, and PMI. Content is structured to match common reader intent,
            such as affordability by salary, comparing loan types, or deciding between renting and buying.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Updates and freshness</h2>
          <p>
            Time-sensitive articles may include updated dates when the content is revised to reflect newer mortgage
            assumptions, tax context, or broader 2026 market conditions. Not every article changes on the same
            schedule, but pages that depend on current affordability assumptions should be reviewed periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">What our content is not</h2>
          <p>
            AffordHomeUSA does not provide individual mortgage underwriting, tax advice, legal advice, or investment
            advice. Readers should use the site to understand scenarios and then confirm decisions with qualified
            professionals such as lenders, financial advisors, accountants, attorneys, or real estate agents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Corrections and transparency</h2>
          <p>
            If an article contains a factual or calculation-related issue, we aim to correct it promptly and align
            the content with the latest underlying calculator assumptions. Our methodology overview explains how
            affordability estimates are framed on the site.
          </p>
          <p>
            See the <Link href="/methodology" className="text-sky-600 hover:underline">Methodology page</Link> for more detail on how affordability ranges are interpreted.
          </p>
        </section>
      </div>
    </div>
  );
}