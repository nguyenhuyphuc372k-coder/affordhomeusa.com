import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { blogPosts, getBlogCategories, getSortedBlogPosts } from "@/lib/blog-data";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Home Buying Blog – Tips, Guides & Market Analysis",
  description:
    "Expert articles on home buying, mortgage rates, affordability tips, and market analysis for American home buyers in 2026.",
};

export default function BlogPage() {
  const sortedPosts = getSortedBlogPosts();
  const categories = getBlogCategories();
  const featuredPosts = sortedPosts.slice(0, 3);
  const latestPosts = sortedPosts.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Home Buying Blog
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Expert guides, market analysis, and practical tips to help you buy your dream home.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 hover:border-sky-200 hover:bg-sky-50 transition-colors"
          >
            <p className="text-sm font-semibold text-gray-900 mb-1">{category.name}</p>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <p className="text-xs text-sky-600 font-medium">{category.postCount} articles</p>
          </Link>
        ))}
      </div>

      <section className="mb-12">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Guides</h2>
            <p className="text-sm text-gray-600">Fresh long-form articles and planning guides from the AffordHomeUSA editorial library.</p>
          </div>
          <p className="hidden md:block text-sm text-gray-500">{blogPosts.length} total articles</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> {post.updatedAt ?? post.date}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <span className="text-sky-500 text-sm font-medium inline-flex items-center gap-1">
                Read More <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {latestPosts.map((post, i) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> {post.updatedAt ?? post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                <span className="text-sky-500 text-sm font-medium flex items-center gap-1">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              {(i === 1 || i === 7) && <AdBanner slot="in-article" className="my-6" />}
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <AdBanner slot="sidebar" />
          <div className="bg-sky-50 rounded-xl border border-sky-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Free Calculator</h3>
            <p className="text-sm text-gray-600 mb-3">
              Find out how much house you can really afford.
            </p>
            <Link
              href="/calculator"
              className="block text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Try Calculator →
            </Link>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Browse by Topic</h3>
            <div className="space-y-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between text-gray-600 hover:text-sky-600"
                >
                  <span>{category.name}</span>
                  <span>{category.postCount}</span>
                </Link>
              ))}
            </div>
          </div>
          <AdBanner slot="sidebar" />
        </div>
      </div>
    </div>
  );
}
