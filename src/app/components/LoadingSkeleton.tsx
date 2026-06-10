export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-black/[0.08] bg-white p-8">
      <div className="h-6 w-3/4 rounded-lg bg-black/[0.04]" />
      <div className="mt-4 h-4 w-full rounded bg-black/[0.04]" />
      <div className="mt-2 h-4 w-2/3 rounded bg-black/[0.04]" />
      <div className="mt-6 flex gap-3">
        <div className="h-8 w-20 rounded-full bg-black/[0.04]" />
        <div className="h-8 w-20 rounded-full bg-black/[0.04]" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );
}

export function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-black/[0.08] bg-white p-6">
      <div className="h-4 w-16 rounded bg-black/[0.04]" />
      <div className="mt-4 h-10 w-24 rounded-lg bg-black/[0.04]" />
      <div className="mt-2 h-3 w-20 rounded bg-black/[0.04]" />
    </div>
  );
}
