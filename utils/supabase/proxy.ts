import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Resilience Check: If Supabase configuration is missing, skip session update
  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Supabase configuration is missing. Skipping session update.");
    }
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      },
    );

    // IMPORTANT: Do not remove this!
    // This triggers the setAll cookie logic above without requiring the 
    // response to be returned immediately if a session update is needed.
    await supabase.auth.getUser()
  } catch (error) {
    // If Supabase throws an error (e.g. invalid URL), catch it to prevent 404
    if (process.env.NODE_ENV === 'development') {
      console.error("Supabase Proxy Error:", error);
    }
  }

  return supabaseResponse
};
