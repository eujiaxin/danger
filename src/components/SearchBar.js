const SearchBar = (props) => {
    const searchHandler = (event) => {
        const filteredAccounts = props.accounts.filter((e) =>
            e.website.toLowerCase().includes(event.target.value.toLowerCase())
        );

        props.setFilteredAccounts(filteredAccounts);
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
