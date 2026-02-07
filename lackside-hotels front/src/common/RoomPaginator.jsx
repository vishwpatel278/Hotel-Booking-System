const RoomPaginator = ({ currentpages, totalpages, onpagechange }) => {
    const pageNumbers = Array.from({ length: totalpages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center room-pagination">
                {pageNumbers.map((pagenumber) => (
                    <li
                        key={pagenumber}
                        className={`page-item ${
                            currentpages === pagenumber ? "active" : ""
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onpagechange(pagenumber)}
                        >
                            {pagenumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default RoomPaginator;
