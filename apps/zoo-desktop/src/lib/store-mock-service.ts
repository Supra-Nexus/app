/**
 * Mock Store Service
 * This service provides mock data for the Zoo Store functionality.
 * Edit the data in store-mock-data.ts to customize the store contents.
 */

import {
  MOCK_STORE_AGENTS,
  MOCK_STORE_TOOLS,
  MOCK_TOOL_DETAILS,
  MOCK_STORE_CATEGORIES,
  MOCK_FEATURED_COLLECTIONS,
  MOCK_USER_PURCHASES,
  simulateApiDelay,
  searchStore
} from './store-mock-data';

export class StoreMockService {
  private static instance: StoreMockService;

  private constructor() {}

  static getInstance(): StoreMockService {
    if (!StoreMockService.instance) {
      StoreMockService.instance = new StoreMockService();
    }
    return StoreMockService.instance;
  }

  /**
   * Get all agents from the store
   */
  async getAgents(options?: {
    page?: number;
    limit?: number;
    sort?: 'newest' | 'popular' | 'downloads';
    category?: string;
  }) {
    await simulateApiDelay();

    let agents = [...MOCK_STORE_AGENTS];

    // Filter by category if provided
    if (options?.category) {
      agents = agents.filter(a => a.category.id === options.category);
    }

    // Sort
    if (options?.sort === 'downloads') {
      agents.sort((a, b) => b.downloads - a.downloads);
    } else if (options?.sort === 'newest') {
      // Mock: just reverse for "newest"
      agents.reverse();
    }

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      products: agents.slice(start, end),
      total: agents.length,
      page,
      limit,
      totalPages: Math.ceil(agents.length / limit)
    };
  }

  /**
   * Get all tools from the store
   */
  async getTools(options?: {
    page?: number;
    limit?: number;
    sort?: 'newest' | 'popular' | 'downloads';
    category?: string;
  }) {
    await simulateApiDelay();

    let tools = [...MOCK_STORE_TOOLS];

    // Filter by category if provided
    if (options?.category) {
      tools = tools.filter(t => t.category.id === options.category);
    }

    // Sort
    if (options?.sort === 'downloads') {
      tools.sort((a, b) => b.downloads - a.downloads);
    } else if (options?.sort === 'newest') {
      // Mock: just reverse for "newest"
      tools.reverse();
    }

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      products: tools.slice(start, end),
      total: tools.length,
      page,
      limit,
      totalPages: Math.ceil(tools.length / limit)
    };
  }

  /**
   * Get tool details by router key
   */
  async getToolDetails(routerKey: string) {
    await simulateApiDelay();

    // Check if we have detailed info
    if (MOCK_TOOL_DETAILS[routerKey]) {
      return MOCK_TOOL_DETAILS[routerKey];
    }

    // Otherwise, find in tools or agents list
    const tool = MOCK_STORE_TOOLS.find(t => t.routerKey === routerKey);
    if (tool) {
      return {
        ...tool,
        version: "1.0.0",
        rating: 4.5,
        reviews: Math.floor(Math.random() * 500),
        lastUpdated: new Date().toISOString(),
        installCommand: `zoo install ${routerKey}`
      };
    }

    const agent = MOCK_STORE_AGENTS.find(a => a.routerKey === routerKey);
    if (agent) {
      return {
        ...agent,
        version: "1.0.0",
        rating: 4.5,
        reviews: Math.floor(Math.random() * 500),
        lastUpdated: new Date().toISOString(),
        installCommand: `zoo install ${routerKey}`
      };
    }

    throw new Error(`Product not found: ${routerKey}`);
  }

  /**
   * Get store categories
   */
  async getCategories() {
    await simulateApiDelay();
    return MOCK_STORE_CATEGORIES;
  }

  /**
   * Get featured collections
   */
  async getFeaturedCollections() {
    await simulateApiDelay();
    return MOCK_FEATURED_COLLECTIONS;
  }

  /**
   * Check if user has purchased/installed an item
   */
  async checkUserPurchase(itemId: string) {
    await simulateApiDelay();
    return MOCK_USER_PURCHASES.includes(itemId);
  }

  /**
   * Install an agent or tool
   */
  async installItem(routerKey: string) {
    await simulateApiDelay(1500); // Simulate longer install time

    // Add to user purchases
    if (!MOCK_USER_PURCHASES.includes(routerKey)) {
      MOCK_USER_PURCHASES.push(routerKey);
    }

    return {
      success: true,
      message: `Successfully installed ${routerKey}`,
      routerKey
    };
  }

  /**
   * Uninstall an agent or tool
   */
  async uninstallItem(routerKey: string) {
    await simulateApiDelay(1000);

    // Remove from user purchases
    const index = MOCK_USER_PURCHASES.indexOf(routerKey);
    if (index > -1) {
      MOCK_USER_PURCHASES.splice(index, 1);
    }

    return {
      success: true,
      message: `Successfully uninstalled ${routerKey}`,
      routerKey
    };
  }

  /**
   * Search the store
   */
  async search(query: string, type?: 'agent' | 'tool' | 'all') {
    return searchStore(query, type);
  }

  /**
   * Get recommended items based on user's installed items
   */
  async getRecommendations() {
    await simulateApiDelay();

    // Simple mock: return items not in user purchases
    const allItems = [...MOCK_STORE_AGENTS, ...MOCK_STORE_TOOLS];
    const recommendations = allItems
      .filter(item => !MOCK_USER_PURCHASES.includes(item.routerKey))
      .slice(0, 5);

    return recommendations;
  }

  /**
   * Submit a review for an item
   */
  async submitReview(routerKey: string, rating: number, comment: string) {
    await simulateApiDelay(800);

    return {
      success: true,
      reviewId: `review-${Date.now()}`,
      routerKey,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Report an issue with an item
   */
  async reportIssue(routerKey: string, issue: string) {
    await simulateApiDelay(800);

    return {
      success: true,
      issueId: `issue-${Date.now()}`,
      routerKey,
      issue,
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const storeMockService = StoreMockService.getInstance();

// Export convenience functions
export const getStoreAgents = (options?: any) => storeMockService.getAgents(options);
export const getStoreTools = (options?: any) => storeMockService.getTools(options);
export const getToolDetails = (routerKey: string) => storeMockService.getToolDetails(routerKey);
export const installStoreItem = (routerKey: string) => storeMockService.installItem(routerKey);
export const uninstallStoreItem = (routerKey: string) => storeMockService.uninstallItem(routerKey);
export const searchStoreItems = (query: string, type?: any) => storeMockService.search(query, type);