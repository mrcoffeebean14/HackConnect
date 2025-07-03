import WelcomeSection from './WelcomeSection'
import QuickStats from './QuickStats';
import SuggestedTeammates from './SuggestedTeammates';
import RecentActivity from './RecentActivity';

const DashboardContent = () => {
  return (
    <div className="flex-1 p-6">
      <WelcomeSection />
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SuggestedTeammates />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;