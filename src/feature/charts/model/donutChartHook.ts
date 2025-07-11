import { useEffect, useState } from 'react';

const useDonutChart = (level: string) => {
  const [levelText, setLevelText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLevelText(level);
    }, 1000);
  }, []);
  return { levelText };
};
export default useDonutChart;
