import React, { Component } from "react";
import "./App.css";
import Filters from "./components/filters/Filters/Filters";
import Grid from "./components/grid/grid/Grid";

class App extends Component {
  state = {
    data: {
      company: [],
      companyType: []
    },
    isActiv: true,
    companyType: "",
    search: null,
    searched: null,
    initFilter: false
  };
  componentDidMount() {
    this.fetchInitialData();

  }
  componentDidUpdate(prevProps, prevState) {
    console.log("CDU");
    // console.log(prevState.search);
    if (
      this.state.search &&
      ((!this.state.search && prevState.search) ||
        prevState.search !== this.state.search)
    ) {
      this.fetchSearchData();
    }
    if (this.state.search === "" && prevState.search !== this.state.search) {
      this.setState({ searched: null });
    }
  }

  fetchInitialData = () => {
    const request = new Request(
      "https://my-json-server.typicode.com/HackSoftware/companies.db/db"
    );
    fetch(request)
      .then(response => response.json())
      .then(response => this.setState({ data: response },this.createOptionsForSelect))
      .catch(error => console.log(error));
  };
  fetchSearchData = () => {
    let baseUrl = `https://my-json-server.typicode.com/HackSoftware/companies.db/company?q=`;
    baseUrl += this.state.search;
    // console.log(baseUrl);
    const request = new Request(baseUrl);
    fetch(request)
      .then(response => response.json())
      .then(response => this.setState({ searched: response }))
      .catch(error => console.log(error));
  };

  filterData = () => {
    let filtered = [];
    if (!this.state.initFilter && this.state.searched&&this.state.search) {
      filtered = this.state.searched
    } else if (this.state.searched) {
      // console.log("In filter");
      filtered = this.state.searched
        .filter(x => x.type === this.state.companyType)
        .filter(y => y.active === this.state.isActiv);
    } else if (this.state.data.company) {
      filtered = this.state.data.company
        .filter(x => x.type === this.state.companyType)
        .filter(y => y.active === this.state.isActiv);
    }
    // console.log(filtered);
    return filtered;
  };
  //onClickHandlers
  //radio
  handleIsChecked = () => {
    this.setState({ isActiv: !this.state.isActiv, initFilter: true });
  };
  //dropdown
  handleSelectChange = event => {
    // console.log(event.target.value)
    if (event.target.value) {
      this.setState({
        companyType: event.target.value,
        initFilter: true
      });
    }else{
      this.setState({
        companyType: event.target.value,
        initFilter: false
    })
  }
  };
  //searchbar
  handleInputChange = event => {
    // console.log(event.target.value)
    this.setState({ search: event.target.value, initFilter: false,companyType:'' });
  };

  createOptionsForSelect=()=>{
    console.log(this.state.data.companyType);
    const options=this.state.data.companyType.map(x => x);
    const addedEmptyOption={id:0,title:''}
    const result=[
      addedEmptyOption,
      ...options
    ]
    return result;

  }

  render() {
    // let companies = this.createCompaniesList();
    let companyType = this.state.data.companyType;    
    let filteredArr = this.filterData();

    let grid = null;
    if (!this.state.search && !this.state.initFilter) {
      grid = <Grid data={this.state.data.company} />;
    } else if (filteredArr.length > 0) {
      grid = <Grid data={filteredArr} />;
    } else {
      grid = <Grid data={filteredArr} />;
    }
    return (
      <div className="App">
        <div>
          <Filters
            handleIsChecked={this.handleIsChecked}
            options={companyType}
            handleSelectChange={this.handleSelectChange}
            selectValue={this.state.companyType}
            checked={this.state.isActiv}
            handleInputChange={this.handleInputChange}
            search={this.state.search}
            searchedWord={this.state.search || ""}
          />
        </div>
        <div>{grid}</div>
      </div>
    );
  }
}

export default App;