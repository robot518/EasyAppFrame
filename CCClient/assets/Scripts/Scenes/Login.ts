import { _decorator, Component, Node, Label, EditBox, game, Toggle, director } from 'cc';
import { DataMgr } from '../Mgr/DataMgr';

const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {

    @property(Node)
    ndLogin: Node = null!;

    @property(Node)
    ndRegister: Node = null!;

    @property(Node)
    LoginSp: Node = null!;

    @property(Node)
    RegisterSp: Node = null!;

    @property(Node)
    TipBox: Node = null!;

    @property(EditBox)
    editPhone: EditBox = null!;

    @property(EditBox)
    editPassword: EditBox = null!;

    @property(EditBox)
    editPhone2: EditBox = null!;

    @property(EditBox)
    editPassword2: EditBox = null!;

    @property(EditBox)
    editPassword3: EditBox = null!;

    @property(EditBox)
    editAuth: EditBox = null!;

    @property(Toggle)
    togProtocol: Toggle = null!;

    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        let phone = localStorage.getItem("Phone");
        let passwd = localStorage.getItem("Passwd");
        if (phone && passwd) {
            this.editPhone.string = phone;
            this.editPassword.string = passwd;
        }
        console.log("login = ", phone, passwd);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onLoginTab(){
        this.onTabEvent(true);
    }

    onRegisterTab(){
        this.onTabEvent(false);
    }

    onTabEvent(b: boolean){
        this.ndLogin.active = b;
        this.ndRegister.active = !b;
        this.LoginSp.active = b;
        this.RegisterSp.active = !b;
    }

    onLogin(){
        if (/^1[3456789]\d{9}$/.test(this.editPhone.string)) {
            if (this.editPassword.string == "") return this.showTips("密码不能为空");
            if (!(this.editPassword.string.length >= 8 && this.editPassword.string.length <= 16 && /^[A-Za-z0-9]+$/.test(this.editPassword.string))) 
                return this.showTips("请输入8~16位英文和数字！");
            let data = {
                Phone: this.editPhone.string,
                Passwd: this.editPassword.string,
            };
            // let md5 = window ? window.md5 : global.md5;
            // data.Passwd = md5(data.Passwd);
            // cc.sys.localStorage.setItem(key, value);
            let self = this;
            game.emit(DataMgr.LOGIN, {cmd: DataMgr.LOGIN, data,
                success: function(params: any) {
                    self.showTips(params.msg);
                    if (params.code == 200) {
                        localStorage.setItem("Phone", self.editPhone.string);
                        localStorage.setItem("Passwd", self.editPassword.string);
                        DataMgr.phone = self.editPhone.string;
                        DataMgr.passwd = self.editPassword.string;
                        if (params.data && params.data.token) DataMgr.token = params.data.token;
                        director.loadScene("Hall");
                    }
                },
                error: function (params: any) {
                    self.showTips(params);
                }
            });
        }else this.showTips("请输入正确的手机号");
        // game.emit(DataMgr.LOGIN, {cmd: DataMgr.LOGIN});
    }

    onRegister(){
        if (/^1[3456789]\d{9}$/.test(this.editPhone2.string)) {
            if (this.editPassword2.string == "") return this.showTips("密码不能为空");
            if (!(this.editPassword2.string.length >= 8 && this.editPassword2.string.length <= 16 && /^[A-Za-z0-9]+$/.test(this.editPassword2.string))) 
                return this.showTips("请输入8~16位英文和数字！");
            if (this.editPassword2.string != this.editPassword3.string) return this.showTips("密码不一致");
            // if (this.editAuth.string == "") return this.showTips("验证码不能为空");
            if (this.togProtocol.isChecked == false) return this.showTips("请先同意用户协议");
            let data = {
                Phone:this.editPhone2.string,
                Passwd:this.editPassword2.string,
                // yzm: this.editAuth.string,
            };
            // let md5 = window ? window.md5 : global.md5;
            // data.Passwd = md5(data.Passwd);
            let self = this;
            game.emit(DataMgr.REGISTER, {cmd: DataMgr.REGISTER, data, 
                success: function(params: any) {
                    self.showTips(params.msg);
                    if (params.code == 200) {
                        localStorage.setItem("Phone", self.editPhone.string);
                        localStorage.setItem("Passwd", self.editPassword.string);
                        DataMgr.phone = self.editPhone.string;
                        DataMgr.passwd = self.editPassword.string;
                        if (params.data && params.data.token) DataMgr.token = params.data.token;
                        director.loadScene("Hall");
                    }
                },
                error: function (params: any) {
                    self.showTips(params);
                }
            });
        }else this.showTips("请输入正确的手机号");
        // game.emit(DataMgr.REGISTER, {params:123});
    }

    onForgetPasswd(){
        director.loadScene("Hall");
    }

    onYZM(){
        game.emit(DataMgr.YZM, {params:123});
    }

    showTips(s: string){
        let self = this;
        this.unscheduleAllCallbacks();
        this.TipBox.active = true;
        this.TipBox.children[0].getComponent(Label)!.string = s;
        this.scheduleOnce(function () {
            self.TipBox.active = false;
        }, 2);
    }
}
