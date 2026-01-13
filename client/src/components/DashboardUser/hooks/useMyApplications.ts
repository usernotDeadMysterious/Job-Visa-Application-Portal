import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useMyApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/job-applications/my")
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { applications, loading };
}
