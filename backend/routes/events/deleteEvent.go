package events

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)
func DeleteEvent(c *gin.Context, db *pg.DB ){

	eventId:=c.Param("eventID")
	eventID,err:=strconv.Atoi(eventId)
	if err!=nil{
		c.JSON(400, gin.H{"error": "invalid event ID"})
        return
	}
	result,err:=db.Model(&Events{}).Where("event_id=?",eventID).Delete()

	if err!=nil{

		c.JSON(500,gin.H{
			"error":"couldn't delete the event from database",
		})
		return
	}
	if result.RowsAffected() == 0 {
        c.JSON(404, gin.H{
            "error": "event not found. Please chaeck your event ID",
        })
        return
    }

	c.JSON(200,gin.H{
		"message":"event deleted successfully",
		"eventID":eventID,
	})

}