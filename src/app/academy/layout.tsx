import { AcademyFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { academyHeader } from "@/data/site";

export default function AcademyLayout({ children }: LayoutProps<"/academy">) {
  return (
    <>
      <SiteHeader config={academyHeader} />
      <main>{children}</main>
      <AcademyFooter />
    </>
  );
}
