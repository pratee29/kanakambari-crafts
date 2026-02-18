import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { Briefcase, Plus, DollarSign, Clock, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportSectionProps {
  userProfile: UserProfile;
}

const jobs = [
  {
    id: 1, title: 'Web Developer Needed', postedBy: 'TechStart Inc', budget: '₹50,000-80,000', applicants: 12,
    gradient: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format',
    timeline: '2-3 weeks', emoji: '💻',
  },
  {
    id: 2, title: 'React Expert Required', postedBy: 'Digital Solutions', budget: '₹1,00,000', applicants: 8,
    gradient: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format',
    timeline: '1 month', emoji: '⚛️',
  },
  {
    id: 3, title: 'UI/UX Designer Wanted', postedBy: 'Creative Minds', budget: '₹60,000-90,000', applicants: 15,
    gradient: 'from-pink-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format',
    timeline: '1-2 weeks', emoji: '🎨',
  },
  {
    id: 4, title: 'Content Writer Freelance', postedBy: 'EdTech Platform', budget: '₹30,000', applicants: 22,
    gradient: 'from-orange-500 to-amber-500',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format',
    timeline: '3-5 days', emoji: '✍️',
  },
];

export default function SupportSection({ userProfile }: SupportSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
              <Plus size={20} />
              Post Requirement
            </Button>
          </motion.div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {/* IMAGE TOP */}
              <div className="relative h-[140px] overflow-hidden">
                <img src={job.image} alt={job.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="text-2xl">{job.emoji}</span>
                  <Briefcase className="w-4 h-4 text-white/70" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-base drop-shadow-lg">{job.title}</h3>
                  <p className="text-white/70 text-xs mt-0.5">by {job.postedBy}</p>
                </div>
              </div>

              {/* BODY */}
              <div className="bg-[#0d1117] border-t border-white/5 p-4">
                <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/10">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-emerald-400 font-bold text-sm">{job.budget}</p>
                      <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><DollarSign size={8} /> Budget</p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-bold text-sm">{job.timeline}</p>
                      <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><Clock size={8} /> Timeline</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/50 text-xs mb-3">📊 {job.applicants} applicants</p>

                {(userProfile.role === 'VIEW' || userProfile.role === 'TALK') ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${job.gradient} text-white hover:opacity-90 transition flex items-center justify-center gap-1`}
                  >
                    Apply Now <ChevronRight size={14} />
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-white/10 text-white rounded-xl hover:bg-white/20 text-xs h-9">
                      Edit
                    </Button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r ${job.gradient} text-white hover:opacity-90 transition flex items-center justify-center gap-1`}
                    >
                      View Apps <ChevronRight size={12} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
