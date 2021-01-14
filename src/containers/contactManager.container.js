import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user.action";
import * as contactActions from "../actions/contact.action"
import ContactManager from "../components/contactManager/contactManager";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";

class ContactManagerContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.contactActions.getContact();
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
        this.props.contactActions.getContact();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <ContactManager
          contact={this.props.contact}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.contactActions.backPage()}
          nextPage={() => this.props.contactActions.nextPage()}
          setPage={page => this.props.contactActions.setPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  contact :  state.contactReducers.contact.data,
  totalpage: state.contactReducers.contact.totalpage,
  page: state.contactReducers.contact.page,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    contactActions : bindActionCreators(contactActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactManagerContainer);
