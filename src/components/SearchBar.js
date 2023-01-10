const SearchBar = (props) => {
    const searchHandler = (event) => {
        props.setSearchInput(event.target.value);
    };

    return (
        <div className="container mx-auto p-5 flex justify-center">
            <input
                type="text"
                className="p-3 lg:w-3/4 w-full border-slate-400 bg-slate-800  focus:bg-slate-700 focus:outline-none"
                placeholder="Search by website..."
                onChange={searchHandler}
            />
        </div>
    );
};

export default SearchBar;
