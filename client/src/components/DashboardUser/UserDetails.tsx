import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ArrowBigRight, Plus } from "lucide-react";
import { useProfile } from "./hooks/useProfile";
import React from "react";

import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useDocuments } from "./hooks/useDocument";

export default function UserDetailsCard() {
  const { profile, loading, saving, saveProfile } = useProfile();

  // initials of name
  const initials = profile?.fullName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join(""); // fetching my profile Image
  const { documents } = useDocuments();
  const profileImage = documents.find((doc) => doc.type === "Profile Image");

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
      <ToastContainer />

      <Card className="w-full rounded-2xl bg-linear-to-br from-indigo-500/30 via-purple-500/2 to-pink-500/30 p-px">
        <div className="pl-3 pt-3 text-lg font-bold">Personal Details</div>

        {profile ? (
          <>
            <CardHeader className="flex flex-row justify-between items-center gap-2">
              <div className=" flex-1/3">
                <h2 className="text-md text-slate-400 font-semibold">
                  Full Name: {profile.fullName}
                </h2>
                <p className="text-muted-foreground text-slate-400">
                  Father/Guardian Name: {profile.fatherName}
                </p>
              </div>
              <Avatar className="h-25 w-22 sm:h-26 sm:w-26 md:h-30 md:w-30 lg:w-35 lg:h-35">
                {profileImage ? (
                  <div className="">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${
                        profileImage.filePath
                      }`}
                      alt={profile.fullName}
                      className=""
                    />
                  </div>
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              {profile.nationality && <p>Nationality: {profile.nationality}</p>}
              {profile.dateOfBirth && (
                <p>DOB: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
              )}
              {profile.contactNumber && <p>Phone: {profile.contactNumber}</p>}
              {profile.address && <p>Address: {profile.address}</p>}
            </CardContent>
            <div className="min-w-full flex items-center justify-end">
              <Link
                to="/user-dashboard?education="
                className="text-sm text-slate-200  gap-1 border px-4 py-2 rounded-lg hover:bg-indigo-300/20 mr-4 mb-2   flex items-center justify-center "
              >
                <ArrowBigRight className="w-4 h-4 inline" />
                Next
              </Link>
            </div>
          </>
        ) : (
          <CardContent className="text-muted-foreground">
            <p>No personal details added yet.</p>
          </CardContent>
        )}
      </Card>

      <ResponsiveUserSheet
        profile={profile}
        saving={saving}
        saveProfile={saveProfile}
      />
    </>
  );
}

interface ResponsiveUserSheetProps {
  profile: any;
  saving: boolean;
  saveProfile: (data: any) => void;
}

function ResponsiveUserSheet({
  profile,
  saving,
  saveProfile,
}: ResponsiveUserSheetProps) {
  const [formData, setFormData] = React.useState({
    fullName: profile?.fullName ?? "",
    fatherName: profile?.fatherName ?? "",
    dateOfBirth: profile?.dateOfBirth?.slice(0, 10) ?? "",
    nationality: profile?.nationality ?? "",
    contactNumber: profile?.contactNumber ?? "",
    address: profile?.address ?? "",
  });

  return (
    <>
      <Sheet>
        <span className="flex w-full justify-center">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 flex w-full items-center justify-center gap-2 sm:w-fit hover:bg-linear-to-t hover:from-indigo-800/50  hover:via-green-500/20 hover:to-gray-500/70"
            >
              <Plus className="h-4 w-4" />
              Add / Edit Details
            </Button>
          </SheetTrigger>
        </span>

        <SheetContent
          side="right"
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
          <SheetHeader className="mb-6">
            <SheetTitle className="text-amber-50">
              Personal Information
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                saveProfile(formData); // 🔥 UPSERT happens here
              }}
            >
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Full Name
                </label>
                <input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  type="text"
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* Father Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Father Name
                </label>
                <input
                  value={formData.fatherName}
                  onChange={(e) => {
                    setFormData({ ...formData, fatherName: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter father name"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* DOB & Nationality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-50">
                    Date of Birth
                  </label>
                  <input
                    value={formData.dateOfBirth}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        dateOfBirth: e.target.value,
                      });
                    }}
                    type="date"
                    className="w-full rounded-lg border border-white/20 bg-white/35 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-50">
                    Nationality
                  </label>
                  <input
                    value={formData.nationality}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        nationality: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="e.g. Pakistani"
                    className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Phone
                </label>
                <input
                  value={formData.contactNumber}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      contactNumber: e.target.value,
                    });
                  }}
                  type="tel"
                  placeholder="923xxxxxxxxx"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-50">
                  Location
                </label>
                <input
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                  }}
                  type="text"
                  placeholder="City, Country"
                  className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 ">
                <SheetClose asChild>
                  <div>
                    <Button variant="outline" size="sm" className="bg-white/70">
                      Close
                    </Button>
                  </div>
                </SheetClose>

                <Button
                  size="sm"
                  className="bg-linear-to-br from-indigo-500/80 via-white/50 to-pink-500/80 text-amber-50"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
