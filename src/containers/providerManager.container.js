import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user.action";
import * as providerActions from "../actions/provider.action";
import ProviderManager from "../components/providerManager/ProviderManager";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";

class ProviderManagerContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.providerActions.getProvider();
    this.props.providerActions.getUserProvider()
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
      this.props.providerActions.getProvider();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <ProviderManager
          provider = {this.props.provider}
          userProvider = {this.props.userProvider}
          isadd = {this.props.isadd}
          isupdate = {this.props.isupdate}
          page = {this.props.page}
          totalpage = {this.props.totalpage}
          backPage = {() => this.props.providerActions.backPage()}
          nextPage = {() => this.props.providerActions.nextPage()}
          setPage = {page => this.props.providerActions.setPage(page)}
          updateProvider = {(
            name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files, images
          ) =>
            this.props.providerActions.updateProvider(
              name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files, images
            )
          }
          deleteProvider = {id => this.props.providerActions.deleteProvider(id)}
          addProvider = {(
            name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files
          ) =>
            this.props.providerActions.addProvider(
              name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files
            )
          }
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  provider: state.providerReducers.provider.data,
  userProvider : state.providerReducers.provider.userisprovider,
  isadd: state.providerReducers.provider.isadd,
  isupdate: state.providerReducers.provider.isupdate,
  totalpage: state.providerReducers.provider.totalpage,
  page: state.providerReducers.provider.page,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    providerActions : bindActionCreators(providerActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderManagerContainer);
