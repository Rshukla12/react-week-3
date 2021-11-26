import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({maxPage, currentPage, pageHandler}) => {
    const pages = new Array(maxPage).fill(0).map((el, ind) => ind+1);

    return (
        <div className={style.main}>
            {pages.map(page=> (
                <div 
                    className={style.btn}
                    key={page}
                    onClick={ page===currentPage ? () => {} : () => pageHandler(page) }
                    style={{backgroundColor: page===currentPage ? "#c0c0c0" : "#1bafd0" }}
                >
                    { page===currentPage ? "Current" : page }
                </div>
            ))}
        </div>
    )
}

export default Pagination;