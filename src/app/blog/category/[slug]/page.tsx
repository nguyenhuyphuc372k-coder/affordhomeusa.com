import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import {
  getBlogCategories,
  getCategoryBySlug,
  getPostsByCategorySlug,
} from "@/lib/blog-data";

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const canonicalPath = `/blog/category/${category.slug}`;

  return {
    title: `${category.name} Guides | AffordHomeUSA Blog`,
    description: category.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${category.name} Guides | AffordHomeUSA Blog`,
      description: category.description,
      url: canonicalPath,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Guides | AffordHomeUSA Blog`,
      description: category.description,
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategorySlug(slug);
  const categoryListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Guides`,
    description: category.description,
    url: `https://affordhomeusa.com/blog/category/${category.slug}`,
    mainEntity: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      url: `https://affordhomeusa.com/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updatedAt ?? post.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryListJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-sky-500 hover:underline mb-6"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Blog
        </Link>

        <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-6 md:p-8 mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-3">
            Topic Hub
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {category.name}
          </h1>
          <p className="text-gray-600 max-w-3xl">{category.description}</p>
          <p className="mt-4 text-sm text-gray-500">
            {category.postCount} article{category.postCount === 1 ? "" : "s"} in this topic.
          </p>
        </div>

        <div className="grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border bg-white p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
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
              <span className="text-sky-500 text-sm font-medium inline-flex items-center gap-1">
                Read article <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}