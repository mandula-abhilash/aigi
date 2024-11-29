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
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Plus } from "lucide-react";
import { createGiftProfile } from "@/services/profiles";

const profileSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  occasion: z.string().min(1, "Occasion is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  imageCredit: z.string().min(1, "Image credit is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
});

export default function AddGiftProfileDialog({ isOpen, onClose, onSuccess }) {
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState("");
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    link: "",
    description: "",
    keywords: [],
  });
  const [currentKeyword, setCurrentKeyword] = useState("");
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

  const handleAddKeyword = () => {
    if (
      currentKeyword.trim() &&
      !currentProduct.keywords.includes(currentKeyword.trim())
    ) {
      setCurrentProduct({
        ...currentProduct,
        keywords: [...currentProduct.keywords, currentKeyword.trim()],
      });
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setCurrentProduct({
      ...currentProduct,
      keywords: currentProduct.keywords.filter((k) => k !== keyword),
    });
  };

  const handleAddProduct = () => {
    try {
      const validatedProduct = productSchema.parse(currentProduct);
      setProducts([...products, validatedProduct]);
      setCurrentProduct({
        title: "",
        link: "",
        description: "",
        keywords: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.errors?.[0]?.message || "Invalid product data",
        variant: "destructive",
      });
    }
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
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

    if (products.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const title = `To ${data.recipient} on ${data.occasion}`;

      await createGiftProfile({
        title,
        description: data.description,
        image: data.imageUrl,
        imageCredit: data.imageCredit,
        interests,
        products,
      });

      toast({
        title: "Success",
        description: "Gift profile created successfully",
      });

      reset();
      setInterests([]);
      setProducts([]);
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
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto py-6">
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
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageCredit">Image Credit</Label>
            <Input
              id="imageCredit"
              {...register("imageCredit")}
              placeholder="e.g., Photo by John Doe on Unsplash"
            />
            {errors.imageCredit && (
              <p className="text-sm text-red-500">
                {errors.imageCredit.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
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

          <div className="space-y-2">
            <Label>Products</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Product Title"
                  value={currentProduct.title}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Amazon Affiliate Link"
                  value={currentProduct.link}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      link: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Product Description"
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a keyword"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddKeyword}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/20"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-2 hover:text-primary/70"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleAddProduct}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="space-y-2">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.keywords.map((keyword, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs bg-secondary rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
