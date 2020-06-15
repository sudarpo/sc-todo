import axios from "axios";

const apiEndpoint = "https://kj0wjq2kkf.execute-api.ap-southeast-1.amazonaws.com/dev/tasks";

const config = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

async function getTodoList() {
  return await axios.get(apiEndpoint);
}

async function createToDo(task) {
  return await axios.post(apiEndpoint, task, config);
}

async function editToDo(task) {
  config.data = task;
  return await axios.patch(`${apiEndpoint}/${task.id}`, task, config);
}

async function deleteToDo(task) {
  config.data = task;
  return await axios.delete(`${apiEndpoint}/${task.id}`, config);
}

export { getTodoList, createToDo, editToDo, deleteToDo };
