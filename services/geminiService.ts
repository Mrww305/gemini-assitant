
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment.
// For this environment, we assume process.env.API_KEY is directly available.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("Gemini API key is missing. Please set the API_KEY environment variable.");
  // Potentially throw an error or handle this state more gracefully in a real app
}

// Initialize with a check for apiKey to prevent runtime errors if it's truly missing.
// The fallback "MISSING_API_KEY" is for type safety during initialization if apiKey is undefined,
// but actual calls will fail or should be prevented if the key isn't set.
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });

export const generateTextFromGemini = async (prompt: string): Promise<string> => {
  if (!apiKey) { // Double-check apiKey before making a call
    return "Error: Gemini API key is not configured. Please contact support or check your setup.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17", 
      contents: prompt,
      // Example config:
      // config: { 
      //   temperature: 0.7,
      //   topK: 40,
      //   topP: 0.95,
      //   thinkingConfig: { thinkingBudget: 0 } // For low latency if needed
      // },
    });
    
    // Extract text directly from response.text
    // The response.text getter handles safe navigation internally.
    const text = response.text;

    // If responseMimeType: "application/json" was used in config, parse JSON:
    // try {
    //   let jsonStr = response.text.trim();
    //   const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    //   const match = jsonStr.match(fenceRegex);
    //   if (match && match[2]) {
    //     jsonStr = match[2].trim(); // Trim the extracted content itself
    //   }
    //   const parsedData = JSON.parse(jsonStr);
    //   // Process parsedData as needed, e.g., JSON.stringify(parsedData, null, 2) or return specific fields
    //   return JSON.stringify(parsedData, null, 2); 
    // } catch (e) {
    //   console.error("Failed to parse JSON from Gemini response:", e);
    //   // Return the raw text or a more specific error message if JSON parsing fails
    //   return "Error: Could not parse AI's JSON response. Raw output: " + response.text;
    // }

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a user-friendly error message
    if (error instanceof Error) { // Check if it's a standard Error object
        // Specific error messages can be tailored based on error.name or error.message content
        if (error.message.includes('API key not valid')) {
             return "Error: The Gemini API key is invalid. Please check your configuration.";
        }
        return `Error generating content: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI model. Please try again later.";
  }
};

// Example for image generation (if needed in future)
/*
export const generateImageFromImagen = async (prompt: string): Promise<string | null> => {
  if (!apiKey) {
    console.error("Imagen API key is missing.");
    return null; // Or throw new Error("API key is missing");
  }
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {numberOfImages: 1, outputMimeType: 'image/jpeg'}, // or 'image/png'
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        // Mime type should match outputMimeType from config
        return `data:image/jpeg;base64,${base64ImageBytes}`; 
    }
    return null; // Or throw new Error("No image generated or image data missing");
  } catch (error) {
    console.error("Error calling Imagen API:", error);
    // Handle specific errors from Imagen API if possible
    return null; // Or throw error;
  }
};
*/
