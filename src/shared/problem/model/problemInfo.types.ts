export const ProblemCategoryTitleLength = 5;

export enum ProblemCategoryTitle {
  ALGORITHUM = 'ALGORITHUM',
  OS = 'OS',
  NETWORK = 'NETWORK',
  DB = 'DB',
  DESIGN = 'DESIGN',
}

export enum ProblemCategoryType {
  MAQ = 'MAQ',
  SAQ = 'SAQ',
}

export enum ProblemCategory {
  Algo_MAQ = `${ProblemCategoryTitle.ALGORITHUM}_${ProblemCategoryType.MAQ}`,
  Algo_SAQ = `${ProblemCategoryTitle.ALGORITHUM}_${ProblemCategoryType.SAQ}`,
  OS_MAQ = `${ProblemCategoryTitle.OS}_${ProblemCategoryType.MAQ}`,
  OS_SAQ = `${ProblemCategoryTitle.OS}_${ProblemCategoryType.SAQ}`,
  NETWORK_MAQ = `${ProblemCategoryTitle.NETWORK}_${ProblemCategoryType.MAQ}`,
  NETWORK_SAQ = `${ProblemCategoryTitle.NETWORK}_${ProblemCategoryType.SAQ}`,
  DB_MAQ = `${ProblemCategoryTitle.DB}_${ProblemCategoryType.MAQ}`,
  DB_SAQ = `${ProblemCategoryTitle.DB}_${ProblemCategoryType.SAQ}`,
  DESIGN_MAQ = `${ProblemCategoryTitle.DESIGN}_${ProblemCategoryType.MAQ}`,
  DESIGN_SAQ = `${ProblemCategoryTitle.DESIGN}_${ProblemCategoryType.SAQ}`,
  LEVEL_TEST = 'LEVEL_TEST',
}

export interface ProblemInfoMAQ {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}

export interface ProblemInfoSAQ {
  id: string;
  description: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
}

export interface ProblemInfoLevelTest {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}
