import React, { useState, useEffect } from 'react'
import { getAllApplications, updateApplication, createApplication, deleteApplication } from '../Api/Apiclient'
import './JobApplicationList.css'

const JobApplicationList = () => {

    const [applications, setApplications] = useState([]);
    const [editRowId, SetEditRowId] = useState(null);
    const [editedData, SetEditedData] = useState({});
    const [newApplication, setNewApplication] = useState({
        companyName: "",
        position: "",
        status: "Applied",
        dateApplied: new Date().toISOString().split("T")[0],
    });

    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 5;

    useEffect(() => {
        fetchApplications();
    },[]);

    const fetchApplications = async() => {
        try{
            const response = await getAllApplications();
            console.log("Fetched Applications:", response);
            setApplications(response);
        } catch(error){
            console.error("Error fetching applications: ", error);
        }
    };

    const handleEditClick = (id) => {
        SetEditRowId(id);
        const application = applications.find((app) => app.id === id);
        SetEditedData(application);
    };

    const handleInputChange = (field,value) => {
        SetEditedData((prev) => ({ ...prev, [field]: field==="dateApplied"? value.split("T")[0] : value}));
    };

    const handleSaveClick = async() => {
        await updateApplication(editedData);
        fetchApplications();
        SetEditRowId(null);
    };

    const handleCreateApplication = async (e) => {
        e.preventDefault();
        try{
            await createApplication(newApplication);
            fetchApplications();
            setError("");
            clearApplication(newApplication);
        }
        catch(error){
            if(error.response && error.response.status === 409)
            {
                setError("A job applicaiton for this company and position already exists.");
                clearApplication(newApplication);
            }
            else
            {
                console.error("Error in adding new application: ", error);
                setError("An error occured while adding the applicaiton.");
                clearApplication(newApplication);
            }

            setTimeout(()=>{
                setError("");
            },3000);
        }
    };

    const handleDeleteApplication = async (id) => {
        try{
            await deleteApplication(id);
            fetchApplications();
            setError("");
        }
        catch(error){
            {
                console.error("Error in deleting the application: ", error);
                setError("An error occured while deleting the applicaiton.");
            }

            setTimeout(()=>{
                setError("");
            },3000);
        }
    };

    const formatDate = (date) => {
        return new Date(date.split("T")[0]).toLocaleDateString("en-NZ");
    };

    const clearApplication = (app) => {
        app.companyName = "";
        app.position = "";
    };

    const indexOfLastApp = currentPage * applicationsPerPage;
    const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
    const currentApplications = applications.slice(indexOfFirstApp,indexOfLastApp);
    const totalPages = Math.ceil(applications.length / applicationsPerPage);

  return (
    <div className='application-list-container'>
        <h2 className='table-heading'>Job Application Tracker</h2>


        
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date Applied</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentApplications.map((app) => (
                    <tr key={app.id}>
                        {editRowId === app.id ? (
                            <>
                                <td><input type="text" 
                                value={editedData.companyName}
                                onChange={(e)=> handleInputChange("companyName", e.target.value)}
                                />
                                </td>
                                <td>
                                    <input type="text" 
                                    value={editedData.position}
                                    onChange={(e)=> handleInputChange("position", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select value={editedData.status} onChange={(e) => handleInputChange("status",e.target.value)}>
                                        <option value="Applied">Applied</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" 
                                    value={editedData.dateApplied}
                                    onChange={(e)=> handleInputChange("dateApplied", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleSaveClick()}>Save</button>
                                    <button onClick={()=> SetEditRowId(null)}>Cancel</button>
                                </td>
                            </>                    
                        ) : (
                            <>
                                <td onClick={()=> handleEditClick(app.id)}>{app.companyName}</td>
                                <td onClick={()=> handleEditClick(app.id)}>{app.position}</td>
                                <td onClick={()=> handleEditClick(app.id)}>{app.status}</td>
                                <td onClick={()=> handleEditClick(app.id)}>{formatDate(app.dateApplied)}</td>
                                <td>
                                    <button onClick={() => handleEditClick(app.id)}>Edit</button>
                                    <button onClick={() => handleDeleteApplication(app.id)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="form-container">
            <form onSubmit={handleCreateApplication}>
                <input 
                    type='text'
                    placeholder='Company Name'
                    value={newApplication.companyName}
                    onChange={(e) => setNewApplication({...newApplication, companyName: e.target.value})}
                    required
                />

                <input 
                    type='text'
                    placeholder='Position'
                    value={newApplication.position}
                    onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                    required
                />
                <button type='submit'> Add Application</button>
            </form>
        </div>

        <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages || 1} </span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
        </div>

        {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default JobApplicationList