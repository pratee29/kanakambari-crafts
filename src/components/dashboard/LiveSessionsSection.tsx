import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { Zap, Play, Plus } from 'lucide-react';

interface LiveSessionsSectionProps {
  userProfile: UserProfile;
}

export default function LiveSessionsSection({ userProfile }: LiveSessionsSectionProps) {
  const liveSessions = [
    { id: 1, host: 'Rajesh Kumar', title: 'Web Development Masterclass', viewers: 342, duration: '1:45' },
    { id: 2, host: 'Priya Singh', title: 'Career Guidance Session', viewers: 156, duration: '0:35' },
    { id: 3, host: 'Amit Patel', title: 'Freelancing Tips & Tricks', viewers: 89, duration: '2:10' },
    { id: 4, host: 'Sarah Johnson', title: 'Design Thinking Workshop', viewers: 234, duration: '1:20' },
  ];

  const scheduledSessions = userProfile.role === 'CREATE' ? [
    { id: 1, title: 'Advanced React', scheduledFor: '2:00 PM Today', participants: 0 },
    { id: 2, title: 'Node.js Deep Dive', scheduledFor: 'Tomorrow 10:00 AM', participants: 0 },
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CREATE BUTTON - Only for CREATE role */}
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
            <Plus size={20} />
            Create Live Session
          </Button>
        </div>
      )}

      {/* CURRENT LIVE SESSIONS */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-400 animate-pulse" />
          Live Now ({liveSessions.length})
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {liveSessions.map((session) => (
            <Card
              key={session.id}
              className="backdrop-blur-xl bg-white/5 border-white/10 p-4 hover:scale-105 transition-transform duration-300 hover:border-orange-400/50"
            >
              <div className="mb-4">
                <div className="relative bg-black/40 rounded-lg h-32 flex items-center justify-center mb-4">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full border border-red-500/50">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-semibold">LIVE</span>
                  </div>
                  <Play className="w-12 h-12 text-white/40" />
                </div>
              </div>

              <h4 className="text-white font-semibold mb-2">{session.title}</h4>
              <p className="text-white/60 text-sm mb-4">Host: {session.host}</p>

              <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white/80 text-sm">👥 {session.viewers} watching</span>
                <span className="text-white/60 text-xs">⏱️ {session.duration}</span>
              </div>

              {userProfile.role === 'VIEW' && (
                <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                  Watch Live 👁️
                </Button>
              )}
              {userProfile.role === 'TALK' && (
                <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                  Join Discussion 🎤
                </Button>
              )}
              {userProfile.role === 'CREATE' && (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-white/10 text-white rounded-lg hover:bg-white/20">
                    Edit
                  </Button>
                  <Button className="flex-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* SCHEDULED SESSIONS - Only for CREATE */}
      {userProfile.role === 'CREATE' && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">📅 Your Scheduled Sessions</h3>
          <div className="space-y-3">
            {scheduledSessions.map((session) => (
              <Card
                key={session.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 hover:border-orange-400/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{session.title}</h4>
                    <p className="text-white/60 text-sm">Scheduled: {session.scheduledFor}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-white/10 text-white rounded-lg hover:bg-white/20">
                      Edit
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                      Go Live
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* EARNING LOGIC - Only for CREATE */}
      {userProfile.role === 'CREATE' && (
        <Card className="backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-white/10 p-6">
          <h3 className="text-white font-bold mb-4">💰 Live Earning Counter</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-2">Total Viewers</p>
              <p className="text-3xl font-bold text-green-400">342</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-2">Earning Rate</p>
              <p className="text-3xl font-bold text-green-400">₹5.5/viewer</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-2">Session Earnings</p>
              <p className="text-3xl font-bold text-green-400">₹1,881</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
