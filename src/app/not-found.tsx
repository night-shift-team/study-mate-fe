import FuzzyText from '@/feature/FuzzyText/FuzzyText';

const NotFound = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.8}
        enableHover={true}
        fontSize={'12vw'}
      >
        404
      </FuzzyText>

      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.8}
        enableHover={true}
        fontSize={'6vw'}
      >
        not found
      </FuzzyText>
    </div>
  );
};
export default NotFound;
