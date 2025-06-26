import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!, // Assumes you’ll use this from server-side
});

export default groq;
