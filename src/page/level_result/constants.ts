interface CategoryData {
  title: string;
  correct: number;
  total: number;
  color: string;
  border: string;
  text: string;
}

export const categoryDetail: CategoryData[] = [
  {
    title: 'ALGORITHM',
    correct: 4,
    total: 5,
    color: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-500',
  },
  {
    title: 'DATABASE',
    correct: 4,
    total: 5,
    color: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-500',
  },
  {
    title: 'NETWORK',
    correct: 4,
    total: 5,
    color: 'bg-purple-500',
    border: 'border-purple-500',
    text: 'text-purple-500',
  },
  {
    title: 'OS',
    correct: 4,
    total: 5,
    color: 'bg-red-400',
    border: 'border-red-400',
    text: 'text-red-400',
  },
];

export const categoryGroups = [
  {
    key: 'ALGORITHUM',
    types: ['ALGORITHUM_MAQ', 'ALGORITHUM_SAQ'],
    title: 'ALGORITHM',
    color: 'bg-blue-400',
    border: 'border-blue-400',
    text: 'text-blue-400',
  },
  {
    key: 'DB',
    types: ['DB_MAQ', 'DB_SAQ'],
    title: 'DATABASE',
    color: 'bg-green-400',
    border: 'border-green-400',
    text: 'text-green-400',
  },
  {
    key: 'OS',
    types: ['OS_MAQ', 'OS_SAQ'],
    title: 'OS',
    color: 'bg-red-400',
    border: 'border-red-400',
    text: 'text-red-400',
  },
  {
    key: 'NETWORK',
    types: ['NETWORK_MAQ', 'NETWORK_SAQ'],
    title: 'NETWORK',
    color: 'bg-yellow-400',
    border: 'border-yellow-400',
    text: 'text-yellow-400',
  },
];
