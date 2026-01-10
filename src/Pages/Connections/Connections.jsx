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

  return (
    <div>
      <h1>Connections</h1>
    </div>
  );
};

export default Connections;
