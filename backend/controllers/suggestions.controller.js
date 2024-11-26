import OpenAI from "openai";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment
});

/**
 * Controller for field suggestions (Next Input Predictions).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const fieldSuggestions = async (req, res) => {
  try {
    const { field, context } = req.body;

    if (!field) {
      return res.status(400).json({ error: "Field is required." });
    }

    const messages = [
      {
        role: "system",
        content:
          "You are an intelligent assistant designed to help users fill out a form for finding personalized gift ideas.",
      },
      {
        role: "user",
        content: `
            Provide 3-5 concise and meaningful suggestions for the field "${field}".
            Suggestions must only include the possible values for this field and must not include the field name "${field}" in the output.
            ${
              context
                ? `Context provided: ${JSON.stringify(
                    context
                  )}. Tailor the suggestions to this context.`
                : "No additional context is provided."
            }
            If the current field value is partially filled (e.g., "${
              context?.currentField || ""
            }"), ensure all suggestions start with this value.
          `,
      },
    ];

    const response_format = {
      type: "json_schema",
      json_schema: {
        name: "suggestions_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            field_name: {
              type: "string",
              description:
                "The name of the field for which suggestions are provided.",
            },
            suggestions: {
              type: "array",
              description: "A list of suggested values for the field.",
              items: { type: "string" },
            },
          },
          required: ["field_name", "suggestions"],
          additionalProperties: false,
        },
      },
    };

    const completion = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages,
      response_format,
    });

    // Parse the AI's output
    let result = JSON.parse(completion.choices[0].message.content);

    return res.json(result);
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
