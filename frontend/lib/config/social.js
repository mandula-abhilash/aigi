// Social media profiles configuration
export const socialProfiles = {
  instagram: {
    url: "https://www.instagram.com/visdak_official/",
    handle: "@visdak_official",
  },
  twitter: {
    url: "https://x.com/visdak_official",
    handle: "@visdak_official",
  },
  pinterest: {
    url: "https://www.pinterest.com/visdak_official/",
    handle: "@visdak_official",
  },
};

// Social sharing configuration
export const socialSharing = {
  platforms: [
    {
      name: "X (Twitter)",
      shareUrl: "https://twitter.com/intent/tweet",
      getParams: ({ url, title }) => ({
        url,
        text: title,
        via: "visdak_official",
      }),
    },
    {
      name: "Pinterest",
      shareUrl: "https://pinterest.com/pin/create/button/",
      getParams: ({ url, title, image }) => ({
        url,
        description: title,
        media: image,
      }),
    },
  ],
};

// Social media content types
export const contentTypes = {
  GIFT_PROFILE: "gift_profile",
  GIFT_SUGGESTION: "gift_suggestion",
  BLOG_POST: "blog_post",
};
