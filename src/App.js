import React, { Component } from "react";
import "./App.css";
// import axios from "axios";
import { connect } from "react-redux";
import Filters from "./components/filters/Filters/Filters";
import Grid from "./components/grid/grid/Grid";
import { isChecked, select, input } from "./store/actions/action_filters.js";
import { fetchInitialData,fetchSearchData,clearSearch } from "./store/actions/action_fetch.js";

class App extends Component {
  state = {
    // data: {
    //   company: [],
    //   companyType: []
    // },
    // options: [],
    // isActiv: true,
    // companyType: "",
    // search: null,
    searched: null
    // initFilter: false
  };
  componentDidMount() {
    // console.log('CDM:',this.props.filter)
    // console.log("CDM", this.props);
    this.props.fetchInitialData();
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("CDU", this.props);
    // console.log(prevState.search);
    // console.log('Prev Props',prevProps);
    // console.log('This.props',this.props);
    // console.log( (this.props.search &&!prevProps.search)||
    //   prevProps.search !== this.props.search)
   
    if (
      (this.props.search && !prevProps.search) ||
      // ((!prevProps.search && this.props.search) ||
      prevProps.search !== this.props.search
    ) {
      this.props.fetchSearchData(this.props.search);
    }
    if (this.props.search === "" && prevProps.search !== this.props.search) {
      // this.setState({ searched: null });
      this.props.clearSearch();
    }
  }

  // fetchInitialData = () => {
  //   // const request = new Request(
  //   //   "https://my-json-server.typicode.com/HackSoftware/companies.db/db"
  //   // );
  //   // fetch(request)
  //   //   .then(response => response.json())
  //   //   .then(response => this.setState({ data: response },this.createOptionsForSelect))
  //   //   .catch(error => console.log(error));

  //   axios
  //     .get("https://my-json-server.typicode.com/HackSoftware/companies.db/db")
  //     .then(response => {
  //       // console.log("Axios response.data: ", response.data);
  //       this.setState({ data: response.data }, this.createOptionsForSelect);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // fetchSearchData = () => {
  //   let baseUrl = `https://my-json-server.typicode.com/HackSoftware/companies.db/company?q=`;
  //   baseUrl += this.props.search;
  //   // console.log(baseUrl);
  //   // const request = new Request(baseUrl);
  //   // fetch(request)
  //   //   .then(response => response.json())
  //   //   .then(response => this.setState({ searched: response }))
  //   //   .catch(error => console.log(error));

  //   axios
  //     .get(baseUrl)
  //     .then(response => {
  //       this.setState({ searched: response.data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  filterData = () => {
    let filtered = [];
    // console.log('Filtered: ',this.props);
    // console.log(this.state.searched);
    if (!this.props.initFilter && this.props.searched && this.props.search) {
      filtered = this.props.searched;
    } else if (this.props.searched) {
      // console.log("In filter");
      filtered = this.props.searched
        .filter(x => x.type === this.props.companyType)
        .filter(y => y.active === this.props.isActiv);
    } else if (this.props.data.company) {
      filtered = this.props.data.company
        .filter(x => x.type === this.props.companyType)
        .filter(y => y.active === this.props.isActiv);
    }
    // console.log('Filtered: ',filtered);
    return filtered;
  };
  //onClickHandlers
  //radio
  // handleIsChecked = () => {
  //   this.setState({ isActiv: !this.state.isActiv, initFilter: true });
  // };
  //dropdown
  // handleSelectChange = event => {
  //   // console.log(event.target.value)
  //   if (event.target.value) {
  //     this.setState({
  //       companyType: event.target.value,
  //       initFilter: true
  //     });
  //   } else {
  //     this.setState({
  //       companyType: event.target.value,
  //       initFilter: false
  //     });
  //   }
  // };
  //searchbar
  // handleInputChange = event => {
  //   // console.log(event.target.value)
  //   this.setState({
  //     search: event.target.value,
  //     initFilter: false,
  //     companyType: ""
  //   });
  // };
 
  // createOptionsForSelect = () => {
  //   const options = this.props.data.companyType.map(x => x);
  //   const addedEmptyOption = { id: 0, title: "" };
  //   const result = [addedEmptyOption, ...options];
  //   // this.setState({ options: result });
  //   return result;
  // };

  render() {
    // let companies = this.createCompaniesList();
    let companyType = this.props.options;
    // console.log('RENDER: ', this.props)
    let filteredArr = this.filterData();
    // console.log(filteredArr)
    let grid = null;
    if (!this.props.search && !this.props.initFilter) {
      grid = <Grid data={this.props.data.company} />;
    } else if (filteredArr.length > 0) {
      grid = <Grid data={filteredArr} />;
    } else {
      grid = <Grid data={filteredArr} />;
    }
    return (
      <div className="App">
        <div>
          <Filters
            handleIsChecked={this.props.handleIsChecked}
            options={companyType}
            handleSelectChange={this.props.handleSelectChange}
            selectValue={this.props.companyType}
            checked={this.props.isActiv}
            handleInputChange={this.props.handleInputChange}
            search={this.props.search}
            searchedWord={this.props.search || ""}
          />
        </div>
        <div>{grid}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("State to props:", state.fetch);
  return {
    isActiv: state.filter.isActiv,
    initFilter: state.filter.initFilter,
    companyType: state.filter.companyType,
    search: state.filter.search,
    data: {
      company: state.fetch.data.company,
      companyType:state.fetch.data.companyType
    },
    options:state.fetch.options,
    searched:state.fetch.searched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //pass and execute action creators
    handleIsChecked: () => dispatch(isChecked()),
    handleSelectChange: event => dispatch(select(event)),
    handleInputChange: event => dispatch(input(event)),
    fetchInitialData: () => dispatch(fetchInitialData()),
    fetchSearchData:(s)=>dispatch(fetchSearchData(s)),
    clearSearch:()=>dispatch(clearSearch())
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
