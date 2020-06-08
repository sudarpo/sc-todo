import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/todos";

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
  return await axios.put(`${apiEndpoint}/${task.id}`, task, config);
}

async function deleteToDo(task) {
  return await axios.delete(`${apiEndpoint}/${task.id}`, task, config);
}

export { getTodoList, createToDo, editToDo, deleteToDo };
