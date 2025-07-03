const Features = () => {
  const features = [
    {
      title: 'AI Team Matchmaking',
      description: 'Our advanced AI algorithm analyzes your skills, experience, and preferences to match you with the perfect team members for any hackathon.',
      icon: '🤖',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Hackathon Listings',
      description: 'Discover hackathons from around the world, filter by technology, location, and prize pool. Never miss an opportunity to showcase your skills.',
      icon: '📅',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Real-time Chat',
      description: 'Communicate with your team members instantly through our integrated chat system. Share ideas, files, and coordinate your project development.',
      icon: '💬',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Project Portfolio Tracker',
      description: 'Keep track of all your hackathon projects, showcase your achievements, and build an impressive portfolio that stands out to employers.',
      icon: '📊',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Hackathon Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to find teammates, join hackathons, and build amazing projects
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Learn more link */}
              <div className="mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who are already using HackConnect to find their perfect hackathon teams.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
