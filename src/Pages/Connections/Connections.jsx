import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchConnections } from "../../Redux/connections/connections.Thunk";
import { selectConnections } from "../../Redux/connections/connectionsSlice";

const Connections = () => {
  const connections = useSelector(selectConnections);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      await dispatch(fetchConnections()).unwrap();
    } catch (error) {
      console.log("Error in fetching connections: ", error);

      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  console.log("connections: ", connections);

  if (connections?.length === 0) {
    return <h1>No connection found!</h1>;
  }

  return (
    <div className="my-10">
      <h1 className="text-bold text-2xl ml-5">Connections</h1>

      <div className="flex flex-col gap-4  m-5">
        {connections.map(
          ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-sm w-3/4 mx-auto"
            >
              <figure className="p-2">
                <img
                  src={photoUrl}
                  alt={`${firstName}-photo`}
                  className="h-30 w-30 rounded-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                <p className="grow-0">
                  {[age, gender].filter(Boolean).join(", ")}
                </p>
                <p className="grow-0">{about}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Connections;
