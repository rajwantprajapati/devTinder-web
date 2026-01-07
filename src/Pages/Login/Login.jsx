import { useState } from "react";
import Card from "../../Components/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signIn } from "../../Redux/users/usersThunks";

const Login = () => {
  const [emailId, setEmailId] = useState("rajwant@gmail.com");
  const [password, setPassword] = useState("Rajwant@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Method to handle sign in button click
   */
  const handleSignIn = async () => {
    try {
      setError("");
      await dispatch(signIn({ emailId, password })).unwrap();

      navigate("/");
    } catch (error) {
      console.log("Error handled in component: ", error);
      setError(error.message);
    }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/signin",
    //     { emailId, password },
    //     { withCredentials: true },
    //   );

    //   dispatch(addUser(response.data.data));
    // } catch (error) {
    //   console.log("error: ", error);
    // }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card title="Sign In">
        <div className="flex flex-col gap-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input outline-0"
              placeholder="Enter email"
              name="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input outline-0"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
        </div>

        <p className="text-error">{error}</p>

        <div className="card-actions justify-end mt-5">
          <button className="btn btn-primary" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
