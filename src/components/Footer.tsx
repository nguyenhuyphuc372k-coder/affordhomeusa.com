import Link from "next/link";
import { Home } from "lucide-react";

const footerLinks = {
  Calculators: [
    { href: "/calculator", label: "Home Affordability" },
    { href: "/mortgage", label: "Mortgage Calculator" },
  ],
  "Popular States": [
    { href: "/states/california", label: "California" },
    { href: "/states/texas", label: "Texas" },
    { href: "/states/florida", label: "Florida" },
    { href: "/states/new-york", label: "New York" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/blog/first-time-home-buyer-guide-2026", label: "First-Time Buyer Guide" },
    { href: "/blog/mortgage-rates-forecast-2026", label: "Rate Forecast" },
  ],
  Trust: [
    { href: "/about", label: "About" },
    { href: "/editorial-policy", label: "Editorial Policy" },
    { href: "/methodology", label: "Methodology" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Home className="w-5 h-5 text-sky-400" />
            AffordHome<span className="text-sky-400">USA</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Free home affordability and mortgage calculators with state-by-state housing context and transparent planning assumptions.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Disclaimer + copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            <strong>Disclaimer:</strong> AffordHomeUSA.com provides estimates for informational purposes only. 
            These calculations are not financial advice and should not be used as the sole basis for making 
            financial decisions. Actual mortgage rates, home prices, and costs may vary. Consult with a 
            qualified financial advisor or mortgage professional before making any home buying decisions.
          </p>
          <p className="text-xs text-gray-500">
            © 2026 AffordHomeUSA.com – All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
