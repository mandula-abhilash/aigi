import OpenAI from "openai";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate field-specific suggestions using OpenAI.
 * @param {string} field - The field for which suggestions are needed (e.g., "recipient").
 * @param {Object} context - The context for generating suggestions.
 */
const generateFieldSuggestions = async (field, context = {}) => {
  // Field-specific prompts and responses
  const fieldPrompts = {
    recipient: {
      system:
        "You are an assistant specializing in identifying suitable gift recipients for various occasions.",
      user: `Provide 3-5 simple suggestions without numbering or labels. Examples include mother, friend, colleague.
      ${
        context.recipient
          ? `If a recipient is partially provided, ensure all suggestions start with "${context.recipient}".`
          : ""
      }
      Otherwise, provide general suggestions.`,
    },
    occasion: {
      system:
        "You are an assistant specializing in identifying appropriate gifting occasions.",
      user: `Provide 3-5 simple suggestions for occasions. Examples include birthday, wedding, anniversary.
      ${
        context.occasion
          ? `If an occasion is partially provided, ensure all suggestions start with "${context.occasion}".`
          : ""
      }
      Otherwise, provide general suggestions.`,
    },
    interest: {
      system:
        "You are an assistant specializing in suggesting interests and hobbies.",
      user: `Provide 3-5 simple suggestions for interests or hobbies. Examples include reading, cooking, gaming.
      ${
        context.interest
          ? `If an interest is partially provided, ensure all suggestions start with "${context.interest}".`
          : ""
      }
      Otherwise, provide general suggestions.`,
    },
    budget: {
      system:
        "You are an assistant specializing in suggesting budget ranges for gifting.",
      user: `Provide 3-5 simple budget range suggestions without numbering or labels. Examples include under $50, $50-$100, above $500.
      ${
        context.maxBudget
          ? `Ensure the suggestions align with a maximum budget of "${context.maxBudget}".`
          : ""
      }
      Otherwise, provide general suggestions.`,
    },
  };

  if (!fieldPrompts[field]) {
    throw new Error("Invalid field provided.");
  }

  // Call OpenAI API with appropriate prompts
  const response = await openai.chat.completions.create({
    model: process.env.OPEN_AI_MODEL,
    messages: [
      {
        role: "system",
        content: fieldPrompts[field].system,
      },
      {
        role: "user",
        content: fieldPrompts[field].user,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: `${field}_suggestions_array`,
        strict: true,
        schema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              description: `List of suggestions for the field "${field}".`,
              items: {
                type: "string",
                description: `A suggestion related to the "${field}" field.`,
              },
            },
          },
          required: ["suggestions"],
          additionalProperties: false,
        },
      },
    },
    temperature: 0.7,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // Parse and return structured suggestions
  const suggestions = JSON.parse(
    response.choices[0].message.content
  ).suggestions;
  return suggestions;
};

/**
 * Controller for field-specific suggestions.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const fieldSuggestions = async (req, res) => {
  try {
    const { field, context } = req.body;

    if (!field) {
      return res.status(400).json({ error: "Field is required." });
    }

    // Handle 'interests' field as 'interest' for suggestions
    const normalizedField = field === "interests" ? "interest" : field;
    const suggestions = await generateFieldSuggestions(
      normalizedField,
      context || {}
    );
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

    const response = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "gift_suggestions_array",
          strict: true,
          schema: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                description: "A list of personalized gift suggestions.",
                items: {
                  type: "string",
                  description: "A suggested gift idea.",
                },
              },
            },
            required: ["suggestions"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Parse and return structured gift suggestions
    const suggestions = JSON.parse(
      response.choices[0].message.content
    ).suggestions;
    res.json(suggestions);
  } catch (error) {
    console.error("Error in giftSuggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch gift suggestions." });
  }
};
