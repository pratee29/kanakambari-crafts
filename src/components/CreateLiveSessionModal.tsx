import { useState } from "react";
import { X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateLiveSessionModal({ open, onClose }: Props) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    date: "",
    time: "",
    duration: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "liveSessions"), {
        ...form,
        hostName: userProfile.fullName,
        hostUid: userProfile.uid,
        status: "scheduled",
        viewers: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Live session created successfully!");
      setForm({ title: "", subject: "", description: "", date: "", time: "", duration: "" });
      onClose();
    } catch (err) {
      console.error("Error creating live session:", err);
      alert("Failed to create session. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Live Session</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/70 mb-1 block">Session Title</label>
            <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Python Masterclass" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Subject / Topic</label>
            <Input name="subject" value={form.subject} onChange={handleChange} required placeholder="e.g. Web Development" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will you teach..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70 mb-1 block">Date</label>
              <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-1 block">Time</label>
              <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Duration (e.g. 1 hour)</label>
            <Input name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 1.5 hours" className="bg-white/5 border-white/10 text-white" />
          </div>

          <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Creating..." : "Create Live Session"}
          </Button>
        </form>
      </div>
    </div>
  );
}
