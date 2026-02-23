import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { BookOpen, Plus, Lock } from 'lucide-react';

interface LearnSectionProps {
  userProfile: UserProfile;
}

export default function LearnSection({ userProfile }: LearnSectionProps) {
  const sessions = [
    { id: 1, title: 'React Fundamentals', instructor: 'Rajesh Kumar', type: 'free', duration: '2 hrs', views: 1200 },
    { id: 2, title: 'Advanced TypeScript', instructor: 'Priya Singh', type: 'paid', duration: '3 hrs', views: 450 },
    { id: 3, title: 'Node.js Masterclass', instructor: 'Amit Patel', type: 'free', duration: '2.5 hrs', views: 890 },
    { id: 4, title: 'Full Stack Development', instructor: 'Sarah Johnson', type: 'paid', duration: '4 hrs', views: 320 },
  ];

  const canAccess = (sessionType: string) => {
    if (sessionType === 'free') return true;
    if (userProfile.role === 'TALK' || userProfile.role === 'CREATE') return true;
    return false;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CREATE BUTTON - Only for CREATE role */}
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
            <Plus size={20} />
            Upload Learning Session
          </Button>
        </div>
      )}

      {/* LEARNING SESSIONS GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className={`backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300 hover:border-orange-400/50 ${
              !canAccess(session.type) ? 'opacity-75' : ''
            }`}
          >
            <div className="relative bg-black/40 rounded-lg h-32 flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-white/40" />
              {session.type === 'paid' && !canAccess(session.type) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                  <Lock className="w-8 h-8 text-yellow-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold bg-white/10 text-white">
                {session.type === 'free' ? '🔓 Free' : '🔒 Paid'}
              </div>
            </div>

            <h3 className="text-white font-bold mb-2">{session.title}</h3>
            <p className="text-white/60 text-sm mb-3">by {session.instructor}</p>

            <div className="flex items-center justify-between text-white/60 text-sm mb-4 p-2 bg-white/5 rounded">
              <span>⏱️ {session.duration}</span>
              <span>👁️ {session.views} views</span>
            </div>

            {canAccess(session.type) ? (
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                Watch Now
              </Button>
            ) : (
              <Button className="w-full bg-white/10 text-white rounded-lg hover:bg-white/20 cursor-not-allowed">
                Upgrade to Watch
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
