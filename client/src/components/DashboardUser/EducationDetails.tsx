import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  BookOpen,
  Star,
  Plus,
  ArrowBigRight,
  ArrowBigLeft,
} from "lucide-react";

export function EducationDetailsCard() {
  const { education, loading, saving, saveEducation } = useEducation();

  const latestEducation = education?.[0];

  if (loading === true) return <div>Loading...</div>;

  return (
    <>
      <Card
        className="w-full max-w-full rounded-2xl shadow-sm flex flex-col
      bg-linear-to-br from-indigo-500/30 via-purple-500/5 to-pink-500/30 p-px"
      >
        {/* Header title */}
        <div className="flex max-w-full">
          <span className="flex text-lg font-bold pl-3 pt-3">
            Educational Details
          </span>
        </div>
        {latestEducation ? (
          <>
            <CardHeader className="space-y-1">
              <h2 className="text-xl font-semibold leading-none">
                {latestEducation.highestQualification}
              </h2>
              <p className="text-sm text-muted-foreground">
                {latestEducation.institutionName}
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              <DetailRow
                icon={<BookOpen className="h-4 w-4" />}
                value={latestEducation.major}
              />

              <DetailRow
                icon={<Calendar className="h-4 w-4" />}
                value={`Year of Passing: ${latestEducation.yearOfPassing}`}
              />

              {latestEducation.gradesCgpa && (
                <DetailRow
                  icon={<Star className="h-4 w-4" />}
                  value={`Grade / CGPA: ${latestEducation.gradesCgpa}`}
                />
              )}

              <EducationSheet
                saveEducation={saveEducation}
                saving={saving}
                education={latestEducation}
              />
            </CardContent>
            {/* Forms Next Previous Button   */}
            <div className="min-w-full flex items-center justify-end">
              <Link
                to="/user-dashboard?personal-details="
                className="text-sm text-slate-200  gap-1 border px-4 py-2 rounded-lg hover:bg-indigo-300/20 mr-4 mb-2 flex items-center justify-center   "
              >
                <ArrowBigLeft className="w-4 h-4 inline" />
                Previous
              </Link>
              <Link
                to="/user-dashboard?documents="
                className="text-sm text-slate-200  gap-1 border px-4 py-2 rounded-lg hover:bg-indigo-300/20 mr-4 mb-2 flex items-center justify-center    "
              >
                <ArrowBigRight className="w-4 h-4 inline" />
                Next
              </Link>
            </div>
          </>
        ) : (
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>No education details added yet.</p>

            <EducationSheet saveEducation={saveEducation} saving={saving} />
          </CardContent>
        )}
      </Card>
      <ToastContainer />
    </>
  );
}

/* ----------------------------- */
/* Reusable Row Component        */
/* ----------------------------- */

function DetailRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {icon}
      <span className="truncate">{value}</span>
    </div>
  );
}

/* ----------------------------- */
/* Responsive Sheet              */
/* ----------------------------- */
import { useState, useEffect } from "react";
import { useEducation } from "./hooks/useEducation";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function EducationSheet({
  saveEducation,
  saving,
  education,
}: {
  saveEducation: Function;
  saving: boolean;
  education?: any;
}) {
  const [form, setForm] = useState({
    highestQualification: "",
    institutionName: "",
    yearOfPassing: "",
    major: "",
    gradesCgpa: "",
  });

  useEffect(() => {
    if (education) {
      setForm({
        highestQualification: education.highestQualification || "",
        institutionName: education.institutionName || "",
        yearOfPassing: education.yearOfPassing?.toString() || "",
        major: education.major || "",
        gradesCgpa: education.gradesCgpa || "",
      });
    }
  }, [education]);

  const handleSave = () => {
    saveEducation([
      {
        highestQualification: form.highestQualification,
        institutionName: form.institutionName,
        yearOfPassing: Number(form.yearOfPassing),
        major: form.major,
        gradesCgpa: form.gradesCgpa,
      },
    ]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 flex w-full items-center justify-center gap-2 sm:w-fit"
        >
          <Plus className="h-4 w-4" />
          Add / Edit Education
        </Button>
      </SheetTrigger>

      <SheetContent
        className="
          w-full
          sm:max-w-md
          md:max-w-lg
          lg:max-w-xl
          p-6
          overflow-y-auto
          bg-linear-to-br from-indigo-500/80 via-purple-500/5 to-pink-500/50
        "
      >
        <SheetHeader className="mb-6 text-amber-50">
          <SheetTitle>Educational Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <form className="space-y-4">
            {/* Qualification */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-50">
                Qualification
              </label>
              <input
                type="text"
                value={form.highestQualification}
                onChange={(e) =>
                  setForm({ ...form, highestQualification: e.target.value })
                }
                placeholder="e.g. Bachelor of Science"
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* Institution */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-50">
                Institution
              </label>
              <input
                type="text"
                value={form.institutionName}
                onChange={(e) =>
                  setForm({ ...form, institutionName: e.target.value })
                }
                placeholder="University / College name"
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* Field & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={form.major}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Year of Passing
                </label>
                <input
                  type="number"
                  value={form.yearOfPassing}
                  onChange={(e) =>
                    setForm({ ...form, yearOfPassing: e.target.value })
                  }
                  placeholder="e.g. 2023"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Grade / CGPA */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-50">
                Grade / CGPA (optional)
              </label>
              <input
                type="text"
                value={form.gradesCgpa}
                onChange={(e) =>
                  setForm({ ...form, gradesCgpa: e.target.value })
                }
                placeholder="e.g. 3.45 CGPA"
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <SheetClose>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/70 bg-linear-to-br hover:from-indigo-500/80 hover:via-white/50 hover:to-pink-500/80 hover:text-slate-100"
                >
                  Close
                </Button>
              </SheetClose>
              <Button
                variant="outline"
                disabled={saving}
                onClick={handleSave}
                size="sm"
                className="bg-white/70 bg-linear-to-br hover:from-indigo-500/80 hover:via-white/50 hover:to-pink-500/80 hover:text-slate-100"
              >
                {saving ? "Saving..." : "Save Education"}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
