package hall

import (
	"fmt"
	"github.com/SmileChen518/goFrame/models"
	"github.com/SmileChen518/goFrame/pkg/e"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ChangePasswd(c *gin.Context) {
	phone := c.Query("Phone")
	oldPasswd := c.Query("oldPasswd")
	passwd := c.Query("Passwd")
	data := make(map[string]interface{})
	code, msg := e.INVALID_PARAMS, ""
	Bool := models.IsExist(phone)
	if Bool {
		Bool_Pwd := models.IsRight(phone, oldPasswd)
		if Bool_Pwd {
			data["passwd"] = passwd
			models.EditUser(phone, data)
			code = e.SUCCESS
			msg = "修改成功！"
		} else {
			code = e.ERROR_WRONG_PASSWD
		}
	} else {
		code = e.ERROR_NOT_EXIST_PHONE
	}
	c.Header("Access-Control-Allow-Origin", "*")
	fmt.Println(code, msg)
	c.JSON(http.StatusOK, gin.H{"code": code, "msg": e.GetMsg(code, msg)})
}
