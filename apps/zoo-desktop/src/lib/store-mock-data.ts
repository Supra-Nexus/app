// Mock data for the Zoo Store - easily editable static JSON
// Replace with actual backend API calls when ready

export const MOCK_STORE_AGENTS = [
  {
    id: "zoo-eco-agent",
    name: "Zoo Eco Assistant",
    description: "An eco-friendly AI assistant focused on sustainability and environmental awareness. Helps with green living tips, carbon footprint calculations, and eco-conscious decision making.",
    author: "Zoo AI Team",
    downloads: 15420,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-eco-assistant",
    category: {
      id: "sustainability",
      name: "Sustainability",
      description: "Agents focused on environmental and sustainability topics",
      examples: "Carbon tracking, eco tips, green living"
    }
  },
  {
    id: "zoo-coder-agent",
    name: "Zoo Code Master",
    description: "Advanced coding assistant with expertise in multiple programming languages. Specializes in code review, debugging, and architecture design.",
    author: "Zoo AI Team",
    downloads: 28350,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-code-master",
    category: {
      id: "development",
      name: "Development",
      description: "Programming and software development assistants",
      examples: "Code review, debugging, architecture"
    }
  },
  {
    id: "zoo-creative-agent",
    name: "Zoo Creative Studio",
    description: "Creative writing and content generation specialist. Helps with storytelling, marketing copy, and artistic brainstorming.",
    author: "Zoo AI Team",
    downloads: 9876,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-creative-studio",
    category: {
      id: "creative",
      name: "Creative",
      description: "Creative writing and content generation",
      examples: "Stories, marketing, brainstorming"
    }
  },
  {
    id: "zoo-data-analyst",
    name: "Zoo Data Analyst",
    description: "Data analysis and visualization expert. Helps with data interpretation, statistical analysis, and creating insightful reports.",
    author: "Zoo AI Team",
    downloads: 12543,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-data-analyst",
    category: {
      id: "analytics",
      name: "Analytics",
      description: "Data analysis and business intelligence",
      examples: "Statistics, reports, visualizations"
    }
  },
  {
    id: "zoo-tutor-agent",
    name: "Zoo Learning Companion",
    description: "Educational assistant for personalized learning. Adapts to your learning style and helps with various subjects.",
    author: "Zoo AI Team",
    downloads: 18920,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-learning-companion",
    category: {
      id: "education",
      name: "Education",
      description: "Learning and educational assistants",
      examples: "Tutoring, homework help, study guides"
    }
  },
  {
    id: "zoo-health-agent",
    name: "Zoo Wellness Coach",
    description: "Health and wellness advisor providing fitness tips, nutrition guidance, and mental health support.",
    author: "Zoo AI Team",
    downloads: 7654,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-wellness-coach",
    category: {
      id: "health",
      name: "Health & Wellness",
      description: "Health, fitness, and wellness guidance",
      examples: "Fitness, nutrition, mindfulness"
    }
  },
  {
    id: "zoo-finance-agent",
    name: "Zoo Finance Advisor",
    description: "Personal finance assistant for budgeting, investment insights, and financial planning.",
    author: "Zoo AI Team",
    downloads: 11234,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-finance-advisor",
    category: {
      id: "finance",
      name: "Finance",
      description: "Financial planning and investment guidance",
      examples: "Budgeting, investing, planning"
    }
  },
  {
    id: "zoo-research-agent",
    name: "Zoo Research Assistant",
    description: "Academic and professional research helper. Assists with literature reviews, citations, and fact-checking.",
    author: "Zoo AI Team",
    downloads: 14567,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-research-assistant",
    category: {
      id: "research",
      name: "Research",
      description: "Academic and professional research",
      examples: "Literature review, citations, fact-checking"
    }
  },
  {
    id: "zoo-travel-agent",
    name: "Zoo Travel Planner",
    description: "Travel planning assistant for creating itineraries, finding deals, and discovering destinations.",
    author: "Zoo AI Team",
    downloads: 8901,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-travel-planner",
    category: {
      id: "travel",
      name: "Travel",
      description: "Travel planning and recommendations",
      examples: "Itineraries, destinations, travel tips"
    }
  },
  {
    id: "zoo-legal-agent",
    name: "Zoo Legal Assistant",
    description: "Legal document assistant for contract reviews, legal research, and general legal guidance (not legal advice).",
    author: "Zoo AI Team",
    downloads: 6543,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-legal-assistant",
    category: {
      id: "legal",
      name: "Legal",
      description: "Legal document assistance and research",
      examples: "Contracts, legal research, documents"
    }
  }
];

export const MOCK_STORE_TOOLS = [
  {
    id: "zoo-python-runner",
    name: "Python Code Runner",
    description: "Execute Python code safely in an isolated environment with full standard library support.",
    author: "Zoo AI Team",
    downloads: 45678,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-python-runner",
    category: {
      id: "development",
      name: "Development Tools",
      description: "Code execution and development utilities",
      examples: "Code runners, debuggers, formatters"
    }
  },
  {
    id: "zoo-web-scraper",
    name: "Web Scraper Pro",
    description: "Advanced web scraping tool with CSS selectors, XPath, and JavaScript rendering support.",
    author: "Zoo AI Team",
    downloads: 23456,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-web-scraper",
    category: {
      id: "data",
      name: "Data Tools",
      description: "Data collection and processing tools",
      examples: "Scrapers, parsers, converters"
    }
  },
  {
    id: "zoo-api-tester",
    name: "API Testing Suite",
    description: "Comprehensive API testing tool with request builder, response validation, and test automation.",
    author: "Zoo AI Team",
    downloads: 19876,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-api-tester",
    category: {
      id: "development",
      name: "Development Tools",
      description: "API development and testing",
      examples: "API testing, debugging, documentation"
    }
  },
  {
    id: "zoo-image-processor",
    name: "Image Processor",
    description: "Image manipulation tool with resize, crop, filter, and format conversion capabilities.",
    author: "Zoo AI Team",
    downloads: 34567,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-image-processor",
    category: {
      id: "media",
      name: "Media Tools",
      description: "Image and media processing",
      examples: "Image editing, conversion, optimization"
    }
  },
  {
    id: "zoo-pdf-toolkit",
    name: "PDF Toolkit",
    description: "PDF manipulation suite for merging, splitting, extracting, and converting PDF documents.",
    author: "Zoo AI Team",
    downloads: 28901,
    iconUrl: "/zoo-icon.svg",
    routerKey: "zoo-pdf-toolkit",
    category: {
      id: "documents",
      name: "Document Tools",
      description: "Document processing and management",
      examples: "PDF editing, conversion, extraction"
    }
  }
];

// Mock tool details (when fetching a specific tool)
export const MOCK_TOOL_DETAILS: Record<string, any> = {
  "zoo-python-runner": {
    id: "zoo-python-runner",
    name: "Python Code Runner",
    description: "Execute Python code safely in an isolated environment with full standard library support.",
    longDescription: `
# Python Code Runner

A powerful and secure Python code execution environment that runs code in isolated containers.

## Features
- Full Python 3.11+ support
- Standard library included
- Popular data science libraries (numpy, pandas, matplotlib)
- Syntax highlighting and error reporting
- Variable inspection and debugging
- Code completion and IntelliSense

## Usage
Simply write or paste your Python code and click run. The tool will execute your code in a secure sandbox and return the results.

## Security
All code runs in isolated Docker containers with limited resources and no network access by default.
    `,
    author: "Zoo AI Team",
    version: "1.2.0",
    downloads: 45678,
    rating: 4.8,
    reviews: 234,
    iconUrl: "/zoo-icon.svg",
    screenshots: [
      "/screenshots/python-runner-1.png",
      "/screenshots/python-runner-2.png"
    ],
    requirements: {
      os: ["Windows 10+", "macOS 11+", "Linux"],
      runtime: "Docker Desktop",
      memory: "2GB RAM minimum"
    },
    pricing: {
      type: "free",
      price: 0
    },
    tags: ["python", "code", "development", "programming", "scripting"],
    lastUpdated: "2024-01-15",
    installCommand: "zoo install zoo-python-runner"
  },
  // Add more tool details as needed
};

// Mock store categories
export const MOCK_STORE_CATEGORIES = [
  {
    id: "development",
    name: "Development",
    description: "Programming and software development tools",
    icon: "🛠️",
    itemCount: 42
  },
  {
    id: "creative",
    name: "Creative",
    description: "Creative writing and content generation",
    icon: "🎨",
    itemCount: 28
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Data analysis and business intelligence",
    icon: "📊",
    itemCount: 35
  },
  {
    id: "education",
    name: "Education",
    description: "Learning and educational assistants",
    icon: "📚",
    itemCount: 31
  },
  {
    id: "health",
    name: "Health & Wellness",
    description: "Health, fitness, and wellness guidance",
    icon: "💪",
    itemCount: 19
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial planning and investment",
    icon: "💰",
    itemCount: 23
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Task management and productivity tools",
    icon: "⚡",
    itemCount: 38
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email, chat, and communication tools",
    icon: "💬",
    itemCount: 27
  }
];

// Mock featured collections
export const MOCK_FEATURED_COLLECTIONS = [
  {
    id: "trending-2024",
    name: "Trending in 2024",
    description: "Most popular agents and tools this year",
    items: ["zoo-eco-agent", "zoo-coder-agent", "zoo-python-runner"],
    icon: "🔥"
  },
  {
    id: "editors-choice",
    name: "Editor's Choice",
    description: "Hand-picked by the Zoo team",
    items: ["zoo-creative-agent", "zoo-data-analyst", "zoo-web-scraper"],
    icon: "⭐"
  },
  {
    id: "new-releases",
    name: "New Releases",
    description: "Recently added to the store",
    items: ["zoo-legal-agent", "zoo-travel-agent", "zoo-pdf-toolkit"],
    icon: "🆕"
  }
];

// Mock user's purchased/installed items
export const MOCK_USER_PURCHASES = [
  "zoo-eco-agent",
  "zoo-python-runner",
  "zoo-web-scraper"
];

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock search function
export const searchStore = async (query: string, type?: 'agent' | 'tool' | 'all') => {
  await simulateApiDelay();
  
  const allItems = [
    ...MOCK_STORE_AGENTS.map(a => ({ ...a, type: 'agent' })),
    ...MOCK_STORE_TOOLS.map(t => ({ ...t, type: 'tool' }))
  ];
  
  const filtered = allItems.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                        item.description.toLowerCase().includes(query.toLowerCase());
    const matchesType = !type || type === 'all' || item.type === type;
    return matchesQuery && matchesType;
  });
  
  return filtered;
};