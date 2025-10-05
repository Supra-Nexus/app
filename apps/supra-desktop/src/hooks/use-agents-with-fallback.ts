/**
 * Hook that provides agents with fallback to mock data when authentication fails.
 * This ensures the UI still shows decentralized providers even when the supra node
 * is not properly authenticated.
 */

import { useGetAgents } from '@supraai/supra-node-state/v2/queries/getAgents/useGetAgents';
import { useAuth } from '../store/auth';

// Mock agents for Sepolia network - these represent decentralized providers
const MOCK_SEPOLIA_AGENTS = [
  {
    agent_id: 'Supra_Eco_1',
    name: 'Supra Eco Assistant',
    description: 'An eco-friendly AI assistant focused on sustainability and environmental awareness.',
    category: 'sustainability',
    model: 'supra-eco-v1',
    is_active: true,
    is_public: true,
    tags: ['ecology', 'sustainability', 'environment'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    agent_id: 'Supra_Coder_1',
    name: 'Supra Code Master',
    description: 'Advanced coding assistant with expertise in multiple programming languages.',
    category: 'development',
    model: 'supra-coder-v1',
    is_active: true,
    is_public: true,
    tags: ['coding', 'programming', 'development'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    agent_id: 'Supra_Creative_1',
    name: 'Supra Creative Studio',
    description: 'Creative writing and content generation specialist.',
    category: 'creative',
    model: 'supra-creative-v1',
    is_active: true,
    is_public: true,
    tags: ['writing', 'creative', 'content'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    agent_id: 'Supra_Data_1',
    name: 'Supra Data Analyst',
    description: 'Data analysis and visualization expert.',
    category: 'analytics',
    model: 'supra-data-v1',
    is_active: true,
    is_public: true,
    tags: ['data', 'analytics', 'visualization'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    agent_id: 'Supra_Research_1',
    name: 'Supra Research Assistant',
    description: 'Academic and professional research helper.',
    category: 'research',
    model: 'supra-research-v1',
    is_active: true,
    is_public: true,
    tags: ['research', 'academic', 'analysis'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useAgentsWithFallback() {
  const auth = useAuth((state) => state.auth);
  
  const {
    data: agents,
    isError,
    error,
    isLoading,
    isSuccess,
    ...rest
  } = useGetAgents(
    {
      nodeAddress: auth?.node_address ?? '',
      token: auth?.api_v2_key ?? '',
    },
    {
      // Return mock data when auth fails or no token is available
      enabled: !!auth?.api_v2_key,
      retry: false,
    }
  );

  // If no auth token or query failed, return mock data
  const shouldUseMockData = !auth?.api_v2_key || isError;
  
  return {
    data: shouldUseMockData ? MOCK_SEPOLIA_AGENTS : agents,
    isError: false, // Don't show errors when using mock data
    error: shouldUseMockData ? null : error,
    isLoading: shouldUseMockData ? false : isLoading,
    isSuccess: shouldUseMockData ? true : isSuccess,
    isMockData: shouldUseMockData,
    ...rest,
  };
}