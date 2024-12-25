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

export const getUserLoginHistory = async (id) => {
    try {
        const response = await API.get(`/login-history/${id}`);
        console.log(response.data.data);
        if (response.status === 200) {
            return { status: true, data: response.data.data };
          } else {
            return { status: false, message: response.data.message };
          }
    } catch (error) {
        console.error('Error fetching user login history:', error);
        return { status: false, message: error.message };
    }
}


export const addUser = async (data) => {
    try {
      const response = await API.post(`/registerUser`, data);
      console.log('response', response);
  
      if (response.status === 201) {
        toast.success(response.data.message);
        return { status: true, data: response.data.data };
      } else {
        // console.log('API error', response.response.data.message)
        toast.error(response.data.message);
        return {
          status: false,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error Add  Customer:", error);
      return { status: false, message: error.message };
    }
  };

  export const deleteUser = async (id) => {
    try {
      const response = await API.delete(`/${id}`);
      console.log(response);
      if (response.status === 200) {
        toast.success('User deleted successfully')
        return { status: true, data: response.data }
      } else {
        toast.error('User not deleted')
        return { status: false, message: response.response.data.message }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return { status: false, message: error.message };
    }
  };


  export const editUser = async (id, data) => {
    try {
      const response = await API.put(`/${id}`, data);
      console.log(response);
      if (response.status === 200) {
        toast.success('User updated successfully')
        return { status: true, data: response.data }
      } else {
        toast.error('User not updated')
        return { status: false, message: response.response.data.message }
      }
    } catch (error) {
      console.error("Error editing user:", error);
      return { status: false, message: error.message };
    }
  };
