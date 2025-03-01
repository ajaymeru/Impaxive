import React, { useState } from "react";
import "./styles/CreateActivity.scss";
import { FaTrash, FaPlus } from "react-icons/fa";

const CreateActivity = () => {
  const [formData, setFormData] = useState({
    activityNum: "",
    activityName: "",
    activityDate: "",
    expectedCompletionDate: "",
    activityDesc: "",
    poWoDate: "",
    poWoNum: "",
    promoPeriodFrom: "",
    promoPeriodTo: "",
    vendor: "",
    executedBy: "",
    store: "",
    referencePpt: null,
    commercialDoc: null,
  });

  const [taskTables, setTaskTables] = useState([
    {
      id: Date.now(),
      taskNum: "01",
      taskName: "Task1",
      tasks: [],
    },
  ]);

  const [currentTask, setCurrentTask] = useState({
    quantity: "",
    totalSFT: "",
    rate: "",
    tax: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleTaskFormChange = (tableId, e) => {
    const { name, value } = e.target;
    setTaskTables((prev) =>
      prev.map((table) =>
        table.id === tableId ? { ...table, [name]: value } : table
      )
    );
  };

  const handleCurrentTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({
      ...prev,
      [name]: value,
      amount:
        name === "rate" || name === "totalSFT"
          ? calculateAmount(
              name === "rate" ? value : prev.rate,
              name === "totalSFT" ? value : prev.totalSFT
            )
          : prev.amount,
    }));
  };

  const calculateAmount = (rate, totalSFT) => {
    return rate && totalSFT
      ? (parseFloat(rate) * parseFloat(totalSFT)).toFixed(2)
      : "";
  };

  const handleAddNewTaskTable = () => {
    setTaskTables((prev) => {
      const newTaskNumber = (prev.length + 1).toString().padStart(2, "0");
      return [
        ...prev,
        {
          id: Date.now(),
          taskNum: newTaskNumber,
          taskName: `Task${prev.length + 1}`,
          tasks: [],
        },
      ];
    });
  };

  const addTask = (tableId) => {
    if (currentTask.quantity && currentTask.totalSFT && currentTask.rate) {
      setTaskTables((prev) =>
        prev.map((table) =>
          table.id === tableId
            ? {
                ...table,
                tasks: [...table.tasks, { ...currentTask, id: Date.now() }],
              }
            : table
        )
      );
      setCurrentTask({
        quantity: "",
        totalSFT: "",
        rate: "",
        tax: "",
        amount: "",
      });
    }
  };

  const deleteTask = (tableId, taskId) => {
    setTaskTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? {
              ...table,
              tasks: table.tasks.filter((task) => task.id !== taskId),
            }
          : table
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleSaveTasks = () => {
    // Collect all form data and tasks together
    const completeData = {
      formData,
      taskTables,
    };
    console.log("Saving all data:", completeData);
    // Here you would typically make an API call to save the data
  };

  const handleSaveTable = (tableId) => {
    const tableToSave = taskTables.find((table) => table.id === tableId);
    console.log("Saving table data:", tableToSave);
    // Here you would typically make an API call to save the specific table data
  };

  const handleClearTable = (tableId) => {
    setTaskTables((prev) =>
      prev.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            taskNum: "",
            taskName: "",
            tasks: [],
          };
        }
        return table;
      })
    );
  };

  return (
    <div className="CreateActivity">
      <h2>Create Activity</h2>
      <div className="activityform">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="activityNum">Activity Number:</label>
            <input
              type="text"
              id="activityNum"
              name="activityNum"
              value={formData.activityNum}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="activityName">Activity Name</label>
            <input type="text" id="activityName" name="activityName" />
          </div>
          <div className="form-group">
            <label htmlFor="activityDate">Activity Date</label>
            <input type="date" id="activityDate" name="activityDate" />
          </div>
          <div className="form-group">
            <label htmlFor="expectedCompletionDate">
              Expected Completion Date
            </label>
            <input
              type="date"
              id="expectedCompletionDate"
              name="expectedCompletionDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="activityDesc">Activity Description</label>
            <textarea id="activityDesc" name="activityDesc" />
          </div>
          <div className="form-group">
            <label htmlFor="poWoDate">PO/WO Date</label>
            <input type="date" id="poWoDate" name="poWoDate" />
          </div>
          <div className="form-group">
            <label htmlFor="poWoNum">PO/WO Number</label>
            <input type="text" id="poWoNum" name="poWoNum" />
          </div>

          <div className="form-group">
            <label htmlFor="promoPeriodFrom">Promo Period From</label>
            <input type="date" id="promoPeriodFrom" name="promoPeriodFrom" />
          </div>
          <div className="form-group">
            <label htmlFor="promoPeriodTo">Promo Period To</label>
            <input type="date" id="promoPeriodTo" name="promoPeriodTo" />
          </div>
          <div className="form-group">
            <label htmlFor="vendor">Vendor</label>
            <select id="vendor" name="vendor">
              <option value="Vendor1">Vendor1</option>
              <option value="Vendor2">Vendor2</option>
              <option value="Vendor3">Vendor3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="executedBy">Executed By</label>
            <select id="executedBy" name="executedBy">
              <option value="ExecutedBy1">ExecutedBy1</option>
              <option value="ExecutedBy2">ExecutedBy2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="store">Store</label>
            <select id="store" name="store">
              <option value="Store1">Store1</option>
              <option value="Store2">Store2</option>
              <option value="Store3">Store3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="referencePpt">Reference PPT</label>
            <input type="file" id="referencePpt" name="referencePpt" />
          </div>
          <div className="form-group">
            <label htmlFor="commercialDoc">Commercial Document</label>
            <input type="file" id="commercialDoc" name="commercialDoc" />
          </div>
        </form>
      </div>

      <div className="tasks">
        {taskTables.map((table) => (
          <div key={table.id} className="task-section">
            <div className="task-header">
              <div className="form-group">
                <label htmlFor={`taskNum-${table.id}`}>Task Number:</label>
                <input
                  type="text"
                  id={`taskNum-${table.id}`}
                  name="taskNum"
                  value={table.taskNum}
                  onChange={(e) => handleTaskFormChange(table.id, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`taskName-${table.id}`}>Task Name:</label>
                <input
                  type="text"
                  id={`taskName-${table.id}`}
                  name="taskName"
                  value={table.taskName}
                  onChange={(e) => handleTaskFormChange(table.id, e)}
                />
              </div>
            </div>

            <table className="task-table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Total SFT</th>
                  <th>Rate</th>
                  <th>Tax</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {table.tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.quantity}</td>
                    <td>{task.totalSFT}</td>
                    <td>{task.rate}</td>
                    <td>{task.tax}</td>
                    <td>{task.amount}</td>
                    <td style={{display:"flex", gap:"1vw"}}>
                      <button
                        onClick={() => editTask(table.id, task.id)}
                        className="icon-button edit-btn"
                      >
                        <FaPlus />
                      </button>

                      <button
                        onClick={() => deleteTask(table.id, task.id)}
                        className="icon-button delete-btn"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={currentTask.quantity}
                      onChange={handleCurrentTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="totalSFT"
                      value={currentTask.totalSFT}
                      onChange={handleCurrentTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="rate"
                      value={currentTask.rate}
                      onChange={handleCurrentTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="tax"
                      value={currentTask.tax}
                      onChange={handleCurrentTaskChange}
                    />
                  </td>
                  <td>{currentTask.amount}</td>
                  <td style={{ display: "flex", gap: "1vw" }}>
                    <button
                      onClick={() => addTask(table.id)}
                      className="icon-button add-btn"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => deleteTask(table.id, currentTask.id)}
                      className="icon-button delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="task-buttons">
              <button
                className="save-btn"
                onClick={() => handleSaveTable(table.id)}
              >
                Save Table
              </button>
              <button
                className="clear-btn"
                onClick={() => handleClearTable(table.id)}
              >
                Clear Table
              </button>
            </div>
          </div>
        ))}

        <div className="task-actions">
          <button className="add-task-btn" onClick={handleAddNewTaskTable}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActivity;
