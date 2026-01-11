import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchRequests } from "../../Redux/requests/requestsThunk";
import { useEffect } from "react";
import { selectRequests } from "../../Redux/requests/requestsSlice";

const Requests = () => {
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

  console.log("requests: ", requests);

  if (!requests || requests?.length === 0) {
    return <h1>No connection found!</h1>;
  }

  return (
    <div className="my-10">
      <h1 className="text-bold text-2xl ml-5">Pending Requests</h1>

      <div className="flex flex-col gap-4 m-5">
        {requests.map(
          ({
            fromUserId: {
              _id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            },
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
                  <button className="btn btn-primary">Reject</button>
                  <button className="btn btn-secondary">Accepts</button>
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
