import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddGiftProfileDialog from "./AddGiftProfileDialog";
import { useAuth } from "@/contexts/AuthContext";

export default function AddGiftProfileButton({ onProfileAdded }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  const handleProfileAdded = () => {
    setIsDialogOpen(false);
    onProfileAdded?.();
  };

  if (!user?.role === "admin") return null;

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Gift Profile
      </Button>

      <AddGiftProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleProfileAdded}
      />
    </>
  );
}
