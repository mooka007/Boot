import axios from "axios";

export async function getData(url) {
  try {
    // const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
// getData("https://jsonplaceholder.typicode.com/posts");
