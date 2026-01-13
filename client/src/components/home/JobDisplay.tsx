import { useState } from "react";
import JobCard from "./JobCard";
import { useJobPostings } from "./hooks/useJobs";
import type { JobSearchPayload } from "./SearchPanel";
import { Save } from "lucide-react";
import { api } from "@/lib/api";
import { handleSuccess } from "@/utils/utils";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { JobDescription } from "./JobDescription";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../DashboardUser/hooks/useDocument";
import { useProfile } from "../DashboardUser/hooks/useProfile";
import { useEducation } from "../DashboardUser/hooks/useEducation";

type Props = {
  search: JobSearchPayload;
};

export const JobDisplay = ({ search }: Props) => {
  const navigate = useNavigate();
  const handleError = (msg: string): void => {
    toast.error(msg, {
      position: "top-right",
    });
  };

  const { profile } = useProfile();
  const { documents } = useDocuments();
  const { education } = useEducation();

  const handleApply = async (jobId: string) => {
    try {
      const user_status = localStorage.getItem("payment_status");
      if (!profile || documents.length === 0 || !education) {
        setTimeout(() => {
          navigate("/user-dashboard?overview=");
        }, 1500);
        handleError("Please Complete Your Profile to get Started");
      } else if (user_status !== "true") {
        setTimeout(() => {
          handleError("Please complete payment to apply for jobs.");
        }, 1000);
        navigate("/secure-payment");
        return;
      } else if (user_status == "true") {
        await api.post("/api/job-applications/apply", {
          jobId,
        });
        handleSuccess("Applied successfully");
      }
    } catch (err: any) {
      const Error = err?.response.data;

      if (Error?.success == false) {
        handleError(Error.message);
      }
    }
  };

  const { jobs, loading, error } = useJobPostings(search);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (jobs.length === 0) return <p>No jobs found</p>;

  const toggleJob = (id: string) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="flex">
        {/* LEFT: Job list + inline details */}
        <div className="m-1 w-full md:w-1/2 space-y-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-indigo-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 rounded-full bg-linear-to-b from-indigo-500 to-pink-500" />
              Open Jobs
            </h3>
          </div>

          {jobs.map((job) => (
            <div key={job._id}>
              <JobCard
                job={{
                  title: job.title,
                  company: job.industry,
                  city: job.city ?? "N/A",
                  type: job.type ?? "Hybrid",
                  country: job.country ?? "Remote",
                  position: job.position,
                  salary: job.salary || "Not disclosed",
                }}
                onClick={() => toggleJob(job._id)}
              />

              {/* EXPANDED DETAILS */}
              <div
                className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${
      expandedJobId === job._id
        ? "max-h-125 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-2"
    }
  `}
              >
                <div className="mt-2 rounded-xl border p-4 bg-none text-sm text-slate-100">
                  <p className="font-semibold">Position</p>
                  <p className="text-slate-300">
                    {job.position || "No position provided."}
                  </p>

                  <p className="font-semibold mt-3">Description</p>
                  <p className="text-slate-300">
                    {job.description || "No description provided."}
                  </p>

                  <p className="mt-3 font-semibold">Requirements</p>
                  <p className="text-slate-300">
                    {job.requirements || "No requirements listed."}
                  </p>

                  {/* Apply Button */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleApply(job._id)}
                      className="rounded-lg px-2 py-1 text-indigo-500 border text-sm font-medium hover:bg-indigo-700 hover:text-white transition"
                    >
                      Apply Now
                    </button>
                    <button className="rounded-lg px-2 py-1 text-indigo-500 border text-sm font-medium hover:bg-indigo-700 hover:text-white transition">
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Optional content (desktop only) */}

        <div className="hidden md:block m-1 w-1/2 space-y-3 ">
          <JobDescription />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
