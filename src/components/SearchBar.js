const SearchBar = (props) => {
    const searchHandler = (event) => {
        props.setSearchInput(event.target.value);
    };

    return (
        <div className="main">
            <input
                type="text"
                className="p-2 pr-28 m-5 border border-slate-400 bg-slate-900 focus:bg-slate-800"
                placeholder="Search..."
                onChange={searchHandler}
            />
        </div>
    );
};

export default SearchBar;
