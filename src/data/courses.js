export const courses = [
  {
    id: "figma",
    title: "Learn Figma from Basic",
    image: "course-figma.webp",
    tags: ["UI/UX Design", "Design", "Drawing & Painting", "Graphic Design"],
    description:
      "Turn your ideas into beautiful interfaces. Explore the fundamentals of Figma, from your first frame to a shareable, interactive prototype.",
  },
  {
    id: "digital",
    title: "Build Digital Asset",
    image: "course-digital.webp",
    tags: [
      "Digital Illustration",
      "Design",
      "Animation",
      "Creative Marketing",
      "Crafts",
      "Photography",
    ],
    description:
      "Build a collection of digital assets with a consistent visual style. Develop your creative process and make work you are proud to share.",
  },
  {
    id: "data",
    title: "the Power of Big Data",
    image: "course-data.webp",
    tags: ["Data Science", "Web Development", "Development", "IT & Software"],
    description:
      "Discover the stories behind the numbers. Learn the essentials of data analysis, visualization, and making informed decisions.",
  },
  {
    id: "productivity",
    title: "Balancing Productivity and Wellbeing",
    image: "course-productivity.webp",
    tags: ["Productivity", "Business", "Music", "Film & Video"],
    description:
      "Create a routine that works for you. Learn practical approaches to focus, prioritization, and sustainable productivity.",
  },
  {
    id: "finance",
    title: "Mastering Money Management",
    image: "course-finance.webp",
    tags: ["Finance", "Business"],
    description:
      "Build confidence with everyday financial concepts, budgeting, and setting your personal money goals.",
  },
  {
    id: "startup",
    title: "From Idea to Startup Success",
    image: "course-startup.webp",
    tags: [
      "Freelance & Entrepreneurship",
      "Marketing",
      "Social Media",
      "Business",
    ],
    description:
      "Take the first steps from a new idea to a business. Explore research, planning, and communicating your vision.",
  },
];
export const categories = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
];

// The first six cards reproduce the supplied design; additional entries make
// filtering, sorting and pagination useful without requiring a backend.
const extraTitles = [
  [
    "Interface Design Essentials",
    "Design Systems in Figma",
    "Interactive Prototyping",
    "Accessible Product Design",
  ],
  [
    "Creative Digital Illustration",
    "Brand Assets from Scratch",
    "Typography for Digital Creators",
    "Building a Creative Portfolio",
  ],
  [
    "Data Visualization Essentials",
    "Getting Started with Analytics",
    "Web Development Foundations",
    "Practical Data Storytelling",
  ],
  [
    "A More Focused Workday",
    "Creative Project Planning",
    "Sustainable Work Habits",
    "Organizing Your Creative Practice",
  ],
  [
    "Budgeting for Beginners",
    "Finance for Freelancers",
    "Planning Your Financial Goals",
    "Understanding Business Numbers",
  ],
  [
    "Finding Your First Customers",
    "Social Media for Creators",
    "Building Your Brand",
    "From Freelancer to Founder",
  ],
];
export const catalogCourses = [
  ...courses.map((c) => ({
    ...c,
    price: 25,
    rating: 4.5,
    level: "Beginner",
    baseId: c.id,
  })),
  ...extraTitles.flatMap((titles, family) =>
    titles.map((title, index) => ({
      ...courses[family],
      id: `${courses[family].id}-${index + 2}`,
      baseId: courses[family].id,
      title,
      price: [19, 29, 39, 49][index],
      rating: [4.6, 4.8, 4.7, 4.9][index],
      level: index < 2 ? "Intermediate" : "Advanced",
    })),
  ),
];
export function findCourse(id) {
  return catalogCourses.find((course) => course.id === id);
}
export const creator = {
  id: "purepearl-studio",
  name: "PurePearl Studio",
  role: "Passionate UI/UX, Web designer",
  avatar: "avatar-1.webp",
  followers: 12,
  bio: "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
  portfolio:
    "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
};
