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


    // ==============================
    // GET REQUESTS
    // ==============================

    const getRequests = async () => {

        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            setRequests(data);

        } catch (error) {

            console.log(error);

            setMessage("Backend connection failed.");

        }

    };


    useEffect(() => {

        getRequests();

    }, []);


    // ==============================
    // SUBMIT / UPDATE
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();


        const requestData = {

            studentName,
            email,
            category,
            description,
            priority

        };


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


            const data = await response.json();


            if (!response.ok) {

                setMessage(data.message);

                return;

            }


            setMessage(
                editingId !== null
                    ? "Request updated successfully."
                    : "Request submitted successfully."
            );


            clearForm();

            getRequests();


        } catch (error) {

            console.log(error);

            setMessage("Unable to connect to server.");

        }

    };


    // ==============================
    // EDIT
    // ==============================

    const editRequest = (request) => {

        setStudentName(request.studentName);

        setEmail(request.email);

        setCategory(request.category);

        setDescription(request.description);

        setPriority(request.priority);

        setEditingId(request.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==============================
    // DELETE
    // ==============================

    const deleteRequest = async (id) => {

        try {

            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

            setMessage("Request deleted.");

            getRequests();

        } catch (error) {

            console.log(error);

        }

    };


    // ==============================
    // CLEAR FORM
    // ==============================

    const clearForm = () => {

        setStudentName("");

        setEmail("");

        setCategory("");

        setDescription("");

        setPriority("Medium");

        setEditingId(null);

    };


    // ==============================
    // STATISTICS
    // ==============================

    const total = requests.length;

    const high = requests.filter(
        r => r.priority === "High"
    ).length;

    const medium = requests.filter(
        r => r.priority === "Medium"
    ).length;

    const low = requests.filter(
        r => r.priority === "Low"
    ).length;


    return (

        <div className="app">

            {/* ================= HEADER ================= */}

            <header className="header">

                <div className="brand">

                    <div className="logo">
                        CH
                    </div>

                    <div>

                        <h2>
                            Campus<span>Help</span>
                        </h2>

                        <p>
                            Student Support System
                        </p>

                    </div>

                </div>


                <div className="status">

                    <span className="status-dot"></span>

                    System Online

                </div>

            </header>


            {/* ================= HERO ================= */}

            <section className="hero">

                <div className="hero-text">

                    <p className="eyebrow">
                        CAMPUS • SUPPORT • CONNECT
                    </p>

                    <h1>
                        Your campus.
                        <br />
                        <span>Your voice.</span>
                    </h1>

                    <p className="hero-description">
                        Report problems, raise requests and
                        keep track of issues that matter to
                        your campus life.
                    </p>

                </div>


                <div className="hero-shape">

                    <div className="shape-one"></div>

                    <div className="shape-two"></div>

                    <div className="shape-text">
                        HELP
                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="stats">

                <div className="stat-card total-card">

                    <span>Total Requests</span>

                    <strong>{total}</strong>

                    <small>
                        All submissions
                    </small>

                </div>


                <div className="stat-card high-card">

                    <span>High Priority</span>

                    <strong>{high}</strong>

                    <small>
                        Needs attention
                    </small>

                </div>


                <div className="stat-card medium-card">

                    <span>Medium Priority</span>

                    <strong>{medium}</strong>

                    <small>
                        Regular requests
                    </small>

                </div>


                <div className="stat-card low-card">

                    <span>Low Priority</span>

                    <strong>{low}</strong>

                    <small>
                        Lower urgency
                    </small>

                </div>

            </section>


            {/* ================= MESSAGE ================= */}

            {message && (

                <div className="message">

                    <span>✓</span>

                    {message}

                    <button
                        onClick={() => setMessage("")}
                    >
                        ×
                    </button>

                </div>

            )}


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-grid">


                {/* ================= FORM ================= */}

                <section className="form-section">

                    <div className="section-heading">

                        <div>

                            <p className="section-number">
                                01
                            </p>

                            <h2>
                                {editingId !== null
                                    ? "Update Request"
                                    : "Raise a Request"}
                            </h2>

                        </div>

                        <span className="required">
                            * Required fields
                        </span>

                    </div>


                    <form
                        className="request-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="input-row">

                            <div className="input-group">

                                <label>
                                    Student Name *
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Hirdyansh Goyal"
                                    value={studentName}
                                    onChange={(e) =>
                                        setStudentName(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@college.edu"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        <div className="input-row">

                            <div className="input-group">

                                <label>
                                    Category *
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Choose category
                                    </option>

                                    <option value="Hostel">
                                        🏠 Hostel
                                    </option>

                                    <option value="Academic">
                                        📚 Academic
                                    </option>

                                    <option value="Library">
                                        📖 Library
                                    </option>

                                    <option value="Infrastructure">
                                        🏗 Infrastructure
                                    </option>

                                    <option value="Transport">
                                        🚌 Transport
                                    </option>

                                    <option value="Other">
                                        ✦ Other
                                    </option>

                                </select>

                            </div>


                            <div className="input-group">

                                <label>
                                    Priority *
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

                            </div>

                        </div>


                        <div className="input-group">

                            <label>
                                Problem Description *
                            </label>

                            <textarea
                                placeholder="Tell us what happened and where..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            ></textarea>

                            <small className="hint">
                                Be specific so the concerned department
                                can resolve it faster.
                            </small>

                        </div>


                        <div className="form-actions">

                            <button
                                className="submit-btn"
                                type="submit"
                            >

                                {editingId !== null
                                    ? "Update Request →"
                                    : "Submit Request →"}

                            </button>


                            {editingId !== null && (

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={clearForm}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </section>


                {/* ================= REQUESTS ================= */}

                <section className="requests-section">

                    <div className="section-heading">

                        <div>

                            <p className="section-number">
                                02
                            </p>

                            <h2>
                                Live Requests
                            </h2>

                        </div>

                        <span className="request-count">
                            {total} total
                        </span>

                    </div>


                    <div className="request-list">

                        {requests.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    +
                                </div>

                                <h3>
                                    No requests yet
                                </h3>

                                <p>
                                    Your submitted requests
                                    will appear here.
                                </p>

                            </div>

                        ) : (

                            requests.map((request) => (

                                <article
                                    className="request-card"
                                    key={request.id}
                                >

                                    <div className="request-top">

                                        <span className="request-id">
                                            REQ-{String(request.id).padStart(3, "0")}
                                        </span>

                                        <span
                                            className={
                                                `priority-tag ${request.priority.toLowerCase()}`
                                            }
                                        >
                                            {request.priority}
                                        </span>

                                    </div>


                                    <h3>
                                        {request.category}
                                    </h3>


                                    <p className="problem">
                                        {request.description}
                                    </p>


                                    <div className="request-info">

                                        <span>
                                            👤 {request.studentName}
                                        </span>

                                        <span>
                                            ✉ {request.email}
                                        </span>

                                    </div>


                                    <div className="card-actions">

                                        <button
                                            onClick={() =>
                                                editRequest(request)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteRequest(request.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))

                        )}

                    </div>

                </section>

            </main>


            {/* ================= FOOTER ================= */}

            <footer>

                <p>
                    Campus Help Desk
                </p>

                <span>
                    Built for better campus communication.
                </span>

            </footer>

        </div>

    );

}

export default App;