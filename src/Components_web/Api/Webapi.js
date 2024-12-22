import API from "./Api";
export const getWebHome = async () => {
    try {
        const response = await API.get(`/`);
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching web home:", error);
        return { status: false, message: error.message };
    }
}