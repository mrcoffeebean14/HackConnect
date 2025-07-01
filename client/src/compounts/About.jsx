const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              About HackConnect
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                HackConnect was born from the frustration of talented developers struggling to find the right team members for hackathons. We recognized that the best projects come from diverse teams with complementary skills, but forming these teams was often left to chance.
              </p>
              
              <p className="text-lg">
                Our mission is to democratize hackathon participation by making team formation intelligent, efficient, and accessible to everyone. Whether you're a seasoned developer or just starting your coding journey, HackConnect helps you find your place in the vibrant hackathon community.
              </p>
              
              <p className="text-lg">
                We believe that innovation happens when the right minds come together. Our platform leverages cutting-edge AI and community-driven features to ensure that every developer can contribute their unique skills to groundbreaking projects and learn from others in the process.
              </p>
            </div>

            {/* Mission points */}
            <div className="mt-10 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Connect</span> developers with complementary skills and shared passions
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Empower</span> both beginners and experts to participate in hackathons
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Foster</span> a supportive community where innovation thrives
                </p>
              </div>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-200/50 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-200/50 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-200/50 rounded-full"></div>
              
              {/* Central content */}
              <div className="text-center z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl">
                  <span className="text-white text-3xl font-bold">HC</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Building the Future</h3>
                <p className="text-gray-600">One team at a time</p>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Projects Created</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
