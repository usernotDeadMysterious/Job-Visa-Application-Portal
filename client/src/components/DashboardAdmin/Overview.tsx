const Overview = () => {
  return (
    <div className="px-8 py-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-white mb-8">Overview</h1>

      {/* Single Card */}
      <div className="bg-none rounded-2xl shadow-lg p-2 w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          Students Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center justify-center">
          {/* Total Students */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Students</p>
            <p className="text-3xl font-semibold text-gray-300">0</p>
          </div>

          {/* Paid Students */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Paid Access</p>
            <p className="text-3xl font-semibold text-green-600">0</p>
          </div>

          {/* Unpaid Students */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Without Paid Access</p>
            <p className="text-3xl font-semibold text-red-500">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
