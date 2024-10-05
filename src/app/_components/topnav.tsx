import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between bg-gray-100 p-4">
      <Link href="/">
        <div className="text-xl font-semibold">Belly Bites</div>
      </Link>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Link href="/new-meal">New Meal</Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
