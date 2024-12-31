package societies

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)

func GetSocietyById(c *gin.Context, db *pg.DB){

	var societyByID Society
	societyId := c.Param("societyID")

	societyID,err:= strconv.Atoi(societyId)
	if err!=nil{
		c.JSON(400,gin.H{
			"error":"couldn't get society ID",
		})
		return
	}

	err= db.Model(&societyByID).Where("society_id=?",societyID).Select()

	if err!=nil{
		c.JSON(500,gin.H{"error":"couldn't get society with the provided ID"})
		return
	}

	c.JSON(200,gin.H{
		"society":societyByID,
	})

}