import { useSelector } from "react-redux";
import EditProfileForm from "./Components/EditProfileForm";
import { selectUser } from "../../Redux/users/usersSelectors";

const Profile = () => {
  const user = useSelector(selectUser);

  return <EditProfileForm user={user} />;
};

export default Profile;
