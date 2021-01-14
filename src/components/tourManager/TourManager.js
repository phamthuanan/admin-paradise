import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
class TourManager extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      currname: null,
      name_tour: "",
      price : "",
      time_start : null,
      time_end : null,
      description : '',
      id_discount : false,
      capacity : 0,
      providerName : "Nhà cung cấp",
      provider_id: null,
      categoryName : 'Loại tour',
      category_tour_id : null,
      place_depart : 'Nơi khởi hành',
      route : [],
      arrayNewRoute : [],
      image_cover : null,
      img_cover : null,
     // img_slider : [],
      img_slider_1 : null,
      img_slider_2 : null,
      img_slider_3 : null,
      id : null,
      locationRoute : "",
      locationRouteId : "",
      datehappen :  null,
      titleRoute : "",
      descriptionRoute : "",
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
      toast.error("Vui lòng nhập tên tour mới", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isadd === true) {
      toast.success("Thêm tour thành công", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      this.setState({
        currname: null,
      name_tour: "",
      price : "",
      time_start : null,
      time_end : null,
      description : '',
      id_discount : false,
      capacity : 0,
      providerName : "Nhà cung cấp",
      provider_id: null,
      categoryName : 'Loại tour',
      category_tour_id : null,
      place_depart : 'Nơi khởi hành',
      route : [],
      arrayNewRoute : [],
      image_cover : null,
      img_cover : null,
      img_slider : [],
      id : null,
      locationRoute : "",
      locationRouteId : "",
      datehappen :  null,
      titleRoute : "",
      descriptionRoute : "",
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
      toast.success("Cập nhật tour thành công", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      this.setState({
        currname: null,
      name_tour: "",
      price : "",
      time_start : null,
      time_end : null,
      description : '',
      id_discount : false,
      capacity : 0,
      providerName : "Nhà cung cấp",
      provider_id: null,
      categoryName : 'Loại tour',
      category_tour_id : null,
      place_depart : 'Nơi khởi hành',
      route : [],
      arrayNewRoute : [],
      image_cover : null,
      img_cover : null,
      img_slider : [],
      id : null,
      locationRoute : "",
      locationRouteId : "",
      datehappen :  null,
      titleRoute : "",
      descriptionRoute : "",
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

  submitAddTour = () => {
    const {
        name_tour, price, time_start, time_end, description, id_discount, capacity,
        provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
    } = this.state;
   // this.addInforRoute(tempRoute.length + 1)
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
    if (id_discount === null) {
      this.setState({
        noti: "discount invalid"
      });
      toast.error("Chưa chọn giảm giá", {
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
    if (capacity === 0) {
      this.setState({
        noti: "capacity invalid"
      });
      toast.error("Số lượng không hợp lệ", {
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
    if (category_tour_id === null) {
      this.setState({
        noti: "category_tour_id invalid"
      });
      toast.error("Chưa chọn loại tour", {
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
    if (img_cover === null) {
        this.setState({
          noti: "img_cover invalid"
        });
        toast.error("Chưa chọn ảnh cover", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
      if (img_slider_1 === null) {
        this.setState({
          noti: "img_slider_1 invalid"
        });
        toast.error("Chưa chọn ảnh cho slider 1 ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
      if (img_slider_2 === null) {
        this.setState({
          noti: "img_slider_2 invalid"
        });
        toast.error("Chưa chọn ảnh cho slider 2 ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
      if (img_slider_3 === null) {
        this.setState({
          noti: "img_slider_3 invalid"
        });
        toast.error("Chưa chọn ảnh cho slider 3 ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
    this.props.addTour(
        name_tour, price, time_start, time_end, description, id_discount, capacity,
        provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
    );
  };

  submitUpdateTour = () => {
    const {
        id, name_tour, price, time_start, time_end, description, id_discount, capacity,
        provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
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
      if (id_discount === null) {
        this.setState({
          noti: "discount invalid"
        });
        toast.error("Chưa chọn giảm giá", {
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
      if (capacity === 0) {
        this.setState({
          noti: "capacity invalid"
        });
        toast.error("Số lượng không hợp lệ", {
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
      if (category_tour_id === null) {
        this.setState({
          noti: "category_tour_id invalid"
        });
        toast.error("Chưa chọn loại tour", {
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
      
    this.props.updateTour(
        id, name_tour, price, time_start, time_end, description, id_discount, capacity,
        provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3
    );
  };
  renderBtn = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddTour()}
              className="btn-custom"
            >
              Thêm
            </button>
            <button
              disabled
              onClick={() =>
                this.submitUpdateTour()
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
              onClick={() => this.submitAddTour()}
              className="btn-custom"
            >
              Thêm
            </button>
            <button
              onClick={() =>
                this.submitUpdateTour()
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
        currname: null,
        name_tour: "",
        price : "",
        time_start : null,
        time_end : null,
        description : '',
        id_discount : false,
        capacity : 0,
        providerName : "Nhà cung cấp",
        provider_id: null,
        categoryName : 'Loại tour',
        category_tour_id : null,
        place_depart : 'Nơi khởi hành',
        route : [],
        arrayNewRoute : [],
        image_cover : null,
        img_cover : null,
        img_slider : [],
        id : null,
        locationRoute : "",
        locationRouteId : "",
        datehappen :  null,
        titleRoute : "",
        descriptionRoute : "",
        noti: null,
        currType: "add"
      })
  }

  getNameCategoryByID = id => {
    for (let i = 0; i < this.props.categoryTour.length; i++) {
      if (id === this.props.categoryTour[i]._id) return this.props.categoryTour[i].name;
    }
  };

  getNameProviderByID = id => {
    for (let i = 0; i < this.props.provider.length; i++) {
      if (id === this.props.provider[i]._id) return this.props.provider[i].name;
    }
  };

  getNameLocationByID = id => {
    for (let i = 0; i < this.props.location.length; i++) {
      if (id === this.props.location[i]._id) return this.props.location[i].name_location;
    }
  };
  handleChangeImg = img => {
    if(img === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        img_cover: img,
        image_cover: reader.result
      });
    };
    reader.readAsDataURL(img);
  };
  renderMenuProvider = () => {
    if (this.props.provider) {
      return this.props.provider.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                providerName: element.name,
                provider_id: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  renderMenuPlaceDepart = () => {
    if (this.props.location) {
      return this.props.location.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                place_depart: element.name_location,
              })
            }
          >
            <a>{element.name_location}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  renderMenuLocation = () => {
    if (this.props.location) {
      return this.props.location.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                locationRoute: element.name_location,
                locationRouteId : element._id
              })
            }
          >
            <a>{element.name_location}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  renderMenuCategory = () => {
    if (this.props.categoryTour) {
      return this.props.categoryTour.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                categoryName: element.name,
                category_tour_id : element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  handleAddFormRoute = () => {

      this.setState({
        arrayNewRoute: [
        ...this.state.arrayNewRoute,
                "0"
        ]
      })
      if(this.state.arrayNewRoute.length > 0 ){
          this.handleAddRoute()
          console.log(this.state.arrayNewRoute)
      }
  }

  handleAddRoute = () => {
    
  let inforRoute = {
    location_id : this.state.locationRouteId,
    date_happen : this.state.datehappen,
    title : this.state.titleRoute,
    description :  this.state.descriptionRoute
  }

  this.setState({
      route : [
          ...this.state.route,
          inforRoute
      ]
  })

  console.log(this.state.route)
}
    handleAddImgSlider = (img, index) => {
        switch (index) {
            case 0:
                this.setState({
                    img_slider_1 : img
                })
                break;
            case 1:
                this.setState({
                    img_slider_2 : img
                })
                    break;
            case 2:
                this.setState({
                    img_slider_3 : img
                })
                break;
            default:
                break;
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
                <i className="fa fa-table" />Quản lý
              </li>
              <li>
                <i className="fa fa-th-list" />Quản lý tour
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách tour</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Tên tour
                    </th>
                    <th>
                      <i className="icon_calendar" /> Ngày diễn ra
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Giá
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Loại Tour
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Lộ trình
                    </th>
                    <th>
                      <i className="icon_cogs" /> Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.tour.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name_tour}</td>
                        <td>{new Date(element.time_start).getDate() + "/" + (new Date(element.time_start).getMonth() + 1) + "/" + new Date(element.time_start).getFullYear() + " - " + 
                        new Date(element.time_end).getDate() + "/" + (new Date(element.time_end).getMonth() + 1) + "/" + new Date(element.time_end).getFullYear()
                        }</td>
                        <td>{element.price}</td>
                        <td>{this.getNameCategoryByID(element.category_tour_id)}</td>
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
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  currname: element.name,
                                  name_tour: element.name_tour,
                                  price :  element.price,
                                  time_start :  element.time_start,
                                  time_end :  element.time_end,
                                  description : element.description,
                                  id_discount : element.id_discount,
                                  capacity : element.capacity,
                                  providerName : this.getNameProviderByID(element.provider_id),
                                  provider_id : element.provider_id,
                                  categoryName : this.getNameCategoryByID(element.category_tour_id),
                                  category_tour_id : element.category_tour_id,
                                  place_depart : element.place_depart,
                                  route : element.route,
                                  id : element._id,
                                  image_cover : "http://localhost:8080/tour/" + element.image_cover,
                                  currType: "update"
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteTour(element._id)
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
                          onChange = {(e) => this.setState({name_tour : e.target.value})}
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
                      <label for="curl" className="control-label col-lg-2">
                        Loại tour
                      </label>
                      <div className="col-lg-10">
                            <button
                            style={{ width: "200px" }}
                            type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                            >
                            {this.state.categoryName} <span className="caret" />
                            </button>
                            <ul className="dropdown-menu" role="menu" style = {{ height : "70px", overflowY : "scroll"}}>
                            {this.renderMenuCategory()}
                            </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Ngày bắt đầu <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                          {
                          this.state.currType === "add" ? (
                            <DatePicker 
                                selected={this.state.time_start}
                                onChange = {(date)=>{this.setState({time_start: date})}}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                className=" form-control input-infor-route-custom"
                            />
                          ) :
                            <input
                            value={new Date(this.state.time_start).getDate() + "/" + (new Date(this.state.time_start).getMonth() + 1) + "/" + new Date(this.state.time_start).getFullYear()}
                            className="form-control "
                            id="cemail"
                            type="text"
                            name="email"
                            required
                            disabled
                            />
                        }
                        </div>
                      </div>
                      <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Ngày kết thúc <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                      {
                          this.state.currType === "add" ? (
                            <DatePicker 
                                selected={this.state.time_end}
                                onChange = {(date)=>{this.setState({time_end: date})}}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                className=" form-control input-infor-route-custom"
                            />
                          ) :
                            <input
                            value={ new Date(this.state.time_end).getDate() + "/" + (new Date(this.state.time_end).getMonth() + 1) + "/" + new Date(this.state.time_end).getFullYear()}
                            className="form-control "
                            id="cemail"
                            type="text"
                            name="email"
                            required
                            disabled
                            />
                        }
                        
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Nơi khởi hành
                      </label>
                      <div className="col-lg-10">
                            <button
                            style={{ width: "200px" }}
                            type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                            >
                            {this.state.place_depart} <span className="caret" />
                            </button>
                            <ul className="dropdown-menu" role="menu" style = {{ height : "300px", overflowY : "scroll"}}>
                            {this.renderMenuPlaceDepart()}
                            </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Nhà cung cấp dịch vụ
                      </label>
                      <div className="col-lg-10">
                            <button
                            style={{ width: "200px" }}
                            type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                            >
                            {this.state.providerName} <span className="caret" />
                            </button>
                            <ul className="dropdown-menu" role="menu" style = {{ height : "200px", overflowY : "scroll"}}>
                            {this.renderMenuProvider()}
                            </ul>
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
                      <label  className="control-label col-lg-2">
                        Số lượng hành khách <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                            value={this.state.capacity}
                            onChange = {(e) => this.setState({capacity : e.target.value })}
                            className="form-control"
                            name="fullname"
                            type="number"
                            required
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
                        Ảnh cover
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.image_cover}
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Lộ trình
                      </label>
                      <div className="btn-group col-lg-10">
                        {
                            this.state.currType === 'update' &&
                            this.state.route.map((item, index) => {
                            return(
                                <div>
                                    <span>Ngày {index + 1} {item.title}</span>
                                    <p>Địa điểm {this.getNameLocationByID(item.location_id)}</p>
                                    <p> Ngày {new Date(item.date_happen).getDate() + "/" + (new Date(item.date_happen).getMonth() + 1) + "/" + new Date(item.date_happen).getFullYear()}</p>
                                    <p>Mô tả : {item.description}</p>
                                    <img
                                    src={"http://localhost:8080/tour/" + item.images}
                                    style={{ maxWidth: "300px" }}
                                    />
                                </div>
                          )
                        })
                            }
                      </div>
                      {
                          this.state.currType === 'add' &&(
                            <div className="col-lg-2">
                                    <button type = "button" className = "btn-add-route" onClick = {() => this.handleAddFormRoute() }> + Thêm lộ trình
                                    </button>
                            </div>
                          )
                      }
                      
                    <div className="col-lg-10">    
                        {this.state.arrayNewRoute.map((item, index) =>{
                            return(
                                <div style = {{marginLeft : "200px", position: 'relative'}}>
                                <p>Địa điểm {index + 1}</p>
                                <button
                                style={{ width: "200px" }}
                                type="button"
                                className="btn btn-default dropdown-toggle"
                                data-toggle="dropdown"
                                >
                                {this.state.locationRoute} <span className="caret" />
                                
                                </button>
                                <ul className="dropdown-menu" role="menu" style = {{ height : "300px", overflowY : "scroll", top : "35px", minWidth : "200px", left : "0"}}>
                                {this.renderMenuLocation()}
                                </ul>
                                <label for="departdate">Ngày diễn ra</label>
                                <DatePicker 
                                    selected={this.state.datehappen}
                                    onChange = {(date)=>{this.setState({datehappen: date})}}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    className="departhappen form-control input-infor-route-custom"
                                    id="departhappen"
                                />
                                  <input
                                    placeholder = "Nhập tiêu đề của địa điểm"
                                    className="form-control input-infor-route-custom"
                                    onChange = {(e) => this.setState({titleRoute : e.target.value})}
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
                                <span>Ảnh về địa điểm </span>
                                  <input
                                    className="form-control "
                                    type="file"
                                    id="ccomment"
                                    name="comment"
                                    required
                                    onChange={e =>{
                                         this.handleAddImgSlider(e.target.files[0], index)
                                    }
                                    }
                                    />
                                <hr style = {{paddingTop: "20px"}} />
                            </div>
                            )
                            
                        })}
                    </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Giảm giá
                      </label>
                      <div className="col-lg-10">
                         <label class="radio-inline">
                            <input
                              checked={this.state.id_discount}
                              onClick={() => {
                                  this.setState({ id_discount: true })
                                  this.handleAddRoute()
                              }}
                              type="radio"
                              name="optradio"
                            /> Có
                          </label>
                          <label class="radio-inline">
                            <input
                              checked={!this.state.id_discount}
                              onClick={() => {
                                  this.setState({ id_discount: false })
                                  this.handleAddRoute()
                              }}
                              type="radio"
                              name="optradio"
                            />Không
                          </label>
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
export default TourManager;
