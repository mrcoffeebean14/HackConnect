import WelcomeSection from './WelcomeSection'
import QuickStats from './QuickStats';
import SocialFeed from '../../pages/SocialFeed';


const DashboardContent = () => {
  return (
    <div className="flex-1 p-6">
      <WelcomeSection />
      <QuickStats />
      <SocialFeed />
    </div>
  );
};

export default DashboardContent;