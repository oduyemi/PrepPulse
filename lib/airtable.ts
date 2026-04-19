const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = "users";
const API_KEY = process.env.AIRTABLE_API_KEY!;

export const airtableFetch = async (url: string, options?: any) => {
  return fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}${url}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
};