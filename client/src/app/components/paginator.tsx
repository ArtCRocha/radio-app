import React, { useEffect, useState } from "react";
import { PaginatorProps } from "../types/paginator";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages?.push(i);
    }
    setPageNumbers(pages);
  }, [totalPages]);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 ml-0 bg-white ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            <IoIosArrowBack color="#545454" size={15} />
          </button>
        </li>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-2 text-gray-400 bg-white hover:text-blue-500 ${
                number === currentPage ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 lbg-white ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
          >
            <IoIosArrowForward color="#545454" size={15} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
