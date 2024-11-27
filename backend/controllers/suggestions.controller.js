import OpenAI from "openai";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate suggestions for a specific field using OpenAI with a tailored prompt.
 * @param {string} field - The name of the field.
 * @param {Object} context - The context for generating suggestions.
 */
const generateFieldSuggestions = async (field, context = {}) => {
  let messages;

  // Field-specific prompts
  switch (field) {
    case "recipient":
      messages = [
        {
          role: "system",
          content:
            "You are an assistant specializing in suggesting gift recipients.",
        },
        {
          role: "user",
          content: `
            Provide 3-5 suggestions for the recipient of the gift.
            Suggestions should include roles like 'mother', 'friend', or 'colleague'.
            ${
              context.currentField
                ? `The current input is "${context.currentField}". Ensure suggestions start with this input.`
                : "No partial input provided."
            }
          `,
        },
      ];
      break;

    case "occasion":
      messages = [
        {
          role: "system",
          content:
            "You are an assistant specializing in suggesting occasions for gifting.",
        },
        {
          role: "user",
          content: `
            Provide 3-5 suggestions for occasions like 'birthday', 'wedding', or 'anniversary'.
            ${
              context.currentField
                ? `The current input is "${context.currentField}". Ensure suggestions start with this input.`
                : "No partial input provided."
            }
          `,
        },
      ];
      break;

    case "interests":
      messages = [
        {
          role: "system",
          content:
            "You are an assistant specializing in suggesting gift ideas based on interests.",
        },
        {
          role: "user",
          content: `
            Provide 3-5 suggestions for interests like 'music', 'sports', or 'technology'.
            ${
              context.currentField
                ? `The current input is "${context.currentField}". Ensure suggestions start with this input.`
                : "No partial input provided."
            }
          `,
        },
      ];
      break;

    case "budget":
      messages = [
        {
          role: "system",
          content:
            "You are an assistant specializing in suggesting budget ranges for gifting.",
        },
        {
          role: "user",
          content: `
            Provide 3-5 budget suggestions in ranges like 'under $50', '$50-$100', or 'above $500'.
            ${
              context.currentField
                ? `The current input is "${context.currentField}". Ensure suggestions start with this input.`
                : "No partial input provided."
            }
          `,
        },
      ];
      break;

    default:
      throw new Error("Invalid field provided.");
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPEN_AI_MODEL,
    messages,
  });

  // Extract the suggestions from the AI's output
  const suggestions = completion.choices[0].message.content
    .split("\n")
    .filter((line) => line.trim() !== "");

  return suggestions;
};

/**
 * Generic Controller for field-specific suggestions.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const fieldSuggestions = async (req, res) => {
  try {
    const { field, context } = req.body;

    if (!field) {
      return res.status(400).json({ error: "Field is required." });
    }

    const suggestions = await generateFieldSuggestions(field, context);
    res.json(suggestions);
  } catch (error) {
    console.error("Error in fieldSuggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch field suggestions." });
  }
};

/**
 * Controller for gift suggestions based on user input.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const giftSuggestions = async (req, res) => {
  try {
    const { recipient, occasion, interests, budget } = req.body;

    if (!recipient && !occasion) {
      return res
        .status(400)
        .json({ error: "At least recipient or occasion must be provided." });
    }

    const messages = [
      {
        role: "system",
        content:
          "You are an AI that provides gift suggestions based on structured user input.",
      },
      {
        role: "user",
        content: `
          Based on the following inputs:
          ${
            recipient
              ? `- Recipient: ${recipient}`
              : "- Recipient: Not specified"
          }
          ${occasion ? `- Occasion: ${occasion}` : "- Occasion: Not specified"}
          ${
            interests?.length
              ? `- Interests: ${interests.join(", ")}`
              : "- Interests: Not specified"
          }
          ${budget ? `- Budget: ${budget}` : "- Budget: Not specified"}
          Please provide 5 personalized gift suggestions that are creative, practical, and relevant.
        `,
      },
    ];

    const response_format = {
      type: "json_schema",
      json_schema: {
        name: "gift_suggestions_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            recipient: {
              type: "string",
              description: "The recipient of the gift.",
            },
            occasion: {
              type: "string",
              description: "The occasion for the gift.",
            },
            suggestions: {
              type: "array",
              description: "A list of gift ideas based on the provided input.",
              items: { type: "string" },
            },
          },
          required: ["recipient", "occasion", "suggestions"],
          additionalProperties: false,
        },
      },
    };

    const completion = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages,
      response_format,
    });

    return res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    console.error("Error in giftSuggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch gift suggestions." });
  }
};
