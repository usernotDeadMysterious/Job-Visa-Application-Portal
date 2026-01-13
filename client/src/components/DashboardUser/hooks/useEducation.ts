import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleSuccess } from "@/utils/utils";

export function useEducation() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/api/education")
      .then((res) => {
        setEducation(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setEducation([]); // 👈 first-time user
        } else {
          console.error("Failed to fetch education:", err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const saveEducation = async (payload: any[]) => {
    try {
      setSaving(true);
      const res = await api.put("/api/education", payload);
      setEducation(Array.isArray(res.data) ? res.data : []);
      handleSuccess("Details Saved")
    } catch (err) {
      console.error("Failed to save education:", err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { education, loading, saving, saveEducation };
}
