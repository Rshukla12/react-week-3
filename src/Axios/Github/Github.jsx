import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const CreateCard = ({ name, img, link }) => {
    return (
        <div
            style={{
                display: "flex",
                gap: "2rem",
                padding: "1rem",
                border: "1px solid black"
            }}
        >
            <img src={img} style={{ width: "50px" }} alt={name} />
            <div>
                <div>{name}</div>
                <div>{link}</div>
            </div>
        </div>
    );
};

const Github = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [text, setText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [isError, setIsError] = useState(false);

    const handelPageChange = (value) => {
        setPage(value);
    };

    const getUser = ({ query, page = 1 }) => {
        query = query || "masai";
        axios.get(`https://api.github.com/search/users`, {params:{q:query, page:page}})
            .then((res) => {
                setData(res.data);
                setTotalPages(Math.ceil(res.data.total_count / 30));
            })
            .catch((err) => {
                setIsError(true);
                console.log(err)
            })
    };

    useEffect(() => {
       getUser({query, page})
       setIsLoading(false)
    }, [query, page]);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSearch = () => {
        if ( !text ) return;
        setIsLoading(true);
        setQuery(text);
        setTotalPages(0);
    }

    return (
        <div>
            <h1>Search Github</h1>
            <input type="text" value={text} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
            {isLoading ? (
                <div>Wait while, I search for this keyword</div>
            ) : isError ? <div>Something went wrong </div> : (
                <div style={{display: "flex", flexDirection:"column", gap:"1rem", width:"90%", margin:"auto", padding:"2rem 0rem"}}>
                    {data?.items?.map((el) => (
                        <CreateCard
                            key={el.id}
                            name={el.login}
                            link={el.url}
                            img={el.avatar_url}
                        />
                    ))}
                </div>
            )}
            <Pagination
                totalPages={totalPages}
                currentPage={page}
                onClickCallback={handelPageChange}
            />
        </div>
    );
}

export default Github;