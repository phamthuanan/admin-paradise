import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ReviewTourDesign extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      curr: "",
      name_tour: "",
      time_start : null,
      time_end : null,
      place_depart : null,
      price: "",
      description: "",
      messages: "",
      tempRoute : [],
      route: [],
      date_happen : null,
      title : "",
      descriptionRoute : "",
      noti: "",
      id: null,
      user_id : "",
      provider_id : null,
      isCheckAccept : false
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
    if (nextProps.isAccept === true) {
      this.reset()
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
  invalidPrice = t => {
    var str = t.toString();
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == "+" || str.charAt(i) == "-") count++;
      else break;
    }
    str = str.substring(count, str.length);
    count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == ".") {
        count++;
      }
      if (str.charAt(i) < "0" || str.charAt(i) > "9") return false;
    }
    if (count > 1) return false;
    return !isNaN(Number.parseFloat(str));
  };
  submitAcceptTourDesign = () => {
    const {id, user_id, name_tour, provider_id,description, 
      time_start, time_end, price, place_depart, messages, route, tempRoute
    } = this.state;
    this.addInforRoute(tempRoute.length + 1)
    if (name_tour.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      toast.error("Tên Tour không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (user_id === "") {
      this.setState({
        noti: "userId invalid"
      });
      toast.error("User Id không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      toast.error("Giá không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (description === "") {
      this.setState({
        noti: "description invalid"
      });
      toast.error("Thông tin mô tả tour không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (messages === "") {
      this.setState({
        noti: "messages invalid"
      });
      toast.error("Lời nhắn không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }

    if (route.length === 0) {
      this.setState({
        noti: "route invalid"
      });
      toast.error("Lộ trình không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (place_depart === null) {
      this.setState({
        noti: "place depart invalid"
      });
      toast.error("Nơi khởi hành không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (time_start === null) {
      this.setState({
        noti: "time_start invalid"
      });
      toast.error("Thời gian khởi hành không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (time_end === "") {
      this.setState({
        noti: "time_end invalid"
      });
      toast.error("Thời gian kết thúc không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (id === null) {
      this.setState({
        noti: "id invalid"
      });
      toast.error("Id không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (provider_id === null) {
      this.setState({
        noti: "id invalid"
      });
      toast.error("Mã nhà cung cấp không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.acceptTourDesign(
      id, user_id, name_tour, provider_id,description, 
            time_start, time_end, price, place_depart, messages, route
    );
  };
  submitRejectTourDesign = () => {
    const {
      id, provider_id
    } = this.state;
    if (id === null) {
      this.setState({
        noti: "id invalid"
      });
      toast.error("Id không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (provider_id === null) {
      this.setState({
        noti: "id invalid"
      });
      toast.error("Mã nhà cung cấp không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.rejectTourDesign(
      id,
      provider_id
    );
  };
  renderBtnSubmit = () => {
    if (this.state.curr === "accept") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAcceptTourDesign()}
              className="btn-custom"
              type="submit"
            >
              Duyệt
            </button>
            <button 
              className="btn-custom" 
              type="button"
              onClick={() => this.submitRejectTourDesign()}
            >
              Từ chối
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Làm mới</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn-custom" disabled type="submit">
              Duyệt
            </button>
            <button
              className="btn-custom"
              type="button" disabled
            >
              Từ chối
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Làm mới</button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      curr: "",
      name_tour: "",
      time_start : null,
      time_end : null,
      place_depart : "",
      price: "",
      description: "",
      messages: "",
      tempRoute : [],
      route: [],
      date_happen : null,
      title : "",
      descriptionRoute : "",
      noti: "",
      id: null,
      user_id : "",
      provider_id : null,
      isCheckAccept : false
    })
  }

  getNameProvinceByID = id => {
    for (let i = 0; i < this.props.province.length; i++) {
      if (id === this.props.province[i]._id) return this.props.province[i].name_province;
    }
  };

  getNameLocationByID = id => {
    for (let i = 0; i < this.props.location.length; i++) {
      if (id === this.props.location[i]._id) return this.props.location[i].name_location;
    }
  };

  addInforRoute = (index) =>{
    if(this.state.date_happen !== null && this.state.title !== "" && this.state.descriptionRoute !== "") {
      console.log('hello')
    let infor = {
      ...this.state.tempRoute[index - 1],
      "date_happen" : this.state.date_happen,
      "title" : this.state.title,
      "description" : this.state.descriptionRoute
    }
    let newRoute = [
      ...this.state.route,
      infor
    ]
    this.setState({route : newRoute})
    }
    console.log(this.state)
    
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
                <i className="fa fa-table" />Duyệt tour
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách tour được yêu cầu thiết kế</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Tên tour
                    </th>
                    <th>
                      <i className="icon_calendar" /> Ngày
                    </th>
                    <th>
                      <i className="icon_mail_alt" /> Mã khách hàng
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Lộ trình
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Trạng thái
                    </th>
                    <th>
                      <i className="icon_cogs" /> Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.tourDesign.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name_tour}</td>
                        <td>{new Date(element.time_start).getDate() + "/" + (new Date(element.time_start).getMonth() + 1) + "/" + new Date(element.time_start).getFullYear() + " - " + 
                        new Date(element.time_end).getDate() + "/" + (new Date(element.time_end).getMonth() + 1) + "/" + new Date(element.time_end).getFullYear()
                        }</td>
                        <td>{element.user_id}</td>
                        <td>
                          <select>
                            <option
                              value=""
                              disabled
                              selected
                              style={{ display: "none" }}
                            >
                              Lộ trình
                            </option>
                            {element.route.map((item, index) => {
                              return (
                                  <option>
                                      {"Ngày " + ++index + " " + this.getNameLocationByID(item.location_id) }
                                  </option>
                              )
                            })}
                          </select>
                        </td>
                        <td>{element.status ? "Đã duyệt" : "Chưa duyệt" }</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  curr: "accept",
                                  name_tour: element.name_tour,
                                  time_start: element.time_start,
                                  time_end: element.time_end,
                                  place_depart: element.place_depart,
                                  price: element.price,
                                  description: element.description,
                                  messages: element.messages,
                                  provider_id: element.provider_id,
                                  id: element._id,
                                  user_id: element.user_id,
                                  tempRoute : element.route
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
              <header className="panel-heading">Tùy chỉnh thông tin</header>
              <div className="panel-body">
                <div className="form" id="from-book">
                  <div
                    className="form-validate form-horizontal"
                    id="feedback_form"
                    method="get"
                    action=""
                  >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Tên tour <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.name_tour}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Mã khách hàng <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.user_id}
                          className="form-control "
                          id="cemail"
                          type="text"
                          name="email"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Ngày bắt đầu <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={new Date(this.state.time_start).getDate() + "/" + (new Date(this.state.time_start).getMonth() + 1) + "/" + new Date(this.state.time_start).getFullYear()}
                          className="form-control "
                          id="cemail"
                          type="text"
                          name="email"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Ngày kết thúc <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={ new Date(this.state.time_end).getDate() + "/" + (new Date(this.state.time_end).getMonth() + 1) + "/" + new Date(this.state.time_end).getFullYear()}
                          className="form-control "
                          id="cemail"
                          type="text"
                          name="email"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Nơi khởi hành
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.getNameProvinceByID(this.state.place_depart)}
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Mô tả <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                      <textarea
                          value={this.state.description}
                          onChange={e =>
                            this.setState({
                              description: e.target.value
                            })
                          }
                          className="form-control"
                          id="subject"
                          name="subject"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Lời nhắn <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                      <textarea
                          value={this.state.messages}
                          className="form-control"
                          id="subject"
                          name="subject"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Giá
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange = {(e) => this.setState({price : e.target.value})}
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                          value = {this.state.price}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Lộ trình
                      </label>
                      <div className="btn-group col-lg-10">
                        {this.state.tempRoute.map((item, index) => {
                          return(
                            <div>
                              <span>Ngày {index + 1} {this.getNameLocationByID(item.location_id)}</span>
                              <button type = "button" className = "btn-add-route" onClick = {() =>{
                                document.getElementById('infor-route' + index).style.display = "block"
                                this.addInforRoute(index)
                              } }> + Thêm thông tin</button>
                              
                              <div style = {{display : "none"}} id = {"infor-route" +index}  key = {index}>
                                <label for="departdate">Ngày diễn ra</label>
                                <DatePicker 
                                    selected={this.state.date_happen}
                                    onChange = {(date)=>{this.setState({date_happen: date})}}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    className="departhappen form-control input-infor-route-custom"
                                    id="departhappen"
                                />
                                  <input
                                    placeholder = "Nhập tiêu đề của địa điểm"
                                    className="form-control input-infor-route-custom"
                                    onChange = {(e) => this.setState({title : e.target.value})}
                                    id="curl"
                                    type="text"
                                    name="url"
                                  />
                                  <input
                                    placeholder = "Mô tả về lịch trình tại địa điểm"
                                    onChange = {(e) => this.setState({descriptionRoute : e.target.value})}
                                    className="form-control input-infor-route-custom"
                                    id="curl"
                                    type="text"
                                    name="url"
                                  />
                              </div>
                            </div>
                            
                          )
                        })}
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Xác nhận
                      </label>
                      <div className="col-lg-1">
                        <input
                          className="form-control "
                          id="curl"
                          type="checkbox"
                          name="url"
                          onClick = {() =>{
                            this.addInforRoute(this.state.tempRoute.length)
                            this.setState({isCheckAccept : true})
                          } }
                          checked = {this.state.isCheckAccept}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtnSubmit()}
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
export default ReviewTourDesign;
