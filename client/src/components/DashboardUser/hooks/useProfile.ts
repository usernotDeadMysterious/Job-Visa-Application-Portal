import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleSuccess } from "@/utils/utils";

export type Profile = {
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  nationality: string;
  contactNumber: string;
  address: string;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/api/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setProfile(null); // ✅ first-time user
        } else {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (payload: Profile) => {
    try {
      setSaving(true);
      const res = await api.put("/api/profile", payload);
      setProfile(res.data);
      handleSuccess("Profile Saved");
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, saveProfile };
}
