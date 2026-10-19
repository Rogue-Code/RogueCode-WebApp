import { createElement } from "react";
import {
  CodeXml,
  Cpu,
  Database,
  GraduationCap,
  KeyRound,
  Layers,
  ListTree,
  Network,
  Palette,
  School,
  Sigma,
  Trophy,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siAndroid,
  siAngular,
  siApachecordova,
  siC,
  siCplusplus,
  siExpo,
  siGoogleanalytics,
  siHtml5,
  siKalilinux,
  siLinux,
  siMongodb,
  siOpenjdk,
  siPandas,
  siPython,
  siReact,
  siScikitlearn,
  siSpringboot,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons";

// Technology logos (simple-icons) where a course maps to one; generic line icons (lucide) otherwise
const icons: Record<string, SimpleIcon | LucideIcon> = {
  c: siC,
  cpp: siCplusplus,
  "core-java": siOpenjdk,
  "advanced-java": siSpringboot,
  python: siPython,
  "principles-of-programming": CodeXml,
  "assembly-x86": Cpu,
  "dsa-core": ListTree,
  "dsa-advanced": Waypoints,
  "analysis-of-algorithms-advanced": Sigma,
  "competitive-programming": Trophy,
  "web-designing": siHtml5,
  "full-stack-web": Layers,
  "javascript-react": siReact,
  angular: siAngular,
  mern: siMongodb,
  android: siAndroid,
  "react-native": siExpo,
  cordova: siApachecordova,
  "machine-learning": siScikitlearn,
  "data-science": siPandas,
  "deep-learning": siTensorflow,
  dbms: Database,
  "operating-systems": siLinux,
  "computer-networks": Network,
  "system-design": Workflow,
  "cryptography-security": KeyRound,
  "ethical-hacking": siKalilinux,
  photoshop: Palette,
  "google-analytics": siGoogleanalytics,
  "school-academic": School,
  "university-academic": GraduationCap,
};

// Brand colours too dark to read on our near-black tiles fall back to the text colour
function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 90;
}

/**
 * A square tile with the course's logo or icon. `plain` drops the brand colour
 * (used on the gold flagship card, where everything is ink).
 */
export function CourseIcon({
  courseId,
  className = "size-12",
  plain = false,
}: {
  courseId: string;
  className?: string;
  plain?: boolean;
}) {
  const icon = icons[courseId] ?? CodeXml;
  const tile = plain ? "bg-ink/10 text-ink" : "bg-ink-deep text-gold border border-edge";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-xl ${tile} ${className}`}
    >
      {"path" in icon ? (
        <svg
          viewBox="0 0 24 24"
          className="size-[55%]"
          fill={plain || isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        createElement(icon, { className: "size-[55%]", strokeWidth: 1.75 })
      )}
    </span>
  );
}
