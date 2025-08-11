export interface CardProps {
  count: any;
  label: string;
}

export const scaleImage = (label: string) => {
  if (label === '순위') return 'text-[2.8vh]';
  if (label === '점수') return 'text-[2.1vh]';
  if (label === '문제수') return 'text-[2.5vh]';
};
