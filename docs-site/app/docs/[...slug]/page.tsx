import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  return (
    <article className="prose">
      <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Home
        </Link>
        <span>/</span>
        <span>{path}</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <div className="mb-4 inline-flex rounded-full bg-blue-500/10 p-4 text-blue-400">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">
          Documentation Coming Soon
        </h1>
        <p className="mb-6 text-zinc-400">
          The page <code className="rounded bg-zinc-800 px-2 py-1">/{path}</code> is 
          being written. Check back soon or explore existing documentation.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <h2>Available Documentation</h2>

      <ul>
        <li>
          <Link href="/docs/why">Why Conductor</Link> - Understanding durable execution
        </li>
        <li>
          <Link href="/docs/quickstart">Quick Start</Link> - Get running in 5 minutes
        </li>
        <li>
          <Link href="/docs/architecture">Architecture</Link> - System design and components
        </li>
        <li>
          <Link href="/docs/ai">AI & Agents</Link> - LLM integration and agent orchestration
        </li>
        <li>
          <Link href="/docs/best-practices">Best Practices</Link> - Production patterns
        </li>
      </ul>
    </article>
  );
}
