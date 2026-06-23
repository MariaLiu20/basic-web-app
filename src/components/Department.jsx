import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const Department = () => {
    const [deps, setDeps] = useState([{DepartmentID: 1, DepartmentName: "IT"},
            {DepartmentID: 2, DepartmentName: "HR"}]);
    
    useEffect(() => {
        fetch('https://localhost:7067/api/Department')
        .then(response => response.json())
        .then(data => setDeps(data));
    }, []);

    return (
        <div className="mt-5 d-flex justify-content-left">
            <h3>This is the Department Page.</h3>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep =>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}