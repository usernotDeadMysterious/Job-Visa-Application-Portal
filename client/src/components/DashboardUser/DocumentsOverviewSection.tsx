import { Eye, FileText, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function DocumentsOverviewSection({
  documents,
}: {
  documents: any[];
}) {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-emerald-400">
          Documents Uploaded
        </h4>

        <Link
          to="/user-dashboard?documents="
          className="text-xs text-indigo-400 flex items-center gap-1 hover:underline"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Manage
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
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc._id}
                className="
                  flex items-center justify-between
                  rounded-md
                  px-3 py-1.5
                  bg-white/5
                  border border-white/10
                  text-sm
                "
              >
                <div className="flex items-center gap-2 text-slate-300">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="truncate max-w-45">{doc.type}</span>
                </div>

                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:underline"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
