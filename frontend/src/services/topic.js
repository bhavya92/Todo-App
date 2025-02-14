import dayjs from "dayjs";

export const fetchTopics = async () => {
  console.log("Inside fetchTopics");
  const url = "http://localhost:3000/topic/";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(typeof json);
    return json;
  } catch (err) {
    console.log(err.message);
  }
};

export const createTopic = async (title = "Personal") => {
  const url = "http://localhost:3000/topic/new";
  const date = dayjs().format("DD/MM/YYYY");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        date,
      }),
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTopic = async (topicId) => {
  const url = `http://localhost:3000/topic/delete/${topicId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const updateTopicName = async (topicId, newTitle) => {
  const url = `http://localhost:3000/topic/update/${topicId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title: newTitle,
      }),
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
