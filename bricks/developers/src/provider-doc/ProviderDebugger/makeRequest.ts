import { developHelper } from "@next-core/brick-kit";

export interface RequestState {
  status: "initial" | "requesting" | "ok" | "failed";
  response?: unknown;
  error?: unknown;
}

interface ProviderElement extends HTMLElement {
  resolve: (...args: unknown[]) => Promise<unknown>;
}

export async function makeRequest(
  providerName: string,
  parameters: unknown[]
): Promise<RequestState> {
  try {
    await developHelper.loadDynamicBricksInBrickConf({
      brick: providerName,
    });
    const element = document.createElement(providerName) as ProviderElement;
    const data = await element.resolve(...parameters);
    return {
      status: "ok",
      response: data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
}
