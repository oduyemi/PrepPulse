export type TrackKey = "fullstack" | "hr" | "pm";

export const TRACKS = {
  fullstack: {
    title: "Fullstack Development Track",
    intro:
      "Master both frontend and backend systems and prepare for real-world engineering interviews.",
    foundationCourse: {
      title: "Fullstack Foundations",
      duration: "2–3 hours",
      level: "Beginner → Intermediate",
      description:
        "Build a solid mental model of how modern web apps actually work — before diving into assessments.",
      modules: [
        "Client → Server architecture",
        "React component thinking",
        "APIs & data flow",
      ],
    },
    aiInsight:
      "Most candidates struggle with connecting frontend logic to backend systems. This track will help you bridge that gap early.",
    coreConcepts: [
      "React fundamentals",
      "API integration",
      "Database basics",
    ],
    testedOn: [
      "System thinking",
      "Frontend architecture",
      "Backend logic",
    ],
    expectations: [
      "Build real-world apps",
      "Think end-to-end",
      "Write scalable code",
    ],
  },

  hr: {
    title: "Human Resource Track",
    intro:
      "Prepare for HR roles focusing on recruitment, employee engagement, and organizational development.",
    foundationCourse: {
      title: "HR Foundations",
      duration: "1.5–2 hours",
      level: "Beginner → Intermediate",
      description:
        "Understand the fundamentals of managing people, processes, and workplace systems.",
      modules: [
        "Recruitment lifecycle",
        "Employee engagement basics",
        "HR policies & compliance",
      ],
    },
    aiInsight:
      "Candidates often struggle with behavioral evaluation and real-world HR scenarios. This track strengthens those areas.",
    coreConcepts: [
      "Talent acquisition",
      "Employee relations",
      "HR systems",
    ],
    testedOn: [
      "Behavioral interviews",
      "Conflict resolution",
      "Organizational culture",
    ],
    expectations: [
      "Manage recruitment cycles",
      "Support employee growth",
      "Improve workplace systems",
    ],
  },

  pm: {
    title: "Project Management Track",
    intro:
      "Prepare for project management roles with focus on planning, execution, and delivery.",
    foundationCourse: {
      title: "PM Foundations",
      duration: "2 hours",
      level: "Beginner → Intermediate",
      description:
        "Learn how modern teams plan, execute, and deliver successful projects.",
      modules: [
        "Agile & Scrum basics",
        "Project lifecycle",
        "Stakeholder communication",
      ],
    },
    aiInsight:
      "Many candidates struggle with balancing scope, time, and communication. This track helps build structured thinking.",
    coreConcepts: [
      "Agile methodology",
      "Planning & estimation",
      "Team coordination",
    ],
    testedOn: [
      "Risk management",
      "Timeline planning",
      "Resource allocation",
    ],
    expectations: [
      "Deliver projects efficiently",
      "Coordinate teams",
      "Manage project lifecycle",
    ],
  },
};