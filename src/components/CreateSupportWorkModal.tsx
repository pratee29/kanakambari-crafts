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

export default function CreateSupportWorkModal({ open, onClose }: Props) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
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
      await addDoc(collection(db, "supportWork"), {
        ...form,
        publishedBy: userProfile.fullName,
        publisherUid: userProfile.uid,
        status: "open",
        applicants: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Work published successfully!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      onClose();
    } catch (err) {
      console.error("Error publishing work:", err);
      alert("Failed to publish. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Publish Work Requirement</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/70 mb-1 block">Work Title</label>
            <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Create a Logo for my Brand" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70 mb-1 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the work you need done..." className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-3 min-h-[80px] placeholder:text-white/40" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70 mb-1 block">Budget (₹)</label>
              <Input name="budget" value={form.budget} onChange={handleChange} required placeholder="e.g. ₹5k - ₹20k" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-1 block">Deadline</label>
              <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Publishing..." : "Publish Work"}
          </Button>
        </form>
      </div>
    </div>
  );
}
