package societies

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)
func DeleteSociety(c *gin.Context, db *pg.DB){

	societyId:=c.Param("societyID")
	societyID,err:=strconv.Atoi(societyId)
	if err!=nil{
		c.JSON(400, gin.H{"error": "invalid society ID"})
        return
	}

	result,err:=db.Model(&Society{}).Where("society_id=?",societyID).Delete()

	if err!=nil{

		c.JSON(500,gin.H{
			"error":"couldn't delete the society from database",
		})
		return
	}
	if result.RowsAffected()==0{
		c.JSON(404, gin.H{
            "error": "society not found. Please chaeck your society ID",
        })
        return
    }
	c.JSON(200,gin.H{
		"message":"event deleted successfully",
		"societyID":societyID,
	})


}