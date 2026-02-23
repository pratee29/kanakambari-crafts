import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserProfile } from '@/context/AuthContext';
import { TrendingUp } from 'lucide-react';

interface InTheAirSectionProps {
  userProfile: UserProfile;
}

export default function InTheAirSection({ userProfile }: InTheAirSectionProps) {
  const trendingSessions = [
    { id: 1, host: 'Rajesh Kumar', title: 'Web Development Tips', viewers: 342, joined: false },
    { id: 2, host: 'Priya Singh', title: 'Career Growth Strategies', viewers: 189, joined: true },
    { id: 3, host: 'Amit Patel', title: 'Freelancing Guide', viewers: 127, joined: false },
    { id: 4, host: 'Sarah Johnson', title: 'Design Workshop', viewers: 234, joined: false },
    { id: 5, host: 'Deepak Verma', title: 'Investment Basics', viewers: 98, joined: false },
    { id: 6, host: 'Ananya Sharma', title: 'Mental Health Talk', viewers: 156, joined: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SORT OPTIONS */}
      <div className="flex gap-2 flex-wrap">
        <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full">
          Most Joined
        </Button>
        <Button className="bg-white/10 text-white rounded-full hover:bg-white/20">
          Recently Started
        </Button>
        <Button className="bg-white/10 text-white rounded-full hover:bg-white/20">
          Trending Now
        </Button>
      </div>

      {/* TRENDING BANNER */}
      <Card className="backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-white/10 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">🔥 In The Air</h2>
            <p className="text-white/80">Most popular live sessions happening right now</p>
          </div>
          <TrendingUp className="w-12 h-12 text-orange-400 opacity-50" />
        </div>
      </Card>

      {/* SESSIONS GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {trendingSessions.map((session) => (
          <Card
            key={session.id}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300 hover:border-orange-400/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-12 h-12 border-2 border-orange-400/30">
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold">
                    {session.host[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white/60 text-sm">hosted by</p>
                  <p className="text-white font-semibold">{session.host}</p>
                </div>
              </div>
              {session.joined && (
                <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/50">
                  JOINED
                </div>
              )}
            </div>

            <h3 className="text-white font-bold text-lg mb-4">{session.title}</h3>

            <div className="flex items-center justify-between mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white/80 font-semibold">LIVE NOW</span>
              </div>
              <span className="text-white/60 text-sm">👥 {session.viewers}</span>
            </div>

            {session.joined ? (
              <Button className="w-full bg-white/10 text-white rounded-lg hover:bg-white/20">
                Watching
              </Button>
            ) : (
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                Join Now
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
