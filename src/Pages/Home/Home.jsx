import { Outlet, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/usersThunks";
import { selectUser } from "../../Redux/users/usersSelectors";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

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
        navigate("/login");
      }
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
};

export default Home;
