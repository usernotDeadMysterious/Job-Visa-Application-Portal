import { Link } from "react-router-dom";
import { useMyApplications } from "./hooks/useMyApplications";

export default function JobApplication() {
  const { applications, loading } = useMyApplications();

  if (loading) {
    return (
      <div className="p-4 text-sm text-slate-500">Loading applications...</div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="p-6 rounded-lg border border-dashed text-center space-y-3">
        <p className="text-slate-600">No applications yet</p>
        <Link to="/" className="text-indigo-600 hover:underline font-medium">
          Apply for jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app._id}
          className="rounded-lg border p-4 flex flex-col gap-1"
        >
          <p className="font-semibold text-slate-800">{app.jobId?.title}</p>

          <p className="text-sm text-slate-600">{app.jobId?.position}</p>

          <p className="text-xs text-slate-500">
            Status: <span className="font-medium">{app.status}</span>
          </p>
        </div>
      ))}

      <div className="pt-2">
        <Link to="/" className="text-sm text-indigo-600 hover:underline">
          Apply for more jobs
        </Link>
      </div>
    </div>
  );
}
