export interface BackingHistoryItem {
  id: string;
  backer: {
    name: string;
    isAnonymous: boolean;
    avatar?: string;
    walletAddress: string;
  };
  amount: number;
  currency: string;
  date: Date;
  timeAgo: string;
}

export interface BackingHistoryFilters {
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'alphabetical' | 'amount-high' | 'amount-low';
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  amountRange: {
    min: number;
    max: number;
  };
  identityType: 'all' | 'identified' | 'anonymous';
}

export interface BackingHistorySortOption {
  value: string;
  label: string;
}
