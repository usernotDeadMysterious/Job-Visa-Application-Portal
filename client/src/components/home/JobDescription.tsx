export const JobDescription = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-500 flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 rounded-full bg-linear-to-b from-indigo-500 to-pink-500" />
          Read the Instructions Carefully
        </h3>
      </div>
      <div className="relative w-full h-[120vh] rounded-2xl border border-slate-400 bg-indigo-500/20 backdrop-blur-xs shadow-xl overflow-hidden">
        {/* Background Glows (fixed) */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute top-1/2 -right-20 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Scrollable Content */}
        <div className="relative z-10 h-full overflow-y-auto px-6 py-8 lg:px-10 custom-scroll space-y-10">
          {/* HEADER */}
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Application Readiness Center
            </h2>
            <p className="text-sm text-slate-600">
              Before applying to any job or visa, please carefully review the
              requirements below to ensure a smooth and successful application
              process.
            </p>
          </div>

          {/* ANIMATION */}
          <div className="relative flex items-center justify-center h-56 rounded-xl bg-linear-to-br from-indigo-800 to-black border border-slate-200 overflow-hidden">
            <div className="relative w-40 h-52">
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg border animate-float1" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-white rounded-xl shadow-lg border animate-float2" />
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-white rounded-xl shadow-lg border animate-float3 flex flex-col items-center justify-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold mb-3">
                  ✓
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Profile Verification
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Documents • Education • Payment
                </p>
              </div>
            </div>

            <span className="absolute top-6 left-8 text-indigo-500 animate-bounce text-4xl">
              📄
            </span>
            <span className="absolute bottom-6 right-10 text-pink-500 animate-bounce delay-500 text-4xl">
              🎓
            </span>
            <span className="absolute top-10 right-20 text-emerald-500 animate-bounce delay-700 text-4xl">
              💳
            </span>
          </div>

          {/* INSTRUCTIONS */}
          <div className="space-y-6 text-sm text-slate-600">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                All personal, educational, and professional details must be
                completed.
              </li>
              <li>
                All required documents must be uploaded and clearly visible.
              </li>
              <li>
                A non-refundable <strong>$10 USD</strong> processing fee is
                mandatory.
              </li>
              <li>
                Visa applications can be submitted via the Dashboard section.
              </li>
            </ul>
          </div>

          {/* WARNING */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            <strong>Important:</strong> We are not responsible for rejections or
            delays caused by incomplete profiles, missing documents, or unpaid
            fees.
          </div>

          <p className="text-xs text-slate-500 text-center">
            By applying, you agree to the platform’s terms and responsibilities.
          </p>
        </div>

        {/* Animations */}
        <style>{`
        @keyframes float1 { 50% { transform: translate(-4px, -6px); } }
        @keyframes float2 { 50% { transform: translate(6px, -2px); } }
        @keyframes float3 { 50% { transform: translate(8px, 2px); } }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 6s ease-in-out infinite; }
        .animate-float3 { animation: float3 6s ease-in-out infinite; }
      `}</style>
      </div>
    </>
  );
};
