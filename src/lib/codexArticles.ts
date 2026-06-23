// Codex Articles — locked authority hub content map.
// Each entry powers /codex/<slug> stub pages with Article + FAQ schema.
export interface CodexArticle {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  targetKeyword: string;
  pillar: string;
  relatedSlug: string;
  showSchoolsLink: boolean;
  showEssenceLink: boolean;
  intro: string;
  faqs: { q: string; a: string }[];
}

export const codexArticles: CodexArticle[] = [
  {
    slug: "what-is-emotional-intelligence-for-men",
    shortTitle: "Emotional Intelligence for Men",
    title:
      "What Emotional Intelligence Actually Means for Men (And Why It's Not Weakness)",
    description:
      "Emotional intelligence for men explained — self-awareness, regulation, and relational skill. Not softness. Poised Gentlemen Codex.",
    targetKeyword: "emotional intelligence for men",
    pillar: "Emotional Intelligence",
    relatedSlug: "four-pillars-of-character",
    showSchoolsLink: true,
    showEssenceLink: false,
    intro:
      "Emotional intelligence has been mistranslated for a generation of men. Properly defined, it is the capacity to read your own internal state, regulate it under pressure, and respond — instead of react — to the people in front of you. This is not softness. It is operational discipline applied to the human nervous system.",
    faqs: [
      {
        q: "Is emotional intelligence the same as being sensitive?",
        a: "No. Sensitivity is a temperament; emotional intelligence is a trained skill. A high-EQ man can stand under pressure precisely because he can name what he is feeling without being run by it.",
      },
      {
        q: "Can emotional intelligence be taught to boys?",
        a: "Yes. Our programs operationalize EQ as a teachable framework — language for emotion, regulation tools, and rehearsed responses — beginning as early as middle school.",
      },
    ],
  },
  {
    slug: "modern-masculinity",
    shortTitle: "Modern Masculinity: Poised vs. Stoic",
    title: "Defining Modern Masculinity: Poised vs. Stoic",
    description:
      "Modern masculinity, defined. Why 'poised' is a more accurate frame than 'stoic' for today's men — and the boys raising up after them.",
    targetKeyword: "modern masculinity",
    pillar: "Integrity",
    relatedSlug: "boys-to-men",
    showSchoolsLink: false,
    showEssenceLink: true,
    intro:
      "Modern masculinity is not stoicism with better lighting. Stoicism, as it tends to be performed online, often collapses into emotional suppression. Poise is different: it is the capacity to feel fully, think clearly, and act with intention. The difference matters — for the man in the mirror, and for the boy watching him.",
    faqs: [
      {
        q: "Why use 'poised' instead of 'stoic'?",
        a: "Stoic, in modern usage, has been reduced to 'do not feel.' Poised means composed under load — present, regulated, and decisive. It is a higher standard, not a softer one.",
      },
      {
        q: "Is modern masculinity at odds with traditional values?",
        a: "No. The Four Pillars — Integrity, Strength, Emotional Intelligence, Discipline — are old virtues, restated for today's terrain.",
      },
    ],
  },
  {
    slug: "how-to-build-discipline",
    shortTitle: "How to Build Discipline",
    title: "How to Build Discipline: A Framework for Men and Boys",
    description:
      "How to build discipline as a man — the framework we teach men and boys in our programs. Identity, environment, reps, review.",
    targetKeyword: "how to build discipline men",
    pillar: "Discipline",
    relatedSlug: "teen-grooming-routine",
    showSchoolsLink: true,
    showEssenceLink: false,
    intro:
      "Discipline is not motivation. Motivation is weather; discipline is climate. The men and boys who hold the line do so because they have built an identity, an environment, a set of reps, and a review cadence that no longer requires them to feel like it on any given morning.",
    faqs: [
      {
        q: "What is the fastest way to build discipline?",
        a: "There is no fastest way. There is only the smallest sustainable rep, repeated without negotiation, until it becomes who you are.",
      },
      {
        q: "How do you teach discipline to a teenage boy?",
        a: "Through structure, mirroring, and small wins he owns. Lecture builds resentment; rehearsed routine builds identity.",
      },
    ],
  },
  {
    slug: "teen-grooming-routine",
    shortTitle: "The Teen Grooming Routine",
    title: "The Teen Grooming Routine That Builds Habits, Not Just Hygiene",
    description:
      "A teen grooming routine designed to build discipline, not just clean skin. Morning and evening protocols for boys 12–17.",
    targetKeyword: "teen grooming routine",
    pillar: "Discipline",
    relatedSlug: "how-to-build-discipline",
    showSchoolsLink: false,
    showEssenceLink: true,
    intro:
      "Grooming is the easiest place to install discipline in a teenage boy because the feedback loop is immediate and visible. A correctly framed morning and evening routine is not about smelling good — it is the first time most boys experience that they are responsible for the version of themselves the world meets.",
    faqs: [
      {
        q: "When should a boy start a grooming routine?",
        a: "Between ages 11 and 13 is ideal. Earlier is fine if the parent frames it as habit-building, not vanity.",
      },
      {
        q: "How long should the routine take?",
        a: "Five to seven minutes, twice a day. Long enough to be intentional, short enough to be sustainable.",
      },
    ],
  },
  {
    slug: "father-figure-vs-mentor",
    shortTitle: "Father Figure vs. Mentor",
    title: "Father Figure vs. Mentor: What Boys Actually Need",
    description:
      "Father figure vs. mentor — the difference matters. What boys actually need from each, and how families can build both.",
    targetKeyword: "father figure vs mentor",
    pillar: "Integrity",
    relatedSlug: "boys-to-men",
    showSchoolsLink: true,
    showEssenceLink: false,
    intro:
      "A father figure carries presence; a mentor carries pattern. Boys need both — and they are not interchangeable. Understanding the difference helps parents, guardians, and the men in a boy's life stop competing and start collaborating.",
    faqs: [
      {
        q: "Can a mentor replace a father?",
        a: "No. A mentor can complement, scaffold, and accelerate — but the role of father figure carries a unique relational weight that mentorship is not designed to replicate.",
      },
      {
        q: "How do I find a mentor for my son?",
        a: "Start with structured programs that vet and train their mentors. Informal arrangements are valuable but harder to sustain.",
      },
    ],
  },
  {
    slug: "four-pillars-of-character",
    shortTitle: "The Four Pillars of Character",
    title:
      "The Four Pillars of Character Development: Integrity, Strength, EQ, Discipline",
    description:
      "Character development for boys, organized around four teachable pillars — the framework behind every Poised Gentlemen program.",
    targetKeyword: "character development for boys",
    pillar: "Four Pillars",
    relatedSlug: "what-is-integrity",
    showSchoolsLink: true,
    showEssenceLink: false,
    intro:
      "Character is not a vibe. It is a structure with parts that can be named, taught, measured, and rebuilt. We organize the work into four pillars — Integrity, Strength, Emotional Intelligence, and Discipline — because boys cannot work on what no one has bothered to name for them.",
    faqs: [
      {
        q: "Why four pillars and not more?",
        a: "Four is the smallest set that still covers the moral, physical, emotional, and behavioral domains of a young man's life. More creates noise; fewer leaves gaps.",
      },
      {
        q: "At what age should character development start?",
        a: "Formally, ages 10–13 is the high-leverage window. Informally, it begins the day a boy starts watching the men around him.",
      },
    ],
  },
  {
    slug: "what-is-integrity",
    shortTitle: "What Integrity Looks Like in a Young Man",
    title:
      "What Integrity Looks Like in a Young Man — and How to Teach It",
    description:
      "Integrity for young men, made concrete. What it looks like in daily behavior, and how parents and mentors actually teach it.",
    targetKeyword: "integrity for young men",
    pillar: "Integrity",
    relatedSlug: "four-pillars-of-character",
    showSchoolsLink: true,
    showEssenceLink: false,
    intro:
      "Integrity is not a speech a young man gives; it is the gap between what he says alone and what he does in a crowd. Teaching it requires making that gap visible, observable, and small enough to close.",
    faqs: [
      {
        q: "How do you teach integrity?",
        a: "Through repeated, low-stakes opportunities to keep small promises — to himself first, then to others — paired with honest review.",
      },
      {
        q: "What undermines integrity in young men the fastest?",
        a: "Performing for an audience. The phone has industrialized this. Structured environments that reward private consistency reverse it.",
      },
    ],
  },
  {
    slug: "boys-to-men",
    shortTitle: "From Boys to Men",
    title: "From Boys to Men: What the Transition Actually Requires",
    description:
      "Boys to men development — the rites, frameworks, and adult presence the transition actually requires. From the Poised Gentlemen Codex.",
    targetKeyword: "boys to men development",
    pillar: "Strength",
    relatedSlug: "father-figure-vs-mentor",
    showSchoolsLink: true,
    showEssenceLink: true,
    intro:
      "The transition from boy to man is not automatic and it is not optional. In the absence of structure, the culture installs a default — usually a poor one. The work is to replace the default with a deliberate framework: rites of responsibility, adult presence, and a clear standard of what 'man' means in this household.",
    faqs: [
      {
        q: "What does a boy need to become a man?",
        a: "Responsibility he cannot delegate, adult men who hold a standard, and a community that notices when he meets it.",
      },
      {
        q: "Is there a specific age this happens?",
        a: "There is no single age. The window opens around 12 and closes — for better or worse — somewhere between 18 and 22.",
      },
    ],
  },
];

export const getCodexArticleBySlug = (slug: string) =>
  codexArticles.find((a) => a.slug === slug);
