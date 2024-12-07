"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BentoGrid = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const benefits = [
    {
      title: "Learn & Teach",
      description:
        "Discover the joy of shared learning by exchanging skills and knowledge with others. Whether you’re a mentor eager to share your expertise or a learner looking to expand your horizons, SkillSwap Hub connects you with the right people to grow together. Everyone has something valuable to teach and something new to learn!",
      icon: "🔄",
      class:
        "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20",
      highlight: true,
    },
    {
      title: "Earn Rewards",
      description: "Gain points for teaching and redeem them to learn.",
      icon: "🏆",
      class:
        "md:col-span-1 md:row-span-1 bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20",
    },
    {
      title: "Flexible Scheduling",
      description: "Set your availability and learn at your pace.",
      icon: "⏰",
      class:
        "md:col-span-1 md:row-span-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20",
    },
    {
      title: "Diverse Skills",
      description:
        "Unlock endless opportunities by exploring a wide range of skills across various fields. From coding and design to cooking and photography, SkillSwap Hub connects you to experts and learners in every domain. Broaden your horizons and dive into skills you’ve always wanted to master!",
      icon: "🎯",
      class:
        "md:col-span-1 md:row-span-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20",
    },
    {
      title: "Global Networking",
      description: "Connect with mentors and learners worldwide.",
      icon: "🌍",
      class:
        "md:col-span-2 md:row-span-1 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20",
    },
    {
      title: "Gamified Growth",
      description: "Unlock achievements and climb the leaderboard.",
      icon: "🎮",
      class:
        "md:col-span-1 md:row-span-1 bg-gradient-to-br from-rose-500/10 to-red-500/10 hover:from-rose-500/20 hover:to-red-500/20",
    },
    {
      title: "Affordable Learning",
      description: "Access personalized mentorship without high costs.",
      icon: "💰",
      class:
        "md:col-span-1 md:row-span-1 bg-gradient-to-br from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50/50" ref={gridRef}>
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Benefits of SkillSwap Hub
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              ref={(el: HTMLDivElement | null) =>
                void (cardsRef.current[index] = el)
              }
              className={`
                ${benefit.class}
                group p-8 rounded-3xl backdrop-blur-sm
                border border-gray-200/50
                shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
                transition-all duration-300 cursor-pointer
                ${benefit.highlight ? "p-10" : "p-8"}
              `}
            >
              <div
                className={`space-y-4 ${
                  benefit.highlight ? "space-y-6" : "space-y-4"
                }`}
              >
                <span className="text-4xl block transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </span>
                <h3
                  className={`font-semibold text-gray-800 ${
                    benefit.highlight ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
