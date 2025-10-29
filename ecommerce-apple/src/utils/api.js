

export async function apiFetch(url, options = {}, token = null) {
    const headers = options.headers ? { ...options.headers } : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = headers["Content-Type"] || "application/json";

    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const err = new Error(data.error || "Error en la petición");
        err.response = data;
        throw err;
    }
    return data;
}
