import api from "./api";

export async function getGiftProfiles() {
  try {
    // For development, return mock data until the API is ready
    return [
      {
        id: 1,
        title: "Birthday Gifts for Tech Enthusiasts",
        description: "Perfect gifts for the tech-savvy person in your life",
        image:
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&h=350&fit=crop",
        interests: ["Technology", "Gadgets", "Innovation"],
        views: 1200,
        createdAt: "2024-02-01",
      },
      {
        id: 2,
        title: "Eco-Friendly Gift Ideas",
        description: "Sustainable and environmentally conscious gift options",
        image:
          "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?w=500&h=350&fit=crop",
        interests: ["Sustainability", "Eco-Friendly", "Green Living"],
        views: 980,
        createdAt: "2024-02-05",
      },
      {
        id: 3,
        title: "Gifts for Coffee Lovers",
        description: "Delightful presents for coffee enthusiasts",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=350&fit=crop",
        interests: ["Coffee", "Beverages", "Gourmet"],
        views: 850,
        createdAt: "2024-02-10",
      },
    ];

    // When API is ready, uncomment this:
    // const response = await api.get('/api/profiles');
    // return response.data;
  } catch (error) {
    console.error("Error fetching gift profiles:", error);
    return [];
  }
}
