const BASE_URL = "https://dummyjson.com/products";

export const fetchData = async (
  endpoint: string,
  options: RequestInit = {},
  handleResponse?: (data: any) => any,
) => {
  let loading = true;

  try {
    // Merge default options with user-provided options
    const mergedOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers, // Merge custom headers if provided
      },
      ...options,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    // Handle non-2xx status codes
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    loading = false;

    // Optionally process the response using the provided handler
    return {
      data: handleResponse ? handleResponse(result) : result,
      error: null,
      loading,
    };
  } catch (error: any) {
    console.error("Fetch error:", error.message);

    return {
      data: null,
      error: error.message || "An unknown error occurred.",
      loading: false,
    };
  }
};
