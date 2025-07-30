const db = require("../config/db");

const getAllTasks = () => {
  return db("tasks").select("*");
};

const getTaskById = (id) => {
  return db("tasks").where({ id }).first();
};

const createTask = (title) => {
  return db("tasks")
    .insert({ title })
    .returning("*")
    .then((rows) => rows[0]);
};

const updateTask = (id, updates) => {
  return db("tasks")
    .where({ id })
    .update(updates)
    .returning("*")
    .then((rows) => rows[0]);
};

const deleteTask = (id) => {
  return db("tasks")
    .where({ id })
    .del()
    .then((count) => count > 0);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
