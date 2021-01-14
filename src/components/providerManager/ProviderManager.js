import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProviderManager extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email : "",
      phone : "",
      address : "",
      account_id : null,
      fax : "",
      introduce :   "",
      tempService : [],
      service  : [],
      arrayNewService : [],
      newService : '',
      traveler : 0,
      revenue : 0,
      arrayNewPrize : [],
      tempPrize : [],
      prize : [],
      newPrize : "",
      files : null,
      images : [],
      id: null,
      noti: null,
      currType: "add",
      pagination: [],
      userName : ""
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
    if (nextProps.isadd === false) {
      this.setState({
        noti: "ADD already exist "
      });
      toast.error("Thêm không thành công", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
    } else if (nextProps.isadd === true) {
        toast.error("Thêm thông tin nhà cung cấp dịch vụ thành công", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
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
        toast.error("Cập nhật thành công", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
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

  submitAddProvider = () => {
    const {name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files
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
    if (files.length  === 0) {
      this.setState({
        noti: "file invalid"
      });
      toast.error("Ảnh không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (fax === "") {
      this.setState({
        noti: "fax invalid"
      });
      toast.error("Fax không hợp lệ", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (account_id === "") {
        this.setState({
          noti: "account_id invalid"
        });
        toast.error("Mã tài khoản không hợp lệ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }if (introduce === "") {
        this.setState({
          noti: "introduce invalid"
        });
        toast.error("Thông tin giới thiệu không hợp lệ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }if (service.length === 0 ) {
        this.setState({
          noti: "service invalid"
        });
        toast.error("Danh sách dịch vụ không hợp lệ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }if (prize.length === 0) {
        this.setState({
          noti: "prize invalid"
        });
        toast.error("Danh sách giải thưởng không hợp lệ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
    this.props.addProvider(
        name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files
    );
  };
  submitUpdateProvider = () => {
    const {
        name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files, images
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
      if (fax === "") {
        this.setState({
          noti: "fax invalid"
        });
        toast.error("Fax không hợp lệ", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000
        });
        return;
      } else {
        this.setState({
          noti: ""
        });
      }
      if (account_id === "") {
          this.setState({
            noti: "account_id invalid"
          });
          toast.error("Mã tài khoản không hợp lệ", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
          return;
        } else {
          this.setState({
            noti: ""
          });
        }if (introduce === "") {
          this.setState({
            noti: "introduce invalid"
          });
          toast.error("Thông tin giới thiệu không hợp lệ", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
          return;
        } else {
          this.setState({
            noti: ""
          });
        }if (service.length === 0 ) {
          this.setState({
            noti: "service invalid"
          });
          toast.error("Danh sách dịch vụ không hợp lệ", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
          return;
        } else {
          this.setState({
            noti: ""
          });
        }if (prize.length === 0) {
          this.setState({
            noti: "prize invalid"
          });
          toast.error("Danh sách giải thưởng không hợp lệ", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
          });
          return;
        } else {
          this.setState({
            noti: ""
          });
        }
    this.props.updateProvider(
        name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files, images
    );
  };
  renderBtn = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button onClick={() => this.submitAddProvider()} className="btn-custom">
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
              onClick={() => this.submitAddProvider()}
              className="btn-custom"
            >
              Thêm
            </button>
            <button onClick={() => this.submitUpdateProvider()} className="btn-custom">
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
        email : "",
        phone : "",
        address : "",
        account_id : null,
        fax : "",
        introduce :   "",
        service  : [],
        arrayNewService : [],
        arrayNewPrize : [],
        newService : '',
        traveler : 0,
        revenue : 0,
        prize : [],
        newPrize : "",
        files : null,
        images : [],
        id: null,
        noti: null,
        currType: "add",
        userName : ""
    });
  };

  handleAddService = () => {
    this.setState({
        arrayNewService : [
            ...this.state.arrayNewService,
            '0'
        ]
    })
    if(this.state.arrayNewService.length > 0){
        this.addNewService(this.state.newService)
    }
    console.log(this.state.arrayNewService)
  }

  addNewService  = (newService) => {
    this.setState({
        service : [
            ...this.state.service,
            newService
        ]
    })
    console.log(this.state.service)
  }

  handleAddPrize = () => {
    this.setState({
        arrayNewPrize : [
            ...this.state.arrayNewPrize,
            '0'
        ]
    })
    if(this.state.arrayNewPrize.length > 0){
        this.addNewPrize(this.state.newService)
    }
  }

  addNewPrize = (newPrize) => {
    this.setState({
        prize : [
            ...this.state.prize,
            newPrize
        ]
    })
  }

  renderMenuAccount = () => {
    if (this.props.userProvider) {
      return this.props.userProvider.map((element, index) => {
        return (
          <li 
            onClick={() =>
              this.setState({
                userName: element.name,
                account_id: element._id
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
  getUserNameByID = id => {
    for (let i = 0; i < this.props.userProvider.length; i++) {
      if (id === this.props.userProvider[i]._id) return this.props.userProvider[i].name;
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
                <i className="fa fa-th-list" />Quản lý nhà cung cấp
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Danh sách nhà cung cấp</header>
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
                      <i className="icon_profile" />Số điện thoại
                    </th>
                    <th>
                      <i className="icon_profile" />Địa chỉ
                    </th>
                    <th>
                      <i className="icon_cogs" />Tùy chỉnh
                    </th>
                  </tr>
                  {this.props.provider.map((element, index) => {
                    
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                        <td>{element.address}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  email: element.email,
                                  name: element.name,
                                  account_id : element.account_id,
                                  address: element.address,
                                  phone: element.phone,
                                  fax: element.fax,
                                  introduce: element.introduce,
                                  service : element.service,
                                  tempService : element.service,
                                  traveler : element.traveler,
                                  currType: "update",
                                  revenue : element.revenue,
                                  tempPrize : element.prize,
                                  prize : element.prize,
                                  images : element.images,
                                  id : element._id,
                                  userName : this.getUserNameByID(element.account_id)

                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteProvider(element._id)
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
                        Email<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              email: e.target.value
                            });
                          }}
                          value={this.state.email}
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
                        Fax<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              fax: e.target.value
                            });
                          }}
                          value={this.state.fax}
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
                        Tên tài khoản
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.userName} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu" style = {{ height : "300px", overflowY : "scroll"}}>
                          {this.renderMenuAccount()}
                        </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Giới thiệu<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              introduce: e.target.value
                            });
                          }}
                          value={this.state.introduce}
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
                        Du khách (Triệu người)<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              traveler: e.target.value
                            });
                          }}
                          value={this.state.traveler}
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
                        Doanh Số (nghìn Tỷ Đồng)<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              revenue: e.target.value
                            });
                          }}
                          value={this.state.revenue}
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
                      <label  className="control-label col-lg-2">
                        Danh sách dịch vụ<span className="required" />
                      </label>
                      <div className="col-lg-10">
                          {
                            this.state.tempService.map((item, index) =>{
                              return (
                                  <input
                                    value={item}
                                    className="form-control"
                                    id="cname"
                                    name="fullname"
                                    minlength="5"
                                    type="text"
                                    disabled
                                    />
                              )
                          })}
                          
                      </div>
                    <div className="col-lg-2" >
                            <button type = "button" className = "btn-add-route" onClick = {() => this.handleAddService() }> + Thêm dịch vụ
                            </button>
                    </div>
                    <div className="col-lg-10" style = {{marginLeft : "200px"}}>    
                        {this.state.arrayNewService.map((item, index) =>{
                            return(
                                    <input
                                    onChange={e => {
                                        this.setState({
                                            newService: e.target.value
                                        });
                                    }}
                                    className="form-control"
                                    id="cname"
                                    name="fullname"
                                    minlength="5"
                                    type="text"
                                    />
                            )
                        })}
                         </div>
                    </div>
                    <div className="form-group ">
                      <label  className="control-label col-lg-2" onClick = {() => this.addNewService(this.state.newService)}>
                        Danh sách giải thưởng<span className="required" />
                      </label>
                      <div className="col-lg-10">
                        {this.state.tempPrize.map((item, index) => {
                            return (
                                <input
                                    value={item}
                                    className="form-control"
                                    id="cname"
                                    name="fullname"
                                    minlength="5"
                                    type="text"
                                    disabled
                                />
                            )
                        })}
                      </div>
                      <div className="control-label col-lg-2"> 
                            <button type = "button" className = "btn-add-route" onClick = {() => this.handleAddPrize() }> + Thêm giải thưởng
                            </button>
                        </div>
                        <div className="col-lg-10" style = {{marginLeft : "200px"}}>
                            {this.state.arrayNewPrize.map((item, index) =>{
                                return(
                                    
                                        <input
                                        onChange={e => {
                                            this.setState({
                                                newPrize: e.target.value
                                            });
                                        }}
                                        className="form-control"
                                        id="cname"
                                        name="fullname"
                                        minlength="5"
                                        type="text"
                                        />
                                )
                            })}
                            </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2" onClick = {() => this.addNewPrize(this.state.newPrize)}>
                        Tải file{" "}
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="ccomment"
                          name="files"
                          required
                          multiple 
                          onChange={e =>
                            this.setState({files : e.target.files})
                          }
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
export default  ProviderManager ;