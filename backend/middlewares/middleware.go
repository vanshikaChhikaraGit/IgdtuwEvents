package middlewares

import (
	"log"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gin-gonic/gin"
)
func ClerkMiddleware(c *gin.Context){
        claims,ok:= clerk.SessionClaimsFromContext(c)
		if !ok{
			c.JSON(401,gin.H{
				"access":"unauthorized",
			})
			c.Abort()
			return
		}
	
		usr,err:=user.Get(c,claims.ID)
		if err!=nil{
			c.JSON(500,gin.H{
				"error":"user not found",
			})
			log.Println("error retieving userid from session claims",err)

			c.Abort()
			return
		}

		c.Set("userID",usr.ID)
		c.Next()
	}