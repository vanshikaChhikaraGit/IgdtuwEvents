package events

type Events struct{
    EventId int `json:"-" validate:"omitempty" pg:"event_id,pk"`
	EventName string `json:"event_name" validate:"required,min=1,max=75"`
	EventDescription *string `json:"event_description" validate:"omitempty,max=300"`
	OrganizedBy string `json:"organized_by" validate:"required,max=75"`
	EventStartDate string `json:"event_start_date" validate:"required"`
	EventEndDate string `json:"event_end_date" validate:"required"`
	RegistrationLink *string `json:"registration_link" validate:"omitempty"`
	Location string `json:"location" validate:"required,max=75"`
}