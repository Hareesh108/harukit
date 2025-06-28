import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="text-muted-foreground mb-4">
            Learn how to install and set up Harukit in your project.
          </p>
          <Link
            href="/docs/getting-started"
            className="text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Components</h2>
          <p className="text-muted-foreground mb-4">
            Explore all available components with examples and API
            documentation.
          </p>
          <Link
            href="/docs/components"
            className="text-primary hover:underline"
          >
            Browse components →
          </Link>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">CLI Tool</h2>
          <p className="text-muted-foreground mb-4">
            Learn how to use the Harukit CLI for component management.
          </p>
          <Link href="/docs/cli" className="text-primary hover:underline">
            CLI documentation →
          </Link>
        </div>
      </div>
    </div>
  );
}
