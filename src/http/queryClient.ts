// Utility to add Authorization header if token exists
import { getAccessToken } from "../utils/helpers";
export async function authorizedFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const token = getAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  // console.log("authorizedFetch token:", token);
  // console.log(
  //   "authorizedFetch headers:",
  //   Object.fromEntries(headers.entries())
  // );
  // Set Content-Type for JSON requests if not set and body is not FormData
  const body = (init as any).body;
  const isFormData =
    body && typeof FormData !== "undefined" && body instanceof FormData;
  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(input, { ...init, headers });
}
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default queryClient;
