import { useState } from "react";
import Card from "../../../Components/Card";
import UserCard from "../../../Components/UserCard";

export const EditProfileForm = ({ user = {} }) => {
  const {
    firstName = "",
    lastName = "",
    photoUrl = "",
    age = "",
    gender = "",
    about = "",
  } = user || {};

  const [profile, setProfile] = useState({
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  });

  /**
   * Handle input fields change
   */
  const setFieldValue = (event) => {
    setProfile((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdateClick = () => {
    console.log("profile edit data: ", profile);
  };

  return (
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

        {/* <p className="text-error">{error}</p>*/}

        <div className="card-actions justify-end mt-5">
          <button className="btn btn-primary" onClick={handleUpdateClick}>
            Save Profile
          </button>
        </div>
      </Card>

      <UserCard user={profile} />
    </div>
  );
};

export default EditProfileForm;
