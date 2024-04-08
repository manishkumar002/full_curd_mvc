import { useState } from "react";
import { toast } from "react-toastify"; // Import react-toastify for showing error messages
import "react-toastify/dist/ReactToastify.css"; // Import the styles for react-toastify
import "../styles/Reset.css";
import { useNavigate } from "react-router-dom";

const Fargetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const setVals = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sendotp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.code === 200) {
        navigate('/otpsend');
      } else {
        alert('Email / Server Error.');
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={setVals}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <button className="btn" type="button" onClick={handleSubmit}>
              Send OTP
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Fargetpassword;



