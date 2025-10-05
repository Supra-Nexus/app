// Store data for the Supra Store - served from local JSON
// Can be updated from upstream API when available

import { supraLogoDataUrl } from '@supraai/logo';

export const STORE_AGENTS = [
  {
    id: "supra-eco-agent",
    name: "Supra Eco Assistant",
    description: "An eco-friendly AI assistant focused on sustainability and environmental awareness. Helps with green living tips, carbon footprint calculations, and eco-conscious decision making.",
    author: "Supra AI Team",
    downloads: 15420,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-eco-assistant",
    category: {
      id: "sustainability",
      name: "Sustainability",
      description: "Agents focused on environmental and sustainability topics",
      examples: "Carbon tracking, eco tips, green living"
    }
  },
  {
    id: "supra-coder-agent",
    name: "Supra Code Master",
    description: "Advanced coding assistant with expertise in multiple programming languages. Specializes in code review, debugging, and architecture design.",
    author: "Supra AI Team",
    downloads: 28350,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-code-master",
    category: {
      id: "development",
      name: "Development",
      description: "Programming and software development assistants",
      examples: "Code review, debugging, architecture"
    }
  },
  {
    id: "supra-creative-agent",
    name: "Supra Creative Studio",
    description: "Creative writing and content generation specialist. Helps with storytelling, marketing copy, and artistic brainstorming.",
    author: "Supra AI Team",
    downloads: 9876,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-creative-studio",
    category: {
      id: "creative",
      name: "Creative",
      description: "Creative writing and content generation",
      examples: "Stories, marketing, brainstorming"
    }
  },
  {
    id: "supra-data-analyst",
    name: "Supra Data Analyst",
    description: "Data analysis and visualization expert. Helps with data interpretation, statistical analysis, and creating insightful reports.",
    author: "Supra AI Team",
    downloads: 12543,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-data-analyst",
    category: {
      id: "analytics",
      name: "Analytics",
      description: "Data analysis and business intelligence",
      examples: "Statistics, reports, visualizations"
    }
  },
  {
    id: "supra-tutor-agent",
    name: "Supra Learning Companion",
    description: "Educational assistant for personalized learning. Adapts to your learning style and helps with various subjects.",
    author: "Supra AI Team",
    downloads: 18920,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-learning-companion",
    category: {
      id: "education",
      name: "Education",
      description: "Learning and educational assistants",
      examples: "Tutoring, homework help, study guides"
    }
  },
  {
    id: "supra-health-agent",
    name: "Supra Wellness Coach",
    description: "Health and wellness advisor providing fitness tips, nutrition guidance, and mental health support.",
    author: "Supra AI Team",
    downloads: 7654,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-wellness-coach",
    category: {
      id: "health",
      name: "Health & Wellness",
      description: "Health, fitness, and wellness guidance",
      examples: "Fitness, nutrition, mindfulness"
    }
  },
  {
    id: "supra-finance-agent",
    name: "Supra Finance Advisor",
    description: "Personal finance assistant for budgeting, investment insights, and financial planning.",
    author: "Supra AI Team",
    downloads: 11234,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-finance-advisor",
    category: {
      id: "finance",
      name: "Finance",
      description: "Financial planning and investment guidance",
      examples: "Budgeting, investing, planning"
    }
  },
  {
    id: "supra-research-agent",
    name: "Supra Research Assistant",
    description: "Academic and professional research helper. Assists with literature reviews, citations, and fact-checking.",
    author: "Supra AI Team",
    downloads: 14567,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-research-assistant",
    category: {
      id: "research",
      name: "Research",
      description: "Academic and professional research",
      examples: "Literature review, citations, fact-checking"
    }
  },
  {
    id: "supra-travel-agent",
    name: "Supra Travel Planner",
    description: "Travel planning assistant for creating itineraries, finding deals, and discovering destinations.",
    author: "Supra AI Team",
    downloads: 8901,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-travel-planner",
    category: {
      id: "travel",
      name: "Travel",
      description: "Travel planning and recommendations",
      examples: "Itineraries, destinations, travel tips"
    }
  },
  {
    id: "supra-legal-agent",
    name: "Supra Legal Assistant",
    description: "Legal document assistant for contract reviews, legal research, and general legal guidance (not legal advice).",
    author: "Supra AI Team",
    downloads: 6543,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-legal-assistant",
    category: {
      id: "legal",
      name: "Legal",
      description: "Legal document assistance and research",
      examples: "Contracts, legal research, documents"
    }
  }
];

export const STORE_TOOLS = [
  {
    id: "supra-python-runner",
    name: "Python Code Runner",
    description: "Execute Python code safely in an isolated environment with full standard library support.",
    author: "Supra AI Team",
    downloads: 45678,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-python-runner",
    category: {
      id: "development",
      name: "Development Tools",
      description: "Code execution and development utilities",
      examples: "Code runners, debuggers, formatters"
    }
  },
  {
    id: "supra-web-scraper",
    name: "Web Scraper Pro",
    description: "Advanced web scraping tool with CSS selectors, XPath, and JavaScript rendering support.",
    author: "Supra AI Team",
    downloads: 23456,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-web-scraper",
    category: {
      id: "data",
      name: "Data Tools",
      description: "Data collection and processing tools",
      examples: "Scrapers, parsers, converters"
    }
  },
  {
    id: "supra-api-tester",
    name: "API Testing Suite",
    description: "Comprehensive API testing tool with request builder, response validation, and test automation.",
    author: "Supra AI Team",
    downloads: 19876,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-api-tester",
    category: {
      id: "development",
      name: "Development Tools",
      description: "API development and testing",
      examples: "API testing, debugging, documentation"
    }
  },
  {
    id: "supra-image-processor",
    name: "Image Processor",
    description: "Image manipulation tool with resize, crop, filter, and format conversion capabilities.",
    author: "Supra AI Team",
    downloads: 34567,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-image-processor",
    category: {
      id: "media",
      name: "Media Tools",
      description: "Image and media processing",
      examples: "Image editing, conversion, optimization"
    }
  },
  {
    id: "supra-pdf-toolkit",
    name: "PDF Toolkit",
    description: "PDF manipulation suite for merging, splitting, extracting, and converting PDF documents.",
    author: "Supra AI Team",
    downloads: 28901,
    iconUrl: supraLogoDataUrl,
    routerKey: "supra-pdf-toolkit",
    category: {
      id: "documents",
      name: "Document Tools",
      description: "Document processing and management",
      examples: "PDF editing, conversion, extraction"
    }
  }
];

// Mock tool details (when fetching a specific tool)
export const TOOL_DETAILS: Record<string, any> = {
  "supra-python-runner": {
    id: "supra-python-runner",
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
    author: "Supra AI Team",
    version: "1.2.0",
    downloads: 45678,
    rating: 4.8,
    reviews: 234,
    iconUrl: supraLogoDataUrl,
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
    installCommand: "supra install supra-python-runner"
  },
  // Add more tool details as needed
};

// Mock store categories
export const STORE_CATEGORIES = [
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
export const FEATURED_COLLECTIONS = [
  {
    id: "trending-2024",
    name: "Trending in 2024",
    description: "Most popular agents and tools this year",
    items: ["supra-eco-agent", "supra-coder-agent", "supra-python-runner"],
    icon: "🔥"
  },
  {
    id: "editors-choice",
    name: "Editor's Choice",
    description: "Hand-picked by the Supra team",
    items: ["supra-creative-agent", "supra-data-analyst", "supra-web-scraper"],
    icon: "⭐"
  },
  {
    id: "new-releases",
    name: "New Releases",
    description: "Recently added to the store",
    items: ["supra-legal-agent", "supra-travel-agent", "supra-pdf-toolkit"],
    icon: "🆕"
  }
];

// Mock user's purchased/installed items
export const USER_PURCHASES = [
  "supra-eco-agent",
  "supra-python-runner",
  "supra-web-scraper"
];

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock search function
export const searchStore = async (query: string, type?: 'agent' | 'tool' | 'all') => {
  await simulateApiDelay();
  
  const allItems = [
    ...STORE_AGENTS.map(a => ({ ...a, type: 'agent' })),
    ...STORE_TOOLS.map(t => ({ ...t, type: 'tool' }))
  ];
  
  const filtered = allItems.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                        item.description.toLowerCase().includes(query.toLowerCase());
    const matchesType = !type || type === 'all' || item.type === type;
    return matchesQuery && matchesType;
  });
  
  return filtered;
};