export enum ProblemCategory {
  Algo_MAQ = 'ALGORITHUM_MAQ',
  Algo_SAQ = 'ALGORITHUM_SAQ',
  OS_MAQ = 'OS_MAQ',
  OS_SAQ = 'OS_SAQ',
  NETWORK_MAQ = 'NETWORK_MAQ',
  NETWORK_SAQ = 'NETWORK_SAQ',
  DB_MAQ = 'DB_MAQ',
  DB_SAQ = 'DB_SAQ',
  DESIGN_MAQ = 'DESIGN_MAQ',
  DESIGN_SAQ = 'DESIGN_SAQ',
  LEVEL_TEST = 'LEVEL_TEST',
}

export interface ProblemInfoMAQ {
  id: bigint;
  description: string;
  comment: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}
