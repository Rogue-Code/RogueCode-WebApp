import type { Metadata } from "next";
import { AcademyHero } from "@/components/academy/AcademyHero";
import { CourseCatalog } from "@/components/academy/CourseCatalog";
import { Curriculum } from "@/components/academy/Curriculum";
import { DemoCta } from "@/components/academy/DemoCta";
import { Facts } from "@/components/academy/Facts";
import { Faq } from "@/components/academy/Faq";
import { HowItWorks } from "@/components/academy/HowItWorks";
import { InstagramFeed } from "@/components/academy/InstagramFeed";
import { StudentVoice } from "@/components/academy/StudentVoice";
import { Trainers } from "@/components/academy/Trainers";
import { courses } from "@/data/academy";

export const metadata: Metadata = {
  title: "Rogue Academy — Learn to code from people who ship code",
  description:
    "Hands-on coding courses at Rogue Academy: full-stack web development, React, Python, mobile apps and UI/UX, taught by working developers.",
};

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      <Facts />
      <CourseCatalog courses={courses} />
      <HowItWorks />
      <Curriculum />
      <Trainers />
      <StudentVoice />
      <InstagramFeed />
      <Faq />
      <DemoCta courseTitles={courses.map((c) => c.title)} />
    </>
  );
}
