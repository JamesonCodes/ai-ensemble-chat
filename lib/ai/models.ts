// Curated list of top models from Vercel AI Gateway
export const DEFAULT_CHAT_MODEL = "openai/gpt-4.1-mini";
export const QUAD_MODE_MODEL_IDS = [
  "anthropic/claude-haiku-4.5",
  "openai/gpt-4.1-mini",
  "google/gemini-2.5-flash-lite",
  "xai/grok-4.1-fast-non-reasoning",
] as const;

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  // Anthropic
  {
    id: "anthropic/claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
    description: "Balanced capability and speed",
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    description: "Fast and affordable, great for everyday tasks",
  },
  // OpenAI
  {
    id: "openai/gpt-5.4",
    name: "GPT-5.4",
    provider: "openai",
    description: "Latest OpenAI flagship model",
  },
  {
    id: "openai/gpt-5.3-chat",
    name: "GPT-5.3 Chat",
    provider: "openai",
    description: "Latest OpenAI chat model",
  },
  {
    id: "openai/gpt-5.2",
    name: "GPT-5.2",
    provider: "openai",
    description: "Most capable OpenAI model",
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    description: "Fast and cost-effective for simple tasks",
  },
  // Google
  {
    id: "google/gemini-3.1-flash-lite-preview",
    name: "Gemini 3.1 Flash Lite",
    provider: "google",
    description: "Fast preview model",
  },
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro",
    provider: "google",
    description: "Most capable Google model",
  },
  {
    id: "google/gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    provider: "google",
    description: "Ultra fast and affordable",
  },
  // Alibaba
  {
    id: "alibaba/qwen3.5-flash",
    name: "Qwen 3.5 Flash",
    provider: "alibaba",
    description: "Fast multilingual general-purpose model",
  },
  // Moonshot AI
  {
    id: "moonshotai/kimi-k2.5",
    name: "Kimi K2.5",
    provider: "moonshotai",
    description: "Large context conversational model",
  },
  // MiniMax
  {
    id: "minimax/minimax-m2.5",
    name: "MiniMax M2.5",
    provider: "minimax",
    description: "General-purpose chat model",
  },
  // xAI
  {
    id: "xai/grok-4.1-fast-non-reasoning",
    name: "Grok 4.1 Fast",
    provider: "xai",
    description: "Fast with 30K context",
  },
  // Reasoning models (extended thinking)
  {
    id: "xai/grok-code-fast-1-thinking",
    name: "Grok Code Fast",
    provider: "reasoning",
    description: "Reasoning optimized for code",
  },
  {
    id: "anthropic/claude-3.7-sonnet-thinking",
    name: "Claude 3.7 Sonnet",
    provider: "reasoning",
    description: "Extended thinking for complex problems",
  },
];

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
