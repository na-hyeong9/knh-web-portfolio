export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="font-display text-2xl font-black tracking-tight text-foreground">
        Loading
        <span className="loading-dots" />
      </p>

      <style>{`
        .loading-dots::after {
          content: '.';
          animation: dots 1.2s steps(3, end) infinite;
        }
        @keyframes dots {
          0%   { content: '.'; }
          33%  { content: '..'; }
          66%  { content: '...'; }
        }
      `}</style>
    </div>
  );
}
