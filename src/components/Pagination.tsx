import React from 'react'
interface paginationProps {
    currentPage: number,
    totalPage: number,
    handleNext: () => void,
    handlePrev: () => void
}
function Pagination({ currentPage, totalPage, handleNext, handlePrev }: paginationProps) {
    return (
        <div className="mt-8 flex items-center justify-center gap-4">
            {currentPage > 1 && (
                <button
                    onClick={() => handlePrev()}
                    className="rounded-xl bg-gray-200 px-4 py-2 text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-300 hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                    ← Prev
                </button>
            )}

            {currentPage < totalPage && (
                <button
                    onClick={() => handleNext()}
                    className="rounded-xl bg-gray-800 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-gray-700 hover:shadow-md focus:ring-2 focus:ring-gray-600 focus:outline-none"
                >
                    Next →
                </button>
            )}
        </div>
    )
}

export default Pagination