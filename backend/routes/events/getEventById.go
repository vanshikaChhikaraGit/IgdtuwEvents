package events

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)

func GetEventById(c *gin.Context, db *pg.DB){

	var eventByID Events
	eventId := c.Param("eventID")

	eventID,err:= strconv.Atoi(eventId)
	if err!=nil{
		c.JSON(400,gin.H{
			"error":"couldn't get event ID",
		})
		return
	}

	err= db.Model(&eventByID).Where("event_id=?",eventID).Select()

	if err!=nil{
		c.JSON(500,gin.H{"error":"couldn't get event with the provided ID"})
		return
	}

	c.JSON(200,gin.H{
		"event":eventByID,
	})

}