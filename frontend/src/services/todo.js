export const fetchTodos = async (todoListId) => {
  const URL = `http://localhost:3000/todo/${todoListId}/all`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });

    const json = await response.json();
    console.log("In fetchTodo Service ");
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const newTodo = async (todoListId, todoObject) => {
  console.log(`In newTodo service repeat ${todoObject.repeat}`)
  const URL = `http://localhost:3000/todo/${todoListId}/new`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title: todoObject.title,
        dueDate: todoObject.dueDate,
        starred: todoObject.starred,
        daily: todoObject.daily,
        remind: todoObject.remind,
        description: todoObject.description,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (todoId, todoObject) => {
  const URL = `http://localhost:3000/todo/update/${todoId}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({
        title: todoObject.title,
        dueDate: todoObject.dueDate,
        starred: todoObject.starred,
        daily: todoObject.daily,
        done: todoObject.done,
        remind: todoObject.remind,
        description: todoObject.description,
      }),
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (todoId) => {
  const URL = `http://localhost:3000/todo/delete/${todoId}`;

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
