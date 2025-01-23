import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TopicContext } from "../../context/topicsContext";
import { deleteTopic } from "../../services/topic";

export default function TopicItem() {
  const { setTopic, setTopicToFetch } = useContext(TopicContext);

  function setTopicToFetchHandler(topicId) {
    setTopicToFetch(topicId);
  }

  async function deleteTopicHandler(id) {
    try {
      const response = await deleteTopic(id);
      if (response.status === "200") {
        // delete correspondong lists -> delete corresponding todos
        setTopic((prevTopics) => prevTopics.filter((topic) => topic._id != id));
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const { topic } = useContext(TopicContext);
  console.log("HERE IN TopicItem");
  console.log(topic);
  return (
    <>
      {topic === null ? (
        <div>No Topic Found</div>
      ) : (
        topic.map((item) => (
          <div
            className=" flex flex-row bg-white-200 rounded-md 
                                w-full h-fit px-3 py-2 mt-3 cursor-pointer
                                transition-all duration-100 ease-in-out
                                hover:shadow-lg hover:shadow-white-600
                                hover:bg-white-300"
            key={item._id}
            onClick={() => setTopicToFetchHandler(item._id)}
          >
            <span className="p-1 basis-2/6 font-roboto font-light text-white-900">
              {item.title}
            </span>
            <div className="basis-4/6 flex flex-row justify-between">
              <span className="p-1 font-roboto font-light text-white-900 hover:bg-white-400 rounded-sm">
                Created on : Date
              </span>
              <span className="p-1 font-roboto font-light text-white-900">
                21 Lists
              </span>
              <span className="p-1 font-roboto font-light text-white-900">
                46 Tasks
              </span>
              <span
                className="p-1 hover:scale-110"
                onClick={() => deleteTopicHandler(item._id)}
              >
                <DeleteIcon sx={{ color: "#1c1917" }} />
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
}
