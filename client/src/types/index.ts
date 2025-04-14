// Validator type
export interface Validator {
  address: string;
  name: string;
  commission: number;
  ownStake: string;
  nominators: number;
}

// Staking information
export interface StakingInfo {
  stakedAmount: string;
  unbondingAmount: string;
  pendingRewards: string;
  apy: string;
  nominations: Validator[];
}

// Referendum type
export interface Referendum {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
  ayePercentage: number;
  nayPercentage: number;
  endsIn?: string;
  link: string;
}

// Vote value
export type VoteValue = 'aye' | 'nay';

// Notification type
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}
