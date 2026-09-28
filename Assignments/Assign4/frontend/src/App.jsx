import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5002/api/requests";

function App() {

    const [requests, setRequests] = useState([]);

    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");


    // ======================================
    // GET REQUESTS
    // ======================================

    const getRequests = async () => {

        try {

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Could not get requests");
            }

            const data = await response.json();

            setRequests(data);

        } catch (error) {

            console.log(error);

            setMessage(
                "Cannot connect to backend. Check port 5000."
            );

        }

    };


    useEffect(() => {

        getRequests();

    }, []);


    // ======================================
    // SUBMIT / UPDATE
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("Submit button clicked");


        const requestData = {

            studentName: studentName,

            email: email,

            category: category,

            description: description,

            priority: priority

        };


        console.log("Sending:", requestData);


        try {

            let response;


            if (editingId !== null) {

                response = await fetch(
                    `${API_URL}/${editingId}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(requestData)

                    }
                );

            } else {

                response = await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(requestData)

                    }
                );

            }


            const result = await response.json();


            console.log("Server response:", result);


            if (!response.ok) {

                setMessage(
                    result.message || "Something went wrong."
                );

                return;

            }


            if (editingId !== null) {

                setMessage(
                    "Request updated successfully!"
                );

            } else {

                setMessage(
                    "Request submitted successfully!"
                );

            }


            clearForm();

            getRequests();


        } catch (error) {

            console.log("Error:", error);

            setMessage(
                "Cannot connect to the backend server."
            );

        }

    };


    // ======================================
    // EDIT
    // ======================================

    const editRequest = (request) => {

        setStudentName(request.studentName);

        setEmail(request.email);

        setCategory(request.category);

        setDescription(request.description);

        setPriority(request.priority);

        setEditingId(request.id);

        setMessage("");

    };


    // ======================================
    // DELETE
    // ======================================

    const deleteRequest = async (id) => {

        try {

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


            const result = await response.json();


            if (!response.ok) {

                setMessage(result.message);

                return;

            }


            setMessage(
                "Request deleted successfully!"
            );


            getRequests();


        } catch (error) {

            console.log(error);

            setMessage(
                "Cannot connect to backend."
            );

        }

    };


    // ======================================
    // CLEAR FORM
    // ======================================

    const clearForm = () => {

        setStudentName("");

        setEmail("");

        setCategory("");

        setDescription("");

        setPriority("Medium");

        setEditingId(null);

    };


    return (

        <div className="container">

            <h1>
                Campus Help Desk
            </h1>


            <p className="subtitle">
                Submit and manage campus-related
                problems and requests
            </p>


            {message && (

                <div className="message">

                    {message}

                </div>

            )}


            {/* FORM */}

            <div className="form-box">

                <h2>

                    {editingId !== null
                        ? "Update Request"
                        : "Submit a Request"}

                </h2>


                <form onSubmit={handleSubmit}>

                    <label>
                        Student Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter student name"
                        value={studentName}
                        onChange={(e) =>
                            setStudentName(e.target.value)
                        }
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Hostel">
                            Hostel
                        </option>

                        <option value="Academic">
                            Academic
                        </option>

                        <option value="Library">
                            Library
                        </option>

                        <option value="Infrastructure">
                            Infrastructure
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    <label>
                        Problem Description
                    </label>

                    <textarea
                        placeholder="Describe your problem"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />


                    <label>
                        Priority
                    </label>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                    </select>


                    <div className="form-buttons">

                        <button type="submit">

                            {editingId !== null
                                ? "Update Request"
                                : "Submit Request"}

                        </button>


                        {editingId !== null && (

                            <button
                                type="button"
                                className="cancel"
                                onClick={clearForm}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* REQUESTS */}

            <div className="requests">

                <h2>
                    Submitted Requests
                </h2>


                {requests.length === 0 ? (

                    <p className="empty">
                        No requests submitted yet.
                    </p>

                ) : (

                    requests.map((request) => (

                        <div
                            className="request-card"
                            key={request.id}
                        >

                            <div className="request-header">

                                <h3>
                                    #{request.id} -{" "}
                                    {request.category}
                                </h3>


                                <span
                                    className={
                                        `priority ${request.priority.toLowerCase()}`
                                    }
                                >

                                    {request.priority}

                                </span>

                            </div>


                            <p>
                                <strong>
                                    Student:
                                </strong>{" "}
                                {request.studentName}
                            </p>


                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {request.email}
                            </p>


                            <p>
                                <strong>
                                    Problem:
                                </strong>{" "}
                                {request.description}
                            </p>


                            <div className="actions">

                                <button
                                    onClick={() =>
                                        editRequest(request)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    className="delete"
                                    onClick={() =>
                                        deleteRequest(request.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default App;