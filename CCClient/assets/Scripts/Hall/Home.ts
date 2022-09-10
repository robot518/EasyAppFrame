import { _decorator, Component, Node, Label } from 'cc';
import { DataMgr } from '../Mgr/DataMgr';
const { ccclass, property } = _decorator;

@ccclass('Home')
export class Home extends Component {

    @property(Label)
    labNd: Label = null!;

    @property([Label])
    tLab: [Label] = [null!];

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    showNdInfo(){
        for (let i = 0; i < DataMgr.tNdInfo.length; i++) {
            this.tLab[i].string = DataMgr.tNdInfo[i]["title"];
        }
    }

    onTab(event: any, k: number){
        if (typeof DataMgr.tNdInfo[k] == "object") 
            this.labNd.string = DataMgr.tNdInfo[k]["desc"];
        for (let i = 0; i < this.tLab.length; i++) {
            this.tLab[i].node.children[0].active = i == k ? true : false;
        }
    }
}
