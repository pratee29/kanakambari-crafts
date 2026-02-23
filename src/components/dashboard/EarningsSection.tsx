import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

interface EarningsSectionProps {
  userProfile: UserProfile;
}

export default function EarningsSection({ userProfile }: EarningsSectionProps) {
  const earningBreakdown = [
    { date: 'Today', sessionsCount: 2, earnings: 1850 },
    { date: 'This Week', sessionsCount: 12, earnings: 15600 },
    { date: 'This Month', sessionsCount: 45, earnings: 58420 },
    { date: 'All Time', sessionsCount: 156, earnings: 245680 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* EARNINGS SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Total Earnings</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-green-400 mb-2">₹2,45,680</p>
          <p className="text-white/60 text-xs">All time</p>
        </Card>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Pending Earnings</p>
            <CreditCard className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-4xl font-bold text-yellow-400 mb-2">₹4,250</p>
          <p className="text-white/60 text-xs">Will be credited soon</p>
        </Card>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">This Month</p>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-blue-400 mb-2">₹58,420</p>
          <p className="text-white/60 text-xs">16 sessions done</p>
        </Card>
      </div>

      {/* WITHDRAW SECTION */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Withdraw Earnings</h3>
            <p className="text-white/60 text-sm">Minimum withdrawal: ₹1,000</p>
          </div>
          <Button className="gradient-orange text-primary-foreground rounded-full px-8">
            Withdraw Now
          </Button>
        </div>
      </Card>

      {/* EARNINGS BREAKDOWN */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
        <h3 className="text-xl font-bold text-white mb-6">📊 Earnings Breakdown</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {earningBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all"
              >
                <div>
                  <p className="text-white font-semibold">{item.date}</p>
                  <p className="text-white/60 text-sm">{item.sessionsCount} sessions</p>
                </div>
                <p className="text-2xl font-bold text-green-400">₹{item.earnings.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* EARNINGS STATS */}
          <div className="space-y-3">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <p className="text-white/60 text-sm mb-2">Average Earning per Session</p>
              <p className="text-3xl font-bold text-orange-400">₹1,574</p>
            </Card>
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <p className="text-white/60 text-sm mb-2">Total Sessions Completed</p>
              <p className="text-3xl font-bold text-blue-400">156</p>
            </Card>
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <p className="text-white/60 text-sm mb-2">Average Watch Time</p>
              <p className="text-3xl font-bold text-pink-400">1.5 hrs</p>
            </Card>
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <p className="text-white/60 text-sm mb-2">Highest Single Earning</p>
              <p className="text-3xl font-bold text-green-400">₹4,250</p>
            </Card>
          </div>
        </div>
      </Card>

      {/* RECENT SESSIONS EARNINGS */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
        <h3 className="text-xl font-bold text-white mb-6">📈 Top Earning Sessions</h3>
        <div className="space-y-2">
          {[
            { session: 'Web Development Masterclass', viewers: 342, earning: 2310 },
            { session: 'React Advanced Patterns', viewers: 289, earning: 1987 },
            { session: 'Node.js Full Course', viewers: 256, earning: 1784 },
            { session: 'Freelancing Guide', viewers: 198, earning: 1376 },
            { session: 'Career Growth Talk', viewers: 145, earning: 1008 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all"
            >
              <div>
                <p className="text-white font-semibold text-sm">{item.session}</p>
                <p className="text-white/60 text-xs">{item.viewers} viewers</p>
              </div>
              <p className="text-lg font-bold text-green-400">+₹{item.earning}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
