import { useState } from "react";
import { DateRangePicker } from "react-date-range";

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    });

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
        onDateChange(ranges.selection.startDate, ranges.selection.endDate);
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
    };

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        });
        onDateChange(null, null);
        onFilterChange(null, null);
    };

    return (
        <div className="card shadow-sm p-3 date-slider-card">
            <h5 className="text-center mb-3">Filter Bookings by Date</h5>

            <div className="d-flex justify-content-center mb-3">
                <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handleSelect}
                />
            </div>

            <div className="text-center">
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleClearFilter}
                >
                    Clear Filter
                </button>
            </div>
        </div>
    );
};

export default DateSlider;
