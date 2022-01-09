const WebSocket = require("ws")
const express = require("express")
const app = express()

const port = 4356
const server = new WebSocket.Server({ port: port })
console.log(`[WebSocket] starting websocket server port ${port}`)

server.on('connection', (websocket, request) => {
    const clientIP = request.socket.remoteAddress;
    console.log(`[WebSocket] Client with ip ${clientIP} connected.`)
    websocket.send("Thank you for connected to me.")

    websocket.on('message', (data, isBinary) => {

        let message = '...'

        server.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                message = isBinary ? data : data.toString()
                client.send(message)
            }
        })

        console.log(`[WebSocket] Recieved: ${message}`)
    })
})

