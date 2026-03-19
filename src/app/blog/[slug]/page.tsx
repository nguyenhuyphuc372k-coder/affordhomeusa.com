import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { blogPosts, getBlogBySlug, getCategorySlug } from "@/lib/blog-data";
import AdBanner from "@/components/AdBanner";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  const canonicalPath = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author ?? "AffordHomeUSA Editorial Team" }],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-sky-500 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const articleUrl = `https://affordhomeusa.com/blog/${post.slug}`;
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((left, right) => {
      const leftScore = Number(left.category === post.category);
      const rightScore = Number(right.category === post.category);
      return rightScore - leftScore;
    })
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: post.author ?? "AffordHomeUSA Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "AffordHomeUSA",
      url: "https://affordhomeusa.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://affordhomeusa.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://affordhomeusa.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-sky-500 hover:underline mb-6"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Blog
            </Link>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
              <span className="bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-medium">
                <Link href={`/blog/category/${getCategorySlug(post.category)}`}>{post.category}</Link>
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" /> {post.updatedAt ?? post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              <span>By {post.author ?? "AffordHomeUSA Editorial Team"}</span>
              {post.updatedAt ? <span> • Updated {post.updatedAt}</span> : null}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {post.keyTakeaways?.length ? (
              <section className="mb-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Takeaways</h2>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                  {post.keyTakeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <AdBanner slot="in-article" className="mb-6" />

            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-sky-500 prose-a:no-underline prose-table:w-full prose-th:text-left hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.faq?.length ? (
              <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {post.faq.map((item) => (
                    <div key={item.question} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-6">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <AdBanner slot="in-article" className="mt-8" />

            <div className="mt-10 border-t pt-8">
              <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-2">
                  Continue This Topic
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Explore more articles in {post.category} to build more context around this guide.
                </p>
                <Link
                  href={`/blog/category/${getCategorySlug(post.category)}`}
                  className="text-sm font-medium text-sky-600 hover:underline"
                >
                  View all {post.category} articles →
                </Link>
              </div>
              <h3 className="font-semibold text-gray-800 mb-4">More Articles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block bg-gray-50 rounded-lg p-4 hover:bg-sky-50 transition-colors"
                    >
                      <p className="font-medium text-gray-800 text-sm mb-1">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.category} • {p.readTime}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </article>

          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <AdBanner slot="sidebar" />
            <div className="bg-sky-50 rounded-xl border border-sky-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">Calculate Now</h3>
              <p className="text-sm text-gray-600 mb-3">
                See how much house you can afford based on your income.
              </p>
              <Link
                href="/calculator"
                className="block text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Free Calculator →
              </Link>
            </div>
            <AdBanner slot="sidebar" />
          </div>
        </div>
      </div>
    </>
  );
}
