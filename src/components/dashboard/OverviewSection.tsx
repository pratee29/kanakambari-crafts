import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserProfile } from '@/context/AuthContext';
import { Zap, Users, TrendingUp } from 'lucide-react';

interface OverviewSectionProps {
  userProfile: UserProfile;
  onlineCount: number;
}

export default function OverviewSection({ userProfile, onlineCount }: OverviewSectionProps) {
  const initials = userProfile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const trendingSessions = [
    { id: 1, host: 'Rajesh Kumar', viewers: 142, title: 'Web Development Tips' },
    { id: 2, host: 'Priya Singh', viewers: 89, title: 'Career Growth Strategies' },
    { id: 3, host: 'Amit Patel', viewers: 67, title: 'Freelancing Guide' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* USER WELCOME CARD */}
      <Card className="backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-white/10 p-8">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24 border-2 border-orange-400/50">
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{userProfile.fullName}</h2>
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                userProfile.role === 'VIEW' ? 'bg-slate-500/20 text-slate-300' :
                userProfile.role === 'TALK' ? 'bg-orange-500/20 text-orange-300' :
                'bg-pink-500/20 text-pink-300'
              }`}>
                {userProfile.role === 'VIEW' ? '👁️ View Access' : 
                 userProfile.role === 'TALK' ? '🎤 Talk Access' : 
                 '✨ Create & Contribute'}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-300">
                ⭐ {Math.floor(Math.random() * 500 + 200)} Points
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300">
                🔥 2 Active Sessions
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Online Users</p>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{onlineCount}</p>
          <p className="text-white/60 text-xs mt-2">Currently active</p>
        </Card>

        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Live Sessions</p>
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">12</p>
          <p className="text-white/60 text-xs mt-2">Happening now</p>
        </Card>

        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Discussions</p>
            <MessageCircle className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold text-white">28</p>
          <p className="text-white/60 text-xs mt-2">Active rooms</p>
        </Card>

        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-sm">Trending</p>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-white/60 text-xs mt-2">Top sessions</p>
        </Card>
      </div>

      {/* TRENDING SESSIONS */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
        <h3 className="text-xl font-bold text-white mb-6">🔥 Trending Sessions</h3>
        <div className="space-y-4">
          {trendingSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <p className="text-white font-semibold">{session.title}</p>
                  <p className="text-white/60 text-sm">by {session.host}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">👥 {session.viewers} viewers</span>
                <Button className="gradient-orange text-primary-foreground rounded-full px-6">
                  Join Live
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* EARNINGS PREVIEW - Only for CREATE */}
      {userProfile.role === 'CREATE' && (
        <Card className="backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-white/10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-2">Today's Earnings</p>
              <p className="text-4xl font-bold text-green-400">₹2,450</p>
            </div>
            <div className="text-6xl">💰</div>
          </div>
        </Card>
      )}
    </div>
  );
}

import { MessageCircle } from 'lucide-react';
