import { useDispatch } from "react-redux";
import { sendRequest } from "../Redux/requests/requestsThunk";
import { useState } from "react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const fullName = `${firstName} ${lastName}`;

  const handleSendRequest = async (status, userId) => {
    try {
      await dispatch(sendRequest({ status, userId })).unwrap();
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="user-photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{fullName}</h2>
          <div className="flex">
            {age && <span>{age},</span>} {gender && <span> {gender}</span>}
          </div>
          <p>{about}</p>
          <div className="card-actions justify-center mt-10">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
