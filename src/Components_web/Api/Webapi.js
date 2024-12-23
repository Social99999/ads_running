import API from "./Api";
import { toast } from "react-toastify";

export const getWebHome = async () => {
    try {
        const response = await API.get(`/ads`);
        console.log(response);
        
        if (response.status === 200) {
            return { status: true, data: response.data };
          } else {
            return { status: false, message: response.data.message };
          }
    } catch (error) {
        console.error("Error fetching web home:", error);
        return { status: false, message: error.message };
    }
}

export const login = async (values) => {
    try {
        console.log(values);
        const response = await API.post(`/loginUser`, values);
        console.log(response.data);
        if (response.status === 200) {
            return { status: true, data: response.data };
          } else {
            return { status: false, message: response.data.message };
          }
    } catch (error) {
        console.error("Error fetching web home:", error);
        return { status: false, message: error.message };
    }
}

export const addAds = async (data) => {
    try {
        console.log(data);
        
        const response = await API.post(`/ads`, data);
        console.log(response);
        
        if (response.status === 201) {
            toast.success('Ads added successfully')
            return { status: true, data: response.data }
        } else {
            toast.error('Ads not added')
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error adding ads:', error);
        return { status: false, message: error.message };
    }
}

export const getAds = async () => {
    try {
        const response = await API.get(`/ads`);
        console.log(response);
        
        if (response.status === 200) {
            return { status: true, data: response.data };
          } else {
            return { status: false, message: response.data.message };
          }
    } catch (error) {
        console.error("Error fetching ads:", error);
        return { status: false, message: error.message };
    }
}

export const updateAd = async (id, data) => {
    try {
        console.log(data);
        
        const response = await API.put(`/ads/${id}`, data);
        console.log(response);
        
        if (response.status === 200) {
            toast.success('Ads updated successfully')
            return { status: true, data: response.data }
        } else {
            toast.error('Ads not updated')
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error updating ads:', error);
        return { status: false, message: error.message };
    }
}

export const deleteAd = async (id) => {
    try {
        const response = await API.delete(`/ads/${id}`);
        console.log(response);
        
        if (response.status === 200) {
            toast.success('Ads deleted successfully')
            return { status: true, data: response.data }
        } else {
            toast.error('Ads not deleted')
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error deleting ads:', error);
        return { status: false, message: error.message };
    }
}