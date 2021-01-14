import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class User extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imagePreviewUrl : null,
      user : null,
      img : "",
      file : null,
      id: null,
      noti: null,
      email: "",
      password: "",
      avatar : null,
      address: "",
      phone: "",
      currType: "add",
      role : null,
      isProvider : false,
      pagination: [],
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
    if (nextProps.user !== null) {
      this.setState({
        imagePreviewUrl: nextProps.user.avatar
      });
    }
    if (nextProps.isadd === false) {
      this.setState({
        noti: "Email already exist "
      });
      toast.error("Email đã tồn tại", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isadd === true) {
      this.reset();
    }
    if (nextProps.isupdate === false) {
      this.setState({
        noti: "Update fail"
      });
      toast.error("Cập nhật lỗi", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isupdate === true) {
      this.reset();
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
  isvalidEmail = email => {
    if (
      email.length < 6 ||
      email.indexOf(".") === -1 ||
      email.indexOf("@") === -1
    )
      return false;
    return true;
  };
  isvalidPhone = phone => {
    if (phone.length < 10) return false;
    for (let i = 0; i < phone.length; i++) {
      if (phone.charAt(i) < "0" || phone.charAt(i) > "9") return false;
    }
    return true;
  };

  addUser = () => {
    const {
      email,
      password,
      name,
      address,
      phone,
      file,
      role
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      toast.error("Email không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (password.length < 6) {
      this.setState({
        noti: "Password invalid"
      });
      toast.error("Mật khẩu không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (name.length < 3) {
      this.setState({
        noti: "Name invalid"
      });
      toast.error("Tên không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address.length < 3) {
      this.setState({
        noti: "Address invalid"
      });
      toast.error("Địa chỉ không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.isvalidPhone(phone)) {
      this.setState({
        noti: "Phone invalid"
      });
      toast.error("Số điện thoại không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null) {
      this.setState({
        noti: "file invalid"
      });
      toast.error("Avatar không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (role === null) {
      this.setState({
        noti: "Quyền invalid"
      });
      toast.error("Quyền không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addUser(
      email, password, name , file, address, phone, role
    );
  };
  updateUser = () => {
    const {
      email, name, avatar, address, phone, role, file
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      toast.error("Email không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (name.length < 3) {
      this.setState({
        noti: "Name invalid"
      });
      toast.error("Tên không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (address.length < 3) {
      this.setState({
        noti: "Address invalid"
      });
      toast.error("Địa chỉ không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.isvalidPhone(phone)) {
      this.setState({
        noti: "Phone invalid"
      });
      toast.error("Số điện thoại không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (avatar === "") {
      this.setState({
        noti: "avatar invalid"
      });
      toast.error("Avatar không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (role === null) {
      this.setState({
        noti: "Quyền invalid"
      });
      toast.error("Quyền không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateUser(
      email, name, avatar, address, phone, role,file
    );
  };
  renderBtn = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button onClick={() => this.addUser()} className="btn-custom">
              Thêm
            </button>
            <button disabled className="btn-custom">
              Cập nhật
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Làm mới
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              disabled
              onClick={() => this.addUser()}
              className="btn-custom"
            >
              Thêm
            </button>
            <button onClick={() => this.updateUser()} className="btn-custom">
              Cập nhật
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Làm mới
            </button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      name: "",
      id: null,
      noti: null,
      email: "",
      imagePreviewUrl : null,
      img : '',
      password: "",
      avatar : null,
      address: "",
      phone: "",
      currType: "add",
      role : null
    });
  };
  renderPassword = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Mật khẩu <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="password"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Mật Khẩu <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="password"
              required
            />
          </div>
        </div>
      );
    }
  };
  renderEmail = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Email <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Email <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    }
  };
  
  handleChangeImg = img => {
    if(img === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: img,
        img: reader.result
      });
    };
    reader.readAsDataURL(img);
  };
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
                <i className="fa fa-table" />Quản lý
              </li>
              <li>
                <i className="fa fa-th-list" />Quản lý tài khoản
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách tài khoản</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" />Email
                    </th>
                    <th>
                      <i className="icon_profile" />Tên
                    </th>
                    <th>
                      <i className="icon_profile" />Quyền
                    </th>
                    <th>
                      <i className="icon_profile" />Địa chỉ
                    </th>
                    <th>
                      <i className="icon_profile" />Số điện thoại
                    </th>
                    <th>
                      <i className="icon_cogs" />Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.user.map((element, index) => {
                    
                    return (
                      <tr>
                        <td>{element.email}</td>
                        <td>{element.name}</td>
                        <td>{element.role === 0 ? "Người dùng" :element.role === 1 ? "Nhà cung cấp" : "Nhà quản trị" }</td>
                        <td>{element.address}</td>
                        <td>{element.phone}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  email: element.email,
                                  name: element.name,
                                  avatar : element.avatar,
                                  address: element.address,
                                  phone: element.phone,
                                  password: element.password,
                                  role: element.role,
                                  img : "http://localhost:8080/avatar/" + element.avatar,
                                  isProvider :  element.role === 1 ? true : false,
                                  currType: "update"
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteUser(element.email)
                              }
                              className="btn btn-danger"
                            >
                              <i className="icon_close_alt2" />
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
              <header className="panel-heading">Form tùy chỉnh</header>
              <div className="panel-body">
                <div className="form">
                  <div className="form-validate form-horizontal">
                    {this.renderEmail()}
                    {this.renderPassword()}
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Tên <span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              name: e.target.value
                            });
                          }}
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Địa chỉ<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              address: e.target.value
                            });
                          }}
                          value={this.state.address}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Số điện thoại<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              phone: e.target.value
                            });
                          }}
                          value={this.state.phone}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <form>
                          <label class="radio-inline">
                            <input
                              checked={!this.state.isProvider}
                              onClick={() => this.setState({ role: 0 })}
                              type="radio"
                              name="optradio"
                            />Người dùng
                          </label>
                          <label class="radio-inline">
                            <input
                              checked={this.state.isProvider}
                              onClick={() => this.setState({ role: 1 })}
                              type="radio"
                              name="optradio"
                            />Nhà cung cấp dịch vụ
                          </label>
                        </form>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Tải file{" "}
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="ccomment"
                          name="comment"
                          required
                          onChange={e =>
                            this.handleChangeImg(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Ảnh đại diện
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.img}
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtn()}
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
export default User;
