export function Footer() {
  return (
    <footer className="w-full border-t py-12 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KNH. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Github</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
