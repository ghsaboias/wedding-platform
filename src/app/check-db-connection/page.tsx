"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

// Retrieve the Supabase URL and ANON key from environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize the Supabase client.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CheckDBConnection() {
  useEffect(() => {
    async function testConnection() {
      // Try to query the 'profiles' table (defined by our migration).
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1);

      console.log("Data:", data);
      console.log("Error:", error);
    }

    testConnection();
  }, []);

  return <div>Check the browser console for DB connection results.</div>;
}
