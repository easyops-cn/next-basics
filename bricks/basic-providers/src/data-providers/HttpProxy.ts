import { createProviderClass } from "@next-core/brick-utils";
import { http } from "@next-core/brick-http";

export interface HttpProxyParams {
  serviceName?: string;
  api: string;
  method: string;
  params?: Record<string, any>;
  body?: BodyInit;
  headers?: HeadersInit;
  origin?: string;
}

const prefix = "api/gateway";

export function HttpProxy<T>(httpProxyParams: HttpProxyParams): Promise<T> {
  const {
    serviceName,
    api,
    method,
    params,
    body,
    headers,
    origin,
    ...requestInit
  } = httpProxyParams;

  const url = serviceName
    ? `${prefix}/${serviceName}/${api}`
    : `${origin}/${api}`;
  return http.request<T>(http.getUrlWithParams(url, params), {
    ...requestInit,
    method,
    ...http.getBodyAndHeaders(body, headers),
  });
}

customElements.define(
  "basic-providers.provider-http-proxy",
  createProviderClass(HttpProxy)
);
