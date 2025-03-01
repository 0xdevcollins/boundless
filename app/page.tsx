"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, Compass, CheckCircle, Filter, Clock, ArrowUpDown } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, TooltipProps, 
  Legend
} from "recharts";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ActivityDataPoint {
  name: string;
  contributions: number;
  participants: number;
}

const activityData: ActivityDataPoint[] = [
  { name: "Jan", contributions: 400, participants: 250 },
  { name: "Feb", contributions: 300, participants: 220 },
  { name: "Mar", contributions: 600, participants: 320 },
  { name: "Apr", contributions: 800, participants: 480 },
  { name: "May", contributions: 1500, participants: 520 },
  { name: "Jun", contributions: 2000, participants: 590 },
  { name: "Jul", contributions: 2400, participants: 650 },
];

interface BaseProject {
  id: number;
  title: string;
  progress: number;
  raised: string;
  goal: string;
  category: string;
  href: string;
}

interface ProjectWithDays extends BaseProject {
  daysLeft: number;
}

interface TrendingProject extends ProjectWithDays {
  engagementChange: string;
}

interface CompletedProject {
  id: number;
  title: string;
  totalRaised: string;
  contributors: number;
  completionDate: string;
  category: string;
  href: string;
}

const myProjects: ProjectWithDays[] = [
  {
    id: 1,
    title: "Decentralized Finance Platform",
    progress: 70,
    raised: "$70,000",
    goal: "$100,000",
    daysLeft: 12,
    category: "Finance",
    href: "/projects/my-projects"
  },
  {
    id: 2,
    title: "Sustainable Energy Marketplace",
    progress: 45,
    raised: "$22,500",
    goal: "$50,000",
    daysLeft: 18,
    category: "Environment",
    href: "/projects/my-projects"
  },
  {
    id: 3,
    title: "Community-Owned Media Network",
    progress: 90,
    raised: "$180,000",
    goal: "$200,000",
    daysLeft: 3,
    category: "Media",
    href: "/projects/my-projects"
  }
];

const trendingProjects: TrendingProject[] = [
  {
    id: 1,
    title: "AI-Powered Healthcare Assistant",
    progress: 85,
    raised: "$425,000",
    goal: "$500,000",
    engagementChange: "+27%",
    category: "Healthcare",
    daysLeft: 21,
    href: "/projects/explore"
  },
  {
    id: 2,
    title: "Decentralized Social Network",
    progress: 62,
    raised: "$310,000",
    goal: "$500,000",
    engagementChange: "+18%",
    category: "Social",
    daysLeft: 14,
    href: "/projects/explore"
  },
  {
    id: 3,
    title: "Regenerative Agriculture Platform",
    progress: 54,
    raised: "$108,000",
    goal: "$200,000",
    engagementChange: "+14%",
    category: "Agriculture",
    daysLeft: 30,
    href: "/projects/explore"
  }
];

const exploreProjects: BaseProject[] = [
  {
    id: 4,
    title: "Open Source Educational Platform",
    progress: 35,
    raised: "$70,000",
    goal: "$200,000",
    category: "Education",
    href: "/projects/explore"
  },
  {
    id: 5,
    title: "Community Art Initiative",
    progress: 25,
    raised: "$12,500",
    goal: "$50,000",
    category: "Art",
    href: "/projects/explore"
  },
  {
    id: 6,
    title: "Mental Health Resources Network",
    progress: 45,
    raised: "$90,000",
    goal: "$200,000",
    category: "Health",
    href: "/projects/explore"
  }
];

const completedProjects: CompletedProject[] = [
  {
    id: 1,
    title: "Community Solar Initiative",
    totalRaised: "$750,000",
    contributors: 1253,
    completionDate: "Jan 15, 2024",
    category: "Energy",
    href: "/projects/funded"
  },
  {
    id: 2,
    title: "Open Source Governance Tools",
    totalRaised: "$320,000",
    contributors: 784,
    completionDate: "Feb 02, 2024",
    category: "Governance",
    href: "/projects/funded"
  },
  {
    id: 3,
    title: "Urban Vertical Farming Network",
    totalRaised: "$1,200,000",
    contributors: 3214,
    completionDate: "Feb 10, 2024",
    category: "Agriculture",
    href: "/projects/funded"
  }
];

const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded p-3 shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2 text-sm mt-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.dataKey}: </span>
            <span className="font-medium">{entry.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

type ExploreFilter = "newest" | "popular" | "ending";
type CompletedSort = "date" | "size" | "category";

export default function Page() {
  const [exploreFilter, setExploreFilter] = useState<ExploreFilter>("newest");
  const [completedSort, setCompletedSort] = useState<CompletedSort>("date");
  
  const allExploreProjects = [...myProjects, ...trendingProjects, ...exploreProjects];
  
  const getFilteredExploreProjects = () => {
    if (exploreFilter === "newest") {
      return exploreProjects;
    } else if (exploreFilter === "popular") {
      return [...allExploreProjects]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 3);
    } else if (exploreFilter === "ending") {
      const projectsWithDays = [...myProjects, ...trendingProjects]
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 3);
      return projectsWithDays;
    }
    
    return exploreProjects;
  };
  
  const filteredExploreProjects = getFilteredExploreProjects();
  
  const sortedCompletedProjects = [...completedProjects].sort((a, b) => {
    if (completedSort === "date") {
      return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
    } else if (completedSort === "size") {
      const aValue = parseFloat(a.totalRaised.replace(/[^0-9.-]+/g, ""));
      const bValue = parseFloat(b.totalRaised.replace(/[^0-9.-]+/g, ""));
      return bValue - aValue;
    } else if (completedSort === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const isProjectWithDays = (project: BaseProject): project is ProjectWithDays => {
    return 'daysLeft' in project;
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,780</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 pending milestone approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Successful Exits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total value: $3.2M</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+32%</div>
              <p className="text-xs text-muted-foreground">Avg. across all projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7 mb-6">
          <Card className="md:col-span-5">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#f3f4f6" 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280' }}
                      width={50}
                      tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contributions" 
                      name="Contributions"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorContributions)" 
                      activeDot={{ r: 6 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="participants" 
                      name="Participants"
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorParticipants)" 
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full w-2 h-2 bg-green-500"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Milestone approved</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full w-2 h-2 bg-blue-500"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New contribution</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="rounded-full w-2 h-2 bg-yellow-500"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Project update</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full w-2 h-2 bg-purple-500"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Voted on proposal</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="myprojects" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="myprojects" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">My Projects</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="explore" className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span className="hidden sm:inline">Explore</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Completed</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="myprojects">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge>{project.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Raised</p>
                            <p className="font-medium">{project.raised}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Goal</p>
                            <p className="font-medium">{project.goal}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{project.daysLeft} days remaining</span>
                        </div>
                        <Link href={project.href}>
                          <Button className="w-full">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Highest Engagement Past 7 Days</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trendingProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge>{project.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Raised</p>
                            <p className="font-medium">{project.raised}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Goal</p>
                            <p className="font-medium">{project.goal}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Engagement</span>
                          <Badge variant="outline" className="text-green-600">{project.engagementChange}</Badge>
                        </div>
                        <Link href={project.href}>
                          <Button className="w-full">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="explore">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {exploreFilter === "newest" ? "Newest Projects" : 
                   exploreFilter === "popular" ? "Most Popular Projects" : 
                   "Projects Ending Soon"}
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter: {exploreFilter === "newest" ? "Newest" : 
                                exploreFilter === "popular" ? "Most Popular" : 
                                "Ending Soon"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setExploreFilter("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setExploreFilter("popular")}>
                      Most Popular
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setExploreFilter("ending")}>
                      Ending Soon
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredExploreProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge>{project.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Raised</p>
                            <p className="font-medium">{project.raised}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Goal</p>
                            <p className="font-medium">{project.goal}</p>
                          </div>
                        </div>
                        {isProjectWithDays(project) && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {project.daysLeft} days remaining
                            </span>
                          </div>
                        )}
                        <Link href={project.href}>
                          <Button className="w-full">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Successfully Completed Projects</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={completedSort === "category" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCompletedSort("category")}
                  >
                    Category {completedSort === "category" && <ArrowUpDown className="ml-2 h-3 w-3" />}
                  </Button>
                  <Button 
                    variant={completedSort === "date" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCompletedSort("date")}
                  >
                    Date {completedSort === "date" && <ArrowUpDown className="ml-2 h-3 w-3" />}
                  </Button>
                  <Button 
                    variant={completedSort === "size" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCompletedSort("size")}
                  >
                    Size {completedSort === "size" && <ArrowUpDown className="ml-2 h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedCompletedProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Raised</p>
                            <p className="font-medium">{project.totalRaised}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Contributors</p>
                            <p className="font-medium">{project.contributors}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Completed on {project.completionDate}</span>
                        </div>
                        <Link href={project.href}>
                          <Button className="w-full" variant="outline">View Results</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
}