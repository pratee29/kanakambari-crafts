import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';
import { Briefcase, Plus } from 'lucide-react';

interface SupportSectionProps {
  userProfile: UserProfile;
}

export default function SupportSection({ userProfile }: SupportSectionProps) {
  const jobs = [
    { id: 1, title: 'Web Developer Needed', postedBy: 'TechStart Inc', budget: '₹50,000-80,000', applicants: 12 },
    { id: 2, title: 'React Expert Required', postedBy: 'Digital Solutions', budget: '₹1,00,000', applicants: 8 },
    { id: 3, title: 'UI/UX Designer Wanted', postedBy: 'Creative Minds', budget: '₹60,000-90,000', applicants: 15 },
    { id: 4, title: 'Content Writer Freelance', postedBy: 'EdTech Platform', budget: '₹30,000', applicants: 22 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* POST JOB BUTTON - Only for CREATE role */}
      {userProfile.role === 'CREATE' && (
        <div className="flex justify-end">
          <Button className="gradient-orange text-primary-foreground rounded-full px-6 flex items-center gap-2">
            <Plus size={20} />
            Post Requirement
          </Button>
        </div>
      )}

      {/* JOBS GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:scale-105 transition-transform duration-300 hover:border-orange-400/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{job.title}</h3>
                <p className="text-white/60 text-sm">by {job.postedBy}</p>
              </div>
              <Briefcase className="w-5 h-5 text-orange-400" />
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
              <p className="text-white font-semibold text-lg">{job.budget}</p>
              <p className="text-white/60 text-sm">Budget Range</p>
            </div>

            <p className="text-white/60 text-sm mb-4">📊 {job.applicants} applicants</p>

            {userProfile.role === 'VIEW' || userProfile.role === 'TALK' ? (
              <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                Apply Now
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button className="flex-1 bg-white/10 text-white rounded-lg hover:bg-white/20">
                  Edit
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:opacity-90">
                  View Applications
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
