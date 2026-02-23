import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { MessageCircle, Plus, Mic, MicOff } from 'lucide-react';

interface DiscussRoomsSectionProps {
  userProfile: UserProfile;
}

export default function DiscussRoomsSection({ userProfile }: DiscussRoomsSectionProps) {
  const discussRooms = [
    { id: 1, title: 'Web Development Discussion', host: 'Rajesh Kumar', members: 45, active: true },
    { id: 2, title: 'Career Advice Room', host: 'Priya Singh', members: 32, active: true },
    { id: 3, title: 'Freelancing Community', host: 'Amit Patel', members: 78, active: false },
    { id: 4, title: 'Design & UX Talk', host: 'Sarah Johnson', members: 23, active: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CREATE BUTTON - Only for CREATE role */}
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
            <Plus size={20} />
            Create Discussion Room
          </Button>
        </div>
      )}

      {/* DISCUSSION ROOMS GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {discussRooms.map((room) => (
          <Card
            key={room.id}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300 hover:border-orange-400/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{room.title}</h3>
                <p className="text-white/60 text-sm">Hosted by {room.host}</p>
              </div>
              {room.active && (
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">ACTIVE</span>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
              <p className="text-white/80 text-sm">👥 {room.members} members in room</p>
            </div>

            {userProfile.role === 'VIEW' && (
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2">
                <MicOff size={16} />
                Join & Listen
              </Button>
            )}
            {userProfile.role === 'TALK' && (
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2">
                <Mic size={16} />
                Join & Participate
              </Button>
            )}
            {userProfile.role === 'CREATE' && (
              <div className="flex gap-2">
                <Button className="flex-1 bg-white/10 text-white rounded-lg hover:bg-white/20">
                  Join
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                  Manage
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
