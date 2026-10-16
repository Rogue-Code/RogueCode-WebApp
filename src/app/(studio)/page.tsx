import { AcademyBand } from "@/components/home/AcademyBand";
import { Contact } from "@/components/home/Contact";
import { EventsAndBlog } from "@/components/home/EventsAndBlog";
import { Hero } from "@/components/home/Hero";
import { Numbers } from "@/components/home/Numbers";
import { Refer } from "@/components/home/Refer";
import { Studio } from "@/components/home/Studio";
import { TwoDoors } from "@/components/home/TwoDoors";
import { Voices } from "@/components/home/Voices";
import { WelcomeChooser } from "@/components/home/WelcomeChooser";
import { Work } from "@/components/home/Work";

export default function HomePage() {
  return (
    <>
      <WelcomeChooser />
      <Hero />
      <TwoDoors />
      <Studio />
      <Work />
      <Numbers />
      <AcademyBand />
      <Voices />
      <EventsAndBlog />
      <Refer />
      <Contact />
    </>
  );
}
