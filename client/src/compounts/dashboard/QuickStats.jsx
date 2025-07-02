import { Calendar, Users, Award, TrendingUp } from 'lucide-react';

const QuickStats = () => {
  const quickStats = [
    { icon: Calendar, label: 'Hackathons Joined', value: '12', color: 'text-blue-600' },
    { icon: Users, label: 'Teammates', value: '8', color: 'text-purple-600' },
    { icon: Award, label: 'Active Projects', value: '3', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '85%', color: 'text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color} opacity-70`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;
