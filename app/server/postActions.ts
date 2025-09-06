"use server";

// An Example of server action to handle form submission
const todos: string[] = [];

export async function addTodo(formData: FormData) {
  const task = formData.get("task") as string;
  todos.push(task);
  console.log("Server Todos:", todos);
}
