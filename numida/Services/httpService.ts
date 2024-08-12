import axios from "axios";
import { API_URL } from "../env.json";
export const postRequest = async (
  url: string,
  rawData: Record<string, any>
) => {
  const { data } = await axios.post(`${API_URL}/${url}`, rawData);

  return data;
};
