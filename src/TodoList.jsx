import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"; // Importing the trash and check icons
import "./TodoList.css";

export default function TodoList() {
  let [arr, setArr] = useState([]);

  // Function to add a new task
  let addTask = () => {
    let Task = document.querySelector("#taskname").value;
    setArr([...arr, { id: uuid(), task: Task, completed: false }]); // Adding 'completed' property
    document.querySelector("#taskname").value = "";
  };

  // Function to delete a task
  let deleteTask = (props) => {
    setArr(arr.filter((item) => item.id !== props));
  };

  // Function to mark a task as completed
  let completeTask = (props) => {
    let completedTask = arr.find((item) => item.id === props);
    setArr(
      arr.map((item) => {
        if (item.id === props) {
          return { ...item, completed: !completedTask.completed }; // Toggle 'completed' state
        } else {
          return item;
        }
      })
    );
  };

  // Function to generate snowflakes at random positions
  const generateSnowflakes = () => {
    const numberOfSnowflakes = 30; // Adjust this number to control how many snowflakes appear
    const snowflakeContainer = document.querySelector(".mainContainer");

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      // Randomize the snowflake's horizontal position and animation duration
      snowflake.style.left = `${Math.random() * 100}vw`; // Random position across the viewport
      snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random speed of falling

      snowflakeContainer.appendChild(snowflake);
    }
  };

  // UseEffect hook to generate snowflakes when component mounts
  useEffect(() => {
    generateSnowflakes();

    // Cleanup snowflakes when component unmounts
    return () => {
      const snowflakes = document.querySelectorAll(".snowflake");
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, []);

  return (
    <div className="mainContainer">
      <p>Add tasks & get it done</p>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Enter a task"
          id="taskname"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="taskContainer">
        <ul className="TaskListed">
          {arr.map((item) => {
            return (
              <li key={item.id} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                <span>
                  <FontAwesomeIcon
                    onClick={() => completeTask(item.id)}
                    icon={faCheck}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "15px",
                      color: item.completed ? "#888" : "#00ff87", // Change color when completed
                    }}
                  />
                  {item.task}
                </span>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteTask(item.id)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
