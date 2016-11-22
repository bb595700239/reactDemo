import React, {Component, PropTypes} from 'react';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template} from './common/modules';
import {ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips} from 'react-weui';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            userpic:"http://imgs3.mxthcdn.com/m/I36pa5bj89c1650703473_mFKWJO.jpg",
            phone:'',
            yzm:'',
            sendtxt:'发送验证码',
            preventMountSubmit:true,//防止重复提交
        }
        this.changeValue = (type,event) => {
            if (type === 'yzm') {
                this.setState({
                    yzm:event.target.value
                })
            }else if(type === 'phone'){
                let value = event.target.value.replace(/\D/gi,'')
                this.setState({
                    phone:value
                })
            }
        }
        this.sendyzm = () => {
            const phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (!phoneReg.test(this.state.phone)) {
                Tool.alert('请输入正确手机号');
                return;
            }

        }
        this.postInform = () => {
            const phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (!phoneReg.test(this.state.phone)) {
                Tool.alert('请输入正确手机号');
                return;
            }
            if (this.state.yzm.replace(/(^\s+)|(\s+$)/g,"")=='') {
                Tool.alert('请输入验证码');
                return;
            }
            if (this.state.preventMountSubmit) {
            this.state.preventMountSubmit == false;
            this.props.getData('/sales/sales/input',{sales_money:this.state.saleMoney,customers_name :this.state.name,customers_phone :this.state.phone,products :this.state.postProduct,invoice_ids :this.state.serverId},(res) => {
                if (res.http_code == 200) {
                    Tool.alert(res.data.msg);
                    this.setState({
                        saleMoney:'',
                        name:'',
                        phone:'',
                        products:[],
                        serverId:'',
                        picSrc:'',
                        postProduct:[],
                        preventMountSubmit:true
                    })
                }else{
                    this.state.preventMountSubmit = true;
                    Tool.alert(res.msg)
                }
            },'input')
        }

        } 
    }

    render() {
        return (
            <div className="container">
                <div className="login-box">
                    <div className="login-user">
                        <img src={this.state.userpic}/>
                    </div>
                    <Form className="g-form">
                        <FormCell>
                            <CellHeader>
                                <Label>手机号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" value={this.state.phone} onChange={this.changeValue.bind(this,'phone')} placeholder="请输入手机号"/>
                            </CellBody>
                        </FormCell>
                        <FormCell vcode>
                            <CellHeader>
                                <Label>验证码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" value={this.state.yzm} onChange={this.changeValue.bind(this,'yxm')} placeholder="请输入验证码"/>
                            </CellBody>
                            <CellFooter>
                                <Button type="vcode" onClick={this.sendyzm} className="weui_btn weui_btn_primary sendcode">{this.state.sendtxt}</Button>
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <div className="weui_btn_area surebtn">
                        <Button onClick={this.postInform}>免费登陆注册</Button>
                    </div>
                </div>
            </div>
        )
    }
    

}

export default template({
    id: 'index',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: '/user/user/checkRegister'
});

