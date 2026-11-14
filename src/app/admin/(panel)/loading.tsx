export default function Loading() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-48 animate-pulse rounded-xl bg-surface-2" />
      <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
      <div className="h-64 animate-pulse rounded-2xl bg-surface-2" />
    </div>
  );
}
