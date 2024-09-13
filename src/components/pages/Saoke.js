import React, { useState } from "react";
import data from "./Saoke2.json";

const Saoke = () => {
  const [transactions, setTransactions] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  // Hàm chuyển đổi định dạng số từ chuỗi
  const convertToNumber = (amountString) => {
    const cleanedString = amountString.replace(/\./g, ""); // Loại bỏ dấu chấm
    return parseFloat(cleanedString);
  };
  // Hàm sắp xếp theo A-Z hoặc Z-A cho cột date
  const sortByDate = (order) => {
    const sorted = [...transactions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTransactions(sorted);
  };

  // Hàm sắp xếp theo A-Z hoặc Z-A cho cột amount
  const sortByAmount = (order) => {
    const sorted = [...transactions].sort((a, b) => {
      const amountA = convertToNumber(a.amount);
      const amountB = convertToNumber(b.amount);
      return order === "asc" ? amountA - amountB : amountB - amountA;
    });
    setTransactions(sorted);
  };

  // Hàm tìm kiếm trong cột notes
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };

  // Dữ liệu sau khi tìm kiếm
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.notes.toLowerCase().includes(searchTerm) ||
      transaction.name.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.stt.toString().includes(searchTerm) ||
      transaction.date.toString().includes(searchTerm)
  );
  // Tính toán số trang
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Lấy dữ liệu của trang hiện tại
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chuyển trang
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tạo số trang hiển thị linh hoạt
  const getPaginationGroup = () => {
    const maxPagesToShow = 5; // Số trang muốn hiển thị tối đa
    let start = Math.max(1, currentPage - 2); // Hiển thị các trang lân cận trang hiện tại
    let end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="p-4">
      <h2 className="md:text-2xl text-sm font-bold mb-4">
        Thông tin số tiền ủng hộ qua số tài khoản VietinBank CT1111 -
        111602391111 từ ngày 10 đến 12.9.2024
      </h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Search by Id, Date, Name, Amount, Notes"
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />

      {/* Nút sắp xếp */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => sortByDate("asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort Date A-Z
        </button>
        <button
          onClick={() => sortByDate("desc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort Date Z-A
        </button>
        <button
          onClick={() => sortByAmount("asc")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sort Amount A-Z
        </button>
        <button
          onClick={() => sortByAmount("desc")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sort Amount Z-A
        </button>
      </div>

      {/* Bảng hiển thị dữ liệu */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-xs md:text-sm lg:text-base">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 whitespace-nowrap">
                Id
              </th>
              <th className="border border-gray-300 p-2 whitespace-nowrap">
                Date
              </th>
              <th className="border border-gray-300 p-2">Name</th>

              <th className="border border-gray-300 p-2 whitespace-nowrap">
                Amount
              </th>
              <th className="border border-gray-300 p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className="odd:bg-gray-100">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {transaction.stt}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {transaction.date}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {transaction.name}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {transaction.amount} ₫
                </td>
                <td className="border border-gray-300 p-2 break-words">
                  {transaction.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Điều khiển pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {/* Nút chuyển về trang 1 */}
        {currentPage > 1 && (
          <button
            onClick={() => changePage(1)}
            className="md:text-base text-xxs md:px-4 px-2 md:py-2 py-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            {`<<`}
          </button>
        )}

        {/* Hiển thị dấu ... nếu không phải là trang đầu tiên */}
        {currentPage > 2 && (
          <span className="md:px-2 px-1 md:py-2 py-1">...</span>
        )}

        {/* Các nút giữa */}
        {getPaginationGroup().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            disabled={currentPage === pageNumber}
            className={`md:px-4 px-2 md:py-2 py-1 rounded md:text-base text-xxs ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Hiển thị dấu ... nếu chưa đến trang cuối */}
        {currentPage < totalPages - 5 && (
          <span className="md:px-2 px-1 md:py-2 py-1">...</span>
        )}

        {/* Nút chuyển về trang cuối */}
        {currentPage < totalPages && (
          <button
            onClick={() => changePage(totalPages)}
            className="md:px-4 px-2 md:py-2 py-1 rounded md:text-base text-xxs bg-gray-300 hover:bg-gray-400"
          >
            {`>>`}
          </button>
        )}
      </div>
    </div>
  );
};
export default Saoke;
