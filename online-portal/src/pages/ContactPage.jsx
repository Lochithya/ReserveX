import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-[var(--bg-body)] py-16">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--text-main)]">
            Contact Us
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-2xl mx-auto">
            Have questions or want to get in touch? Fill out the form below
            and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-2xl shadow-md space-y-6">

            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here"
                className="w-full border border-[var(--border-color)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
            >
              Send Message
            </button>

          </form>

          <div className="space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-[var(--text-muted)]">
                support@reservex.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-[var(--text-muted)]">
                +94 11 123 4567
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-[var(--text-muted)]">
                123 Bookfair Street, Colombo, Sri Lanka
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactPage;
