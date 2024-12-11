import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import { createGiftProfile } from "@/services/profiles";

const profileSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  occasion: z.string().min(1, "Occasion is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  creditAuthor: z.string().min(1, "Image credit author is required"),
  creditAuthorLink: z.string().url("Must be a valid URL"),
  creditPlatformLink: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AddGiftProfileDialog({ isOpen, onClose, onSuccess }) {
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleAddInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const onSubmit = async (data) => {
    if (interests.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one interest",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const title = `For ${data.recipient} on ${data.occasion}`;

      const newProfile = await createGiftProfile({
        title,
        description: data.description,
        image: data.imageUrl,
        creditAuthor: data.creditAuthor,
        creditAuthorLink: data.creditAuthorLink,
        creditPlatformLink: data.creditPlatformLink,
        interests,
      });

      // Dispatch custom event with new profile data
      const event = new CustomEvent("profileAdded", {
        detail: newProfile.giftProfile,
      });
      window.dispatchEvent(event);

      toast({
        title: "Success",
        description: "Gift profile created successfully",
      });

      reset();
      setInterests([]);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create gift profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto my-4">
        <DialogHeader>
          <DialogTitle>Add New Gift Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              {...register("recipient")}
              placeholder="e.g., Husband, Sister"
            />
            {errors.recipient && (
              <p className="text-sm text-red-500">{errors.recipient.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input
              id="occasion"
              {...register("occasion")}
              placeholder="e.g., Wedding Anniversary, Birthday"
            />
            {errors.occasion && (
              <p className="text-sm text-red-500">{errors.occasion.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              {...register("imageUrl")}
              placeholder="https://images.unsplash.com/..."
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditAuthor">Image Credit Author</Label>
            <Input
              id="creditAuthor"
              {...register("creditAuthor")}
              placeholder="e.g., John Doe"
            />
            {errors.creditAuthor && (
              <p className="text-sm text-red-500">
                {errors.creditAuthor.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditAuthorLink">Author Profile Link</Label>
            <Input
              id="creditAuthorLink"
              {...register("creditAuthorLink")}
              placeholder="https://unsplash.com/@johndoe"
            />
            {errors.creditAuthorLink && (
              <p className="text-sm text-red-500">
                {errors.creditAuthorLink.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditPlatformLink">Platform Link</Label>
            <Input
              id="creditPlatformLink"
              {...register("creditPlatformLink")}
              placeholder="https://unsplash.com"
            />
            {errors.creditPlatformLink && (
              <p className="text-sm text-red-500">
                {errors.creditPlatformLink.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Perfect gifts for..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Interests</Label>
            <div className="flex gap-2">
              <Input
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                placeholder="Add an interest"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
              />
              <Button type="button" onClick={handleAddInterest}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 hover:text-primary/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Profile"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
