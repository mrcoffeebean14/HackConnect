import { Users, Star, MapPin } from 'lucide-react';

const SuggestedTeammates = () => {
  const suggestedTeammates = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'Python'],
      location: 'San Francisco, CA',
      rating: 4.9,
      hackathons: 15,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      location: 'New York, NY',
      rating: 4.8,
      hackathons: 12,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Data Scientist',
      skills: ['Python', 'ML', 'TensorFlow'],
      location: 'Austin, TX',
      rating: 4.9,
      hackathons: 18,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'DevOps Engineer',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      location: 'Seattle, WA',
      rating: 4.7,
      hackathons: 10,
      avatar: '/api/placeholder/40/40'
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-sm p-6">
      <div className="text-xl text-slate-800 font-semibold flex items-center mb-4">
        <Users className="w-5 h-5 mr-2" />
        Suggested Teammates
      </div>

      <div className="space-y-4">
        {suggestedTeammates.map((teammate) => (
          <div key={teammate.id} className="flex items-center justify-between p-4 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
            <div className="flex items-center space-x-4">
              <img
                src={teammate.avatar}
                alt={teammate.name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-slate-800">{teammate.name}</h3>
                <p className="text-sm text-slate-600">{teammate.role}</p>
                <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{teammate.location}</span>
                  <Star className="w-3 h-3 text-yellow-500 ml-2" />
                  <span>{teammate.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex flex-wrap gap-1 mb-2">
                  {teammate.skills.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 border border-slate-200 text-xs px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {teammate.skills.length > 2 && (
                    <span className="border border-slate-300 text-xs px-2 py-0.5 rounded-full">
                      +{teammate.skills.length - 2}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{teammate.hackathons} hackathons</p>
              </div>

              <button className="px-3 py-1.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTeammates;
