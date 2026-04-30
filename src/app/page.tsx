import { MainLayout } from "@/shared/components/Main";
import { HeroSection } from "@/app/_features/home/HeroSection";
import { AboutSection } from "@/app/_features/home/AboutSection";
import { ProjectsSection } from "@/app/_features/home/ProjectsSection";
import { ContactSection } from "@/app/_features/home/ContactSection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </MainLayout>
  );
}
