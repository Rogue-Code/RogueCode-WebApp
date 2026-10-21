import type { Metadata } from "next";
import { AcademyHero } from "@/components/academy/AcademyHero";
import { CourseCatalog } from "@/components/academy/CourseCatalog";
import { Curriculum } from "@/components/academy/Curriculum";
import { DemoCta } from "@/components/academy/DemoCta";
import { Facts } from "@/components/academy/Facts";
import { Faq } from "@/components/academy/Faq";
import { HowItWorks } from "@/components/academy/HowItWorks";
import { KidsCoding } from "@/components/academy/KidsCoding";
import { GoogleReviews } from "@/components/academy/GoogleReviews";
import { InstagramFeed } from "@/components/academy/InstagramFeed";
import { StudentVoice } from "@/components/academy/StudentVoice";
import { Trainers } from "@/components/academy/Trainers";
import { courseCategories, courses } from "@/data/academy";

export const metadata: Metadata = {
  title: "Rogue Academy — Learn to code from people who ship code",
  description:
    "Hands-on coding courses at Rogue Academy: web development, Python, Java, DSA, app development, machine learning and coding for school kids, taught by working developers.",
};

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      <Facts />
      <CourseCatalog courses={courses} categories={courseCategories} />
      <KidsCoding />
      <HowItWorks />
      <Curriculum />
      <Trainers />
      <StudentVoice />
      <GoogleReviews />
      <InstagramFeed />
      <Faq />
      <DemoCta courseTitles={courses.map((c) => c.title)} />
    </>
  );
}
