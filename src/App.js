import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 5;

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/master/frontend-assignment.json')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const startIndex = currentPage * projectsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

    return (
        <div className="app">
            <table className="projects-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProjects.map((project, index) => {
                        return (
                            <tr key={project.id}>
                                <td>{startIndex + index}</td>
                                <td>{project["percentage.funded"]}%</td>
                                <td>${project["amt.pledged"]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App; 