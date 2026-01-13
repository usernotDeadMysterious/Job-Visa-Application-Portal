// import React from 'react'
import { Button } from "../ui/button";

function LastButtons() {
  return (
    <div
      className="
    w-full
    flex flex-col gap-3
    sm:flex-row sm:justify-end
    rounded-2xl
    bg-linear-to-br from-indigo-500/30 via-purple-500/5 to-pink-500/30
    p-4
  "
    >
      <Button variant="outline" className="w-full sm:w-auto">
        Save Profile
      </Button>

      <Button className="w-full sm:w-auto">Search Jobs</Button>
    </div>
  );
}

export default LastButtons;
