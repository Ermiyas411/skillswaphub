import React from "react";
// import Search from "@/components/Search";
import SkillsPreview from "@/components/SkillsPreview";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CourseSection from "@/components/CourseSection";
const Page = () => {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <HeroSection />
      </section>

      {/* Course Section */}
      <CourseSection />

      {/* Search Section */}
      {/* <section className="container mx-auto px-4 py-8">
        <Search />
      </section> */}

      {/* Skills Preview Section */}
      <SkillsPreview />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Page;
