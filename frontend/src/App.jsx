
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [reports, setReports] = useState([]);

  // Student form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Internship form
  const [internshipStudent, setInternshipStudent] = useState("");
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [mentor, setMentor] = useState("");

  // Daily report form
  const [reportStudent, setReportStudent] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [reportStatus, setReportStatus] = useState("COMPLETED");
  const [remarks, setRemarks] = useState("");

  const [reportFilter, setReportFilter] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    loadStudents();
    loadInternships();
    loadReports();
  }, []);

  function loadStudents() {
    fetch("http://localhost:8080/api/students")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load students");
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Student loading error:", error);
      });
  }

  function loadInternships() {
    fetch("http://localhost:8080/api/internships")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load internships");
        }

        return response.json();
      })
      .then((data) => {
        setInternships(data);
      })
      .catch((error) => {
        console.error("Internship loading error:", error);
      });
  }

  function loadReports() {
    fetch("http://localhost:8080/api/reports")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load reports");
        }

        return response.json();
      })
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Report loading error:", error);
      });
  }

  // =========================
  // STUDENT MANAGEMENT
  // =========================

  function saveStudent(event) {
    event.preventDefault();

    const student = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
    };

    const url = editingId
      ? `http://localhost:8080/api/students/${editingId}`
      : "http://localhost:8080/api/students";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then(async (response) => {
        const text = await response.text();

        let data = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Request failed with status ${response.status}`
          );
        }

        return data;
      })
      .then((data) => {
        console.log("Student saved:", data);

        alert(
          editingId
            ? "Student updated successfully"
            : "Student added successfully"
        );

        clearStudentForm();
        loadStudents();
      })
      .catch((error) => {
        console.error("Student error:", error);
        alert("Error: " + error.message);
      });
  }

  function editStudent(student) {
    setEditingId(student.id);

    setName(student.name || "");
    setEmail(student.email || "");
    setPhone(student.phone || "");
    setCollege(student.college || "");

    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }

  function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/students/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();

          let data = {};

          try {
            data = text ? JSON.parse(text) : {};
          } catch {
            data = {};
          }

          throw new Error(
            data.error ||
              data.message ||
              `Delete failed with status ${response.status}`
          );
        }
      })
      .then(() => {
        alert("Student deleted successfully");
        loadStudents();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Error: " + error.message);
      });
  }

  function clearStudentForm() {
    setEditingId(null);
    setName("");
    setEmail("");
    setPhone("");
    setCollege("");
  }

  // =========================
  // INTERNSHIP MANAGEMENT
  // =========================

  function addInternship(event) {
    event.preventDefault();

    const internship = {
      student: {
        id: Number(internshipStudent),
      },
      program: program.trim(),
      startDate: startDate,
      endDate: endDate,
      status: status,
      mentor: mentor.trim(),
    };

    fetch("http://localhost:8080/api/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(internship),
    })
      .then(async (response) => {
        const text = await response.text();

        let data = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Request failed with status ${response.status}`
          );
        }

        return data;
      })
      .then(() => {
        alert("Internship added successfully");

        setInternshipStudent("");
        setProgram("");
        setStartDate("");
        setEndDate("");
        setStatus("ACTIVE");
        setMentor("");

        loadInternships();
      })
      .catch((error) => {
        console.error("Internship error:", error);
        alert("Error: " + error.message);
      });
  }

  // =========================
  // DAILY REPORT MANAGEMENT
  // =========================

  function addReport(event) {
    event.preventDefault();

    const report = {
      student: {
        id: Number(reportStudent),
      },
      reportDate: reportDate,
      taskCompleted: taskCompleted.trim(),
      hoursWorked: Number(hoursWorked),
      status: reportStatus,
      remarks: remarks.trim(),
    };

    fetch("http://localhost:8080/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })
      .then(async (response) => {
        const text = await response.text();

        let data = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Request failed with status ${response.status}`
          );
        }

        return data;
      })
      .then(() => {
        alert("Daily report added successfully");

        clearReportForm();
        loadReports();
      })
      .catch((error) => {
        console.error("Report error:", error);
        alert("Error: " + error.message);
      });
  }

  function clearReportForm() {
    setReportStudent("");
    setReportDate("");
    setTaskCompleted("");
    setHoursWorked("");
    setReportStatus("COMPLETED");
    setRemarks("");
  }

  // =========================
  // REPORT FILTER
  // =========================

  function filterReports(statusValue) {
    setReportFilter(statusValue);

    if (statusValue === "") {
      loadReports();
      return;
    }

    fetch(
      `http://localhost:8080/api/reports/status/${statusValue}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to filter reports");
        }

        return response.json();
      })
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Report filter error:", error);
        alert("Error: " + error.message);
      });
  }

  // =========================
  // SEARCH STUDENTS
  // =========================

  const filteredStudents = students.filter((student) =>
    (student.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // HTML
  // =========================

  return (
    <div className="container">

      {/* HEADER */}

      <h1>Smart Internship Management System</h1>

      <p className="subtitle">
        Manage students, internships and daily progress
      </p>

      {/* DASHBOARD */}

      <h2>Dashboard</h2>

      <div className="cards">

        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Total Internships</h3>
          <p>{internships.length}</p>
        </div>

        <div className="card">
          <h3>Total Reports</h3>
          <p>{reports.length}</p>
        </div>

      </div>

      <hr />

      {/* STUDENT MANAGEMENT */}

      <h2>Student Management</h2>

      <form onSubmit={saveStudent}>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="College"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={clearStudentForm}
          >
            Cancel
          </button>
        )}

      </form>

      <input
        type="text"
        placeholder="Search student by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Students</h3>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>College</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.length === 0 ? (

            <tr>
              <td colSpan="6">
                No students found
              </td>
            </tr>

          ) : (

            filteredStudents.map((student) => (

              <tr key={student.id}>

                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.email}</td>

                <td>{student.phone}</td>

                <td>{student.college}</td>

                <td>

                  <button
                    type="button"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <hr />

      {/* INTERNSHIP MANAGEMENT */}

      <h2>Internship Management</h2>

      <form onSubmit={addInternship}>

        <select
          value={internshipStudent}
          onChange={(e) =>
            setInternshipStudent(e.target.value)
          }
          required
        >

          <option value="">
            Select Student
          </option>

          {students.map((student) => (

            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          required
        />

        <div>
          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            required
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="COMPLETED">
            COMPLETED
          </option>

          <option value="PENDING">
            PENDING
          </option>

        </select>

        <input
          type="text"
          placeholder="Mentor"
          value={mentor}
          onChange={(e) =>
            setMentor(e.target.value)
          }
          required
        />

        <button type="submit">
          Add Internship
        </button>

      </form>

      <h3>Internships</h3>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Program</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Mentor</th>
          </tr>

        </thead>

        <tbody>

          {internships.length === 0 ? (

            <tr>
              <td colSpan="7">
                No internships found
              </td>
            </tr>

          ) : (

            internships.map((internship) => (

              <tr key={internship.id}>

                <td>{internship.id}</td>

                <td>
                  {internship.student?.name}
                </td>

                <td>
                  {internship.program}
                </td>

                <td>
                  {internship.startDate}
                </td>

                <td>
                  {internship.endDate}
                </td>

                <td>
                  {internship.status}
                </td>

                <td>
                  {internship.mentor}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <hr />

      {/* DAILY PROGRESS REPORTS */}

      <h2>Daily Progress Reports</h2>

      <form onSubmit={addReport}>

        <select
          value={reportStudent}
          onChange={(e) =>
            setReportStudent(e.target.value)
          }
          required
        >

          <option value="">
            Select Student
          </option>

          {students.map((student) => (

            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>

          ))}

        </select>

        <div>
          <label>Report Date</label>

          <input
            type="date"
            value={reportDate}
            onChange={(e) =>
              setReportDate(e.target.value)
            }
            required
          />
        </div>

        <input
          type="text"
          placeholder="Task Completed"
          value={taskCompleted}
          onChange={(e) =>
            setTaskCompleted(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) =>
            setHoursWorked(e.target.value)
          }
          min="0"
          step="0.5"
          required
        />

        <select
          value={reportStatus}
          onChange={(e) =>
            setReportStatus(e.target.value)
          }
        >

          <option value="COMPLETED">
            COMPLETED
          </option>

          <option value="IN_PROGRESS">
            IN_PROGRESS
          </option>

          <option value="PENDING">
            PENDING
          </option>

        </select>

        <input
          type="text"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
        />

        <button type="submit">
          Submit Report
        </button>

      </form>

      <h3>Daily Reports</h3>

      <select
        value={reportFilter}
        onChange={(e) =>
          filterReports(e.target.value)
        }
      >

        <option value="">
          All Reports
        </option>

        <option value="COMPLETED">
          COMPLETED
        </option>

        <option value="IN_PROGRESS">
          IN_PROGRESS
        </option>

        <option value="PENDING">
          PENDING
        </option>

      </select>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Date</th>
            <th>Task Completed</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>

        </thead>

        <tbody>

          {reports.length === 0 ? (

            <tr>
              <td colSpan="7">
                No reports found
              </td>
            </tr>

          ) : (

            reports.map((report) => (

              <tr key={report.id}>

                <td>{report.id}</td>

                <td>
                  {report.student?.name}
                </td>

                <td>
                  {report.reportDate}
                </td>

                <td>
                  {report.taskCompleted}
                </td>

                <td>
                  {report.hoursWorked}
                </td>

                <td>
                  {report.status}
                </td>

                <td>
                  {report.remarks}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;