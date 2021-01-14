import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/home/home";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";

class HomeContainer extends Component {
  async componentWillMount() { 
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
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Home />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
