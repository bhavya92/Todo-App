export const fetchLists = async (topicId) => {
  const URL = `http://localhost:3000/list/${topicId}/all`;
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
  console.log(topicId);
  try {
    const response = await fetch(URL, {
      method: "GET",
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

export const newList = async (topicId, title='New List') => {
  const URL = `http://localhost:3000/list/${topicId}/new`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = async (listId) => {
  const URL = `http://localhost:3000/list/delete/${listId}`;
  try {
    const response = await fetch(URL, {
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

export const updateListName = async (listId, title) => {
  const URL = `http://localhost:3000/list/update/${listId}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
