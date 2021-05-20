import React, { useState } from "react";

function ContactForm() {
  const [result, setResult] = useState(null);

  const submit_msg = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    };

    fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/contact/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.text()).then(res => {
      setResult(res);

      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch(err => {
      setResult(err);
    });
  }

  return (
    <div className="flex mb-8 lg:mb-0">
      <div className="w-full mx-auto">
        <div className="p-5 mt-4 bg-white border border-gray-300 rounded-md shadow sm:m-2 md:my-4 md:mr-4">
          <div className="text-center">
            <h1 className="my-2 text-3xl font-brand">Contact</h1>
            <p className="text-gray-500">Fill out the form below to message us</p>
          </div>

          <div className="m-7">
            <form id="formElem" onSubmit={submit_msg} action="" method="POST">
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm text-gray-600">Full Name</label>
                <input type="text" name="name" id="name" placeholder="Your name" required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-indigo-200" />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email Address</label>
                <input type="email" name="email" id="email" placeholder="you@email.com" required className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-indigo-200" />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm text-gray-600">Message</label>
                <textarea rows={5} name="message" id="message" placeholder="Your Message" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-indigo-200" required defaultValue={""} />
              </div>

              <div className="mb-6">
                <button type="submit" className="w-full px-3 py-4 text-white transition-colors bg-indigo-700 border border-blue-900 rounded-md bg-gradient-to-tl hover:bg-transparent hover:text-indigo-700 focus:outline-none">
                  Send Message
                </button>
              </div>

              {/* Message result status */}
              {result && <p className="text-base text-center text-blue-700">{result}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;