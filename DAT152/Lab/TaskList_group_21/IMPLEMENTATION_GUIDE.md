# TaskList group 21 - implementation guide

This project is based on the supplied `apitemplate`. The server-side API and
its service contracts must not be changed.

## What is already present

- The Spring Boot server, database, demo pages and API come from the template.
- `components/tasklist/tasklist.js` is reused from the previous JavaScript lab
  and adapted to the name `group21-tasklist`.
- `index.html` contains one `group21-taskview` with service URL `./api`.

## Recommended implementation order

1. Implement `components/taskbox/taskbox.js` and test its four public methods.
2. Implement `TaskView.loadStatuses()` and pass statuses to both children.
3. Implement `TaskView.loadTasks()` and display the initial server tasks.
4. Connect New task and implement `TaskView.addTask()`.
5. Connect TaskList's status callback and implement `changeTaskStatus()`.
6. Connect TaskList's delete callback and implement `deleteTask()`.
7. Finish message and error handling.
8. Temporarily use two `group21-taskview` elements for the required test, then
   remove the second one before delivery.

## Required component boundaries

- Only TaskView may use `fetch` or know the server URL.
- TaskList owns the task table and its event listeners.
- TaskBox owns the dialog and its event listeners.
- Components communicate only through the required public API methods.
- Insert dynamic server/user data with `textContent`, not `innerHTML`,
  `outerHTML`, `insertAdjacentHTML`, or `setHTMLUnsafe`.

## URLs while running

- Application: `http://127.0.0.1:8080/TaskList/`
- API demo: `http://127.0.0.1:8080/TaskList/demo/index.html`
- H2 console: `http://localhost:8080/TaskList/h2-console`
