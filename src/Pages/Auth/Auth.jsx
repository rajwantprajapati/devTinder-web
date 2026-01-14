import { useState } from "react";
import Card from "../../Components/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signIn, signUp } from "../../Redux/users/usersThunks";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Method to handle sign in button click
   */
  const handleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      await dispatch(signIn({ emailId, password })).unwrap();

      navigate("/");
    } catch (error) {
      console.log("Error handled in component: ", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
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

  const handleSignUp = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      await dispatch(
        signUp({ firstName, lastName, emailId, password }),
      ).unwrap();

      navigate("/profile");
    } catch (error) {
      console.log("Error handled in component: ", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const btnText = isLoginForm ? "Sign In" : "Sign Up";

  return (
    <div className="flex justify-center mt-10">
      <Card title={isLoginForm ? "Sign In" : "Sign Up"}>
        <div className="flex flex-col gap-3">
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input outline-0"
                  placeholder="Enter first name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input outline-0"
                  placeholder="Enter last name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}

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

        <div className="flex flex-col card-actions items-end mt-5">
          <button
            disabled={isSubmitting}
            className="btn btn-primary"
            onClick={isLoginForm ? handleSignIn : handleSignUp}
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            {isSubmitting
              ? isLoginForm
                ? "Signing in..."
                : "Signing up..."
              : btnText}
          </button>

          {!isSubmitting && (
            <div className="flex items-center">
              {isLoginForm ? "New User?" : "Existing User?"}
              <button
                className="btn btn-ghost"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm ? "Sign Up" : "Sign In"}
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Login;
