import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-190 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={e => setFirstName(e.target.value)}
            placeholder="first name"
            label={"First Name"}
          />

          <InputBox
            onChange={e => setLastName(e.target.value)}
            placeholder="last name"
            label={"Last Name"}
          />

          <InputBox
            onChange={e => setUsername(e.target.value)}
            placeholder="Email"
            label={"Email"}
          />

          <InputBox
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            label={"Password"}
          />

          <div className="pt-4">
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (err) {
                  if (err.response && err.response.data) {
                    setError(err.response.data.message || "An error occurred. Please try again.");
                  } else {
                    setError("An error occurred. Please try again.");
                  }
                }
              }}
              label={"Sign up"}
            />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
