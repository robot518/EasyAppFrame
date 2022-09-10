import { _decorator, Component, Node, ScrollView, Sprite, SpriteFrame, Vec2, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

let dy = 125;

@ccclass('Hall')
export class Hall extends Component {

    @property(Node)
    ndHome: Node = null!;

    @property(Node)
    ndClassroom: Node = null!;

    @property(Node)
    ndMarket: Node = null!;

    @property(Node)
    ndPersonalCenter: Node = null!;

    @property(ScrollView)
    scv: ScrollView = null!;

    @property([SpriteFrame])
    tSp: [SpriteFrame] = [null!];

    @property(ScrollView)
    scvLab: ScrollView = null!;

    @property(Node)
    ndCenter: Node = null!;
    
    tNdSp: any;
    tNum: number[] = [0, 1, 2];
    iTime: number = .0;
    INTERVAL: number = 4.;
    iTimeLab: number = .0;
    INTERVALLAB: number = 6.5;

    start () {
        this.initCanvas();
        this.initParas();
        this.initEvent();
        // this.initShow();
        // Your initialization goes here.
    }

    update (deltaTime: number) {
        this.iTime += deltaTime;
        if (this.iTime >= this.INTERVAL){
            this.iTime = 0;
            let self = this;
            this.scv.scrollTo(new Vec2(1, 0), .1);
            this.scheduleOnce(function (params:any) {
                self.scv.setContentPosition(new Vec3(0, dy, 0));
                for (let i = 0; i < self.tNum.length; i++) {
                    if (++self.tNum[i] > 2) self.tNum[i] = 0;
                    self.tNdSp[i].spriteFrame = self.tSp[self.tNum[i]];
                }
            }, .1);
        }
        this.iTimeLab += deltaTime;
        if (this.iTimeLab >= this.INTERVALLAB){
            this.iTimeLab = 0;
            let self = this;
            this.scvLab.scrollToRight(.5, false);
            this.scheduleOnce(function (params:any) {
                self.scvLab.setContentPosition(new Vec3(300, 0, 0));
            }, .5);
        }
    }

    initCanvas(){
        // let canvas = this.node.getComponent(Canvas);
        // let size = canvas.designResolution;
        // let cSize = view.getFrameSize();
        // let bSpView = false;
        // if (sys.os == sys.OS_IOS){ //刘海屏判断
        //     bSpView = (cSize.width == 414 && cSize.height == 896)||(cSize.width == 375 && cSize.height == 812);
        // }
        // if (bSpView){
        //     canvas.fitWidth = true;
        //     canvas.fitHeight = true;
        // }else if (cSize.width/cSize.height >= size.width/size.height){
        //     canvas.fitWidth = false;
        //     canvas.fitHeight = true;
        // }else{
        //     canvas.fitWidth = true;
        //     canvas.fitHeight = false;
        // }
    }

    initParas(){
        this.tNdSp = [];
        let content = this.scv.node.children[0].children;
        for (let i = 0; i < content.length; i++) {
            this.tNdSp[i] = content[i].getComponent(Sprite);
        }
    }

    initEvent(){
        let width = this.scv.getComponent(UITransform)!.width;
        let iMv = 200;
        let self = this;
        // 有时候会出现scrollto后没执行scheduleOnce的问题
        this.scv.node.on(Node.EventType.TOUCH_END, (event: any) => {
            let v2 = this.scv.getScrollOffset();
            this.scv.stopAutoScroll();
            if (v2.x >= -width+iMv) {
                this.scv.scrollTo(new Vec2(0, 0), .1);
                this.scheduleOnce(function (params:any) {
                    self.scv.setContentPosition(new Vec3(0, dy, 0));
                    for (let i = 0; i < self.tNum.length; i++) {
                        if (--self.tNum[i] < 0) self.tNum[i] = 2;
                        self.tNdSp[i].spriteFrame = self.tSp[self.tNum[i]];
                    }
                }, .1);
            } else if (v2.x <= -width-iMv) {
                this.scv.scrollTo(new Vec2(1, 0), .1);
                this.scheduleOnce(function (params:any) {
                    self.scv.setContentPosition(new Vec3(0, dy, 0));
                    for (let i = 0; i < self.tNum.length; i++) {
                        if (++self.tNum[i] > 2) self.tNum[i] = 0;
                        self.tNdSp[i].spriteFrame = self.tSp[self.tNum[i]];
                    }
                }, .1);
            } else this.scv.scrollTo(new Vec2(.5, 0), .1);
        }, this);
        this.scv.node.on(Node.EventType.TOUCH_CANCEL, (event: any) => {
            let v2 = this.scv.getScrollOffset();
            this.scv.stopAutoScroll();
            if (v2.x >= -width+iMv) { 
                this.scv.scrollTo(new Vec2(0, 0), .1);
                this.scheduleOnce(function (params:any) {
                    self.scv.setContentPosition(new Vec3(0, dy, 0));
                    for (let i = 0; i < self.tNum.length; i++) {
                        if (--self.tNum[i] < 0) self.tNum[i] = 2;
                        self.tNdSp[i].spriteFrame = self.tSp[self.tNum[i]];
                    }
                }, .1);
            } else if (v2.x <= -width-iMv) {
                this.scv.scrollTo(new Vec2(1, 0), .1);
                this.scheduleOnce(function (params:any) {
                    self.scv.setContentPosition(new Vec3(0, dy, 0));
                    for (let i = 0; i < self.tNum.length; i++) {
                        if (++self.tNum[i] > 2) self.tNum[i] = 0;
                        self.tNdSp[i].spriteFrame = self.tSp[self.tNum[i]];
                    }
                }, .1);
            } else this.scv.scrollTo(new Vec2(.5, 0), .1);
        }, this);
    }

    onTab(event: any, i: number){
        if (i == 0) this.ndHome.active = true;
        else this.ndHome.active = false;
        if (i == 1) this.ndClassroom.active = true;
        else this.ndClassroom.active = false;
        if (i == 2) this.ndMarket.active = true;
        else this.ndMarket.active = false;
        if (i == 3) this.ndPersonalCenter.active = true;
        else this.ndPersonalCenter.active = false;
    }

    onCenter(){
        this.ndCenter.active = true;
    }
}
