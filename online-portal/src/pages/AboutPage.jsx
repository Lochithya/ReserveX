import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-blue-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering the{" "}
              <span className="text-blue-600">Literary Future</span> of Sri
              Lanka
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              The Colombo International Bookfair (CIBF) is the country's largest
              book exhibition, attracting publishers, authors and readers from
              across Sri Lanka and beyond.
            </p>

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                Reserve Your Stall
              </button>

              <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Get In Touch
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop"
              alt="Books"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">1M+</h2>
            <p className="text-gray-500 mt-2">Annual Visitors</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">400+</h2>
            <p className="text-gray-500 mt-2">Exhibitors</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">25+</h2>
            <p className="text-gray-500 mt-2">Countries</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">22nd</h2>
            <p className="text-gray-500 mt-2">Annual Edition</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              A Rich History of Reading
            </h2>

            <p className="text-gray-600 mb-4">
              Established in 1999, the Colombo International Bookfair has grown
              into a South Asian cultural phenomenon.
            </p>

            <p className="text-gray-600 mb-4">
              Organized by the Sri Lanka Book Publishers’ Association, the event
              aims to promote reading culture and support the publishing
              industry.
            </p>

            <p className="text-gray-600">
              Workshops, author meetups, storytelling sessions and book launches
              are conducted annually to engage the public.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              alt="Library"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
