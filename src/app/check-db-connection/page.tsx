"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function CheckDBConnection() {
  useEffect(() => {
    async function testConnection() {
      const supabase = createClient();
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
