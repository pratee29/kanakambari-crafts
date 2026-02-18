import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { Plus, Mic, Video } from 'lucide-react';

interface PauseSectionProps {
  userProfile: UserProfile;
}

export default function PauseSection({ userProfile }: PauseSectionProps) {
  const rooms = [
    { id: 1, name: 'Women - Health Discussion', type: 'voice', members: 23, active: true },
    { id: 2, name: 'Career Mentoring', type: 'video', members: 12, active: true },
    { id: 3, name: 'Wellness & Fitness', type: 'voice', members: 45, active: false },
    { id: 4, name: 'Business Networking', type: 'video', members: 18, active: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CREATE ROOM BUTTON */}
      <div className="flex gap-3">
        <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
          <Mic size={20} />
          Create Voice Room
        </Button>
        <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
          <Video size={20} />
          Create Video Room
        </Button>
      </div>

      {/* WELCOME CARD */}
      <Card className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-white/10 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-3">💜 Women Community - Pause</h2>
          <p className="text-white/80 mb-6">
            A safe and supportive space for women to connect, share experiences, and build meaningful relationships.
          </p>
          <p className="text-white/60">Community members: 2,450+ | Active rooms: 12</p>
        </div>
      </Card>

      {/* ROOMS GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300 hover:border-purple-400/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold">{room.name}</h3>
                <p className="text-white/60 text-sm mt-1">
                  {room.type === 'voice' ? '🎤 Voice Room' : '📹 Video Room'}
                </p>
              </div>
              {room.active && (
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">ACTIVE</span>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
              <p className="text-white/80 text-sm">👥 {room.members} members here</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-white/10 text-white rounded-lg hover:bg-white/20">
                Join Room
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
