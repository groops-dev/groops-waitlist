import groopsLogo from "./assets/images/groops-logo.png";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { WaitListFormData } from "./types";
import { setWaitListStatus, getWaitListStatus } from "./utils/localStorage";
import { trackSignup } from "./utils/analytics";
import { SocialShare } from "./components/SocialShare";
import { CookieBanner } from "./components/CookieBanner";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(!!getWaitListStatus());
  const [formData, setFormData] = useState<WaitListFormData>({
    email: "",
    name: "",
    location: "",
    acceptedTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwH6CyZyXYijIr809LtFl2BmyST6d8hq-zAOjygbMw6z8Os35rKr9EiNzLq6WF0Eo1Y/exec";
  
    try {
      // Send the form data to the Google Apps Script endpoint
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData),
        redirect: "follow",
      });
  
      const result = await response.json();
  
      if (result.status !== "success") {
        throw new Error(result.message);
      }
  
      setWaitListStatus(formData.email);
      setIsSubmitted(true);
      trackSignup(formData.email, !!(formData.name || formData.location));
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      console.error("> ERROR joining waitlist", error);
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50 to-mint-100">
      <div className="max-w-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-mint-200 rounded-full mb-6">
            <img src={groopsLogo} alt="Groops Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find your tribe
          </h1>
          <p className="text-xl text-gray-600">
            Join the waitlist to be first in line when Groops launches.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-gray-600 mb-6">
                We'll notify you when Groops is ready to download.
              </p>
              <SocialShare />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  className="mt-1 block w-full rounded-2xl bg-mint-50 border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-mint-200 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-mint-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="name" className="sr-only">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name (optional)"
                  className="mt-1 block w-full rounded-2xl bg-mint-50 border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-mint-200 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-mint-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="location" className="sr-only">
                  Location (optional)
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Location (optional)"
                  className="mt-1 block w-full rounded-2xl bg-mint-50 border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-mint-200 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-mint-500"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-5 w-5 rounded border-mint-200 text-rose-500 focus:ring-rose-500 mt-1"
                  checked={formData.acceptedTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptedTerms: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="terms"
                  className="ml-3 block text-sm text-gray-600"
                >
                  I agree to receive emails about Groops updates. Your email
                  will only be used for notifications and anonymized investor
                  reporting.
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-6 border-0 rounded-2xl text-base font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500"
                disabled={isSubmitting || !formData.email || !formData.acceptedTerms}
              >
                {isSubmitting ? "Joining..." : "Join the waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>
      <CookieBanner />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
