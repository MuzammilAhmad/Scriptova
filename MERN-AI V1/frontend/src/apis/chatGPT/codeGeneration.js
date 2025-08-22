import axios from "axios";

export const generateCodeAPI = async (
  userPrompt
  //   language,
  //   framework
) => {
  const response = await axios.post(
    "http://localhost:8090/api/v1/openai/generate-code",
    {
      prompt: userPrompt,
      //   language,
      //   framework,
    },
    { withCredentials: true }
  );
  return response?.data;
};
