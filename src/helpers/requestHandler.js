import { serverUrl } from "../configs/urlConfig";

export const requestHandler = async ({ url = serverUrl, route, type, body, credentials = "include", contentType = "application/json" }) => {
  try {
    const response = await fetch(url + route, {
      method: type,
      credentials: credentials,
      headers: { "Content-Type": contentType },
      body: body && contentType === "application/json" ? JSON.stringify(body) : body,
    });
    if (response.status === 404) {
      localStorage.removeItem("user_data");
      window.location.reload();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
