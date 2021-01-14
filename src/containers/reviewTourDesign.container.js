import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import storeConfig from '../config/store.config'
import * as tourActions from "../actions/tour.action";
import ReviewTourDesign from "../components/reviewTourDesign/ReviewTourDesign";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import axios from "axios";
class BookContainer extends Component {
  async componentWillMount() {
      let result
      try {
          result =  await axios.get("http://localhost:8080/provider/getproviderId/" + storeConfig.getUser().id )
      } catch (error) {
          console.log(error)
          return
      }
    this.props.tourActions.getTourDesign(result.data.id);
    this.props.tourActions.getProvince()
    this.props.tourActions.getAllLocation()
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.tourActions.getTourDesign(storeConfig.getUser().id)
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <ReviewTourDesign
          tourDesign = {this.props.tourDesign}
          province = {this.props.province}
          location = {this.props.location}
          totalpage={this.props.totalpage}
          page = {this.props.page}
          rejectTourDesign = {id => this.props.tourActions.rejectTourDesign(id)}
          backPage = {() => this.props.tourActions.tourDesignBackPage()}
          nextPage = {() => this.props.tourActions.tourDesignNextPage()}
          setPage = {page => this.props.tourActions.tourDesignSetPage(page)}
          isAccept = {this.props.isAccept}
          acceptTourDesign = {(
            id, user_id, name_tour, provider_id,description, 
            time_start, time_end, price, place_depart, messages, route
          ) =>
            this.props.tourActions.acceptTourDesign(
                id, user_id, name_tour, provider_id,description, 
                time_start, time_end, price, place_depart, messages, route
            )
          }
          rejectTourDesign = {(id, provider_id) =>
            this.props.tourActions.rejectTourDesign(id, provider_id)
          }
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  tourDesign: state.tourReducers.tourDesign.data,
  province :  state.tourReducers.province.data,
  location : state.tourReducers.location.allLocation,
  totalpage: state.tourReducers.tourDesign.totalpage,
  page: state.tourReducers.tourDesign.page,
  isAccept: state.tourReducers.tourDesign.isAccept,
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
)(BookContainer);
