import axios from "axios";

export const saveInDb = async (fileBlob, token) => {
    try {
       let formData = new FormData();
        const file = {
          ...fileBlob,
          _id:
            "id-" +
            Math.random().toString(36).substr(2, 9) +
            "-" +
            Date.now().toString(36),
        };
       formData.append('file', file);
        const result = await axios.post(
          `${process.env.REACT_APP_URL}/api/files/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}