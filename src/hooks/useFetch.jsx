import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export function useFetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Userdata = localStorage.getItem("login");
    if (Userdata) {
      navigate("/dashboard");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/users"); // Ganti dengan URL API kamu
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          setData(data);
          setLoading(false);
        } catch (error) {
          console.error("fetch error");
          setError(error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [1]);
  console.log(data);
}
