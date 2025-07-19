

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination-nav">
            <ul className="pagination-ul">
                {pageNumbers.map((numbers) => (

                    <li key={numbers} className=" pagination-li">
                        <button onClick={() => paginate(numbers)} className={`pagination-button ${currentPage === numbers ? 'current-page' : ''}`}>
                            {numbers}
                        </button>
                    </li>

                ))
                }
            </ul>
        </div>
    );
}

export default Pagination;