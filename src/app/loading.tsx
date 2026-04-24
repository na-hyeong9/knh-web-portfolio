export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 -z-10">
        <div className="animate-orb-a absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/12 blur-[90px]" />
        <div className="animate-orb-b absolute bottom-[-10%] right-[-10%] h-[36%] w-[36%] rounded-full bg-sky-400/12 blur-[90px]" />
      </div>

      <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-[2rem] text-center">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary/80 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary/60" />
        </div>

        <div className="space-y-2">
          <p className="font-display text-2xl font-black tracking-tight text-foreground">
            Loading
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            페이지를 준비하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
