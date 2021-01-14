import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import storeConfig from '../../config/store.config'
class Slider extends Component {
    render() {
        return (
                <div id="sidebar" className="nav-collapse ">
                    <ul className="sidebar-menu">
                        <li className="active">
                            <a className="" href="/">
                                <i className="icon_house_alt"></i>
                                <span>Bảng điều khiển</span>
                            </a>
                        </li>
                        <li className="sub-menu">
                            <a href="javascript:" className=""> 
                                <i className="icon_document_alt"></i>
                                <span>Quản lý</span>
                                <span className="menu-arrow arrow_carrot-right"></span>
                            </a>
                            <ul className="sub">
                                {storeConfig.getUser().role === 2 ? 
                                     <li><a className="" href="/accountmanager">Tài khoản </a></li> : ""
                                }
                               
                                <li><a className="" href="/tourmanager">Tour </a></li>
                                {storeConfig.getUser().role === 2 ? 
                                     <li><a className="" href="/providermanager">Nhà cung cấp</a></li> : ""
                                }
                               
                                <li><a className="" href="/locationmanager">Địa điểm</a></li>
                            </ul>
                        </li>
                        {
                            storeConfig.getUser().role === 1 ?
                            <li>
                                <a className="" href="/reviewtourdesign">
                                    <i className="icon_piechart"></i>
                                    <span>Duyệt tour</span>

                                </a>
                            </li>
                            : ""
                        }
                        {
                            storeConfig.getUser().role === 2 ?
                            <li className="sub-menu">
                                <a href="/contactmanager" className="">
                                    <i className="icon_table"></i>
                                    <span>Thông tin liên hệ</span>
                                </a>
                            </li>
                            :""
                        }
                       
                        <li>
                            <a className="" href="/statistical">
                                <i className="icon_genius"></i>
                                <span>Thống kê</span>
                            </a>
                        </li>

                    </ul>
      </div>
        )
    }
}
export default Slider