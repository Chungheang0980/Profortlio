const portfolioData = {
  name: "Ly Chungheang",
  role: "AI Enthusiast & Software Developer",
  location: "Phnom Penh, Cambodia",
  email: "lychungheang16@gmail.com",
  phone: "",
  photo: "assets/profile.jpg",
  resume: "#",
  intro:
    "Data Science student building practical projects across Python, JavaScript, finance tools, data engineering, and security-focused software.",
  about:
    "I am a Data Science student focused on turning technical coursework and experiments into useful software. My experience includes Khmer OCR and license plate recognition research, IT event support, volunteer teaching, and GitHub projects in finance tools, data workflows, and security-focused software.",
  highlights: [
    { value: "5", label: "Public GitHub Repos" },
    { value: "Python", label: "Main Language" },
    { value: "JS", label: "Web Tools" }
  ],
  skills: [
    "Python",
    "JavaScript",
    "Machine Learning",
    "Data Analysis",
    "Data Engineering",
    "Computer Vision",
    "OCR",
    "YOLOv8",
    "CRNN-Keras",
    "Data Annotation",
    "Pandas",
    "SQL",
    "Finance Tools",
    "Security Concepts",
    "IT Support",
    "Java",
    "HTML",
    "CSS"
  ],
  education: [
    {
      period: "Jan 2023 - Present",
      title: "Undergraduate Bachelor's Degree",
      place: "Institute of Technology of Cambodia",
      text: "Major in Applied Mathematics and Statistics, currently in 4th year."
    },
    {
      period: "Jan 2023 - Present",
      title: "Adult English Program",
      place: "Institute of Foreign Languages",
      text: "Studying in the IFL Adult English Program."
    },
    {
      period: "Jan 2020 - Dec 2022",
      title: "Graduated from High School",
      place: "Preah Ang Duong High School",
      text: "Completed high school studies before starting undergraduate education."
    }
  ],
  experience: [
    {
      period: "June 2025 - August 2025",
      title: "Khmer OCR and Plate Recognition",
      place: "ReDA Laboratory, ITC",
      text: "Developed a Khmer license plate detection and OCR system for cars and motorbikes. Collected real-world image data, prepared annotations, applied YOLOv8 for plate detection, and used CRNN-Keras to recognize Khmer and Latin characters."
    },
    {
      period: "February 8 - 10, 2025",
      title: "22nd CamTESOL IT Support",
      place: "Institute of Technology of Cambodia, Building I",
      text: "Supported CamTESOL 2025 conference operations as an IT support staff member. Assisted with computers, projectors, audio equipment, and basic technical issue resolution for speakers and participants."
    },
    {
      period: "August 28 - 29, 2025",
      title: "BACLL Organizer-ACU",
      place: "Lycee Preah Angduong",
      text: "Helped with participant registration, communication, on-site event support, and logistics coordination to keep sessions organized and running on time."
    },
    {
      period: "February 2024 - March 2024",
      title: "Teaching Coordinator Volunteer",
      place: "The Church of Jesus Christ of Latter-day Saints, TSK",
      text: "Taught self-reliance classes focused on goal setting, planning, independent problem-solving, confidence, discipline, and self-management."
    }
  ],
  projects: [
    {
      title: "Bank Transaction Scanner",
      category: "OCR / Full-stack",
      description:
        "An OCR-based system for extracting transaction details from bank receipt images, with receipt classification and a FastAPI, Next.js, MongoDB processing workflow.",
      tools: ["Python", "FastAPI", "Next.js", "TensorFlow", "Tesseract OCR", "MongoDB"],
      link: "https://github.com/chantharith-NY/Bank-Transaction-Scanner"
    },
    {
      title: "Banking Security",
      category: "Python / Security",
      description:
        "A Python project focused on banking security concepts and protection logic for financial software workflows.",
      tools: ["Python", "Security", "Finance"],
      link: "https://github.com/Chungheang0980/Banking-Security"
    },
    {
      title: "Cambodia Tax Calculator",
      category: "Web Application",
      description:
        "A JavaScript project for calculating Cambodia tax values with a practical interface and clear calculation flow.",
      tools: ["JavaScript", "HTML", "CSS"],
      link: "https://github.com/Chungheang0980/Tax_Calculator_Cambodia"
    },
    {
      title: "Real-time Stock Market",
      category: "Python / Finance",
      description:
        "A Python project for working with stock market data in real time, focused on market tracking and analysis workflows.",
      tools: ["Python", "Data", "Finance"],
      link: "https://github.com/Chungheang0980/Stock_Market_realtime-"
    },
    {
      title: "Data Engineer",
      category: "Data Engineering",
      description:
        "A Python practice repository for data engineering concepts, data processing, and pipeline-oriented learning.",
      tools: ["Python", "Data Engineering", "ETL"],
      link: "https://github.com/Chungheang0980/data_engineer"
    }
  ],
  achievements: [
    {
      date: "Cognitive Class",
      readTime: "DS0301EN",
      title: "Data Science Certificate",
      description:
        "Cognitive Class certificate issued for completing the DS0301EN learning program.",
      tags: ["Data Science", "Cognitive Class"],
      link: "https://drive.google.com/file/d/1xSAj0ypifEzWqsRR6XMhed8uIS_fqmdM/view?usp=drive_link"
    },
    {
      date: "IBM",
      readTime: "PY0101EN",
      title: "Python Certificate",
      description:
        "IBM Cognitive Class certificate for completing the PY0101EN Python learning program.",
      tags: ["Python", "IBM"],
      link: "https://drive.google.com/file/d/1lh8R6bWNEtM2hSReceKzXxNrqvOb0wBj/view?usp=drive_link"
    },
    {
      date: "BACLL",
      readTime: "Organizer-ACU",
      title: "BACLL Organizer-ACU",
      description:
        "Certificate for organizer and on-site event support with participant registration, communication, and logistics coordination.",
      tags: ["Organizer", "Event Support"],
      link: "https://drive.google.com/file/d/1vdfCkbYytSnmUlHnjZ15iJJjPAKhC7VZ/view?usp=drive_link"
    },
    {
      date: "ITC",
      readTime: "June 5-6, 2025",
      title: "Scientific Day Volunteer",
      description:
        "Certificate of appreciation from the Department of Applied Mathematics and Statistics for volunteer contribution during Scientific Day.",
      tags: ["Volunteer", "ITC"],
      link: "https://drive.google.com/file/d/15UfClk23VpYZnnbd37_cImVdnqBm6_33/view?usp=drive_link"
    },
    {
      date: "CamTESOL",
      readTime: "IT Support",
      title: "22nd CamTESOL IT Support",
      description:
        "Certificate for supporting CamTESOL conference operations, technical setup, audio equipment, and participant assistance.",
      tags: ["IT Support", "Conference"],
      link: "https://drive.google.com/file/d/1hkSqZU3bDgTFuuWQ5dhZd_AuwcuI0qRW/view?usp=drive_link"
    }
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/Chungheang0980" },
    { label: "Telegram", url: "https://t.me/no_limited9" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ly-chungheang-306a9536b/" }
  ]
};
