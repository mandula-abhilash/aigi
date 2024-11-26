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
          Your goal is to suggest concise, meaningful, and context-aware completions for the field "${field}".
          
          When providing suggestions:
          - Always return 3–5 options.
          - If context is provided, tailor your suggestions to the given context to ensure relevance.
          - Keep suggestions specific and avoid generic or repetitive outputs.
          
          ${
            context
              ? `Context provided: ${JSON.stringify(
                  context
                )}. Make suggestions specific to this context.`
              : "No additional context is provided."
          }
          
          Ensure your responses are helpful and appropriate for the task of gift idea generation.
        `,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL, // Adjust model as needed
      messages,
    });

    const suggestions = completion.choices[0].message.content
      .trim()
      .split("\n")
      .filter((suggestion) => suggestion);

    return res.json({ suggestions });
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

    // Ensure at least critical fields are present
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
          
          Please provide personalized and thoughtful gift suggestions. Tailor recommendations to the available details, and if some fields are missing, make reasonable assumptions to provide meaningful ideas. Return 5 suggestions.
        `,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages,
    });

    const suggestions = completion.choices[0].message.content
      .trim()
      .split("\n")
      .filter((suggestion) => suggestion);

    return res.json({ suggestions });
  } catch (error) {
    console.error("Error in giftSuggestions:", error.message);
    res.status(500).json({ error: "Failed to fetch gift suggestions." });
  }
};
