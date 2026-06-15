import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy — StoryVerse",
  description: "How StoryVerse collects and uses your personal information.",
};

const CONTACT_EMAIL = "privacy@storyverse.app";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to StoryVerse
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: June 15, 2026
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>
            StoryVerse (&quot;we&quot;, &quot;us&quot;) respects your privacy. This
            policy explains what information we collect and how we use it when you
            use our AI interactive storytelling app.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Information we collect
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground">Email address</strong> — when
                you sign up with email/password or sign in with Google.
              </li>
              <li>
                <strong className="text-foreground">Name</strong> — when you
                provide it during registration or when Google shares it as part of
                Google Sign-In.
              </li>
              <li>
                <strong className="text-foreground">Account identifiers</strong>{" "}
                — such as a Google account ID, used only to link your sign-in
                method to your StoryVerse account.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              How we use your information
            </h2>
            <p>
              We use your email, name, and sign-in identifiers solely to create
              and manage your account, authenticate you, and provide access to
              StoryVerse features (including saved conversations and characters).
              We do not use your personal data for advertising.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Third parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We may use service providers (such as hosting and
              authentication) that process data on our behalf only to operate the
              app.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p>
              Questions about this policy or your data? Email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
