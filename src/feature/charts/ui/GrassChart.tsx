// 'use client';

// import { Spinner } from '@/feature/spinner/ui/spinnerUI';
// import useGrassChart from '../model/grassChartHook';

// const GrassChart = () => {
//   const {
//     stats,
//     getMonthLabels,
//     mapStats,
//     getColorBySolveCount,
//     setMountTooltip,
//     hideTooltip,
//   } = useGrassChart();

//   console.log(stats);

//   return (
//     <>
//       {stats ? (
//         <div className="w-[100%] max-w-[1200px] animate-fade-up overflow-x-auto rounded-xl p-2 scrollbar-hide">
//           <div className="min-w-[780px]">
//             <div className="flex">
//               {/* 동적 월 표시 */}
//               <div
//                 className={`mb-2 ml-6 flex gap-[0.1rem] text-xs text-gray-600 md:gap-[0.2rem]`}
//               >
//                 {Array(53) // 53주 기준
//                   .fill(0)
//                   .map((_, weekIndex) => (
//                     <div
//                       key={weekIndex}
//                       className={`relative aspect-1 h-4 text-nowrap text-center`}
//                     >
//                       <span
//                         className={`absolute ${getMonthLabels(weekIndex).length >= 3 ? '-left-1' : 'left-0'}`}
//                       >
//                         {getMonthLabels(weekIndex)}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <div className="flex">
//               {/* 요일 표시 */}
//               <div className="flex h-auto w-6 shrink-0 flex-col justify-between pr-1 text-xs text-gray-600">
//                 {/* {days.map((day, index) => (
//                   <div key={index} className="h-3 pr-2 text-right">
//                     {index % 2 === 0 ? day : ''}{' '}
//                   </div>
//                 ))} */}
//                 <span className="text-nowrap">오늘</span>
//               </div>

//               {/* 잔디 그리드 */}
//               <div className="flex gap-[0.2rem]">
//                 {Array(53) // 53주를 기준으로 생성
//                   .fill(0)
//                   .map((_, weekIndex) => (
//                     <div key={weekIndex} className="flex flex-col gap-[0.2rem]">
//                       {Array(7) // 7일을 기준으로 생성
//                         .fill(0)
//                         .map((_, dayIndex) => {
//                           // 현재 날짜 계산
//                           const currentDate = new Date(Date.now());
//                           currentDate.setDate(
//                             currentDate.getDate() - weekIndex * 7 - dayIndex
//                           );

//                           const dateString = currentDate
//                             .toISOString()
//                             .split('T')[0];
//                           const solveCount = mapStats
//                             ? (mapStats[dateString] ?? 0)
//                             : 0;

//                           return (
//                             <div
//                               key={dayIndex}
//                               className={`aspect-1 h-4 rounded-sm transition-colors duration-100 hover:ring-1 hover:ring-gray-300 ${getColorBySolveCount(
//                                 solveCount
//                               )}`}
//                               onMouseEnter={async (e) => {
//                                 const target = e.currentTarget as HTMLElement;
//                                 const tooltipText = `날짜: ${dateString} 갯수: ${solveCount}회`;
//                                 const instance = setMountTooltip(
//                                   target,
//                                   tooltipText
//                                 );
//                                 instance.show();
//                               }}
//                               onMouseLeave={(e) => {
//                                 hideTooltip(e.currentTarget as HTMLElement);
//                               }}
//                               title={`dateToolTip${weekIndex}-${dayIndex}`}
//                             />
//                           );
//                         })}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* 범례 */}
//             <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
//               <span>활동량:</span>
//               <div className="flex items-center gap-1">
//                 <div className="h-3 w-3 rounded-sm bg-[#ebedf0]" title="0" />
//                 <div className="h-3 w-3 rounded-sm bg-[#9be9a8]" title="1-3" />
//                 <div className="h-3 w-3 rounded-sm bg-[#40c463]" title="4-7" />
//                 <div className="h-3 w-3 rounded-sm bg-[#30a14e]" title="8-12" />
//                 <div className="h-3 w-3 rounded-sm bg-[#216e39]" title="13+" />
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Spinner />
//       )}
//     </>
//   );
// };

// export default GrassChart;
