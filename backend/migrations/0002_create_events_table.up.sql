CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(75) NOT NULL,
    event_description VARCHAR(300),
    organized_by VARCHAR(75) NOT NULL,
    event_start_date TIMESTAMP NOT NULL,
    event_end_date TIMESTAMP NOT NULL,
    registration_link VARCHAR(300),
    location VARCHAR(75) NOT NULL
);