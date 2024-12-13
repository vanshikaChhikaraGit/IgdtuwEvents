package events

import (
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)

func GetAllEvents(c *gin.Context, db *pg.DB){

	var allEvents []Events
    err:= db.Model(&allEvents).Select()

	if err!=nil{
		c.JSON(500,gin.H{
			"error":"couldn't fetch all events",
		})
	}
	// Manually format the response to include EventId in the response
	var response []map[string]interface{}
	for _, event := range allEvents {
		eventMap := map[string]interface{}{
			"event_id":         event.EventId,
			"event_name":       event.EventName,
			"event_description": event.EventDescription,
			"organized_by":     event.OrganizedBy,
			"event_start_date": event.EventStartDate,
			"event_end_date":   event.EventEndDate,
			"registration_link": event.RegistrationLink,
			"location":         event.Location,
		}
		response = append(response, eventMap)
	}

	// Return the events with the event_id included
	c.JSON(200, gin.H{
		"events": response,
	})


}