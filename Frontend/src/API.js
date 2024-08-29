// API.js
import axios from "axios";

const API_BASE_URL = "https://api.videosdk.live/v1";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwZDE3M2E0Zi0yMDQ2LTQ4MTMtOTRkOC02YTU1YmEzYmVlZDYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNDkzMDc0NiwiZXhwIjoxNzI1NTM1NTQ2fQ.C0cxF72ru24GOSJfyDaIKcc4-g9hDEWOHtnhknWTIVYeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyNTNiNjNmNy01NDNjLTRiYjUtOTI4Ni03MDA4NzU4ZDNlYjgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNDkzMTIyNCwiZXhwIjoxNzI1NTM2MDI0fQ.5kbgYCgGB-N0wi-JORsdL9eAr_dU0B9YwLjo90j4ZrA";

export const createMeeting = async () => {
  try {
    console.log("Sending request to create a meeting...");
    const response = await axios.post(
      `${API_BASE_URL}/meetings`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Meeting created successfully:", response.data);
    return response.data.meetingId;
  } catch (error) {
    console.error(
      "Error creating meeting:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { authToken };
