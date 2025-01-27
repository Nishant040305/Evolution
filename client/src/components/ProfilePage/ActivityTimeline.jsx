import { CalendarIcon } from '@heroicons/react/24/outline';

const ActivityTimeline = ({ events }) => {
  return (
    <div className="border-l-2 border-[#30363D] ml-4 pl-6 space-y-6">
      {events.map((event, index) => (
        <div 
          key={index} 
          className="relative group hover:bg-[#161B22] p-3 rounded-lg transition-colors"
        >
          <div className="absolute -left-[18px] top-0 w-3 h-3 rounded-full bg-[#58A6FF]" />
          <div className="text-sm text-[#8B949E] flex items-center gap-2 mb-1">
            <CalendarIcon className="w-5 h-5" />
            <span className="text-base">
              {new Date(event.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
          <p className="text-[#C9D1D9] text-base">{event.action}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;