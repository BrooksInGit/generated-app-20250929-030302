import { ClarityGridApp } from '@/components/ClarityGridApp';
import { Github } from 'lucide-react';
export function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-foreground dark:from-gray-900 dark:to-gray-800">
      <header className="absolute top-0 z-50 w-full p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 7L12 12L22 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-semibold">ClarityGrid</span>
          </div>
          <a
            href="https://github.com/cloudflare/workers-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center space-y-16 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Instant Spec Sheet Comparison
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Stop wasting time manually comparing products. Drag and drop up to three PDF spec sheets and get an instant, sortable comparison table.
            </p>
          </div>
          <ClarityGridApp />
        </div>
      </main>
      <footer className="w-full p-4">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          Built with ❤️ at Cloudflare
        </div>
      </footer>
    </div>
  );
}