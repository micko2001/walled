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
    <div className="p-4 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 ">
        {/* Search Input */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 text-sm focus:ring focus:ring-blue-300 bg-white"
          />
        </div>
        {/* Dropdown - Show */}
        <div className="flex items-center gap-2">
          <label htmlFor="show" className="text-sm font-medium bg-white">
            Show
          </label>
          <select
            id="show"
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-300 bg-white"
          >
            <option>Last 10 transactions</option>
            <option>Last 20 transactions</option>
            <option>Last 50 transactions</option>
          </select>
        </div>

        {/* Dropdown - Sort by */}
        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="text-sm font-medium bg-white">
            Sort by
          </label>
          <select
            id="sortBy"
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-300 bg-white"
          >
            <option>Date</option>
            <option>Type</option>
            <option>Amount</option>
          </select>
        </div>

        {/* Dropdown - Order */}
        <div className="flex items-center gap-2 bg-white">
          <select
            id="order"
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-300 bg-white"
          >
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Date & Time
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                From / To
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Description
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {item.date}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.type}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.fromTo}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.description}
                </td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    item.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.amount < 0
                    ? `- ${Math.abs(item.amount).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`
                    : `+ ${item.amount.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
