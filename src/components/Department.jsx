import {Table} from 'react-bootstrap';
import { useState } from 'react';

export const Department = () => {
    const [deps, setDeps] = useState([{DepartmentID: 1, DepartmentName: "IT"},
            {DepartmentID: 2, DepartmentName: "HR"},
            {DepartmentID: 3, DepartmentName: "Payroll"},
            {DepartmentID: 4, DepartmentName: "Admin"}]);

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
                        <tr key={dep.DepartmentID}>
                            <td>{dep.DepartmentID}</td>
                            <td>{dep.DepartmentName}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}