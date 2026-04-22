const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const API_KEY = process.env.AIRTABLE_API_KEY!;

export const TABLES = {
  USERS: process.env.AIRTABLE_USERS_TABLE!,
  QUESTIONS: process.env.AIRTABLE_QUESTIONS_TABLE!,
  TESTS: process.env.AIRTABLE_TEST_TABLE!,
};

export const airtableFetch = async (
  table: string,
  url: string = "",
  options?: RequestInit
) => {
  return fetch(`https://api.airtable.com/v0/${BASE_ID}/${table}${url}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
};