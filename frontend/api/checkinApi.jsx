import  axiosInstance  from "./api"

export const checkInToday = async (challengeid, photo, comment) => {
  const formData = new FormData();
  if (photo) formData.append('photo', photo);
  if (comment) formData.append('comment', comment);

  try {
    const { data } = await axiosInstance.post(
      `/checkin/${challengeid}`,  // Fixed URL - no duplicate /api
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return { success: true, data };
  } catch (error) {
    console.error("Check-in error:", error);
    return { 
      success: false, 
      error: error.response?.data?.error || "Check-in failed" 
    };
  }
};