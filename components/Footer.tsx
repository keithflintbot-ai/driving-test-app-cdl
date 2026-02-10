import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-600">
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
