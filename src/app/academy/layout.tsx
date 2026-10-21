import { DemoDialog } from "@/components/academy/DemoDialog";
import { AcademyFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { courses } from "@/data/academy";
import { academyHeader } from "@/data/site";

export default function AcademyLayout({ children }: LayoutProps<"/academy">) {
  return (
    <>
      <SiteHeader config={academyHeader} />
      <main>{children}</main>
      <AcademyFooter />
      <DemoDialog
        courseTitles={courses.map((c) => c.title)}
        courseTitleById={Object.fromEntries(courses.map((c) => [c.id, c.title]))}
      />
    </>
  );
}
