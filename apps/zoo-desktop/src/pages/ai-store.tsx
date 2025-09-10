import { useTranslation } from '@zooai/zoo-i18n';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription,
} from '@zooai/zoo-ui';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ShoppingBag,
  Search,
  Download,
  TrendingUp,
  Star,
  Code,
  Brain,
  Sparkles,
  Shield,
  DollarSign,
  Users,
  Plus,
  Upload,
  Wallet,
} from 'lucide-react';
import { useGetStoreAgents } from '../components/store/store-client';
import { cn } from '@zooai/zoo-ui/utils';

const CRYPTO_PAYMENT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export default function AIStorePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: storeAgents, isLoading } = useGetStoreAgents();

  const categories = [
    { id: 'all', name: 'All', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'development', name: 'Development', icon: <Code className="h-4 w-4" /> },
    { id: 'creative', name: 'Creative', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'education', name: 'Education', icon: <Brain className="h-4 w-4" /> },
  ];

  const filteredAgents = storeAgents?.filter((agent) => {
    const matchesSearch = searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' ||
      agent.category?.id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-cyan-900/10 via-bg-primary to-purple-900/10 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Zoo AI Store</h1>
              <p className="mt-1 text-text-secondary">
                Discover, download, and monetize AI models in the decentralized marketplace
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate('/crypto-wallet')}
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
              <Button
                className="gap-2"
                onClick={() => navigate('/add-ai')}
              >
                <Upload className="h-4 w-4" />
                Register Your AI
              </Button>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <Card className="bg-cyan-500/10">
              <CardContent className="flex items-center gap-3 p-4">
                <Users className="h-8 w-8 text-cyan-500" />
                <div>
                  <p className="text-2xl font-bold">10,234</p>
                  <p className="text-sm text-text-secondary">Active Users</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10">
              <CardContent className="flex items-center gap-3 p-4">
                <Brain className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-text-secondary">AI Models</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-500/10">
              <CardContent className="flex items-center gap-3 p-4">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">$45,678</p>
                  <p className="text-sm text-text-secondary">Total Earnings</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-500/10">
              <CardContent className="flex items-center gap-3 p-4">
                <Download className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">89,456</p>
                  <p className="text-sm text-text-secondary">Downloads</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-6">
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="my-models">My Models</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace">
              {/* Search and Filters */}
              <div className="mb-6 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                  <Input
                    placeholder="Search AI models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.icon}
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Models Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <Card
                    key={agent.id}
                    className="cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => navigate(`/agents/edit/${agent.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 p-2">
                            <Brain className="h-full w-full text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <p className="text-sm text-text-secondary">by {agent.author}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          4.8
                        </Badge>
                      </div>
                      <CardDescription className="mt-3">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {agent.downloads.toLocaleString()}
                          </span>
                          <Badge variant="secondary">
                            {agent.category?.name}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">0.05 ETH</span>
                          <Button size="sm" className="gap-1">
                            <Download className="h-3 w-3" />
                            Get
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-models">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Registered Models</CardTitle>
                    <CardDescription>
                      Manage and track performance of your AI models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Brain className="mx-auto h-12 w-12 text-text-secondary" />
                      <p className="mt-4 text-text-secondary">
                        You haven't registered any models yet
                      </p>
                      <Button className="mt-4 gap-2" onClick={() => navigate('/add-ai')}>
                        <Plus className="h-4 w-4" />
                        Register Your First Model
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="earnings">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Dashboard</CardTitle>
                    <CardDescription>
                      Track your crypto earnings from AI model usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-green-500/10 p-4">
                        <p className="text-sm text-text-secondary">Total Earned</p>
                        <p className="text-2xl font-bold">0.00 ETH</p>
                      </div>
                      <div className="rounded-lg bg-blue-500/10 p-4">
                        <p className="text-sm text-text-secondary">This Month</p>
                        <p className="text-2xl font-bold">0.00 ETH</p>
                      </div>
                      <div className="rounded-lg bg-purple-500/10 p-4">
                        <p className="text-sm text-text-secondary">Pending</p>
                        <p className="text-2xl font-bold">0.00 ETH</p>
                      </div>
                    </div>
                    
                    <Alert className="mt-6">
                      <DollarSign className="h-4 w-4" />
                      <AlertDescription>
                        Connect your wallet to start earning crypto from your AI models.
                        Payments are processed automatically every week.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="how-it-works">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How Zoo AI Store Works</CardTitle>
                    <CardDescription>
                      The decentralized marketplace for AI models
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">Register Your AI Model</h3>
                        <p className="text-sm text-text-secondary">
                          Upload your trained model, set pricing, and provide documentation.
                          Your model runs locally on users' devices for complete privacy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">Users Download & Use</h3>
                        <p className="text-sm text-text-secondary">
                          Users discover and download your model. All processing happens
                          locally on their device with no data sent to servers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">Earn Crypto Automatically</h3>
                        <p className="text-sm text-text-secondary">
                          Smart contracts handle payments. You earn ETH for each download
                          and usage, paid directly to your wallet weekly.
                        </p>
                      </div>
                    </div>
                    
                    <Alert className="mt-6">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Privacy First:</strong> All AI models run 100% locally.
                        No user data ever leaves their device. Payments are handled
                        through decentralized smart contracts.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="mt-6 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
                      <h3 className="mb-2 font-semibold">Ready to Start Earning?</h3>
                      <p className="mb-4 text-sm text-text-secondary">
                        Join hundreds of developers monetizing their AI models
                      </p>
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Register Your First Model
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}