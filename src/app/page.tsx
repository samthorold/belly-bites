import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main>
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <h1>Belly Bites</h1>
      </SignedIn>
    </main>
  );
}
