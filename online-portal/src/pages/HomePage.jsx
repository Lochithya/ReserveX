import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <section
        className="relative h-56 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-200 text-center">
            Colombo International Bookfair Dashboard
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, Saman Publishers
            </h2>
            <p className="text-gray-500 text-sm">
              Manage your exhibition stalls and reservations.
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/reserve")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              + New Reservation
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Active Reservations</p>
            <h3 className="text-3xl font-bold mt-2">1</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Stalls (Lifetime)</p>
            <h3 className="text-3xl font-bold mt-2">4</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Selected Genres</p>
            <h3 className="text-3xl font-bold mt-2">3</h3>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Reservation History */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Reservation History
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Reservation ID</th>
                  <th>Event</th>
                  <th>Stall</th>
                  <th>Size</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3">RES-001</td>
                  <td>CIBF 2023</td>
                  <td>A-12</td>
                  <td>Medium</td>
                  <td>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                      Attended
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">RES-002</td>
                  <td>CIBF 2022</td>
                  <td>B-05</td>
                  <td>Small</td>
                  <td>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                      Attended
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3">RES-003</td>
                  <td>CIBF 2021</td>
                  <td>C-22</td>
                  <td>Large</td>
                  <td>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                      Attended
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Literary Genres */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Literary Genres
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Select the genres you will showcase.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Fiction",
                "Non-Fiction",
                "Academic",
                "Children's Books",
                "Science Fiction",
                "Biography",
              ].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
