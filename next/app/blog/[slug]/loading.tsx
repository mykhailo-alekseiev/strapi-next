import { Container } from "@/components/container";
import { IconArrowLeft, IconLoader } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="flex justify-between items-center px-2 py-8">
        <Link href="/blog" className="flex space-x-2 items-center">
          <IconArrowLeft className="w-4 h-4 text-muted" />
          <span className="text-sm text-muted">Back</span>
        </Link>
      </div>
      <div className="w-full mx-auto">
        <div className="h-40 md:h-96 w-full aspect-square rounded-3xl bg-neutral-300 animate-pulse" />
      </div>
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article className="pb-8 pt-8">
            <div className="flex gap-4 flex-wrap">
            {Array.from({length:3}).map((_, idx) => (
                <div
                  key={`skeleton-category-${idx}`}
                  className="w-24 h-6 rounded-full bg-neutral-300 animate-pulse"
                />
              ))}
            </div>
          </article>
        </div>
      </div>
    </Container>
  );
}
