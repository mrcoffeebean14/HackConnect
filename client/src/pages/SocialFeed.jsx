import CreatePostBox from '../compounts/feed/CreatePostBox';
import FeedPostsList from '../compounts/feed/FeedPostsList';
import SocialSidebar from '../compounts/feed/SocialSidebar';

const SocialFeed = () => {

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <CreatePostBox />
                <FeedPostsList />
              </div>
              
              {/* Right Sidebar */}
              <div className="lg:col-span-1">
                <SocialSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialFeed;
