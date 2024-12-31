package societies

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
	"github.com/go-playground/validator/v10"
)


type Society struct{
	SocietyId int `json:"-" pg:"society_id,pk"`
    SocietyName string `json:"society_name" validate:"max=75"`
	SocietyDescription string `json:"society_description" validate:"omitempty,max=500"`
	SocietyType string `json:"society_type" validate:"omitempty,max=50"`
	RegistrationLink string `json:"registration_link" validate:"omitempty,max=300"`
	Status bool `json:"-" pg:"status"`
	CreatedOn string `json:"created_on"`
}
type ValidationError struct{
	Field   string `json:"field"`
	Message string `json:"message"`
}
func CreateSociety(c *gin.Context, database *pg.DB){

	var body Society

	err:=c.ShouldBindJSON(&body)

	fmt.Print(body)
	if err!=nil{
		c.JSON(400, gin.H{
			"error":"invalid json format provided for creating a society",
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

	society:=&Society{
		SocietyName: body.SocietyName,
		SocietyDescription: body.SocietyDescription,
		SocietyType: body.SocietyType,
		RegistrationLink: body.RegistrationLink,
		CreatedOn: body.CreatedOn,
	}
	db:=database.Model()

	_,err =db.Model(society).Insert()

	if err!=nil{
		c.JSON(500,gin.H{
			"error":"couldn't insert new society into database",
		})
		panic(err)
	}

	c.JSON(200,gin.H{
		"message":"society created",
		"societyID": society.SocietyId,
		"soceity": society,
		"status":society.Status,
	})

}