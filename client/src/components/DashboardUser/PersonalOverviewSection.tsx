import { IdCard, Phone, MapPin, LucideCake, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function PersonalOverviewSection({ profile }: { profile: any }) {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-emerald-400">
          Personal Details
        </h4>

        <Link
          to="/user-dashboard?personal-details="
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
        {!profile ? (
          <p className="text-sm text-muted-foreground">
            No personal details added yet.
          </p>
        ) : (
          <>
            {/* Name Block */}
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold text-slate-100">
                {profile.fullName}
              </h3>
              <p className="text-sm text-slate-400">
                Father Name: {profile.fatherName}
              </p>
            </div>

            <hr className="border-white/10" />

            {/* Details */}
            <DetailRow
              icon={<IdCard className="w-4 h-4" />}
              label="Nationality"
              value={profile.nationality}
            />

            <DetailRow
              icon={<Phone className="w-4 h-4" />}
              label="Contact"
              value={profile.contactNumber}
            />

            <DetailRow
              icon={<LucideCake className="w-4 h-4" />}
              label="Date of Birth"
              value={
                profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString()
                  : ""
              }
            />

            <DetailRow
              icon={<MapPin className="w-4 h-4" />}
              label="Address"
              value={profile.address}
            />
          </>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- */
/* Reusable Row (Dense & Clean)     */
/* -------------------------------- */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3 text-sm text-slate-400">
      <span className="text-slate-500">{icon}</span>
      <span className="min-w-22.5">{label}:</span>
      <span className="truncate text-slate-300">{value}</span>
    </div>
  );
}
