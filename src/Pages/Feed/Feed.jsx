import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../Redux/feed/feedThunk";
import { useEffect } from "react";
import { selectFeeds } from "../../Redux/feed/feedSlice";
import UserCard from "../../Components/UserCard";

const Feed = () => {
  const feeds = useSelector(selectFeeds);

  const dispatch = useDispatch();

  const getFeeds = async () => {
    if (feeds) return;

    try {
      await dispatch(fetchFeed()).unwrap();
    } catch (error) {
      console.log("Error in received in feed component: ", error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div className="flex justify-center my-20">
      {feeds && <UserCard user={feeds[0]} />}
    </div>
  );
};

export default Feed;
