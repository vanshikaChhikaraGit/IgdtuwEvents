CREATE TABLE IF NOT EXISTS societies (
    society_id SERIAL PRIMARY KEY,
    society_name VARCHAR(75) UNIQUE NOT NULL,
    society_description VARCHAR(500),
    created_on TIMESTAMP NOT NULL,
    society_type VARCHAR(50),
    status BOOLEAN DEFAULT true,
    registration_link VARCHAR(300)
);