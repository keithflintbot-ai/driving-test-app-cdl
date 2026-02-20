"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid unsubscribe link. Please use the link from your email.");
      return;
    }

    // Call API to unsubscribe
    async function unsubscribe() {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage("You've been unsubscribed from TigerTest emails.");
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to unsubscribe. Please try again.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    }

    unsubscribe();
  }, [token]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-gray-200 border-t-brand rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600">Unsubscribing...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-3">You're unsubscribed</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              You won't receive any more emails from us. You can still use TigerTest - just log in anytime.
            </p>
            <Link href="/dashboard">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Go to Dashboard
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link href="/">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Go Home
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
