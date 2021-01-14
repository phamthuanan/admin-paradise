import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ContactManager extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      messages : "",
      pagination: []
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
 
  render() {
    return (
      <section id="main-content">
        <ToastContainer/>
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <i className="fa fa-table" />Thông tin liên hệ
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách liên hệ</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" />Tên
                    </th>
                    <th>
                      <i className="icon_profile" />Email
                    </th>
                    <th>
                      <i className="icon_profile" />Điện thoại
                    </th>
                    <th>
                      <i className="icon_profile" />Lời nhắn
                    </th>
                    <th>
                      <i className="icon_cogs" />Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.contact.map((element, index) => {
                    
                    return (
                      <tr>
                        <td>{element.name_contact}</td>
                        <td>{element.phone_contact}</td>
                        <td>{element.email_contact}</td>
                        <td>{element.messages}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  email: element.email_contact,
                                  name: element.name_contact,
                                  messages: element.messages,
                                  phone: element.phone_contact,
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Chi chiết liên hệ</header>
              <div className="panel-body">
                <div className="form">
                  <div className="form-validate form-horizontal">
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Tên <span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Điện thoại<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.phone}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Email<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.email}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Lời nhắn <span className="required"></span>
                      </label>
                      <div className="col-lg-10">
                      <textarea
                          value={this.state.messages}
                          className="form-control"
                          id="subject"
                          name="subject"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default ContactManager;
