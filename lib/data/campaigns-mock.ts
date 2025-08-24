export interface Campaign {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  fundingProgress: {
    current: number;
    target: number;
  };
  endDate: string;
  milestones: number;
  status: 'live' | 'successful' | 'failed';
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  data: Campaign[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
  message: string;
}

export type StatusFilter = 'all' | 'live' | 'successful' | 'failed';
export type TabFilter = 'mine' | 'others';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Boundless Web3 Platform',
    creator: {
      name: 'Collins Odumeje',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 23000,
      target: 250000,
    },
    endDate: 'Sept 30',
    milestones: 6,
    status: 'live',
    tags: ['#web3', '#crowdfunding'],
    likes: 29,
    comments: 12,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Kano Tech Education Initiative',
    creator: {
      name: 'Salim Hassan',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 250000,
      target: 250000,
    },
    endDate: 'Aug 15',
    milestones: 4,
    status: 'successful',
    tags: ['#education', '#tech'],
    likes: 95,
    comments: 34,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '3',
    name: 'Lagos Clean Water Project',
    creator: {
      name: 'Esther Okonkwo',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 15000,
      target: 100000,
    },
    endDate: 'Oct 20',
    milestones: 5,
    status: 'live',
    tags: ['#water', '#infrastructure'],
    likes: 45,
    comments: 18,
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
  },
  {
    id: '4',
    name: 'Abuja Solar Farm Initiative',
    creator: {
      name: 'David Jere',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 5000,
      target: 500000,
    },
    endDate: 'Nov 30',
    milestones: 8,
    status: 'failed',
    tags: ['#renewable', '#energy'],
    likes: 67,
    comments: 23,
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-25T11:30:00Z',
  },
  {
    id: '5',
    name: 'Port Harcourt Tech Hub',
    creator: {
      name: 'Blessing Okafor',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 180000,
      target: 200000,
    },
    endDate: 'Dec 15',
    milestones: 7,
    status: 'live',
    tags: ['#technology', '#hub'],
    likes: 89,
    comments: 42,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-28T14:30:00Z',
  },
  {
    id: '6',
    name: 'Blockchain for Agriculture',
    creator: {
      name: 'Aminu Yusuf',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 75000,
      target: 150000,
    },
    endDate: 'Oct 5',
    milestones: 5,
    status: 'live',
    tags: ['#blockchain', '#agriculture'],
    likes: 56,
    comments: 28,
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-26T16:45:00Z',
  },
  {
    id: '7',
    name: 'AI Healthcare Platform',
    creator: {
      name: 'Dr. Funke Adebayo',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 300000,
      target: 300000,
    },
    endDate: 'Jul 20',
    milestones: 9,
    status: 'successful',
    tags: ['#AI', '#healthcare'],
    likes: 234,
    comments: 89,
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-24T09:15:00Z',
  },
  {
    id: '8',
    name: 'NFT Art Gallery Lagos',
    creator: {
      name: 'Tunde Adeleke',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 45000,
      target: 100000,
    },
    endDate: 'Nov 10',
    milestones: 4,
    status: 'live',
    tags: ['#NFT', '#art'],
    likes: 78,
    comments: 31,
    createdAt: '2024-01-28T14:20:00Z',
    updatedAt: '2024-01-30T11:30:00Z',
  },
  {
    id: '9',
    name: 'DeFi Lending Protocol',
    creator: {
      name: 'Chioma Eze',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 450000,
      target: 500000,
    },
    endDate: 'Sept 25',
    milestones: 10,
    status: 'live',
    tags: ['#DeFi', '#lending'],
    likes: 156,
    comments: 67,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-29T14:30:00Z',
  },
  {
    id: '10',
    name: 'Smart City IoT Network',
    creator: {
      name: 'Ibrahim Musa',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 120000,
      target: 600000,
    },
    endDate: 'Expired',
    milestones: 12,
    status: 'failed',
    tags: ['#IoT', '#smartcity'],
    likes: 89,
    comments: 44,
    createdAt: '2024-01-02T08:30:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
  },
  {
    id: '11',
    name: 'Green Energy Marketplace',
    creator: {
      name: 'Fatima Abubakar',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 95000,
      target: 200000,
    },
    endDate: 'Oct 30',
    milestones: 6,
    status: 'live',
    tags: ['#green', '#energy'],
    likes: 102,
    comments: 38,
    createdAt: '2024-01-26T12:00:00Z',
    updatedAt: '2024-01-31T09:15:00Z',
  },
  {
    id: '12',
    name: 'Fintech Payment Gateway',
    creator: {
      name: 'Olumide Bakare',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 500000,
      target: 500000,
    },
    endDate: 'Jun 30',
    milestones: 8,
    status: 'successful',
    tags: ['#fintech', '#payments'],
    likes: 345,
    comments: 124,
    createdAt: '2024-01-01T14:20:00Z',
    updatedAt: '2024-01-20T11:30:00Z',
  },
  {
    id: '13',
    name: 'E-Learning Platform',
    creator: {
      name: 'Grace Okonkwo',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 65000,
      target: 150000,
    },
    endDate: 'Dec 20',
    milestones: 5,
    status: 'live',
    tags: ['#education', '#online'],
    likes: 67,
    comments: 29,
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-02-01T14:30:00Z',
  },
  {
    id: '14',
    name: 'Supply Chain on Blockchain',
    creator: {
      name: 'Mohammed Sani',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 280000,
      target: 400000,
    },
    endDate: 'Sept 15',
    milestones: 11,
    status: 'live',
    tags: ['#blockchain', '#supplychain'],
    likes: 178,
    comments: 72,
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-28T16:45:00Z',
  },
  {
    id: '15',
    name: 'Virtual Reality Gaming',
    creator: {
      name: 'Daniel Ogunleye',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 35000,
      target: 300000,
    },
    endDate: 'Expired',
    milestones: 7,
    status: 'failed',
    tags: ['#VR', '#gaming'],
    likes: 45,
    comments: 18,
    createdAt: '2024-01-03T12:00:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: '16',
    name: 'Crypto Exchange Nigeria',
    creator: {
      name: 'Kemi Adeyemi',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 750000,
      target: 1000000,
    },
    endDate: 'Oct 1',
    milestones: 15,
    status: 'live',
    tags: ['#crypto', '#exchange'],
    likes: 456,
    comments: 189,
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-02-01T11:30:00Z',
  },
  {
    id: '17',
    name: 'Social Impact DAO',
    creator: {
      name: 'Ngozi Ibe',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 150000,
      target: 150000,
    },
    endDate: 'May 15',
    milestones: 6,
    status: 'successful',
    tags: ['#DAO', '#social'],
    likes: 234,
    comments: 91,
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '18',
    name: 'Mobile Banking Solution',
    creator: {
      name: 'Uche Nnamdi',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 88000,
      target: 250000,
    },
    endDate: 'Nov 25',
    milestones: 8,
    status: 'live',
    tags: ['#mobile', '#banking'],
    likes: 112,
    comments: 47,
    createdAt: '2024-01-29T08:30:00Z',
    updatedAt: '2024-02-02T16:45:00Z',
  },
  {
    id: '19',
    name: 'Renewable Energy Fund',
    creator: {
      name: 'Adaeze Obi',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 320000,
      target: 500000,
    },
    endDate: 'Dec 31',
    milestones: 10,
    status: 'live',
    tags: ['#renewable', '#fund'],
    likes: 267,
    comments: 103,
    createdAt: '2024-01-24T12:00:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '20',
    name: 'Metaverse Shopping Mall',
    creator: {
      name: 'Victor Ekwueme',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 50000,
      target: 400000,
    },
    endDate: 'Expired',
    milestones: 9,
    status: 'failed',
    tags: ['#metaverse', '#shopping'],
    likes: 34,
    comments: 12,
    createdAt: '2023-12-20T14:20:00Z',
    updatedAt: '2024-01-05T11:30:00Z',
  },
  {
    id: '21',
    name: 'Agritech Drone Solutions',
    creator: {
      name: 'Peter Okoye',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 145000,
      target: 300000,
    },
    endDate: 'Nov 15',
    milestones: 7,
    status: 'live',
    tags: ['#agritech', '#drones'],
    likes: 89,
    comments: 35,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-03T14:30:00Z',
  },
  {
    id: '22',
    name: 'Digital Identity Platform',
    creator: {
      name: 'Zainab Mohammed',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 400000,
      target: 400000,
    },
    endDate: 'Apr 10',
    milestones: 12,
    status: 'successful',
    tags: ['#identity', '#security'],
    likes: 312,
    comments: 128,
    createdAt: '2023-11-15T08:00:00Z',
    updatedAt: '2024-01-02T16:45:00Z',
  },
  {
    id: '23',
    name: 'P2P Trading Platform',
    creator: {
      name: 'Emeka Nwosu',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 78000,
      target: 200000,
    },
    endDate: 'Oct 25',
    milestones: 6,
    status: 'live',
    tags: ['#P2P', '#trading'],
    likes: 67,
    comments: 24,
    createdAt: '2024-01-31T12:00:00Z',
    updatedAt: '2024-02-03T09:15:00Z',
  },
  {
    id: '24',
    name: 'Climate Change Tracker',
    creator: {
      name: 'Aisha Bello',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 25000,
      target: 150000,
    },
    endDate: 'Expired',
    milestones: 5,
    status: 'failed',
    tags: ['#climate', '#data'],
    likes: 45,
    comments: 19,
    createdAt: '2023-12-01T14:20:00Z',
    updatedAt: '2023-12-25T11:30:00Z',
  },
  {
    id: '25',
    name: 'Music NFT Platform',
    creator: {
      name: 'Timi Dakolo',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 220000,
      target: 350000,
    },
    endDate: 'Dec 5',
    milestones: 8,
    status: 'live',
    tags: ['#music', '#NFT'],
    likes: 198,
    comments: 76,
    createdAt: '2024-02-02T10:00:00Z',
    updatedAt: '2024-02-04T14:30:00Z',
  },
  {
    id: '26',
    name: 'Logistics Optimization AI',
    creator: {
      name: 'Yakubu Gowon',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 165000,
      target: 400000,
    },
    endDate: 'Sept 20',
    milestones: 10,
    status: 'live',
    tags: ['#logistics', '#AI'],
    likes: 134,
    comments: 52,
    createdAt: '2024-01-28T08:30:00Z',
    updatedAt: '2024-02-03T16:45:00Z',
  },
  {
    id: '27',
    name: 'Healthcare Records Chain',
    creator: {
      name: 'Dr. Bisi Adeleke',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 550000,
      target: 550000,
    },
    endDate: 'Mar 30',
    milestones: 14,
    status: 'successful',
    tags: ['#healthcare', '#blockchain'],
    likes: 423,
    comments: 167,
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2023-12-30T09:15:00Z',
  },
  {
    id: '28',
    name: 'Real Estate Tokenization',
    creator: {
      name: 'Chidi Okafor',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 890000,
      target: 1200000,
    },
    endDate: 'Oct 15',
    milestones: 16,
    status: 'live',
    tags: ['#realestate', '#tokens'],
    likes: 567,
    comments: 234,
    createdAt: '2024-01-22T14:20:00Z',
    updatedAt: '2024-02-04T11:30:00Z',
  },
  {
    id: '29',
    name: 'EdTech for Rural Areas',
    creator: {
      name: 'Mary Ezekiel',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 42000,
      target: 100000,
    },
    endDate: 'Nov 30',
    milestones: 4,
    status: 'live',
    tags: ['#education', '#rural'],
    likes: 78,
    comments: 31,
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-05T14:30:00Z',
  },
  {
    id: '30',
    name: 'Carbon Credit Exchange',
    creator: {
      name: 'Joseph Yobo',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 30000,
      target: 500000,
    },
    endDate: 'Expired',
    milestones: 11,
    status: 'failed',
    tags: ['#carbon', '#exchange'],
    likes: 56,
    comments: 22,
    createdAt: '2023-11-20T08:00:00Z',
    updatedAt: '2023-12-15T16:45:00Z',
  },
  {
    id: '31',
    name: 'Food Delivery Blockchain',
    creator: {
      name: 'Sandra Okeke',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 125000,
      target: 250000,
    },
    endDate: 'Dec 10',
    milestones: 7,
    status: 'live',
    tags: ['#food', '#delivery'],
    likes: 145,
    comments: 58,
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-02-04T09:15:00Z',
  },
  {
    id: '32',
    name: 'Tourism DApp Nigeria',
    creator: {
      name: 'Kunle Afolayan',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 180000,
      target: 180000,
    },
    endDate: 'Feb 28',
    milestones: 6,
    status: 'successful',
    tags: ['#tourism', '#dapp'],
    likes: 234,
    comments: 92,
    createdAt: '2023-09-15T14:20:00Z',
    updatedAt: '2023-11-30T11:30:00Z',
  },
  {
    id: '33',
    name: 'Insurance Protocol',
    creator: {
      name: 'Amara Kalu',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 420000,
      target: 600000,
    },
    endDate: 'Sept 10',
    milestones: 13,
    status: 'live',
    tags: ['#insurance', '#defi'],
    likes: 289,
    comments: 113,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-02-05T14:30:00Z',
  },
  {
    id: '34',
    name: 'Gaming Guild Africa',
    creator: {
      name: 'Victor Moses',
      avatar: 'https://github.com/shadcn.png',
      verified: false,
    },
    fundingProgress: {
      current: 95000,
      target: 200000,
    },
    endDate: 'Oct 20',
    milestones: 5,
    status: 'live',
    tags: ['#gaming', '#guild'],
    likes: 167,
    comments: 64,
    createdAt: '2024-02-02T08:30:00Z',
    updatedAt: '2024-02-05T16:45:00Z',
  },
  {
    id: '35',
    name: 'Legal Tech Platform',
    creator: {
      name: 'Barrister Folake',
      avatar: 'https://github.com/shadcn.png',
      verified: true,
    },
    fundingProgress: {
      current: 280000,
      target: 350000,
    },
    endDate: 'Nov 5',
    milestones: 9,
    status: 'live',
    tags: ['#legal', '#tech'],
    likes: 201,
    comments: 79,
    createdAt: '2024-01-30T12:00:00Z',
    updatedAt: '2024-02-04T09:15:00Z',
  },
];

export const mockApiService = {
  async fetchCampaigns(
    statusFilter: StatusFilter = 'all',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _tabFilter: TabFilter = 'mine',
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredCampaigns = mockCampaigns;
    if (statusFilter !== 'all') {
      filteredCampaigns = mockCampaigns.filter(
        campaign => campaign.status === statusFilter
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    return {
      data: paginatedCampaigns,
      total: filteredCampaigns.length,
      page,
      limit,
      success: true,
      message: 'Campaigns fetched successfully',
    };
  },

  async likeCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Campaign liked successfully' };
  },

  async commentCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _comment: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Comment added successfully' };
  },

  async shareCampaign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _campaignId: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Campaign shared successfully' };
  },
};
