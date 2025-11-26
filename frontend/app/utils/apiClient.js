export async function apiGet(endpoint) {
  try {
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error("API request failed");
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
