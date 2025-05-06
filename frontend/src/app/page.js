export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Sikka API Plus</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://sikka.ai/ai-agents/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" className="mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M4,4 L16,4 L16,16 L4,16 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M7,7 L13,7 M7,10 L13,10 M7,13 L13,13" stroke="currentColor" strokeWidth="2" />
            </svg>
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="hover:underline hover:underline-offset-4 flex items-center gap-2"
          href="https://sikka.ai/sikkaagent-documentation/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8,2 L14,8 L8,14 L2,8 Z" fill="#9C27B0" />
          </svg>
          Learn
        </a>
        <a
          className="hover:underline hover:underline-offset-4 flex items-center gap-2"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="8" cy="8" rx="7" ry="4" fill="#2196F3" />
          </svg>
          Examples
        </a>
        <a
          className="hover:underline hover:underline-offset-4 flex items-center gap-2"
          href="https://sikka.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M2,8 L14,8 M10,4 L14,8 L10,12" stroke="#E91E63" strokeWidth="2" fill="none" />
          </svg>
          Go to sikka.ai
        </a>
      </footer>
    </div>
  );
}
