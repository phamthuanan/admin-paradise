import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tourActions from "../actions/tour.action";
import LocationManager from "../components/locationManager/LocationManager";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class LocationManagerContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.tourActions.getLocation()
    this.props.tourActions.getProvince()
  let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
  }
  componentWillReceiveProps(nextProps) {
   if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.tourActions.getLocation();
    }
  }
  render() {
    
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <LocationManager
          location={this.props.location}
          province = {this.props.province}
          deleteLocation = {(id) => this.props.tourActions.deleteLocation(id)}
          isadd={this.props.isadd}
          addLocation = {(name, id ) => this.props.tourActions.addLocation(name, id)}
          updatePublisher={(id, name) =>
            this.props.tourActions.updateLocation(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.tourActions.locationBackPage()}
          nextPage={() => this.props.tourActions.locationNextPage()}
          setPage={page => this.props.tourActions.locationSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  location: state.tourReducers.location.data,
  province :  state.tourReducers.province.data,
  isadd: state.tourReducers.location.isadd,
  isupdate: state.tourReducers.location.isupdate,
  totalpage: state.tourReducers.location.totalpage,
  page: state.tourReducers.location.page,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    tourActions: bindActionCreators(tourActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationManagerContainer);
