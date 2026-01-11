import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchRequests,
  reviewRequest,
} from "../../Redux/requests/requestsThunk";
import { useEffect, useState } from "react";
import { selectRequests } from "../../Redux/requests/requestsSlice";
import Loader from "../../Components/Loader";

const Requests = () => {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const requests = useSelector(selectRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      await dispatch(fetchRequests()).unwrap();
    } catch (error) {
      console.log("Error in fetching requests: ", error);

      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const handleRequestReviewClick = async (status, requestId) => {
    setUpdatingStatus(true);
    try {
      await dispatch(reviewRequest({ status, requestId })).unwrap();
    } catch (error) {
      console.log("Error in fetching requests: ", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  console.log("requests: ", requests);

  if (updatingStatus) {
    <Loader />;
  }

  if (!requests || requests?.length === 0) {
    return <h1 className="text-center mt-10">No connection found!</h1>;
  }

  return (
    <div className="my-10">
      <h1 className="text-bold text-2xl ml-5">Pending Requests</h1>

      <div className="flex flex-col gap-4 m-5">
        {requests.map(
          ({
            _id,
            fromUserId: { firstName, lastName, photoUrl, age, gender, about },
          }) => (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-sm w-3/4 mx-auto"
            >
              <img
                src={photoUrl}
                alt={`${firstName}-photo`}
                className="h-25 w-25 rounded-full mx-4 mt-6"
              />

              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                <p className="grow-0">
                  {[age, gender].filter(Boolean).join(", ")}
                </p>
                <p className="grow-0">{about}</p>

                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleRequestReviewClick("rejected", _id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleRequestReviewClick("accepted", _id);
                    }}
                  >
                    Accepts
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Requests;
