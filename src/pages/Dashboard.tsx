import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LogOut, 
  User as UserIcon, 
  Settings,
  MoreVertical,
  Zap,
  Lock,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Home Page Sections
import LiveNow from '@/components/LiveNow';
import MoodSpinner from '@/components/MoodSpinner';
import DiscussSection from '@/components/DiscussSection';
import LearnSection from '@/components/LearnSection';
import WatchSection from '@/components/WatchSection';
import SupportSection from '@/components/SupportSection';
import PauseSection from '@/components/PauseSection';
import InTheAirSection from '@/components/InTheAirSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OnlineSpaceSection from '@/components/OnlineSpaceSection';
import EarningsSection from '@/components/EarningsSection';


export default function Dashboard() {
  const navigate = useNavigate();
  const { user, userProfile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-2xl">Loading...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleUpgradeClick = () => {
    setUpgradeModalOpen(true);
    setMenuOpen(false);
  };

  const handleUpgrade = (newRole: 'VIEW' | 'TALK' | 'CREATE') => {
    // TODO: Integrate with payment gateway
    alert(`Upgrading to ${newRole} - Connect payment gateway here`);
    setUpgradeModalOpen(false);
  };

  const initials = userProfile?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const canAccessTalkFeatures = userProfile.role === 'TALK' || userProfile.role === 'CREATE';
  const canAccessCreateFeatures = userProfile.role === 'CREATE';

  return (
    <div className="min-h-screen bg-background">
      {/* CUSTOM HEADER FOR DASHBOARD */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300">
              {userProfile.role === 'VIEW' ? 'View Access' : 
               userProfile.role === 'TALK' ? 'Talk Access' : 
               'Creator Account'}
            </span>
          </div>

          {/* Three Dot Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
                {/* Profile Section */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-white font-semibold text-sm">{userProfile.fullName}</p>
                  <p className="text-white/60 text-xs">{userProfile.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-sm"
                  >
                    <UserIcon size={16} />
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-sm"
                  >
                    <Settings size={16} />
                    Settings
                  </button>

                  {/* Upgrade Option - Show if not CREATE */}
                  {!canAccessCreateFeatures && (
                    <button
                      onClick={handleUpgradeClick}
                      className="w-full flex items-center gap-2 px-3 py-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded transition-colors text-sm font-semibold"
                    >
                      <Zap size={16} />
                      Upgrade Plan
                    </button>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-white/10 my-2" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - Same as Home Page but with Access Control */}
      <div className="pt-20">
        {/* LIVE NOW SECTION - Available to all, Create button role-based */}
        <LiveNow userRole={userProfile.role} />

        {/* MOOD SPINNER - All users */}
        <MoodSpinner />

        {/* DISCUSS SECTION - role-based create */}
        <DiscussSection userRole={userProfile.role} />

        {/* LEARN SECTION - All users */}
        <LearnSection />

        {/* WATCH SECTION - All users */}
        <WatchSection />

        {/* SUPPORT SECTION - role-based create */}
        <SupportSection userRole={userProfile.role} />

        {/* PAUSE - role-based create */}
        <PauseSection userRole={userProfile.role} />

        {/* EARNINGS - Only for CREATE */}
        {canAccessCreateFeatures && <EarningsSection />}

        {/* IN THE AIR - All users */}
        <InTheAirSection />

        <OnlineSpaceSection />
        
        {/* FOOTER */}
        <Footer />
      </div>

      {/* UPGRADE MODAL */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border-white/20 p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Upgrade Your Subscription</h2>
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* VIEW PLAN */}
              <Card className={`p-6 cursor-pointer border-2 transition-all ${
                userProfile.role === 'VIEW' 
                  ? 'border-orange-400 bg-orange-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <h3 className="text-xl font-bold text-white mb-2">View</h3>
                <p className="text-2xl font-bold text-white mb-2">Free</p>
                <ul className="space-y-2 text-white/60 text-sm mb-6">
                  <li>✓ Watch live sessions</li>
                  <li>✓ View learning content</li>
                  <li>✓ Browse discussions</li>
                </ul>
                <Button disabled className="w-full">Current Plan</Button>
              </Card>

              {/* TALK PLAN */}
              <Card className="p-6 cursor-pointer border-2 border-blue-400 bg-blue-500/10">
                <h3 className="text-xl font-bold text-white mb-2">Talk</h3>
                <p className="text-2xl font-bold text-blue-400 mb-2">₹9.99/mo</p>
                <ul className="space-y-2 text-white/60 text-sm mb-6">
                  <li>✓ All View features</li>
                  <li>✓ Participate in discussions</li>
                  <li>✓ Join talk sessions</li>
                  <li>✓ Access Pause community</li>
                </ul>
                <Button 
                  onClick={() => handleUpgrade('TALK')}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Upgrade to Talk
                </Button>
              </Card>

              {/* CREATE PLAN */}
              <Card className="p-6 cursor-pointer border-2 border-orange-400 bg-orange-500/10">
                <h3 className="text-xl font-bold text-white mb-2">Creator</h3>
                <p className="text-2xl font-bold text-orange-400 mb-2">₹19.99/mo</p>
                <ul className="space-y-2 text-white/60 text-sm mb-6">
                  <li>✓ All Talk features</li>
                  <li>✓ Create live sessions</li>
                  <li>✓ Start discussions</li>
                  <li>✓ Upload learning content</li>
                  <li>✓ Earn money</li>
                </ul>
                <Button 
                  onClick={() => handleUpgrade('CREATE')}
                  className="gradient-orange w-full text-primary-foreground"
                >
                  Become a Creator
                </Button>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* Menu Close Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
