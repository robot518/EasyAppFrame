package api

import (
	"fmt"
	"net/http"

	"github.com/SmileChen518/EasyAppFrame/GOServer/models"
	"github.com/SmileChen518/EasyAppFrame/GOServer/pkg/e"
	"github.com/SmileChen518/EasyAppFrame/GOServer/pkg/util"
	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	phone := c.Query("Phone")
	passwd := c.Query("Passwd")
	code, msg := e.INVALID_PARAMS, ""
	data := make(map[string]interface{})
	Bool := models.IsExist(phone)
	if Bool {
		code = e.ERROR_EXIST_PHONE
	} else {
		models.AddUser(phone, passwd)
		token, err := util.GenerateToken(phone, passwd)
		if err != nil {
			code = e.ERROR_AUTH_TOKEN
		} else {
			data["token"] = token
			code = e.SUCCESS
			msg = "注册成功！"
		}
	}
	c.Header("Access-Control-Allow-Origin", "*")
	fmt.Println(code, msg, data["token"])
	c.JSON(http.StatusOK, gin.H{"code": code, "msg": e.GetMsg(code, msg), "data": data})
}

func Login(c *gin.Context) {
	phone := c.Query("Phone")
	passwd := c.Query("Passwd")
	data := make(map[string]interface{})
	code, msg := e.INVALID_PARAMS, ""
	Bool := models.IsExist(phone)
	if Bool {
		Bool_Pwd := models.IsRight(phone, passwd)
		if Bool_Pwd {
			token, err := util.GenerateToken(phone, passwd)
			if err != nil {
				code = e.ERROR_AUTH_TOKEN
			} else {
				data["token"] = token
				code = e.SUCCESS
				msg = "登录成功！"
			}
		} else {
			code = e.ERROR_WRONG_PASSWD
		}
	} else {
		code = e.ERROR_NOT_EXIST_PHONE
	}
	c.Header("Access-Control-Allow-Origin", "*")
	fmt.Println(code, msg, data["token"])
	c.JSON(http.StatusOK, gin.H{"code": code, "msg": e.GetMsg(code, msg), "data": data})
}

func ChangePasswd(c *gin.Context) {

}
