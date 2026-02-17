"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Truck } from "lucide-react";

export function CDLHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const isGuest = useStore((state) => state.isGuest);
  const hydrated = useHydration();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const displayPhotoURL = photoURL || user?.photoURL;

  // Hide header on CDL test and training pages (full-screen experience)
  const hideHeader = pathname?.startsWith("/cdl/test") || pathname === "/cdl/training";

  if (hideHeader) {
    return null;
  }

  // Only render on CDL pages
  const isCDLPage = pathname?.startsWith("/cdl") || pathname === "/cdl-practice-test";
  if (!isCDLPage) {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/cdl-practice-test" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 group-hover:opacity-80 transition-opacity hidden sm:inline">
            CDL Practice Test
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link href="/settings">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                  <AvatarFallback className="text-lg">😊</AvatarFallback>
                </Avatar>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                Log Out
              </Button>
            </>
          ) : isGuest ? (
            <Link href="/signup">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold">
                Sign Up to Save
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
