import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({linkHeaders, pageHandler}) => {
    const pages = ["prev", "next"];
    return (
        <div className={style.main}>
            {pages.map((page, ind)=> (
                <div 
                    className={style.btn}
                    key={101+ind}
                    onClick={ linkHeaders[page] ? () => pageHandler(page) : () => {} }
                    style={{backgroundColor: linkHeaders[page] ? "#1bafd0" : "#c0c0c0" }}
                >
                    { page }
                </div>
            ))}
        </div>
    )
}

export default Pagination;