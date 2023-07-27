import { createProviderClass } from "@next-core/brick-utils";
import { http, HttpCustomOptions, HttpParams } from "@next-core/brick-http";
export interface HttpRequestParams {
  url: string;
  method: "GET" | "POST";
  params?: HttpParams;
  data?: RequestInit["body"];
}

export function HttpRequest(
  httpRequestParams: HttpRequestParams
): Promise<unknown> {
  const { url, method, data, params } = httpRequestParams;
  const init: RequestInit = {
    method: method,
    body: data,
  };
  const options: HttpCustomOptions = {
    params: params,
  };

  return http.request(url, init, options);
}

customElements.define(
  "basic-bricks.provider-http-request",
  createProviderClass(HttpRequest)
);
