import { useState } from "react";
import Card from "../../../Components/Card";
import UserCard from "../../../Components/UserCard";
import { editProfile } from "../../../Redux/users/usersThunks";
import { useDispatch, useSelector } from "react-redux";
import { selectUserError } from "../../../Redux/users/usersSelectors";
import { useNavigate } from "react-router";

export const EditProfileForm = ({ user = {} }) => {
  const error = useSelector(selectUserError);

  const {
    firstName = "",
    lastName = "",
    photoUrl = "",
    age = "",
    gender = "",
    about = "",
  } = user || {};

  const [showToast, setShowToast] = useState(false);

  const [profile, setProfile] = useState({
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handle input fields change
   */
  const setFieldValue = (event) => {
    setProfile((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSaveProfileClick = async () => {
    try {
      await dispatch(editProfile(profile)).unwrap();

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log("Error in edit profile: ", error);
      // If token is not present in cookie, then api will fail with 401 status code.
      // Redirect to login page in this case.
      if (error.status === 401) {
        return navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center gap-10 mt-10">
        <Card title="Edit Profile">
          <div className="flex flex-col gap-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter First Name"
                name="firstName"
                value={profile.firstName}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter Photo URL"
                name="photoUrl"
                value={profile.photoUrl}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter Age"
                name="age"
                value={profile.age}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter Gender"
                name="gender"
                value={profile.gender}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input outline-0"
                placeholder="Enter About"
                name="about"
                value={profile.about}
                onChange={(e) => setFieldValue(e)}
              />
            </fieldset>
          </div>

          <p className="text-error">{error}</p>

          <div className="card-actions justify-end mt-5">
            <button
              className="btn btn-primary"
              onClick={handleSaveProfileClick}
            >
              Save Profile
            </button>
          </div>
        </Card>

        <UserCard user={profile} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileForm;
