import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserProfile } from '@/context/AuthContext';
import { Edit2, Lock } from 'lucide-react';

interface ProfileSectionProps {
  userProfile: UserProfile;
}

export default function ProfileSection({ userProfile }: ProfileSectionProps) {
  const initials = userProfile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const profileFields = [
    { label: 'Full Name', value: userProfile.fullName, icon: '👤' },
    { label: 'Email Address', value: userProfile.email, icon: '📧' },
    { label: 'Phone Number', value: userProfile.phone, icon: '📱' },
    { label: 'Address', value: userProfile.address, icon: '📍' },
    { label: 'Interest/Expertise', value: userProfile.interest, icon: '⭐' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* PROFILE HEADER */}
      <Card className="backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-white/10 p-8">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-32 h-32 border-4 border-orange-400/50">
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-4xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{userProfile.fullName}</h2>
            <p className="text-white/80 mb-4">{userProfile.email}</p>
            <div className="flex flex-wrap gap-2">
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
                ✓ Verified Member
              </span>
            </div>
          </div>
          <Button className="gradient-orange text-primary-foreground rounded-lg flex items-center gap-2">
            <Edit2 size={18} />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* PROFILE DETAILS */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
        <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
        <div className="space-y-4">
          {profileFields.map((field, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{field.icon}</span>
                <div>
                  <p className="text-white/60 text-sm">{field.label}</p>
                  <p className="text-white font-medium">{field.value}</p>
                </div>
              </div>
              <Button className="bg-white/10 text-white rounded-lg hover:bg-white/20">
                Edit
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* SECURITY SECTION */}
      <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock size={20} />
          Security Settings
        </h3>
        <div className="space-y-3">
          <Button className="w-full bg-white/10 text-white rounded-lg hover:bg-white/20 justify-start">
            🔐 Change Password
          </Button>
          <Button className="w-full bg-white/10 text-white rounded-lg hover:bg-white/20 justify-start">
            🔑 Two-Factor Authentication
          </Button>
          <Button className="w-full bg-white/10 text-white rounded-lg hover:bg-white/20 justify-start">
            📋 Active Sessions
          </Button>
        </div>
      </Card>

      {/* ACCOUNT INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">Member Since</p>
          <p className="text-2xl font-bold text-white">
            {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </Card>
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">Account Status</p>
          <p className="text-2xl font-bold text-green-400">✓ Active</p>
        </Card>
      </div>
    </div>
  );
}
