import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { MessageCircle, Plus, Mic, MicOff, Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiscussRoomsSectionProps {
  userProfile: UserProfile;
}

const discussRooms = [
  {
    id: 1, title: 'Web Development Discussion', host: 'Rajesh Kumar', members: 45, active: true,
    gradient: 'from-violet-600 to-pink-600',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format',
    date: 'Today', time: '6 PM', avatar: 'RK',
  },
  {
    id: 2, title: 'Career Advice Room', host: 'Priya Singh', members: 32, active: true,
    gradient: 'from-orange-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format',
    date: 'Today', time: '7 PM', avatar: 'PS',
  },
  {
    id: 3, title: 'Freelancing Community', host: 'Amit Patel', members: 78, active: false,
    gradient: 'from-emerald-600 to-teal-600',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format',
    date: 'Tomorrow', time: '5 PM', avatar: 'AP',
  },
  {
    id: 4, title: 'Design & UX Talk', host: 'Sarah Johnson', members: 23, active: true,
    gradient: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format',
    date: 'Tomorrow', time: '8 PM', avatar: 'SJ',
  },
];

export default function DiscussRoomsSection({ userProfile }: DiscussRoomsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
              <Plus size={20} />
              Create Discussion Room
            </Button>
          </motion.div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {discussRooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[200px]">
              {/* BG IMAGE */}
              <img src={room.image} alt={room.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-50`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <MessageCircle className="w-5 h-5 text-white/70" />
                  {room.active && (
                    <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/50 backdrop-blur-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs font-semibold">ACTIVE</span>
                    </div>
                  )}
                </div>

                {/* BOTTOM */}
                <div>
                  <h3 className="text-white font-bold text-base mb-1 drop-shadow-lg">{room.title}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${room.gradient} border-2 border-white/30 flex items-center justify-center text-white text-[10px] font-bold`}>
                        {room.avatar}
                      </div>
                      <div>
                        <p className="text-white/80 text-xs font-medium">{room.host}</p>
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <span className="flex items-center gap-1"><Users size={9} /> {room.members}</span>
                          <span className="flex items-center gap-1"><Clock size={9} /> {room.time}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {userProfile.role === 'VIEW' && (
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-xs hover:bg-white/30 flex items-center gap-1 h-8">
                          <MicOff size={12} /> Listen
                        </Button>
                      )}
                      {userProfile.role === 'TALK' && (
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-xs hover:bg-white/30 flex items-center gap-1 h-8">
                          <Mic size={12} /> Talk
                        </Button>
                      )}
                      {userProfile.role === 'CREATE' && (
                        <div className="flex gap-1">
                          <Button size="sm" className="bg-white/10 text-white rounded-full text-xs hover:bg-white/20 h-8">
                            Join
                          </Button>
                          <Button size="sm" className={`bg-gradient-to-r ${room.gradient} text-white rounded-full text-xs hover:opacity-90 h-8`}>
                            Manage
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
