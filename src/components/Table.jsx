import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Ganti dengan URL API kamu
    const fetchData = async () => {
      try {
        // console.log("Fetching data....");
        const response = await fetch("http://localhost:3000/users"); // Ganti dengan URL API kamu
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log("data fetched succesfully", data);
        setData(data[1].transactions);
        setLoading(false);
      } catch (error) {
        console.error("fetch error");
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredData = data
    .filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container p-4 ">
      <div className="flex justify-center mb-4 bg-white">
        <input
          type="text"
          className="text-black p-2 rounded mr-2 bg-white border-none "
          placeholder="Search"
          onChange={handleSearch}
        />
        <select
          className="border p-2 rounded mr-2 bg-white text-black"
          onChange={handleRowsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <select
          className="border p-2 rounded mr-2 bg-white text-black"
          onChange={handleSortOrderChange}
        >
          <option value="asc">Sort by Date: Ascending</option>
          <option value="desc">Sort by Date: Descending</option>
        </select>
      </div>

      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date & Time</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">From/To</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                {new Date(item.date).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.fromTo}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage} of{" "}
          {Math.ceil(filteredData.length / rowsPerPage)} pages
        </div>
        <div className="bg-white">
          <button
            className="border p-2 rounded mr-2 bg-white"
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            className="border p-2 rounded mr-2 bg-white"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          >
            Previous
          </button>
          <button
            className="border p-2 rounded mr-2 bg-white"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
          <button
            className="border p-2 rounded bg-white"
            onClick={() =>
              setCurrentPage(Math.ceil(filteredData.length / rowsPerPage))
            }
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
