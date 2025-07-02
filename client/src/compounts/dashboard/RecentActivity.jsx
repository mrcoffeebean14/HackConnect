import React from 'react';
import { Activity, Users, MessageSquare, Calendar, Award } from 'lucide-react';

const RecentActivity = () => {
  const recentActivity = [
    {
      id: 1,
      type: 'team_join',
      message: 'You joined the team "AI Innovators" for TechCrunch Disrupt',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Sarah Chen about the hackathon project',
      time: '4 hours ago',
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'hackathon',
      message: 'Reminder: Google DevFest hackathon starts in 2 days',
      time: '6 hours ago',
      icon: Calendar
    },
    {
      id: 4,
      type: 'achievement',
      message: 'Congratulations! Your team won 2nd place in Stanford TreeHacks',
      time: '1 day ago',
      icon: Award
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-sm p-6">
      <div className="text-xl text-slate-800 font-semibold flex items-center mb-4">
        <Activity className="w-5 h-5 mr-2" />
        Recent Activity
      </div>

      <div className="space-y-4">
        {recentActivity.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors"
            >
              <Icon className="w-5 h-5 text-slate-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-slate-700">{activity.message}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
