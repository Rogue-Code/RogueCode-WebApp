import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { studioHeader } from "@/data/site";

export default function StudioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader config={studioHeader} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
