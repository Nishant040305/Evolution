import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const ContributionHeatmap = ({ contributions }) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 200); // Past 200 days

  return (
    <div className="bg-[#161B22] p-5 rounded-lg border border-[#30363D]">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
        <ChartBarIcon className="w-6 h-6 text-[#58A6FF]" />
        Contribution Activity
      </h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={new Date()}
        values={contributions}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-github-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => ({
          'data-tooltip': `${value.date}: ${value.count} contributions`,
        })}
        showWeekdayLabels
        weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        gutterSize={3}
      />
    </div>
  );
};

export default ContributionHeatmap;