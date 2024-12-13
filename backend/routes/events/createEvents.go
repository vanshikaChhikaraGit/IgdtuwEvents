package events

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/go-pg/pg/v10"
)


type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}
func CreateEvent(c *gin.Context, database *pg.DB){

	var body Events

	err:= c.ShouldBindJSON(&body)

	fmt.Print(body)
	if err!=nil{
		 c.JSON(400, gin.H{
			"error":"invalid json format provided for creating an event",
		})
		return
	}
	
	validate:= validator.New()
	err = validate.Struct(body)

	if err!=nil{
		var validationErr []ValidationError
		for _,err := range err.(validator.ValidationErrors){
			validationErr = append(validationErr, ValidationError{
				Field: err.Field(),
				Message: fmt.Sprintf("Invalid value for %s", err.Field()),
			})
		}
		c.JSON(400,gin.H{
		   "error":"validation failed",
		   "fields": validationErr,
		})
		return
	}

	event:= &Events{
		EventName : body.EventName,
		EventDescription: body.EventDescription,
		OrganizedBy: body.OrganizedBy,
		EventStartDate: body.EventStartDate,
		EventEndDate: body.EventEndDate,
		RegistrationLink: body.RegistrationLink,
		Location: body.Location,
	}
	db:=database.Model()

	_,err =db.Model(event).Insert()
	if err!=nil{
		c.JSON(500,gin.H{
			"error":"couldn't insert new event into database",
		})
		panic(err)
	}


	c.JSON(200,gin.H{
		"message":"event created",
		"eventID": event.EventId,
		"event": event,
	})
}