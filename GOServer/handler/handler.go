package handler

import (
	"encoding/json"
	"fmt"
	//models "github.com/AppleDeate518/goFrame/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

//用于存储用户信息的结构体，Id,Phone,Passwd
type User struct {
	Id     int
	Phone   string
	Passwd string
}

//用于存储用户的切片
var Slice []User

//用于临时存储用户登录信息的Map
var State = make(map[string]interface{})

//注册
func Register(c *gin.Context) {
	//获取用户名、密码
	phone := c.Query("Phone")
	passwd := c.Query("Passwd")
	fmt.Print(phone + "\n")
	//判断用户是否存在
	//存在输出状态1
	//不存在创建用户，保存密码与用户名
	Bool := IsExist(phone)
	if Bool {
		//注册状态
		State["state"] = 1
		State["text"] = "此用户已存在！"
	} else {
		//用户不存在即添加用户
		AddStruct(phone, passwd)
		State["state"] = 0
		State["text"] = "注册成功！"
	}
	//把状态码和注册状态返回给客户端
	jsonStr, _ := json.Marshal(State)
	c.Header("Access-Control-Allow-Origin", "*")
	c.String(http.StatusOK, "%s", jsonStr)
}

//登录
func Login(c *gin.Context) {
	//name := c.Request.FormValue("Name")
	//passwd := c.Request.FormValue("Passwd")
	phone := c.Query("Phone")
	passwd := c.Query("Passwd")
	fmt.Print(phone + "\n")
	//先判断用户是否存在，存在再判断密码是否正确
	Bool := IsExist(phone)
	if Bool {
		Bool_Pwd := IsRight(phone, passwd)
		if Bool_Pwd {
			State["state"] = 0
			State["text"] = "登录成功！"
		} else {
			State["state"] = 1
			State["text"] = "密码错误！"
		}
	} else {
		State["state"] = 2
		State["text"] = "登录失败！此用户尚未注册！"
	}
	jsonStr, _ := json.Marshal(State)
	c.Header("Access-Control-Allow-Origin", "*")
	c.String(http.StatusOK, "%s", jsonStr)
}

//设置默认路由当访问一个错误网站时返回
func NotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{
		"status": 404,
		"error":  "404 ,page not exists!",
	})
}

//添加用户
func AddStruct(phone string, passwd string) {
	var user User
	user.Phone = phone
	user.Passwd = passwd
	user.Id = len(Slice) + 1
	Slice = append(Slice, user)
}

//判断是否存在用户
func IsExist(phone string) bool {
	//db := models.connectDB()
	//如果长度为0说明尚未有用户注册
	if len(Slice) == 0 {
		return false
	} else {
		//遍历切片
		for _, v := range Slice {
			// return v.Name == user //此时只能和第一个比较，所以第一个之后全为false
			if v.Phone == phone {
				return true
			}
		}
	}
	return false
}

//判断密码是否正确
func IsRight(phone string, passwd string) bool {
	for _, v := range Slice {
		if v.Phone == phone {
			//先确认姓名一致，密码相同返回true
			return v.Passwd == passwd
		}
	}
	return false
}
