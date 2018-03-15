import React, { Component } from "react";
import { Link, IndexLink, hashHistory, Router, Route } from "react-router";
import phyInit from '../../common/phy.init';
import axios from "../../common/httpAjax";
import qs from "qs";
import $ from "jquery";
import { Modal } from 'antd-mobile';


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            list: [],
            modal1: false,
            modal2: false,
            allProjectArr: [],
            allPrice: 0,
            baseChargeItemList: [],//基础项目列表
            baseChargeStatus: false,//默认收状态
            plusChargeStatus: true,//默认展开状态
            plusChargeItemList: [],//推荐项目列表
            plusChargeItemIds: [],//已添加收费项集合
            packageChargeItemIds: [],//套餐内的收费项集合
            mutexChargeItemIds: [],//互斥的收费项id
            repeatChargeItemIds: [],//重复的收费项id
            titlePrice: 0,
            isLoading: true,
            isNulldata: false,
            isInit: false,
            errormsg: "正在加载中，请稍后...",
        }
        this.changeChecked = this.changeChecked.bind(this);
    }
    init() {
        var allProjectArr = JSON.parse(window.localStorage.getItem("allProjectArr")) || [];
        const chargeItemList = JSON.parse(window.localStorage.getItem("chargeItemList")) || [];
        var plusChargeItemIds = allProjectArr.map((item, index) => item.id);
        var packageChargeItemIds = chargeItemList.map((item, index) => item.id);

        var ansValue = this.props.location.query.ansValue;
        var corpId = this.props.location.query.corpId;
        this.setState({
            allProjectArr: allProjectArr,
            baseChargeItemList: chargeItemList,
            plusChargeItemIds: plusChargeItemIds,
            packageChargeItemIds: packageChargeItemIds,
            ansValue: ansValue,
            corpId: corpId
        }, function () {
            axios({
                url: "/package/surveyChargeItems.json",
                data: {
                    "ansValue": ansValue,
                    "corpId": corpId,
                },
                method: "post"
            }).then((response) => {
                var { allProjectArr, packageChargeItemIds, isLoading } = this.state;
                var allPrice = 0
                var titlePrice = 0;

                if (response.data.code == 0) {
                    var isNulldata = response.data.result.list.length <= 0 ? true : false;
                    for (var i = 0; i < response.data.result.list.length; i++) {
                        response.data.result.list[i].isChecked = false;
                        if (packageChargeItemIds.includes(response.data.result.list[i].id)) {
                            response.data.result.list[i].isChecked = true;
                            continue;
                        }
                        for (var j = 0; j < allProjectArr.length; j++) {
                            if (allProjectArr[j].id == response.data.result.list[i].id) {
                                response.data.result.list[i].isChecked = true;
                                titlePrice += allProjectArr[j].amount;
                                break;
                            }
                        }
                    }
                    for (var k = 0; k < allProjectArr.length; k++) {
                        allPrice += allProjectArr[k].amount;
                    }
                    this.setState({
                        data: response.data.result,
                        show: true,
                        list: response.data.result.list,
                        isNulldata: isNulldata,
                        errormsg: isNulldata ? "很遗憾，根据您的问卷答题未能找到更多适合您的体检项目~" : null,
                        allPrice: allPrice,
                        titlePrice: titlePrice,
                        isLoading: false,
                        basicPrice: window.localStorage.getItem("basicPrice") || 0,
                        isInit:true,
                    })
                } else {
                    Toast.fail(response.data.msg, 3, '', true);
                    this.setState({
                        isInit:true,
                    })
                    return false;
                }


            });
        })



    }
    componentDidMount() {
        phyInit.title("推荐体检项目");
        this.init()
    }
    countPrice(id, type, amount) { //计算总价
        const { titlePrice } = this.state;
        let price, allPrice;
        if (type == "add") {
            allPrice = titlePrice + amount;
        } else {
            allPrice = titlePrice - amount;
        }
        this.setState({
            titlePrice: allPrice
        })
        return;
    }
    isRepeat(arr1, arr2, arr3) {
        var boo = false;
        var message = [];
        for (var i = 0; i < arr1.length; i++) {
            if (arr2.includes(arr1[i])) {
                for (var j = 0; j < arr3.length; j++) {
                    if (arr3[j].id == arr1[i]) {
                        message.push(arr3[j].name);
                    }
                }
                boo = true;
                continue;
            }
        }
        this.setState({
            repeat_message: message.join(",")
        })

        return boo;
    }
    changeChecked(e, item, index) {
        var isChecked = $(e).is(':checked');
        let { plusChargeItemIds, packageChargeItemIds, allProjectArr, list } = this.state;
        if (!isChecked) {//取消
            for (var i = 0; i < plusChargeItemIds.length; i++) {
                if (plusChargeItemIds[i] == item.id) {

                    plusChargeItemIds.splice(i, 1);
                    allProjectArr.splice(i, 1);

                    break;
                }
            }
            list[index].isChecked = false;
            this.setState({
                plusChargeItemIds: plusChargeItemIds,
                allProjectArr: allProjectArr,
                list: list,
            })
            this.countPrice(item.id, "reduce", item.amount);
            return false;
        }
        if (plusChargeItemIds.length <= 0 && packageChargeItemIds.length <= 0) {
            plusChargeItemIds.push(item.id);
            allProjectArr.push(item);
            list[index].isChecked = true;
            this.setState({
                plusChargeItemIds: plusChargeItemIds,
                allProjectArr: allProjectArr,
                list: list,
            })
            this.countPrice(item.id, "add", item.amount);
            return true;
        }
        axios({
            url: "/package/mutexAndRepeat.json",
            data: {
                "chargeItemId": item.id,//当前添加项目id
                "plusChargeItemIds": plusChargeItemIds,//已添加的收费项目
                "packageChargeItemIds": packageChargeItemIds//套餐内的收费项目
            },
            method: "post"
        }).then((response) => {
            if (response.data.code == 0) {

            } else {
                Toast.fail(response.data.msg, 3, '', true);
                return false;
            }
            const { baseChargeItemList, allProjectArr } = this.state;
            let { mutexChargeItemIds, repeatChargeItemIds } = response.data.result
            if (this.isRepeat(repeatChargeItemIds, packageChargeItemIds, baseChargeItemList)) {

                this.showModal2("项目重复", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】有相同检测内容");
                $(e).prop("checked", "false");
                return false;
            }
            else if (this.isRepeat(repeatChargeItemIds, plusChargeItemIds, allProjectArr)) {
                this.showModal2("项目重复", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】有相同检测内容");
                $(e).prop("checked", "false");
                return false;
            }
            else if (this.isRepeat(mutexChargeItemIds, packageChargeItemIds, baseChargeItemList)) {//判断所添加项目是否重复


                this.showModal2("项目互斥", "您选择的项目与套餐中的基础项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");

                $(e).prop("checked", false);

                return false;
            } else if (this.isRepeat(mutexChargeItemIds, plusChargeItemIds, allProjectArr)) {
                this.showModal2("项目互斥", "您选择的项目与已添加的项目【" + this.state.repeat_message + "】的检测内容有部分互斥，请重新选择");
                $(e).prop("checked", false);
                return false;
            } else {

                plusChargeItemIds.push(item.id);
                allProjectArr.push(item);
                list[index].isChecked = true;
                this.setState({
                    plusChargeItemIds: plusChargeItemIds,
                    allProjectArr: allProjectArr,
                    list: list,
                })
                this.countPrice(item.id, "add", item.amount);


            }
        });
    }
    showModal(item) { //项目介绍

        this.setState({
            modalTitle: item.name,
            remarks: item.remarks,
            suitPersonRemarks: item.suitPersonRemarks,
            unsuitPersonRemarks: item.unsuitPersonRemarks,
            modal1: true,
        });
    }
    onClose(key) {

        this.setState({
            [key]: false,
        });
    }
    showModal2(title, mes) { //项目重复互斥
        this.setState({
            modalTitle: title,
            modal2: true,
            message: mes,
        })
    }
    goToDetail() {
        let { allProjectArr, allPrice, titlePrice, basicPrice } = this.state;

        window.localStorage.setItem('allProjectArr', JSON.stringify(this.state.allProjectArr));

        hashHistory.push({
            pathname: '/booking/details/' + localStorage.getItem("corpId") + "/" + localStorage.getItem("reservationId"),
            query: {
                corpId: localStorage.getItem("corpId"),
                reservationId: localStorage.getItem("reservationId"),
            },
            state: {
                allProjectArr: allProjectArr,
                allPrice: titlePrice
            }
        })

    }
    render() {
        let { isInit, list, packageChargeItemIds, data, isLoading, isNulldata, errormsg, allPrice, titlePrice, basicPrice } = this.state;
        let projectItem = list.map((item, index) => {
            return (
                <div class="app-list-item" href="#" key={index}>
                    <div class="app-item-bd" onClick={(e) => { this.showModal(item) }}>{item.name}</div>
                    <div class="app-item-ft">
                        <input type="checkbox" class="app-checkBox-phy" disabled="" checked={item.isChecked} name="checkbox" id={"checked" + index} onChange={(e) => { this.changeChecked(("#checked" + index), item, index) }} disabled={packageChargeItemIds.includes(item.id) ? "disabled" : ""} />
                    </div>
                </div>
            )
        });
        if (isInit) {
            return (
                <div class="app-doc">
                    {
                        list.length > 0 ?
                            <div class="app-doc">
                                <div class="app-bd bookingDetails-items-bd">
                                    <div class="bookingDetails-recommend">
                                        <div class="bookingDetails-itemsAdd">
                                            <div class="app-list">
                                                {projectItem}
                                                <Modal
                                                    visible={this.state.modal1}
                                                    transparent
                                                    maskClosable={false}
                                                    onClose={() => this.onClose('modal1')}
                                                    title={this.state.modalTitle}
                                                    footer={[{ text: '知道了', onPress: () => { this.onClose('modal1'); } }]}

                                                >
                                                    <div style={{ maxHeight: '8rem', overflow: 'scroll' }}>
                                                        <div className="am-modal-body-text app-txt-nowrap"><span class="title">【项目介绍】：</span><span class="name">{this.state.remarks ? this.state.remarks : "无特殊说明"}</span></div>
                                                        <div className="am-modal-body-text app-txt-nowrap"><span class="title">【适宜人群】：</span><span class="name">{this.state.suitPersonRemarks ? this.state.suitPersonRemarks : "--"}</span></div>
                                                        <div className="am-modal-body-text app-txt-nowrap"><span class="title">【禁忌人群】：</span><span class="name">{this.state.unsuitPersonRemarks ? this.state.unsuitPersonRemarks : "--"}</span></div>
                                                    </div>
                                                </Modal>
                                                <Modal
                                                    visible={this.state.modal2}
                                                    transparent
                                                    maskClosable={false}
                                                    onClose={() => this.onClose('modal2')}
                                                    title={this.state.modalTitle}
                                                    footer={[{ text: '知道了', onPress: () => { this.onClose('modal2'); } }]}

                                                >
                                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                                        {this.state.message}
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="app-ft phy-ft">
                                    <div class="phy-ft-total">
                                        <div class="total-all">
                                            <span class="total-all-title">合计：</span><em class="rmb">¥</em><span class="total-price-all">{(Number(titlePrice) + Number(allPrice) + Number(basicPrice)).toFixed(2)}</span>
                                        </div>
                                        <Link onClick={() => {
                                            this.goToDetail()
                                        }} class="phy-confirmAddBtn">确定添加</Link>
                                    </div>
                                </div>
                            </div> : null
                    }

                    {isLoading ?
                        <div class="showLoadingInit"><div class="no-data"><p class="no-text">{errormsg}
                        </p></div></div>
                        : null
                    }
                    {isNulldata ?
                        <div class="showLoadingInit">
                            <div class="no-data">
                                <p class="no-text">{errormsg}
                                </p>
                            </div>
                            <div className="know-data" onClick={() => {
                                this.goToDetail()
                            }}><p className="konw-btn">知道了</p></div>
                        </div>
                        : null
                    }

                </div>
            )
        } else {
            return null;
        }

    }
}
