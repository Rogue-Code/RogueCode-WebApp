import { ButtonLink } from "@/components/ui/Button";

export function Refer() {
  return (
    <section aria-label="Refer a friend" className="container-page pb-28">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] border border-dashed border-outline px-8 py-7">
        <p className="max-w-190 text-[19px] leading-normal">
          <span className="font-mono text-gold">refer --friend</span>&nbsp; Know someone who should
          learn to code? Refer them to the Academy and get [YOUR REWARD] when they enroll.
        </p>
        <ButtonLink href="#contact" variant="outlinePaper" size="md" className="text-base!">
          Refer a friend
        </ButtonLink>
      </div>
    </section>
  );
}
