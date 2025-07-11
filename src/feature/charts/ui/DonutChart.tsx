'use client';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import useDonutChart from '../model/donutChartHook';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  level: string;
  correctAnswer: number | undefined;
  wrongAnswer: number | undefined;
}

const COLORS = ['#0088FE', '#969696'];

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  level,
  correctAnswer,
  wrongAnswer,
}) => {
  if (!data) return null;
  const { levelText } = useDonutChart(level);

  return (
    <div className="relative flex h-[16rem] w-[16rem] items-center justify-center md:h-full md:w-full">
      <span className="absolute top-0 text-lg font-extrabold text-gray-500">
        레벨 테스트 결과
      </span>
      <h2
        key={levelText}
        className="mt-14 flex animate-fade-up flex-col items-center justify-center text-3xl font-bold text-gray-800"
      >
        <span>{levelText}</span>
        <span className="text-base">
          {correctAnswer} / {wrongAnswer} 정답
        </span>
      </h2>
      <ResponsiveContainer className="absolute top-10">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={'60%'}
            outerRadius={'100%'}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            cornerRadius={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
