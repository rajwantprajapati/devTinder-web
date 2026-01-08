import { Outlet, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/usersThunks";
import { selectApiStatus, selectUser } from "../../Redux/users/usersSelectors";
import { API_STATUS } from "../../Redux/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const apiStatus = useSelector(selectApiStatus);

  /**
   * Method to fetch user data on page refresh
   */
  const fetchUserProfile = useCallback(async () => {
    // if user data is already present then don't need to fetch data again
    if (user) return;

    try {
      await dispatch(fetchUser()).unwrap();
    } catch (error) {
      console.log("Error recieved in component: ", error);

      // If token is not present in cookie, then api will fail with 401 status code.
      // Redirect to login page in this case.
      if (error.status === 401) {
        return navigate("/login");
      }

      navigate("/error");
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log("apiStatus: ", apiStatus);

  if (apiStatus === API_STATUS.PENDING || apiStatus === API_STATUS.IDLE) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
};

export default Home;
