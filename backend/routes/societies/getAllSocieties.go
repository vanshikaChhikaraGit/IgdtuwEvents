package societies

import (
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)
func GetAllSocieties(c *gin.Context, db *pg.DB){
     var allSocieties []Society

	 err:= db.Model(&allSocieties).Select()

	if err!=nil{
		c.JSON(500,gin.H{
			"error":"couldn't fetch all societies",
		})
	}
	// Manually format the response to include EventId in the response
	var response []map[string]interface{}
	for _, society := range allSocieties {
		societyMap := map[string]interface{}{
			"society_id":          society.SocietyId,
			"society_name":        society.SocietyName,
			"society_description": society.SocietyDescription,
			"society_type":        society.SocietyType,
			"society_status":      society.Status,
			"society_createdon":   society.CreatedOn,
			"registration_link":   society.RegistrationLink,
		}
		response = append(response, societyMap)
	}

	// Return the events with the event_id included
	c.JSON(200, gin.H{
		"societies": response,
	})
}