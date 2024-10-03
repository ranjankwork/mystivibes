import React, { useState } from "react";
import LocationImg from "../assets/placeholder.png";
import ClockImg from "../assets/clock.png";

function PartyCard({
  username,
  title,
  date,
  price,
  location,
  caption,
  imageUrl,
}) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    // Send request email
    const requestEmailData = {
      to: "ranjankwork@gmail.com",
      subject: "Slot Booking",
      text: `New User Booked slot for ${title}\nfrom:\nEmail: ${email}\nPhone: ${number}`,
    };

    // Send thank you email
    const userName = localStorage.getItem("userName") || "User"; // Get name from local storage
    // const thankYouEmailData = {
    //   to: email, // Replace with user's email if available
    //   subject: "Thank You for Your Request",
    //   text: `Hey ${userName},\n\nWe have received your request to host a house party with us and we are delighted!\n\nWhile we are reviewing your request, please email your government IDs which have an address on them, if you are a first-time user.\n\nSee how to upload ID: Watch Video\n\nClick on the link below to upload the documents: Upload Documents\n\nWe are excited and will be calling you shortly to tell you more about hosting. Looking forward to speaking to you!\n\nCheers,\nTeam mytivibes.club`,
    // };

    try {
      await fetch("https://mystivibeserver.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestEmailData),
      });

      // Optionally send the thank you email as well
      // await fetch("http://localhost:3001/send-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(thankYouEmailData),
      // });

      // Clear the form or show a success message
      alert("Request sent successfully!");
      setEmail("");
      setNumber("");
      // setLocality("");
      // setCity("");
      // setPincode("");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send request.");
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  // const sendMail = () => {
  //   console.log("sendMail to", localStorage.getItem("user"));
  // };
  console.log(date);
  console.log(imageUrl);

  const timestamp = date;
  const dateN = new Date(timestamp).toLocaleDateString("en-GB"); // 'en-GB' for DD/MM/YYYY format
  console.log(date);
  return (
    <>
      <article className="my-4 cursor-pointer transition-transform transform hover:scale-105">
        <div className="flex flex-col rounded-lg shadow-lg border border-gray-200 w-full max-w-[440px] p-4 bg-white bg-opacity-10 backdrop-blur-lg backdrop-saturate-150 border border-white/30 hover:shadow-xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="relative flex justify-center w-full h-[240px] rounded-xl overflow-hidden">
            <img
              loading="lazy"
              src={`https://mystivibeserver.vercel.app${imageUrl}`}
              alt={title}
              className="w-full h-full object-cover transition-transform transform hover:scale-110"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col mt-4 space-y-3 text-white">
            {/* Title */}
            <h3 className="text-lg font-semibold capitalize">{title}</h3>

            {/* Date & Location Section */}
            <div className="flex flex-wrap gap-4 items-center text-sm">
              {/* Date */}
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
                  src={ClockImg} // Replace with actual date icon
                  alt="Date Icon"
                  className="w-5 h-5 object-contain"
                />
                <time>{dateN}</time>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <img
                  loading="lazy"
                  src={LocationImg} // Replace with actual location icon
                  alt="Location Icon"
                  className="w-5 h-5 object-contain"
                />
                <address className="not-italic">{location}</address>
              </div>
            </div>

            {/* Hosted by and Price */}
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-neutral-300">Hosted by {username}</p>
              <p className="font-medium text-lg">{price}</p>
            </div>

            {/* Button */}
            <div className="mt-4">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Slot
              </button>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white">
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
                <form onSubmit={sendEmail}>
                  <label className="input input-bordered flex items-center gap-2 m-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="grow"
                      placeholder="Email"
                      required
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 m-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="tel"
                      name="phone"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="grow"
                      placeholder="Phone Number"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Slot
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </article>
    </>
  );
}

export default PartyCard;
