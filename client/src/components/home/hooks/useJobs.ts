import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { JobSearchPayload } from "../SearchPanel";
import type { JobPosting } from "../types/job";
export function useJobPostings(filters?: JobSearchPayload) {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<JobPosting[]>("/api/jobs", {
          params: {
            q: filters?.q,
            country: filters?.country,
            city: filters?.city,
            position: filters?.position,
            industry: filters?.industry,
            prefs: filters?.prefs?.join(","),
          },
        });

        setJobs(res.data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch job postings");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [JSON.stringify(filters)]);

  return { jobs, loading, error };
}
