import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Bot,
  Building2,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  Network,
  PackageCheck,
  ServerCog,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import memojiImage from "../Images/memoji.png";

type ModalState =
  | { type: "project"; item: Project }
  | { type: "award"; item: AwardItem }
  | { type: "thesis" }
  | null;

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  impact: string;
  problem: string;
  solution: string;
  link?: string;
  linkLabel?: string;
};

type AwardItem = {
  title: string;
  date: string;
  href: string;
};

const awardItems: AwardItem[] = [
  {
    title: "Achiever Award",
    date: "February FY 2021-22",
    href: "/assets/awards/Achiever_Award_Feb_%202021-22.pdf",
  },
  { title: "Spot Award", date: "November FY 2023-24", href: "/assets/awards/Spot%20Nov%202023-24.pdf" },
  {
    title: "Tech Wizard Award",
    date: "August FY 2024-25",
    href: "/assets/awards/Tech%20Wizard%20Aug%202024-25.pdf",
  },
  {
    title: "Tech Wizard Award",
    date: "January FY 2024-25",
    href: "/assets/awards/Tech%20Wizard%20Jan%202024-25.pdf",
  },
  {
    title: "Cheerful / Out Of Box Thinker",
    date: "September 2025",
    href: "/assets/awards/Cheerful%20Award-Out%20Of%20Box%20Thinker_Sept%202025.pdf",
  },
  {
    title: "Tech Wizard Award",
    date: "Q4 FY 2025-26",
    href: "/assets/awards/Tech%20Wizard%20Award=Q4-2025-26.pdf",
  },
];

const links = {
  email: "mailto:animesh_ranjan@hotmail.com",
  linkedIn: "https://www.linkedin.com/in/animesh-ranjan-0306/",
  github: "https://github.com/mranimesh0312",
  pypi: "https://pypi.org/user/mranimesh03/",
  xlsxlean: "https://pypi.org/project/xlsxlean/",
  thesisRepo: "https://github.com/mranimesh0312/cross-lingual-indic-bert-alignment",
};

const marqueeImages: Record<string, string> = {
  "Enterprise Software": new URL("../Images/Enterprise_Software.png", import.meta.url).href,
  "Endpoint Agents": new URL("../Images/Endpoint Agents.png", import.meta.url).href,
  "System Architecture": new URL("../Images/System Architecture.png", import.meta.url).href,
  "Automation Tools": new URL("../Images/Automation Tools.png", import.meta.url).href,
  "Database Design": new URL("../Images/Database Design.png", import.meta.url).href,
  "NLP Research": new URL("../Images/NLP Research.png", import.meta.url).href,
  "Distributed Systems": new URL("../Images/Distributed Systems.png", import.meta.url).href,
  "Open Source Contribution (xlsxlean)": new URL("../Images/Open Source Contribution (xlsxlean).png", import.meta.url)
    .href,
};

const marqueeIcons = {
  "Enterprise Software": Building2,
  "Endpoint Agents": Bot,
  "System Architecture": Layers3,
  "Automation Tools": Workflow,
  "Database Design": Database,
  "NLP Research": BrainCircuit,
  "Distributed Systems": Network,
  "Open Source Contribution (xlsxlean)": Code2,
};

function projectImageFor(project: Project) {
  if (project.title.includes("Endpoint")) return marqueeImages["Endpoint Agents"];
  if (project.title.includes("Office")) return marqueeImages["Automation Tools"];
  if (project.title.includes("Rust")) return marqueeImages["System Architecture"];
  if (project.title.includes("xlsxlean")) return marqueeImages["Open Source Contribution (xlsxlean)"];
  if (project.title.includes("NLP")) return marqueeImages["NLP Research"];
  return marqueeImages["Enterprise Software"];
}

function projectIconFor(project: Project) {
  if (project.title.includes("Endpoint")) return Bot;
  if (project.title.includes("Office")) return Workflow;
  if (project.title.includes("Rust")) return Network;
  if (project.title.includes("xlsxlean")) return Code2;
  if (project.title.includes("NLP")) return BrainCircuit;
  return Building2;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Enterprise Data Discovery Engine",
    category: "Enterprise Software",
    description:
      "Large-scale software system for discovering, processing, and reporting sensitive information across enterprise files and environments.",
    tech: ["Python", "Regex", "Pandas", "SQLite", "PostgreSQL", "Multiprocessing", "File parsers"],
    impact: "Built for real-world enterprise data discovery and large file scanning workflows.",
    problem: "Enterprise files create noisy, high-volume discovery work that must remain accurate and auditable.",
    solution: "Composed file parsers, scanning pipelines, reporting storage, and parallel processing into a resilient engine.",
  },
  {
    id: "02",
    title: "Windows/Linux Endpoint Agent",
    category: "Systems Engineering",
    description:
      "Endpoint-side software platform supporting scanning, reporting, configuration, automation, service execution, and server communication across Windows and Linux.",
    tech: ["Python", "Windows Services", "Linux Services", "REST APIs", "PyInstaller", "Bash"],
    impact: "Production-oriented agent architecture for enterprise environments.",
    problem: "Distributed enterprise environments need reliable local execution across different OS surfaces.",
    solution: "Built service workflows, packaged runtimes, configuration channels, and backend communication.",
  },
  {
    id: "03",
    title: "Office & Outlook Add-ins",
    category: "Desktop Applications",
    description:
      "Microsoft Office and Outlook integrations for classification workflows, attachment handling, metadata operations, document processing, and user productivity.",
    tech: ["C#", ".NET", "Office Interop", "Outlook Interop", "Windows Registry"],
    impact: "Improved enterprise document workflows through integrated desktop automation.",
    problem: "Critical business workflows were buried inside manual Office and Outlook actions.",
    solution: "Integrated add-ins directly into user tools with metadata, attachments, and document automation.",
  },
  {
    id: "04",
    title: "Rust Credit Card Masker",
    category: "Performance Engineering",
    description: "High-performance file masking and truncation tool for detecting and processing card numbers in large files.",
    tech: ["Rust", "Regex", "Streaming IO", "Performance Optimization"],
    impact: "Designed for speed, safety, and large-scale file processing.",
    problem: "Large files need fast masking without fragile memory-heavy behavior.",
    solution: "Used Rust, streaming IO, and careful pattern processing to keep throughput high and risk low.",
  },
  {
    id: "05",
    title: "xlsxlean Python Package",
    category: "Open Source / Developer Tool",
    description: "Python package for Excel/XLSX cleanup and processing workflows.",
    tech: ["Python", "openpyxl", "Packaging", "PyPI"],
    impact: "Reusable developer utility for spreadsheet cleanup automation.",
    problem: "Spreadsheet cleanup repeats across teams and scripts.",
    solution: "Packaged the workflow as a reusable utility with clean Python ergonomics.",
    link: links.xlsxlean,
    linkLabel: "View PyPI Package",
  },
  {
    id: "06",
    title: "Cross-Lingual NLP Thesis",
    category: "AI/NLP Research",
    description:
      "M.Tech thesis at IIT Guwahati on cross-lingual alignment of contextual word embeddings for low-resource Indian languages.",
    tech: ["Python", "BERT", "Transformers", "NLP", "NER", "Cross-Lingual Learning"],
    impact: "Research foundation in AI/NLP and multilingual language understanding.",
    problem: "Low-resource Indian languages need stronger cross-lingual transfer for NLP tasks.",
    solution: "Explored contextual word embedding alignment and transfer learning for NER workflows.",
    link: links.thesisRepo,
    linkLabel: "View Repo",
  },
];

const buildItems = [
  [
    "01",
    "Enterprise Applications",
    "Production-grade software for enterprise workflows, automation, reporting, integrations, and real-world business operations.",
  ],
  ["02", "Backend Systems", "APIs, services, databases, data pipelines, background jobs, and scalable backend workflows."],
  [
    "03",
    "Desktop & Endpoint Applications",
    "Windows and Linux applications, services, add-ins, agents, installers, and system-level automation.",
  ],
  [
    "04",
    "Data Processing & Performance Engineering",
    "Large-file processing, scanning engines, masking tools, optimization, multiprocessing, and memory-safe workflows.",
  ],
  [
    "05",
    "SaaS & Product Development",
    "Modern product experiences, dashboards, workflow automation, role-based controls, reporting systems, and user-focused business applications.",
  ],
];

const skillGroups = {
  Languages: ["Python", "JavaScript", "TypeScript", "C", "C++", "C#", "GoLang", "Rust"],
  "Frontend/Product": ["React", "Next.js", "Tailwind CSS", "Dashboards", "Vercel", "MS Office"],
  Backend: ["Node.js", "Django", "Flask", "FastAPI", "REST APIs"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
  "AI / Machine Learning": ["TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "Jupyter", "Hugging Face"],
  "NLP & Transformers": ["NLP", "BERT", "Transformers", "NER", "Cross-Lingual Learning", "Text Classification", "Embeddings"],
  "Computer Vision": ["OpenCV", "OCR"],
  "Cloud & DevOps": ["Docker", "Kubernetes", "Azure", "AWS", "Linux", "Git", "GitHub", "Postman"],
};

const techLogoSlugs: Record<string, string> = {
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  C: "c",
  "C++": "cplusplus",
  "C#": "csharp",
  GoLang: "go",
  Rust: "rust",
  React: "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  Vercel: "vercel",
  "MS Office": "microsoftoffice",
  "Node.js": "nodedotjs",
  Django: "django",
  Flask: "flask",
  FastAPI: "fastapi",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  SQLite: "sqlite",
  Redis: "redis",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "Scikit-learn": "scikitlearn",
  NumPy: "numpy",
  Pandas: "pandas",
  Jupyter: "jupyter",
  "Hugging Face": "huggingface",
  OpenCV: "opencv",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Azure: "microsoftazure",
  AWS: "amazonwebservices",
  Linux: "linux",
  Git: "git",
  GitHub: "github",
  Postman: "postman",
};

function App() {
  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    document.title = "Animesh Ranjan — Software Engineer";
  }, []);

  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <WhatIBuildSection />
      <ProjectsSection onOpen={(item) => setModal({ type: "project", item })} />
      <AwardsSection onOpen={(item) => setModal({ type: "award", item })} />
      <IITResearchSection onOpen={() => setModal({ type: "thesis" })} />
      <SkillsSection />
      <ContactSection />
      <Modal modal={modal} onClose={() => setModal(null)} />
    </main>
  );
}

function ContactButton({ href = links.email, label = "Contact Me" }: { href?: string; label?: string }) {
  return (
    <Magnet>
      <a
        href={href}
        className="inline-flex rounded-full px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white outline outline-2 -outline-offset-4 outline-white transition hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
        style={{
          background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
          boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        }}
      >
        {label}
      </a>
    </Magnet>
  );
}

function ViewDetailsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      View Details
    </button>
  );
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children, strength = 18 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 130, damping: 16 });
  const springY = useSpring(y, { stiffness: 130, damping: 16 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((event.clientX - cx) / strength);
    y.set((event.clientY - cy) / strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="disable-mobile-magnet inline-block"
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[#0C0C0C]">
      <div className="thin-grid absolute inset-0 opacity-70" />
      <div className="absolute left-[12%] top-[18%] h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]" />
      <div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full bg-violet-500/20 blur-[110px]" />
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-[#D7E2EA]/50"
          style={{ left: `${(index * 47) % 100}%`, top: `${(index * 31) % 100}%` }}
          animate={{ y: [-8, 14, -8], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + index * 0.1, repeat: Infinity, delay: index * 0.14 }}
        />
      ))}

      <motion.nav
        className="absolute inset-x-0 top-0 z-30 flex justify-between gap-3 px-4 pt-5 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] sm:px-6 sm:pt-6 sm:text-sm md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {["About", "Work", "Awards", "Research", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item === "Work" ? "projects" : item === "Research" ? "iit" : item.toLowerCase()}`}
            className="transition duration-200 hover:opacity-70"
          >
            {item}
          </a>
        ))}
      </motion.nav>

      <motion.div
        className="absolute inset-x-0 top-16 z-10 overflow-hidden sm:top-20 md:top-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.85 }}
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-[10vw] font-black uppercase leading-none tracking-tight sm:text-[10.3vw] md:text-[10.8vw] lg:text-[11.2vw]">
          HI, I'M ANIMESH
        </h1>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[60%] z-20 w-[270px] sm:top-[61%] sm:w-[350px] md:top-[62%] md:w-[430px] lg:w-[510px]"
        style={{ x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.85 }}
      >
        <Magnet strength={7}>
          <div className="relative aspect-square">
            <div className="absolute inset-8 rounded-full bg-cyan-400/20 blur-[80px]" />
            <img
              src={memojiImage}
              alt="Animesh Ranjan memoji"
              className="relative h-full w-full object-contain drop-shadow-[0_32px_55px_rgba(0,0,0,0.42)]"
              loading="eager"
            />
          </div>
        </Magnet>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <motion.p
          className="max-w-[190px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[260px] md:max-w-[340px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Software Engineer building scalable products, enterprise applications, backend systems, automation platforms,
          and AI-powered solutions.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const row1 = ["Enterprise Software", "Endpoint Agents", "System Architecture", "Automation Tools"];
  const row2 = ["Database Design", "NLP Research", "Distributed Systems", "Open Source Contribution (xlsxlean)"];

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3 overflow-hidden">
        <MarqueeRow items={row1} x={offset - 200} />
        <MarqueeRow items={row2} x={-(offset - 200)} />
      </div>
    </section>
  );
}

function MarqueeRow({ items, x }: { items: string[]; x: number }) {
  return (
    <div className="flex gap-3" style={{ transform: `translateX(${x}px)`, willChange: "transform" }}>
      {[...items, ...items].map((item, index) => {
        const imageSrc = marqueeImages[item];
        const Icon = marqueeIcons[item as keyof typeof marqueeIcons] ?? PackageCheck;

        return (
          <div
            key={`${item}-${index}`}
            className="relative h-[230px] min-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] sm:h-[250px] sm:min-w-[360px] md:h-[260px] md:min-w-[380px]"
          >
            {imageSrc ? (
              <img src={imageSrc} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.22),transparent_32%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/88 via-[#0C0C0C]/22 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-black/30 text-[#D7E2EA] backdrop-blur-md">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#D7E2EA] drop-shadow-[0_3px_18px_rgba(0,0,0,0.7)] sm:text-3xl">
                  {item}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden px-5 py-20 sm:px-8 md:px-10">
      <FloatingCard className="left-5 top-24" title="Python" text="Backend" />
      <FloatingCard className="bottom-16 left-8" title="C#" text="Desktop Apps" />
      <FloatingCard className="right-5 top-28" title="Rust" text="Performance" />
      <FloatingCard className="bottom-20 right-8" title="Product" text="Engineering" />

      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <FadeIn>
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About Me
          </h2>
        </FadeIn>
        <AnimatedText
          text="I am a Software Engineer and Product Builder with an M.Tech in Computer Science and Engineering from IIT Guwahati. I build production-grade software across backend systems, Windows and Linux applications, Office add-ins, automation platforms, data processing engines, SaaS products, and AI-powered solutions. I enjoy turning complex engineering problems into reliable, scalable, and usable software."
        />
        <FadeIn delay={0.15} className="mt-10">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function FloatingCard({ title, text, className }: { title: string; text: string; className: string }) {
  return (
    <motion.div
      className={`glass absolute hidden rounded-3xl px-6 py-5 text-[#D7E2EA] shadow-xl md:block ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-sm uppercase tracking-[0.2em] text-[#D7E2EA]/60">{text}</p>
    </motion.div>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = text.split("");

  return (
    <p
      ref={ref}
      className="mt-8 max-w-[760px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {chars.map((char, index) => {
        const start = index / chars.length;
        const end = Math.min(start + 0.12, 1);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span key={`${char}-${index}`} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

function WhatIBuildSection() {
  return (
    <section id="work" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none sm:mb-20 md:mb-28">
          What I Build
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {buildItems.map(([num, title, description], index) => (
          <FadeIn key={num} delay={index * 0.1}>
            <div className="grid gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 sm:grid-cols-[0.32fr_1fr] sm:py-10 md:py-12">
              <p className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{num}</p>
              <div>
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{title}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ onOpen }: { onOpen: (item: Project) => void }) {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
      <FadeIn>
        <h2 className="hero-heading mb-12 text-[clamp(3rem,13vw,180px)] font-black uppercase leading-none tracking-tight">
          Projects
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} total={projects.length} onOpen={() => onOpen(project)} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, onOpen }: { project: Project; index: number; total: number; onOpen: () => void }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;

  return (
    <motion.article
      className="sticky mb-10 h-[85vh] rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
      style={{ top: `${96 + index * 28}px`, scale: targetScale }}
      whileHover={{ rotateX: 1.2, rotateY: -1.2, boxShadow: "0 0 80px rgba(125, 211, 252, 0.22)" }}
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="hero-heading text-6xl font-black md:text-8xl">{project.id}</p>
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#D7E2EA]/55">{project.category}</p>
            <h3 className="mt-2 text-3xl font-semibold uppercase leading-none text-[#D7E2EA] md:text-5xl">{project.title}</h3>
          </div>
          <ViewDetailsButton onClick={onOpen} />
        </div>
        <div className="mt-6 grid min-h-0 flex-1 gap-3 md:grid-cols-[0.4fr_0.6fr]">
          <div className="grid gap-3">
            <ProjectVisual project={project} compact />
            <ProjectVisual project={project} compact variant />
          </div>
          <ProjectVisual project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ project, compact = false, variant = false }: { project: Project; compact?: boolean; variant?: boolean }) {
  if (compact) return <MiniProjectVisual project={project} variant={variant} />;

  const imageSrc = projectImageFor(project);
  const Icon = projectIconFor(project);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#151515] p-5">
      <img
        src={imageSrc}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${variant ? "scale-110 object-right" : "object-center"} opacity-70`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0C0C]/72 via-[#0C0C0C]/36 to-[#0C0C0C]/82" />
      <div className={`absolute inset-0 ${variant ? "bg-[radial-gradient(circle_at_80%_18%,rgba(168,85,247,0.34),transparent_38%)]" : "bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.28),transparent_40%)]"}`} />
      <div className="absolute left-8 right-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
      <div className="absolute bottom-12 right-10 grid grid-cols-3 gap-1 opacity-45">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-cyan-100" />
        ))}
      </div>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-black/35 text-cyan-100 backdrop-blur-md">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-black/35 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur-md">
            {variant ? "Architecture" : project.category}
          </span>
        </div>
        {!compact && <p className="max-w-xl text-lg leading-7 text-[#D7E2EA]/88 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">{project.description}</p>}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, compact ? 3 : 6).map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#D7E2EA]/80">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniProjectVisual({ project, variant = false }: { project: Project; variant?: boolean }) {
  const Icon = projectIconFor(project);
  const chips = variant ? project.tech.slice(3, 6) : project.tech.slice(0, 3);
  const config = miniVisualConfig(project, variant);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#151515] p-5">
      <div
        className={`absolute inset-0 ${
          variant
            ? "bg-[radial-gradient(circle_at_80%_18%,rgba(168,85,247,0.30),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(34,211,238,0.16),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.26),transparent_36%),radial-gradient(circle_at_82%_76%,rgba(99,102,241,0.18),transparent_34%)]"
        }`}
      />
      <div className="absolute inset-0 opacity-35">
        <div className="absolute left-8 right-8 top-1/2 h-px bg-cyan-100/40" />
        <div className="absolute bottom-10 left-10 top-10 w-px bg-cyan-100/20" />
        <div className="absolute bottom-10 right-10 top-10 w-px bg-violet-100/20" />
      </div>

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-black/35 text-cyan-100 backdrop-blur-md">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-black/35 px-3 py-1 text-xs uppercase tracking-widest text-[#D7E2EA]/85 backdrop-blur-md">
            {config.label}
          </span>
        </div>

        <MiniGraphic config={config} variant={variant} />

        <div className="flex flex-wrap gap-2">
          {chips.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-[#D7E2EA]/80 backdrop-blur">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function miniVisualConfig(project: Project, variant: boolean) {
  if (project.title.includes("Endpoint")) {
    return variant
      ? { kind: "mesh", label: "Agent Sync", nodes: ["Win", "Linux", "API", "Cloud"] }
      : { kind: "devices", label: "Endpoint Fleet", nodes: ["Scan", "Config", "Report"] };
  }
  if (project.title.includes("Office")) {
    return variant
      ? { kind: "docs", label: "Outlook Flow", nodes: ["Mail", "Attach", "Classify"] }
      : { kind: "docs", label: "Office Add-in", nodes: ["Doc", "Meta", "Action"] };
  }
  if (project.title.includes("Rust")) {
    return variant
      ? { kind: "stream", label: "Mask Pipeline", nodes: ["Read", "Detect", "Mask", "Write"] }
      : { kind: "binary", label: "Rust Engine", nodes: ["1011", "CARD", "****"] };
  }
  if (project.title.includes("xlsxlean")) {
    return variant
      ? { kind: "sheet", label: "Clean Workbook", nodes: ["Trim", "Fix", "Export"] }
      : { kind: "sheet", label: "XLSX Grid", nodes: ["A1", "B2", "C3"] };
  }
  if (project.title.includes("NLP")) {
    return variant
      ? { kind: "language", label: "NER Transfer", nodes: ["EN", "HI", "TA", "NER"] }
      : { kind: "language", label: "Cross-Lingual", nodes: ["BERT", "Align", "NER"] };
  }
  return variant
    ? { kind: "database", label: "Report Store", nodes: ["Scan", "Classify", "DB", "Report"] }
    : { kind: "scanner", label: "Discovery Flow", nodes: ["Files", "Parser", "Rules", "Findings"] };
}

function MiniGraphic({
  config,
  variant,
}: {
  config: { kind: string; label: string; nodes: string[] };
  variant: boolean;
}) {
  if (config.kind === "docs") {
    return (
      <div className="relative mx-auto h-24 w-full max-w-[360px]">
        {config.nodes.map((node, index) => (
          <motion.div
            key={node}
            className="absolute top-2 h-20 w-24 rounded-2xl border border-cyan-100/20 bg-black/45 p-3 text-xs font-semibold uppercase text-[#D7E2EA] backdrop-blur"
            style={{ left: `${index * 30}%`, rotate: `${(index - 1) * 5}deg` }}
            animate={{ y: [0, -8, 0], rotate: [(index - 1) * 5, (index - 1) * 5 + 2, (index - 1) * 5] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.18 }}
          >
            <div className="mb-3 h-2 w-14 rounded bg-cyan-100/45" />
            <div className="mb-2 h-1.5 w-10 rounded bg-white/25" />
            {node}
          </motion.div>
        ))}
      </div>
    );
  }

  if (config.kind === "sheet") {
    return (
      <div className="mx-auto grid h-24 w-full max-w-[330px] grid-cols-5 gap-1 rounded-2xl border border-cyan-100/15 bg-black/35 p-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.span
            key={index}
            className="rounded bg-cyan-100/15"
            animate={{ opacity: [0.25, index % 3 === 0 ? 0.9 : 0.55, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.04 }}
          />
        ))}
      </div>
    );
  }

  if (config.kind === "binary" || config.kind === "stream") {
    return (
      <div className="relative mx-auto h-24 w-full max-w-[360px] overflow-hidden rounded-2xl border border-cyan-100/15 bg-black/35 p-4">
        {[0, 1, 2].map((row) => (
          <motion.div
            key={row}
            className="mb-2 whitespace-nowrap font-mono text-sm text-cyan-100/65"
            animate={{ x: variant ? [-80, 20, -80] : [20, -80, 20] }}
            transition={{ duration: 4 + row * 0.4, repeat: Infinity, ease: "linear" }}
          >
            {config.nodes.join("  →  ")}  ·  {config.nodes.join("  →  ")}
          </motion.div>
        ))}
      </div>
    );
  }

  if (config.kind === "language") {
    return (
      <div className="relative mx-auto h-24 w-full max-w-[360px]">
        {config.nodes.map((node, index) => (
          <motion.span
            key={node}
            className="absolute grid h-14 w-14 place-items-center rounded-full border border-violet-100/20 bg-black/45 text-sm font-bold text-[#D7E2EA] backdrop-blur"
            style={{ left: `${index * 27 + 4}%`, top: index % 2 ? "42%" : "10%" }}
            animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 0 rgba(168,85,247,0)", "0 0 32px rgba(168,85,247,0.25)", "0 0 0 rgba(168,85,247,0)"] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.2 }}
          >
            {node}
          </motion.span>
        ))}
      </div>
    );
  }

  if (config.kind === "mesh" || config.kind === "devices") {
    return (
      <div className="relative mx-auto h-24 w-full max-w-[360px]">
        {config.nodes.map((node, index) => (
          <motion.div
            key={node}
            className="absolute grid h-12 w-16 place-items-center rounded-xl border border-cyan-100/20 bg-black/45 text-[0.68rem] font-semibold uppercase text-[#D7E2EA] backdrop-blur"
            style={{ left: `${index * 25 + 2}%`, top: index % 2 ? "50%" : "8%" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.16 }}
          >
            {node}
          </motion.div>
        ))}
        <motion.div
          className="absolute left-[8%] top-1/2 h-0.5 w-[82%] bg-gradient-to-r from-cyan-100/20 via-cyan-100 to-cyan-100/20"
          animate={{ opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-24 w-full max-w-[360px]">
      {config.nodes.map((node, index) => (
        <motion.div
          key={node}
          className="absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cyan-100/25 bg-black/45 text-[0.62rem] font-semibold uppercase text-[#D7E2EA] backdrop-blur"
          style={{ left: `calc(${index * 27}% + 2%)` }}
          animate={{ y: [0, variant ? 8 : -8, 0], boxShadow: ["0 0 0 rgba(103,232,249,0)", "0 0 28px rgba(103,232,249,0.22)", "0 0 0 rgba(103,232,249,0)"] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.22 }}
        >
          {node}
        </motion.div>
      ))}
      <motion.div
        className="absolute left-[10%] top-1/2 h-0.5 w-[78%] -translate-y-1/2 bg-gradient-to-r from-cyan-200/10 via-cyan-200 to-violet-200/10"
        animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.25, 0.85, 0.25] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function AwardsSection({ onOpen }: { onOpen: (item: AwardItem) => void }) {
  return (
    <section id="awards" className="bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10">
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="hero-heading text-[clamp(3rem,13vw,180px)] font-black uppercase leading-none">Awards</h2>
            <p className="mt-4 max-w-3xl text-xl font-light text-[#D7E2EA]/72">
              Recognized repeatedly for technical execution, innovation, problem solving, and out-of-box thinking.
            </p>
          </div>
          <div className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#F7D774]">
            Multiple-Time Tech Wizard Award Winner
          </div>
        </div>
      </FadeIn>
      <div className="scrollbar-soft flex gap-5 overflow-x-auto pb-8">
        {awardItems.map((award, index) => (
          <motion.button
            key={`${award.title}-${award.date}`}
            onClick={() => onOpen(award)}
            className="group relative min-h-[440px] min-w-[320px] overflow-hidden rounded-[34px] border border-[#D4AF37]/30 bg-[#15120a] p-5 text-left shadow-[0_0_60px_rgba(212,175,55,0.12)]"
            whileHover={{ y: -8, rotateY: -4, boxShadow: "0 0 90px rgba(212,175,55,0.25)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(247,215,116,0.22),transparent_36%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-7xl font-black text-[#F7D774]/30">{String(index + 1).padStart(2, "0")}</p>
                <Award className="mt-6 h-10 w-10 text-[#F7D774]" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold uppercase text-[#F7D774]">{award.title}</h3>
                <p className="mt-2 text-[#D7E2EA]/60">{award.date}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D7E2EA]">
                  Open Certificate <ExternalLink className="h-4 w-4" />
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {["Technical Excellence", "Innovation", "Problem Solving", "Execution", "Out-of-Box Thinking"].map((item) => (
          <span key={item} className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#F7D774]">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function IITResearchSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="iit" className="rounded-t-[40px] bg-[#f3f0e8] px-5 py-20 text-[#0C0C0C] sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1d4f91]">Education & Research Foundation</p>
          <h2 className="mt-4 text-[clamp(3rem,10vw,130px)] font-black uppercase leading-none">IIT Guwahati</h2>
          <p className="mt-4 text-2xl font-medium">M.Tech Computer Science & Engineering</p>
          <p className="mt-6 max-w-xl text-lg font-light leading-8 opacity-70">
            Animesh completed his M.Tech in Computer Science and Engineering from IIT Guwahati, where his thesis focused
            on cross-lingual NLP for low-resource Indian languages.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="rounded-[36px] border border-[#1d4f91]/15 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-[#1d4f91]">
              <GraduationCap className="h-8 w-8" />
              <p className="font-semibold uppercase tracking-[0.18em]">Thesis</p>
            </div>
            <h3 className="mt-5 text-3xl font-semibold leading-tight">
              Cross-Lingual Alignment of Contextual Word Embedding for Low-Resource Indian Languages
            </h3>
            <p className="mt-4 text-lg text-black/60">Guide: Dr. Ashish Anand</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["NLP", "BERT", "Transformers", "Cross-Lingual Learning", "Indian Languages", "NER"].map((item) => (
                <span key={item} className="rounded-full bg-[#1d4f91]/10 px-3 py-1 text-sm text-[#1d4f91]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={onOpen}
                className="rounded-full bg-[#1d4f91] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white"
              >
                Open Thesis
              </button>
              <a
                href={links.thesisRepo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#1d4f91] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1d4f91]"
              >
                View Repo
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [filter, setFilter] = useState("All");
  const groups = Object.entries(skillGroups);
  const visible = filter === "All" ? groups : groups.filter(([name]) => name === filter);

  return (
    <section id="skills" className="bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10">
      <FadeIn>
        <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none">Engineering Stack</h2>
      </FadeIn>
      <div className="mt-10 flex flex-wrap gap-2">
        {["All", ...Object.keys(skillGroups)].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-2 text-sm uppercase tracking-widest transition ${
              filter === item ? "border-cyan-200 bg-cyan-200 text-[#0C0C0C]" : "border-white/10 text-[#D7E2EA] hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map(([name, skills]) => (
          <motion.div key={name} className="glass rounded-[30px] p-6" whileHover={{ scale: 1.025, boxShadow: "0 0 80px rgba(34,211,238,0.14)" }}>
            <h3 className="text-2xl font-semibold text-[#D7E2EA]">{name}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  title={`${skill} used in ${name} workflows`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-[#D7E2EA]/75"
                >
                  <TechLogo name={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TechLogo({ name }: { name: string }) {
  const slug = techLogoSlugs[name];
  const initials = name
    .replace(/[^a-zA-Z0-9+#. ]/g, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="relative grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full bg-white text-[0.55rem] font-bold text-[#0C0C0C]">
      <span>{initials || name.slice(0, 1).toUpperCase()}</span>
      {slug && (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-full bg-white p-0.5"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </span>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0C0C0C] px-5 py-28 sm:px-8 md:px-10">
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_50%_100%,rgba(182,0,168,0.24),transparent_50%)]" />
      <FadeIn className="relative mx-auto max-w-5xl text-center">
        <h2 className="hero-heading text-[clamp(3rem,10vw,140px)] font-black uppercase leading-none">
          Let's Build Something Meaningful
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-xl font-light leading-8 text-[#D7E2EA]/72">
          Whether it is enterprise software, backend systems, automation tools, SaaS products, or AI-powered solutions,
          I enjoy working on challenging engineering problems.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ContactButton />
          <a className="rounded-full border border-white/15 px-6 py-3 uppercase tracking-widest text-[#D7E2EA]" href="/assets/resume/resume.pdf">
            <span className="inline-flex items-center gap-2"><Download className="h-4 w-4" /> Download Resume</span>
          </a>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <ContactCard icon={<BriefcaseBusiness />} label="LinkedIn" href={links.linkedIn} />
          <ContactCard icon={<Code2 />} label="GitHub" href={links.github} />
          <ContactCard icon={<PackageCheck />} label="PyPI" href={links.pypi} />
          <ContactCard icon={<Mail />} label="Email" href={links.email} />
          <ContactCard icon={<ArrowUpRight />} label="Resume" href="/assets/resume/resume.pdf" />
        </div>
      </FadeIn>
    </section>
  );
}

function ContactCard({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a className="glass rounded-3xl p-5 text-left transition hover:-translate-y-1" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      <div className="text-cyan-200 [&_svg]:h-6 [&_svg]:w-6">{icon}</div>
      <p className="mt-5 text-lg font-medium uppercase tracking-widest text-[#D7E2EA]">{label}</p>
    </a>
  );
}

function Modal({ modal, onClose }: { modal: ModalState; onClose: () => void }) {
  useEffect(() => {
    if (!modal) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modal, onClose]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-[34px] border border-white/12 bg-[#0C0C0C] p-5 text-[#D7E2EA] shadow-2xl"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex justify-end">
              <button onClick={onClose} className="rounded-full border border-white/15 p-3 hover:bg-white/10" aria-label="Close modal">
                <X className="h-5 w-5" />
              </button>
            </div>
            {modal.type === "project" && <ProjectModal project={modal.item} />}
            {modal.type === "award" && <AwardModal award={modal.item} />}
            {modal.type === "thesis" && <ThesisModal />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectModal({ project }: { project: Project }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{project.category}</p>
      <h3 className="mt-3 text-4xl font-semibold uppercase md:text-6xl">{project.title}</h3>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <ModalBlock title="Problem" text={project.problem} icon={<BrainCircuit />} />
        <ModalBlock title="Solution" text={project.solution} icon={<ServerCog />} />
        <ModalBlock title="Impact" text={project.impact} icon={<Sparkles />} />
      </div>
      <div className="mt-7 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm">
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-cyan-100"
        >
          {project.linkLabel ?? "View Link"} <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function AwardModal({ award }: { award: AwardItem }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-[#F7D774]">{award.date}</p>
      <h3 className="mt-3 text-4xl font-semibold uppercase text-[#F7D774]">{award.title}</h3>
      <object className="mt-6 h-[65vh] w-full rounded-2xl bg-white" data={award.href} type="application/pdf">
        <a href={award.href} target="_blank" rel="noreferrer">Open certificate</a>
      </object>
    </div>
  );
}

function ThesisModal() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">IIT Guwahati Research</p>
      <h3 className="mt-3 text-4xl font-semibold uppercase">Cross-Lingual NLP Thesis</h3>
      <p className="mt-5 max-w-3xl text-lg text-[#D7E2EA]/70">
        Compact research foundation in contextual word embeddings, BERT, cross-lingual transfer, Indian languages, and
        named entity recognition. Guide: Dr. Ashish Anand.
      </p>
      <object className="mt-6 h-[60vh] w-full rounded-2xl bg-white" data="/assets/thesis/MTP_PHASE_2_CLWE.pdf" type="application/pdf">
        <a href="/assets/thesis/MTP_PHASE_2_CLWE.pdf" target="_blank" rel="noreferrer">Open thesis</a>
      </object>
    </div>
  );
}

function ModalBlock({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="text-cyan-200 [&_svg]:h-7 [&_svg]:w-7">{icon}</div>
      <h4 className="mt-4 text-xl font-semibold uppercase">{title}</h4>
      <p className="mt-3 text-[#D7E2EA]/65">{text}</p>
    </div>
  );
}

export default App;
