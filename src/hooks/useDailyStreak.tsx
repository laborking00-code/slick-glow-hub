import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useDailyStreak = () => {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateActivity = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Update last_active_date to trigger the streak calculation
        const { error } = await supabase
          .from("profiles")
          .update({ last_active_date: new Date().toISOString().split('T')[0] })
          .eq("id", user.id);

        if (error) throw error;

        // Fetch updated streak
        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("daily_streak")
          .eq("id", user.id)
          .single();

        if (fetchError) throw fetchError;
        setStreak(data?.daily_streak || 0);
      } catch (error) {
        console.error("Error updating daily streak:", error);
      } finally {
        setLoading(false);
      }
    };

    updateActivity();
  }, []);

  return { streak, loading };
};
