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

export default function CreatePauseContentModal({ open, onClose }: Props) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    imageUrl: "",
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
      await addDoc(collection(db, "pauseContent"), {
        ...form,
        createdBy: userProfile.fullName,
        creatorUid: userProfile.uid,
        views: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Pause content created successfully!");
      setForm({ title: "", description: "", type: "", imageUrl: "" });
      onClose();
    } catch (err) {
      console.error("Error creating pause content:", err);
      alert("Failed to create. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Pause Content</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/70 mb-1 block">Title</label>
            <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Meditation for Focus" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Type</label>
            <Input name="type" value={form.type} onChange={handleChange} required placeholder="e.g. Meditation, Music, Breathing" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the content..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Image URL (optional)</label>
            <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="bg-white/5 border-white/10 text-white" />
          </div>

          <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Creating..." : "Create Pause Content"}
          </Button>
        </form>
      </div>
    </div>
  );
}
