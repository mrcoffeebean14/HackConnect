import WelcomeSection from './dashboard/WelcomeSection'
import QuickStats from './dashboard/QuickStats';
import SuggestedTeammates from './dashboard/SuggestedTeammates';
import RecentActivity from './dashboard/RecentActivity';

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