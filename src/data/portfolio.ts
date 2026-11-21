export type AccentColor =
  | "cyan"
  | "mint"
  | "teal"
  | "amber"
  | "lavender"
  | "coral"
  | "indigo";

export interface BioSegment {
  text: string;
  highlight?: boolean; // Renders in warm amber (#e0af68)
}

export interface SkillItem {
  name: string;
  /** Suggested react-icons/si or lucide-react icon name */
  icon: string;
  category:
    | "language"
    | "frontend"
    | "backend"
    | "database"
    | "ml"
    | "tool"
    | "coursework";
  accent: AccentColor;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface AchievementItem {
  title: string;
  detail: string;
}

export interface SocialLinks {
  resume: string;
  email: string;
  github: string;
  linkedin: string;
  x?: string;
  discord?: string;
  instagram?: string;
}

export interface PortfolioData {
  name: string;
  handle: string;
  location: string;
  npxCommand: string;
  avatar: string;
  tagline: {
    line1: string;
    line2: string;
    line3Parts: { text: string; accent?: "mint" | "cyan" | "amber" }[];
  };
  bio: BioSegment[];
  links: SocialLinks;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  footer: {
    signOff: string;
  };
}

/**
 * Tokyo Night / IDE-inspired accent map matching the design system.
 * Use these hex values for border colors and 3D hard-offset shadows:
 * `box-shadow: 4px 4px 0px <hex>`
 */
export const ACCENT_HEX: Record<AccentColor, string> = {
  cyan: "#7dcfff",
  mint: "#73daca",
  teal: "#2ac3de",
  amber: "#e0af68",
  lavender: "#bb9af7",
  coral: "#f7768e",
  indigo: "#7aa2f7",
};
export const portfolioData: PortfolioData = {
  name: "Jitendra Kumar Rana",
  handle: "jit1006",
  location: "Bhopal, Madhya Pradesh, India",
  npxCommand: "npx jit1006", // Publish an npm CLI card or replace with your preferred command
  avatar: "/images/avatar.jpg", // TODO: Add your portrait photo in public/images/avatar.jpg

  tagline: {
    line1: "Developer.",
    line2: "Backend & ML Engineer.",
    line3Parts: [
      { text: "Turns " },
      { text: "ideas", accent: "mint" },
      { text: " into scalable " },
      { text: "code", accent: "mint" },
      { text: "." },
    ],
  },

  bio: [
    { text: "Aspiring Software Engineer pursuing my " },
    { text: "MCA at MANIT Bhopal", highlight: true },
    { text: " with a strong foundation in " },
    { text: "Backend Development", highlight: true },
    { text: " and " },
    { text: "Data Structures & Algorithms", highlight: true },
    { text: ". Experienced in building " },
    { text: "Deep Learning", highlight: true },
    { text: " & " },
    { text: "CNN", highlight: true },
    { text: " models alongside scalable " },
    { text: "MERN stack", highlight: true },
    {
      text: " applications. Passionate about solving real-world problems with ",
    },
    { text: "Machine Learning", highlight: true },
    { text: ", " },
    { text: "AI", highlight: true },
    { text: ", and " },
    { text: "cloud technologies", highlight: true },
    { text: "." },
  ],

  links: {
    resume: "https://drive.google.com/file/d/1y34jLqiHv-ON4SavQmQWDbkRKfTAVcHL/view?usp=sharing", // TODO: Place Jitendra Kumar Rana 06O.pdf in public/resume.pdf (or use a Drive link)
    email: "mailto:jitendrarananitbhopal@gmail.com",
    github: "https://github.com/jit1006",
    linkedin: "https://www.linkedin.com/in/jitendra-kumar-rana",
    x: "", // TODO: Add your X/Twitter URL or omit to hide the icon
    discord: "", // TODO: Add your Discord URL or omit to hide the icon
    instagram: "https://www.instagram.com/_jk.rana/", // TODO: Add your Instagram URL or omit to hide the icon
  },

  skills: [
    // Programming Languages (Cyan)
    { name: "C++", icon: "SiCplusplus", category: "language", accent: "cyan" },
    { name: "JavaScript", icon: "SiJavascript", category: "language", accent: "cyan" },
    { name: "TypeScript", icon: "SiTypescript", category: "language", accent: "cyan" },
    { name: "Python", icon: "SiPython", category: "language", accent: "cyan" },
    { name: "SQL", icon: "Database", category: "language", accent: "cyan" },

    // Frontend & Backend Frameworks (Mint)
    { name: "React.js", icon: "SiReact", category: "frontend", accent: "mint" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", accent: "mint" },
    { name: "HTML", icon: "SiHtml5", category: "frontend", accent: "mint" },
    { name: "CSS", icon: "SiCss", category: "frontend", accent: "mint" },
    { name: "Node.js", icon: "SiNodedotjs", category: "backend", accent: "mint" },
    { name: "Express.js", icon: "SiExpress", category: "backend", accent: "mint" },
    { name: "RESTful APIs", icon: "Server", category: "backend", accent: "mint" },
    { name: "JWT Auth", icon: "SiJsonwebtokens", category: "backend", accent: "mint" },

    // Databases (Teal)
    { name: "MongoDB", icon: "SiMongodb", category: "database", accent: "teal" },
    { name: "MySQL", icon: "SiMysql", category: "database", accent: "teal" },

    // Machine Learning & Data (Lavender)
    { name: "TensorFlow / Keras", icon: "SiTensorflow", category: "ml", accent: "lavender" },
    { name: "Scikit-learn", icon: "SiScikitlearn", category: "ml", accent: "lavender" },
    { name: "CNN / Xception", icon: "Brain", category: "ml", accent: "lavender" },
    { name: "Pandas", icon: "SiPandas", category: "ml", accent: "lavender" },
    { name: "NumPy", icon: "SiNumpy", category: "ml", accent: "lavender" },
    { name: "Matplotlib", icon: "BarChart3", category: "ml", accent: "lavender" },
    { name: "Seaborn", icon: "LineChart", category: "ml", accent: "lavender" },

    // Tools & Collaboration (Amber)
    { name: "Git", icon: "SiGit", category: "tool", accent: "amber" },
    { name: "GitHub", icon: "SiGithub", category: "tool", accent: "amber" },
    { name: "Postman", icon: "SiPostman", category: "tool", accent: "amber" },
    { name: "Notion", icon: "SiNotion", category: "tool", accent: "amber" },
    { name: "Excalidraw", icon: "PenTool", category: "tool", accent: "amber" },

    // Core CS Coursework (Coral)
    { name: "DSA", icon: "Code2", category: "coursework", accent: "coral" },
    { name: "OS", icon: "Cpu", category: "coursework", accent: "coral" },
    { name: "DBMS", icon: "HardDrive", category: "coursework", accent: "coral" },
    { name: "Computer Networks", icon: "Network", category: "coursework", accent: "coral" },
  ],

  projects: [
    {
      id: "prime-deal",
      title: "Prime Deal",
      subtitle: "E-Commerce Website",
      date: "07/2025",
      description:
        "Full-stack e-commerce platform connecting local shops with nearby customers to discover, compare, and purchase products from local stores.",
      highlights: [
        "Built scalable RESTful APIs with Node.js and Express.js for authentication, shop management, product inventory, cart operations, checkout, and order processing.",
        "Implemented JWT-based authentication using Express middleware to protect routes and authorize users.",
      ],
      techStack: [
        "TypeScript",
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MySQL",
        "JWT",
      ],
      githubUrl: "https://github.com/jit1006", // TODO: Replace with exact Prime Deal repository URL
      image: "/images/projects/prime-deal.png", // TODO: Add screenshot in public/images/projects/
    },
    {
      id: "skin-disease-detector",
      title: "Skin Scan",
      subtitle: "CNN-based Image Classification",
      date: "01/2026",
      description:
        "7-class skin lesion classification system built with transfer learning on ImageNet pre-trained Xception in TensorFlow/Keras, achieving 90% test accuracy and 0.90 weighted F1-score on 1,656 images.",
      highlights: [
        "Used a two-stage training strategy: feature extraction with frozen base layers (15 epochs) followed by fine-tuning the top 20 layers (10 epochs) with a reduced learning rate, reaching 87% validation accuracy.",
        "Applied stratified 75/15/10 splitting and evaluated with confusion matrix, per-class accuracy, precision, recall, and F1-score.",
      ],
      techStack: [
        "Python",
        "TensorFlow/Keras",
        "Xception",
        "CNN",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
      ],
      githubUrl: "https://github.com/jit1006/Skin-scan",
      liveUrl: "https://huggingface.co/spaces/jkrrana/skin-di",
      image: "/images/projects/skinScan.png", // TODO: Add screenshot in public/images/projects/
    },
  ],

  education: [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "Maulana Azad National Institute of Technology, Bhopal",
      period: "Aug 2024 – Aug 2027",
      score: "CGPA: 8.27",
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Vinoba Bhave University, Hazaribagh",
      period: "Aug 2020 – Aug 2023",
      score: "CGPA: 7.39",
    },
  ],

  achievements: [
    {
      title: "BNP Paribas Innoversité 3.0 Hackathon 2026",
      detail:
        "Selected for the Grand Finale and participated in the 24-hour offline hackathon.",
    },
    {
      title: "NIMCET 2024",
      detail: "Ranked 394 (All India Rank).",
    },
  ],

  footer: {
    signOff: "Made with ❤️, Thank You",
  },
};
