import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Center')
export class Center extends Component {
    @property(Node)
    ndChangePasswd: Node = null!;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onBack(){
        this.node.active = false;
    }
    
    onSure(){
        director.loadScene("Login");
    }

    onChangePasswd(){
        this.ndChangePasswd.active = true;
    }
}
