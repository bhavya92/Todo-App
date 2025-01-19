import { createContext, useState } from "react";

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
    const [ topic, setTopic ] = useState();

    const value = {
        topic,
        setTopic,
    }

    return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
}

export { TopicContext, TopicProvider }