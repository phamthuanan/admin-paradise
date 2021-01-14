import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
class LoccationManager extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      currname: null,
      name: null,
      provinceName : "Tỉnh / TP",
      provinceId: null,
      noti: null,
      currType: "add"
    };
  }
async  componentWillMount() {
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
    if (nextProps.isadd === false) {
      this.setState({
        noti: "Please Change name"
      });
      toast.error("Vui lòng nhập địa điểm mới", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isadd === true) {
      toast.success("Thêm địa điểm thành công", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      this.setState({
        name: "",
        provinceName : "Tỉnh / TP",
        provinceId: null,
        noti: null,
        currType: "add"
      });
    }
    if (nextProps.isupdate === false) {
      this.setState({
        noti: "update fail"
      });
      toast.error("Lỗi cập nhật", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isupdate === true) {
      toast.success("Cập nhật địa điểm thành công", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      this.setState({
        name: "",
        provinceName : "Tỉnh / TP",
        provinceId: null,
        noti: null,
        currType: "add"
      });
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
  renderBtn = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.props.addLocation(this.state.name, this.state.provinceId)}
              className="btn-custom"
            >
              Thêm
            </button>
            <button
              disabled
              onClick={() =>
                this.props.updateLocation(this.state.provinceId, this.state.name)
              }
              className="btn-custom"
            >
              Cập nhật
            </button>
            <button
              onClick={() => this.reset()}
              className="btn-custom"
            >
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
              onClick={() => this.props.addLocation(this.state.name, this.state.provinceId)}
              className="btn-custom"
            >
              Thêm
            </button>
            <button
              onClick={() =>
                this.props.updateLocation(this.state.provinceId, this.state.name)
              }
              className="btn-custom"
            >
              Cập nhật
            </button>
            <button
              onClick={() => this.reset()}
              className="btn-custom"
            >
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
        provinceName : "Tỉnh / TP",
        provinceId: null,
        noti: null,
        currType: "add"
      })
  }

  getNameProvinceByID = id => {
    for (let i = 0; i < this.props.province.length; i++) {
      if (id === this.props.province[i]._id) return this.props.province[i].name_province;
    }
  };

  renderMenuProvince = () => {
    if (this.props.province) {
      return this.props.province.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                provinceName: element.name_province,
                provinceId: element._id
              })
            }
          >
            <a>{element.name_province}</a>
          </li>
        );
      });
    } else {
      return null;
    }
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
                <i className="fa fa-th-list" />Quản lý địa điểm
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách địa điểm du lịch</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Địa điểm
                    </th>
                    <th>
                      <i className="icon_profile" /> Tỉnh / TP
                    </th>
                    <th>
                      <i className="icon_cogs" /> Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.location.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name_location}</td>
                        <td>{this.getNameProvinceByID(element.province_id)}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  currname: element.name,
                                  name: element.name_location,
                                  provinceName : this.getNameProvinceByID(element.province_id),
                                  provinceId : element.province_id,
                                  currType: "update"
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteLocation(element._id)
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
              <header className="panel-heading">Tùy chỉnh thông tin</header>
              <div className="panel-body">
                <div className="form">
                  <div className="form-validate form-horizontal">
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Địa điểm <span className="required">*</span>
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
                      <label for="comment " className="control-label col-lg-2">
                        Tỉnh / TP
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.provinceName} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu" style = {{ height : "300px", overflowY : "scroll"}}>
                          {this.renderMenuProvince()}
                        </ul>
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
export default LoccationManager;
