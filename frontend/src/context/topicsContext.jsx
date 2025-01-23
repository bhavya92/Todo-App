import { createContext, useState } from "react";

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
  const [topic, setTopic] = useState(null);
  const [ topicToFetch, setTopicToFetch ] = useState(null);
  const value = {
    topic,
    setTopic,
    topicToFetch,
    setTopicToFetch,
  };

  return (
    <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
  );
};

export { TopicContext, TopicProvider };
