export function Footer() {
  return (
    <footer className="w-full border-t py-12 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KNH. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
