import React from 'react';

const IssueStatistics = ({ stats }) => {

  const completionRate = stats.total_issues > 0 
    ? ((stats.closed_issues / stats.total_issues) * 100).toFixed(2) 
    : 0;

  return (
    <div className="mb-4">
      <div 
        className="grid grid-cols-3 gap-4"
        style={{ gridTemplateColumns: '2fr 2fr 3fr'}}
      >
        <div className="flex flex-col p-3 border-2 rounded-lg items-center">
          <h3 className="text-lg font-bold mb-1">Today's Issues</h3>
          <p className="text-2xl font-bold">{stats.day_issues}</p>
        </div>
        <div className="flex flex-col p-3 border-2 rounded-lg items-center">
          <h3 className="text-lg font-bold mb-1">This Month's Issues</h3>
          <p className="text-2xl font-bold">{stats.month_issues}</p>
        </div>
        <div className="flex flex-col p-3 border-2 rounded-lg items-center">
          <div className="flex flex-row items-end">
            <div className="text-lg font-bold">Closure Rate</div>
            <div className="ml-1 text-sm">(closed/total)</div>
          </div>
          <div className="flex flex-row items-end">
            <p className="text-2xl font-bold">{completionRate}%</p>
            <div className="ml-1 text-sm">({stats.closed_issues}/{stats.total_issues})</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueStatistics;
