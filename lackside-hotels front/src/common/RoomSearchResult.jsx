import { useState } from "react";
import { Row, Button } from "react-bootstrap";
import RoomCard from "../room/RoomCard";
import RoomPaginator from "./RoomPaginator";

const RoomSearchResult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultPerPage = 3;
    const totalResult = results.length;

    const totalPages = Math.ceil(totalResult / resultPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;
    const paginatedResult = results.slice(startIndex, endIndex);

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className="text-center mt-5 mb-4">
                        Search Results
                    </h5>

                    <Row className="g-4 justify-content-center">
                        {paginatedResult.map((room) => (
                            <RoomCard key={room.roomId} room={room} />
                        ))}
                    </Row>

                    <div className="d-flex flex-column align-items-center mt-4">
                        {totalResult > resultPerPage && (
                            <RoomPaginator
                                currentpages={currentPage}
                                totalpages={totalPages}
                                onpagechange={handlePageChange}
                            />
                        )}

                        <Button
                            variant="outline-secondary"
                            className="mt-3"
                            onClick={onClearSearch}
                        >
                            Clear Search
                        </Button>
                    </div>
                </>
            ) : (
                <p className="text-center text-muted mt-4">
                    No rooms found for the selected criteria.
                </p>
            )}
        </>
    );
};

export default RoomSearchResult;
