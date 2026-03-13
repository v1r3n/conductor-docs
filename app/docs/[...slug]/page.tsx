import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          <FileQuestion className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Page Coming Soon</h1>
          <p className="text-muted-foreground">
            <code className="text-sm">/docs/{path}</code>
          </p>
        </div>
      </div>

      <p className="mt-6 text-muted-foreground">
        This documentation page is under development. Check back soon or explore other sections.
      </p>

      <div className="mt-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold">Available Pages</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/docs/quickstart" className="text-primary hover:underline">
              Quickstart Guide
            </Link>
          </li>
          <li>
            <Link href="/docs/why" className="text-primary hover:underline">
              Why Conductor
            </Link>
          </li>
          <li>
            <Link href="/docs/architecture" className="text-primary hover:underline">
              Architecture
            </Link>
          </li>
          <li>
            <Link href="/docs/ai" className="text-primary hover:underline">
              AI & Agents
            </Link>
          </li>
          <li>
            <Link href="/docs/best-practices" className="text-primary hover:underline">
              Best Practices
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
