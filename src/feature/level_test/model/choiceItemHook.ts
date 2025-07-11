const useChoiceItem = (
  problemAnswer?: string,
  userAnswer?: string,
  isSelected?: boolean,
  index = 0
) => {
  const getChoiceItemResultBg = () => {
    if (problemAnswer !== userAnswer && userAnswer === String(index + 1)) {
      return 'bg-wrongRed';
    }
    if (problemAnswer === String(index + 1)) {
      return 'bg-correctGreen';
    }
    return 'bg-pointcolor-yogurt';
  };
  const getChoiceItemBg = () => {
    return isSelected ? 'bg-pointcolor-beigebrown' : 'bg-pointcolor-yogurt';
  };
  return {
    getChoiceItemResultBg,
    getChoiceItemBg,
  };
};
export default useChoiceItem;
