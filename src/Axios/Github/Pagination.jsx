const Pagination = ({ totalPages, currentPage, onClickCallback }) => {
    if ( totalPages === 0 ) return null;
    const pages = new Array(totalPages).fill(0).map((a, i) =>
        i + 1 === currentPage ? (
            <button disabled style={{ background: "olive" }} key={i}>
                {i + 1}
            </button>
        ) : (
            <button onClick={() => onClickCallback(i + 1)} key={i}>
                {i + 1}
            </button>
        )
    );
    return <div style={{ display: "flex", gap: "1rem", width: "40%", margin:"0rem auto 2rem" }}>{pages}</div>;
};

export default Pagination;