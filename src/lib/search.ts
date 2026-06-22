import { search, SafeSearchType } from "duck-duck-scrape";

export async function searchWeb(query: string) {
  try {
    const results = await search(query, { safeSearch: SafeSearchType.OFF });
    return results.results
      .slice(0, 5)
      .map((r) => ({ title: r.title, url: r.url, description: r.description }));
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
}
