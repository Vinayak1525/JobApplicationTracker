import axios from 'axios';
import React from 'react'

const API_URL = "http://localhost:5203/api/JobApplication";

export const getAllApplications = async () =>{
  try{
    const response = await axios.get(`${API_URL}/GetAll`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching all applications:", error);
    throw error;
  }
};


export const createApplication = async (application) => {
  try{
    const response = await axios.post(`${API_URL}/Create`,application);
    return response.data;
  } 
  catch(error)
  {
    if(error.response?.status===409)
    {
      console.error("Application already exists.")
      throw error;
    }
    else{
    console.error("Error creating application: ", error);
    throw error;
    }
  }
};


export const updateApplication = async (application) => {
  try{
    const response = await axios.put(`${API_URL}/Update/${application.id}`,application);
    return response.data;
  } catch(error){
    console.error("Error updating the application: ", error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try{
    const response = await axios.delete(`${API_URL}/Delete/${id}`);
    return response.data;
  } catch(error){
    console.error("Error deleting the application: ", error);
    throw error;
  }
};
