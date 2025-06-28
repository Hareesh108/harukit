import Link from "next/link";
import { Button } from "@harukit/ui";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Harukit</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/docs" className="transition-colors hover:text-foreground/80">
              Documentation
            </Link>
            <Link href="/components" className="transition-colors hover:text-foreground/80">
              Components
            </Link>
            <Link href="https://github.com/your-username/harukit" className="transition-colors hover:text-foreground/80">
              GitHub
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
              Modern React UI Components
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/components">View Components</Link>
            </Button>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to build modern React applications
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">TypeScript</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with TypeScript for better developer experience and type safety.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Accessible</h3>
                  <p className="text-sm text-muted-foreground">
                    All components are built with accessibility in mind, following WCAG guidelines.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy to customize with CSS custom properties and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Your Name
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/your-username/harukit"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 