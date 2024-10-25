import Link from "next/link";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Url <span className="text-[hsl(280,100%,70%)]">Shortener</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20 hover:shadow-lg"
              href="https://url-shortern.vercel.app/generate"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Url Shortener is a tool to shorten a long link and create a short URL easy to share on sites, chat and emails.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20 hover:shadow-lg"
              href="https://github.com/pwang1997/url-shortern"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Get to know about the source code of Url Shortener.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
