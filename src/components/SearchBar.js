const SearchBar = (props) => {
    const searchHandler = (event) => {
        props.setSearchInput(event.target.value);
    };

    return (
        <div className="main">
            <input
                type="text"
                className="p-2 m-5 w-3/4 border border-slate-400 bg-slate-900 focus:bg-slate-800 focus:outline-none"
                placeholder="Search by website..."
                onChange={searchHandler}
            />
        </div>
    );
};

export default SearchBar;
