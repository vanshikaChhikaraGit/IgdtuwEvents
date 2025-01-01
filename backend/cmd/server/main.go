package main

import (
	"fmt"

	db "igdtuevents/pkg"
	"igdtuevents/routes/events"
	"igdtuevents/routes/societies"
	"log"
	"os"
"github.com/gin-contrib/cors"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/gin-gonic/gin"
)

func main(){
	fmt.Print("server is running")
	database, err := db.StartDB()
    if err != nil {
        log.Fatal("error starting the database", err)
    }
	CLERK_ENV_KEY := os.Getenv("CLERK_ENV_KEY")
	clerk.SetKey(CLERK_ENV_KEY)

	router:= gin.Default()
	router.Use(func(c *gin.Context) {
		fmt.Println("Incoming request:", c.Request.Method, c.Request.URL.Path)
		c.Next()
	})
	
	event:=router.Group("/events")
	{
		event.POST("/createevent", func(c *gin.Context) {
			events.CreateEvent(c, database)
		})
		event.POST("/deleteevent/:eventID", func(c *gin.Context) {
			events.DeleteEvent(c, database)
		})
		event.GET("/getallevents", func(c *gin.Context) {
			events.GetAllEvents(c, database)
		})
		event.GET("/getevent/:eventID",func(c *gin.Context) {
			events.GetEventById(c,database)
		})
	}
	society:=router.Group("/society")
	{

		society.POST("/createsociety", func(c *gin.Context) {
			societies.CreateSociety(c,database)
		})
		society.POST("/deletesociety/:societyID", func(c *gin.Context) {
			societies.DeleteSociety(c,database)
		})
		society.GET("/getallsocieties", func(c *gin.Context) {
			societies.GetAllSocieties(c,database)
		})
		society.GET("/getsociety/:societyID",func(c *gin.Context) {
			societies.GetSocietyById(c,database)
		})

	}
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Server is awake!",
		})
	})
	
    router.Run(":8080")
	
<<<<<<< HEAD
}
=======
	

	

	
	
}
>>>>>>> db9573247bd8f556b259490f6b5ebb3284556114
