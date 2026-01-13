import { MapPin, Building2, DollarSign, Type } from "lucide-react";

export type Job = {
  title: string;
  position: string;
  company: string;
  city: string;
  type: string;
  salary: string;
  country: string;
};

type Props = {
  job: Job;
  onClick?: () => void;
};

export default function JobCard({ job, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left
        rounded-xl p-px
        transition
        hover:scale-[1.01]
        focus:outline-none
      "
    >
      <div
        className="
          rounded-xl p-2
          bg-linear-to-br
          from-indigo-500/30
          via-purple-500/10
          to-pink-500/30
          border border-white/10
          backdrop-blur
          hover:bg-white/5
        "
      >
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-indigo-300 font-semibold">{job.title}</h3>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Building2 className="h-4 w-4" />
          {job.company}
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {job.city}, {job.country}
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <Type className="h-4 w-4" />
          {job.type}
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-indigo-400">
          <DollarSign className="h-4 w-4" />
          {job.salary}
        </div>
        <div className="mt-2"></div>
      </div>
    </button>
  );
}
