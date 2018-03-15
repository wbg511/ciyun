import React, {Component} from "react";
import {Link, IndexLink, hashHistory, Router, Route} from "react-router";
import { Toast, ListView } from 'antd-mobile';
import axios from "../../common/httpAjax";
import phyInit from "../../common/phy.init";
import qs from "qs";
import $ from "jquery";

const dataBlob = [];//保存列表数据，原始数据
export default class Index extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state={
      personId: "",
      hmoId: "",
      type: "",
      inspState: "",
      payFlag: "",
      pageNo: "1",
      pageSize: "10",
      recordList:[],
      isLoading: true,
      dataSource:ds,
      isPackage:false,
      isState:false,
      isSortmask:false,
      isNullData:false
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.packageShow = this.packageShow.bind(this);
    this.stateShow = this.stateShow.bind(this);
    this.sortmaskShow=this.sortmaskShow.bind(this);
    this.packageSearch=this.packageSearch.bind(this);
    this.stateSearch=this.stateSearch.bind(this);
    this.stateReset=this.stateReset.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.MyBody=this.MyBody.bind(this);
  }
  initPhyInfo(){
    var urlParms, personId;
    var hmoId,payOpenId,isWx;
    urlParms =this.props.location.query;
    personId = urlParms.personId;
    if (typeof(personId)!='undefined'){
      window.localStorage.removeItem('personId');
      window.localStorage.removeItem('hmoId');
      window.localStorage.removeItem('payOpenId');
      hmoId = urlParms.hmoId;
      payOpenId = urlParms.payOpenId;
      isWx = urlParms.isWx;
      localStorage.setItem("personId",personId);
      localStorage.setItem("isWx",isWx);
      if (isWx=="true"){
        localStorage.setItem("hmoId",hmoId);
        localStorage.setItem("payOpenId",payOpenId);
      }else{
        localStorage.setItem("hmoId","");
      }
    }
    this.setState({
      personId:localStorage.getItem("personId"),
      hmoId:localStorage.getItem("hmoId")
    },function(){
      this.getInpRecord();
    });
  }
  componentDidMount() {
    phyInit.title("预约记录");
    this.initPhyInfo();
    //用于计算列表范围高度
    let l = 100 * (750 ? Math.min(document.documentElement.clientWidth, 750 * window.devicePixelRatio) : document.documentElement.clientWidth) / 750;
    const hei = document.documentElement.clientHeight-(l*0.86);
    setTimeout(() => {
      this.setState({
        height: hei
      });
    }, 600);
  }
  //查询所有记录
  getInpRecord(){
    axios({
      url:"/record/list.json",
      data:{
        "personId": this.state.personId,
        "hmoId": this.state.hmoId,
        "type": this.state.type,
        "state": this.state.inspState,
        "payFlag": this.state.payFlag,
        "pageNo": this.state.pageNo,
        "pageSize": this.state.pageSize,
      },
      method:"post"
    }).then((response)=>{
        //一共有查询出数据量
        const listData=response.data.result.list.length;
        //每次加载数据pageNo需要加一
        const newPageNo=response.data.result.pageNo+1;
        var NewIsLoading=false;
        var NewIsNullData=false;
        //判断是否有数据
        if (listData==0 && response.data.result.pages==0){
          dataBlob.splice(0,dataBlob.length);
          NewIsNullData=true;
        }
        //最后一条数据判断是否需要继续加载
        if (response.data.result.pages==this.state.pageNo){
          NewIsLoading=true;
        }
        //进行新老数据的合并处理
        for (let i = 0; i < listData; i++) {
          const ii = (response.data.result.pageNo * this.state.pageSize) + i;
          dataBlob[`${ii}`] = `row - ${ii}`;
        }

        this.setState({
          isNullData:NewIsNullData,
          pageNo: newPageNo,
          recordList:response.data.result.list,
          isLoading:NewIsLoading,
          dataSource: this.state.dataSource.cloneWithRows(dataBlob)
        });
    });
  }
  //触底执行
  onEndReached(){
    if (this.state.isLoading) {
      return false;
    }
    this.getInpRecord();
  }
  //点击展示条件查询
  packageShow(){
    this.setState({
      isPackage:true,
      isState:false,
      isSortmask:true
    });
  }
  stateShow(){
    this.setState({
      isPackage:false,
      isState:true,
      isSortmask:true
    });
  }
  sortmaskShow(){
    $("#checkbox-Histroyfilter-1").prop("checked",false);
    $("#checkbox-Histroyfilter-2").prop("checked",false);
    this.setState({
      isPackage:false,
      isState:false,
      isSortmask:false
    });
  }
  //套餐预约搜索
  packageSearch(event){
    this.lv.scrollTo(0, 0);
    const target = event.target;
    const value = target.value;
    dataBlob.splice(0,dataBlob.length);
    this.setState({
      type:value,
      isPackage:false,
      isState:false,
      isSortmask:false,
      pageNo:1,
      dataSource: this.state.dataSource.cloneWithRows(dataBlob)
    },function(){
      this.getInpRecord();
    });
  }
  //状态搜索
  stateSearch(){
    this.lv.scrollTo(0, 0);
    dataBlob.splice(0,dataBlob.length);
    this.setState({
      isPackage:false,
      isState:false,
      isSortmask:false,
      pageNo:1,
      dataSource: this.state.dataSource.cloneWithRows(dataBlob)
    },function(){
      this.getInpRecord();
    });
  }
  //重置状态
  stateReset(){
    this.setState({
      inspState: "",
      payFlag: "",
    },function(){
       this.setState({
        inspState: "",
        payFlag: "",
      })
    });
  }
  //选中传值
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  //没有数据返回的样式
  MyBody() {
    return(
      <div style={{ height: this.state.height, position: "relative"}}>
        <div className="no-data">
          <div className="no-text">
            没有查询到符合条件的体检预约记录~
          </div>
        </div>
      </div>
    )
  }
  histroyDetails(oId){
    hashHistory.push({
      pathname: '/histroy/details/'+oId
    })
  }
  render() {
    //套餐列表 因为dataBlob以0为初始所以计算数据长度需要 index-1
    //{obj.payFlag==2 && obj.type!=2 && obj.state==2 ?<span className="status1-phyedno">未线上支付</span>:null}
    const {isPackage, isState, isSortmask,isNullData}=this.state;
    let index = this.state.recordList.length - 1;
    let orderRow = this.state.recordList.length - 1;
    const row = (rowData, sectionId, rowID) => {
      if (orderRow < 0) {
        orderRow = this.state.recordList.length - 1;
      }
      const obj = this.state.recordList[index-orderRow--];
        return(
          <a key={rowID} className="app-list-histroy" onClick={() => {this.histroyDetails(obj.id)}}>
            <div className="app-list-inner">
              <div className="app-histroy-img">
                <img src={obj.image
                    ? obj.image
                    : require('../../static/images/booking-img.png')} alt="" />
              </div>
              <div className="app-histroy-link">
                <div className="app-histroy-about">
                  <div className="app-histroy-name">{obj.name}</div>
                  <div className="app-histroy-phy">{obj.corpName}</div>
                  <div className="app-histroy-time">预约时间：{obj.inspDate} {obj.inspTime}</div>
                  <div class="app-arr-histroy"></div>
                </div>
                <div className="app-histroy-state">
                  {obj.state==2?<span className="status1-phyed">已预约</span>:null}
                  {obj.state==3?<span className="status1-phyed">已体检</span>:null}
                  {obj.state==4?<span className="status1-cancel">已取消</span>:null}
                  {obj.state==5?<span className="status1-cancel">已过期</span>:null}
                  {obj.payFlag==1 && obj.type!=2 ?<span className="status1-payed">已线上支付</span>:null}
                </div>
              </div>
            </div>
          </a>
        )
    }

    return (
      <div className="app-doc">
        <div className="app-hd phyHistroy-hd">
           <div className="phyHistroy-tab">
               <ul className="app-sortTab">
                   <li className="app-sortTab-item">
                   <input type="radio" className="app-radio-filter" name="checkbox-Histroyfilter" id="checkbox-Histroyfilter-1" value="1"/>
                   <label for="checkbox-Histroyfilter-1" onClick={this.packageShow}>类型</label>
                   </li>
                   <li className="app-sortTab-item">
                   <input type="radio" className="app-radio-filter" name="checkbox-Histroyfilter" id="checkbox-Histroyfilter-2" value="2"/>
                   <label for="checkbox-Histroyfilter-2" onClick={this.stateShow}>状态</label>
                   </li>
               </ul>
           </div>
        </div>
        <div className="phyHistroySort">
           <div className="bookingSort-tabMain">
              {isPackage?
               <div className="bookingSort-content">
                   <div className="app-list app-list-bookingSort">
                        <label className="app-list-item">
                            <div className="app-item-bd"><input type="radio" className="app-radio-arrPhy" name="checkbox-arrow" defaultChecked={this.state.type==""? true : false}defaultValue="" onClick={this.packageSearch} /><span className="bookingSort-type">不限</span></div>
                        </label>
                        <label className="app-list-item">
                            <div className="app-item-bd"><input type="radio" className="app-radio-arrPhy" name="checkbox-arrow" defaultChecked={this.state.type==1? true : false} defaultValue="1" onClick={this.packageSearch}/><span className="bookingSort-type">套餐预约</span></div>
                        </label>
                        <label className="app-list-item">
                            <div className="app-item-bd"><input type="radio" className="app-radio-arrPhy" name="checkbox-arrow" defaultChecked={this.state.type==3? true : false} defaultValue="3" onClick={this.packageSearch}/><span className="bookingSort-type">个性推荐</span></div>
                        </label>
                        <label className="app-list-item">
                            <div className="app-item-bd"><input type="radio" className="app-radio-arrPhy" name="checkbox-arrow" defaultChecked={this.state.type==2? true : false} defaultValue="2" onClick={this.packageSearch}/><span className="bookingSort-type">单位体检</span></div>
                        </label>
                    </div>
               </div>
              :null}
              {isState?
               <div className="bookingSort-content">
                   <div className="bookingSort-bd">
                       <div className="bookingSort-list">
                           <p className="bookingSort-title">预约状态：</p>
                           <div  className="bookingSort-titleMain">
                                <ul className="sort-list clearfix">
                                    <li>
                                        <input type="radio" checked={this.state.inspState==""? true : false} className="app-radio-cell" name="inspState" id="radioArrowspc-" defaultValue="" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-">不限</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.inspState==2? true : false} className="app-radio-cell" name="inspState"  id="radioArrowspc-2" defaultValue="2" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-2">已预约</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.inspState==3? true : false} className="app-radio-cell" name="inspState"  id="radioArrowspc-3" defaultValue="3" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-3">已体检</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.inspState==5? true : false} className="app-radio-cell" name="inspState"  id="radioArrowspc-5" defaultValue="5" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-5">已过期</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.inspState==4? true : false} className="app-radio-cell" name="inspState"  id="radioArrowspc-4" defaultValue="4" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-4">已取消</label>
                                    </li>
                                </ul>
                           </div>
                       </div>
                       <div className="bookingSort-list">
                           <p className="bookingSort-title">线上支付状态：</p>
                           <div  className="bookingSort-titleMain">
                                <ul className="sort-list clearfix">
                                    <li>
                                        <input type="radio" checked={this.state.payFlag==""? true : false} className="app-radio-cell" name="payFlag" id="radioArrowspc-pay-" defaultValue="" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-pay-">不限</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.payFlag==1? true : false} className="app-radio-cell" name="payFlag" id="radioArrowspc-pay-1" defaultValue="1" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-pay-1">已支付</label>
                                    </li>
                                    <li>
                                        <input type="radio" checked={this.state.payFlag==2? true : false} className="app-radio-cell" name="payFlag" id="radioArrowspc-pay-2" defaultValue="2" onChange={this.handleInputChange}/>
                                        <label for="radioArrowspc-pay-2">未支付</label>
                                    </li>
                                </ul>
                           </div>
                       </div>
                   </div>
                   <div className="bookingSort-ft">
                       <div className="bookingSort-btn-group">
                           <button className="bookingSort-btn bookingSort-cancelBtn" onClick={this.stateReset}>重置</button>
                           <button className="bookingSort-btn bookingSort-confirmBtn" onClick={this.stateSearch}>确认</button>
                       </div>
                   </div>
               </div>
              :null}
           </div>
        </div>
        {isSortmask?
          <div className="sortmask" onClick={this.sortmaskShow}></div>
        :null}
        <div className="app-bd phyHistroy-bd">
            <div className="app-list-phyHistroy">
              {isNullData?
                <ListView
                      ref={el => this.lv = el}
                      dataSource={this.state.dataSource}
                      renderBodyComponent={() => <this.MyBody />}
                      renderRow={(rowData,sectionId,rowID)=>row(rowData,sectionId, rowID)}
                      style={{
                        height: this.state.height,
                        overflow: 'auto',
                      }}
                    />
              :
                <div className="app-list-gray">
                    <ListView
                      ref={el => this.lv = el}
                      dataSource={this.state.dataSource}
                      renderFooter={() => (
                        this.state.isLoading ? <div style={{ textAlign: 'center', margin: '-9px -15px -15px', padding: '9px 15px 15px', background: '#f0f0f0'}}>加载完成</div> : <div style={{ textAlign: 'center', margin: '-9px -15px -15px', padding: '9px 15px 15px', background: '#f0f0f0'}}></div>
                      )}
                      renderRow={(rowData,sectionId,rowID)=>row(rowData,sectionId, rowID)}
                      style={{
                        height: this.state.height,
                        overflow: 'auto',
                      }}
                      pageSize={10}
                      scrollRenderAheadDistance={1}
                      onEndReached={this.onEndReached}
                      onEndReachedThreshold={10}
                    />
                </div>
            }
            </div>
        </div>
      </div>
    )
  }
}
