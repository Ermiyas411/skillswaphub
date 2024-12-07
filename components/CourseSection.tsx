"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CourseCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(4);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const courses = [
    {
      id: 1,
      title: "Web Development Masterclass",
      image: "/web-dev.jpg",
      category: "Programming",
      rating: 4.8,
      students: 1234,
      instructor: "Sarah Johnson",
      instructorImage: "/profile1.jpg",
      price: "$89.99",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      image: "/marketing.jpg",
      category: "Marketing",
      rating: 4.9,
      students: 2156,
      instructor: "Mike Peters",
      instructorImage: "/profile2.jpg",
      price: "$79.99",
      level: "Beginner",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      image: "/design.jpg",
      category: "Design",
      rating: 4.7,
      students: 1789,
      instructor: "Emma Davis",
      instructorImage: "/profile3.jpg",
      price: "$94.99",
      level: "Advanced",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      image: "/data-science.jpg",
      category: "Data Science",
      rating: 4.9,
      students: 2341,
      instructor: "John Smith",
      instructorImage: "/profile4.jpg",
      price: "$99.99",
      level: "Intermediate",
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const filled = index < Math.floor(rating);

      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      );
    });
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update visible courses count
    setVisibleCourses((prev) => prev + 4);

    // Wait for next render cycle
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Animate new cards
    const newCards = cardsRef.current.slice(visibleCourses);
    gsap.fromTo(
      newCards,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    setIsLoading(false);
  };

  useEffect(() => {
    const cards = cardsRef.current;

    // Initial animation
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      });
    });

    // Hover animations
    cards.forEach((card) => {
      const image = card?.querySelector(".course-image");
      const content = card?.querySelector(".course-content");
      const overlay = card?.querySelector(".course-overlay");

      card?.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.4,
            duration: 0.3,
          });
        }
        if (content) {
          gsap.to(content, {
            y: -5,
            duration: 0.3,
          });
        }
      });

      card?.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
          });
        }
        if (content) {
          gsap.to(content, {
            y: 0,
            duration: 0.3,
          });
        }
      });
    });

    // Button hover animation
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("mouseenter", () => {
        gsap.to(button.querySelector(".button-bg"), {
          width: "100%",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button.querySelector(".button-bg"), {
          width: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular courses and start your learning journey
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <div
              key={course.id}
              ref={(el: HTMLDivElement | null) =>
                void (cardsRef.current[index] = el)
              }
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="course-overlay absolute inset-0 bg-black opacity-0 transition-opacity duration-300 z-10" />
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="course-image object-cover transform transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="course-content p-6">
                <div className="mb-3">
                  <span className="text-sm font-medium text-blue-600">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {course.title}
                </h3>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({course.rating})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.students.toLocaleString()} students
                  </span>
                </div>

                {/* Instructor and Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={course.instructorImage}
                        alt={course.instructor}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 ml-3">
                      {course.instructor}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCourses < courses.length && (
          <div className="mt-12 text-center">
            <button
              ref={buttonRef}
              onClick={handleLoadMore}
              disabled={isLoading}
              className="relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full group disabled:opacity-50"
            >
              {/* Button background animation */}
              <span className="button-bg absolute left-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out z-0" />

              {/* Button content */}
              <span className="relative flex items-center gap-2 text-blue-600 font-semibold group-hover:text-white transition-colors duration-300 z-10">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCards;
