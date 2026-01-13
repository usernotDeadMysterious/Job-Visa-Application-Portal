import { Calendar, GraduationCap, Star, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function EducationOverviewSection({
  education,
}: {
  education: any[];
}) {
  const latest = education?.[0];

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-emerald-400">
          Educational Details
        </h4>

        <Link
          to="/user-dashboard?education="
          className="text-xs text-indigo-400 flex items-center gap-1 hover:underline"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Edit
        </Link>
      </div>

      <div
        className="
          rounded-lg
          p-3
          bg-white/5
          border border-white/10
          backdrop-blur
          space-y-2
        "
      >
        {!latest ? (
          <p className="text-sm text-muted-foreground">
            No education details added yet.
          </p>
        ) : (
          <>
            {/* Degree Block */}
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold text-slate-100">
                {latest.highestQualification}
              </h3>
              <p className="text-sm text-slate-400">{latest.institutionName}</p>
            </div>

            <hr className="border-white/10" />

            {/* Details */}
            <DetailRow
              icon={<GraduationCap className="w-4 h-4" />}
              label="Major"
              value={latest.major}
            />

            <DetailRow
              icon={<Calendar className="w-4 h-4" />}
              label="Year of Passing"
              value={latest.yearOfPassing}
            />

            <DetailRow
              icon={<Star className="w-4 h-4" />}
              label="Grade / CGPA"
              value={latest.gradesCgpa}
            />
          </>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- */
/* Reusable Row (Same as Personal)  */
/* -------------------------------- */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3 text-sm text-slate-400">
      <span className="text-slate-500">{icon}</span>
      <span className="min-w-30">{label}:</span>
      <span className="truncate text-slate-300">{value}</span>
    </div>
  );
}
