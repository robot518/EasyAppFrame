package routers

import (
	"github.com/SmileChen518/goFrame/models/jwt"
	"github.com/SmileChen518/goFrame/pkg/setting"
	"github.com/SmileChen518/goFrame/routers/api"
	"github.com/SmileChen518/goFrame/routers/api/hall"
	v1 "github.com/SmileChen518/goFrame/routers/api/v1"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "test",
		})
	})

	r.GET("/register", api.Register)
	r.GET("/login", api.Login)

	apihall := r.Group("/api/hall")
	apihall.Use(jwt.JWT())
	{
		apihall.GET("/user/changepasswd", hall.ChangePasswd)
		apihall.GET("/home/nodeinfo", hall.ChangePasswd)
	}

	//r.GET("/auth", api.GetAuth)

	//url := ginSwagger.URL("http://localhost:8000/swagger/doc.json") // The url pointing to API definition
	//r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	apiv1 := r.Group("/api/v1")
	apiv1.Use(jwt.JWT())
	{
		//获取标签列表
		apiv1.GET("/tags", v1.GetTags)
		//新建标签
		apiv1.POST("/tags", v1.AddTag)
		//更新指定标签
		apiv1.PUT("/tags/:id", v1.EditTag)
		//删除指定标签
		apiv1.DELETE("/tags/:id", v1.DeleteTag)

		//获取文章列表
		apiv1.GET("/articles", v1.GetArticles)
		//获取指定文章
		apiv1.GET("/articles/:id", v1.GetArticle)
		//新建文章
		apiv1.POST("/articles", v1.AddArticle)
		//更新指定文章
		apiv1.PUT("/articles/:id", v1.EditArticle)
		//删除指定文章
		apiv1.DELETE("/articles/:id", v1.DeleteArticle)
	}

	return r
}
