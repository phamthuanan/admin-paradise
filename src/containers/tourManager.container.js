import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios'
import * as tourActions from "../actions/tour.action";
import TourManager from "../components/tourManager/TourManager";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import * as providerActions from "../actions/provider.action"
import storeConfig from '../config/store.config'

class TourManagerContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    let result
      try {
          result =  await axios.get("http://localhost:8080/provider/getproviderId/" + storeConfig.getUser().id )
      } catch (error) {
          console.log(error)
          return
      }
    this.props.tourActions.getCategory()
    this.props.tourActions.getAllLocation()
    if(storeConfig.getUser().role === 1){
      this.props.tourActions.getTourByProvider(result.data.id)
    }
    else{
      this.props.tourActions.getTour()
    }
    
    this.props.providerActions.getAllProvider()
  let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
  }
  async componentWillReceiveProps(nextProps) {
   if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    let result
      try {
          result =  await axios.get("http://localhost:8080/provider/getproviderId/" + storeConfig.getUser().id )
      } catch (error) {
          console.log(error)
          return
      }
    if (nextProps.page !== this.props.page) {
      if(storeConfig.getUser().role === 1){
        this.props.tourActions.getTourByProvider.getUser(result.data.id)
      }
      else{
        this.props.tourActions.getTour()
      }
    }
  }
  render() {
    
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <TourManager
          location={this.props.alllocation}
          tour = {this.props.tour}
          provider = { this.props.provider}
          categoryTour =  {this.props.categoryTour}
          deleteTour = {(id) => this.props.tourActions.deleteTour(id)}
          isadd = {this.props.isadd}
          addTour = {(
            name_tour, price, time_start, time_end, description, id_discount, capacity,
            provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3 ) => 
            this.props.tourActions.addTour(
                name_tour, price, time_start, time_end, description, id_discount, capacity,
                provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3)}
            updateTour = {(
               id, name_tour, price, time_start, time_end, description, id_discount, capacity,
                provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
            ) =>
            this.props.tourActions.updateTour(
               id, name_tour, price, time_start, time_end, description, id_discount, capacity,
                provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
            )
          }
          isupdate = {this.props.isupdate}
          page = {this.props.page}
          totalpage = {this.props.totalpage}
          backPage = {() => this.props.tourActions.tourBackPage()}
          nextPage={() => this.props.tourActions.tourNextPage()}
          setPage={page => this.props.tourActions.tourSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  alllocation: state.tourReducers.location.allLocation,
  tour :  state.tourReducers.tour.data,
  isadd: state.tourReducers.tour.isadd,
  isupdate: state.tourReducers.tour.isupdate,
  totalpage: state.tourReducers.tour.totalpage,
  page: state.tourReducers.tour.page,
  provider : state.providerReducers.allProvider.data,
  categoryTour : state.tourReducers.categoryTour.data,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    tourActions: bindActionCreators(tourActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    providerActions : bindActionCreators(providerActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourManagerContainer);
