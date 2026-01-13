import { useState } from "react";

import HomeNavbar from "./HomeNavbar";
import { JobDisplay } from "./JobDisplay";

import { type JobSearchPayload } from "./SearchPanel";
import AuthNeonBackground from "../Background/AuthNeonBackground";

import { ToastContainer } from "react-toastify";

export const HomePage = () => {
  const [search, setSearch] = useState<JobSearchPayload>({ q: "" });

  return (
    <>
      <ToastContainer />
      <AuthNeonBackground />
      <div className="relative z-10">
        <HomeNavbar onSearch={setSearch} />

        <JobDisplay search={search} />
      </div>
    </>
  );
};
