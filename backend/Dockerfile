FROM golang:1.23-alpine

WORKDIR /app

ADD . .

RUN go build -o main ./cmd/server/main.go && ls -l /app && chmod +x /app/main

EXPOSE 8080

CMD ["/app/main"]



