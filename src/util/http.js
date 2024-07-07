import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function sendRequest({ api, data }) {
    if (!api) return;
    const url = "https://makrikoy-61ac8-default-rtdb.europe-west1.firebasedatabase.app/" + api;

    const config = {
        method: data ? "PUT" : "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const error = new Error("An error occurred while sending request!");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const result = await response.json();

    return result;
}
