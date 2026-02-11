import Link from "next/link";
import { states } from "@/data/states";

// Popular states to feature in the footer
const popularStateSlugs = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
  "new-jersey",
  "virginia",
  "washington",
  "arizona",
  "massachusetts",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-500">
          {popularStates.map(
            (state) =>
              state && (
                <Link
                  key={state.slug}
                  href={`/${state.slug}-dmv-practice-test`}
                  className="hover:text-orange-600"
                >
                  {state.name}
                </Link>
              )
          )}
          <Link
            href="/practice-tests-by-state"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            All States &rarr;
          </Link>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          This site was made with AI and{" "}
          <span className="text-red-500" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://x.com/JohnBr0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
          >
            @JohnBr0
          </a>
          .{" "}
          <a
            href="https://www.johnbrophy.net/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
          >
            Send me
          </a>{" "}
          a quote for the homepage if you pass!
        </p>
      </div>
    </footer>
  );
}
