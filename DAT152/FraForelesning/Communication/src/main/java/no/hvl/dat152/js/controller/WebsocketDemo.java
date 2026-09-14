package no.hvl.dat152.js.controller;

import java.io.IOException;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketDemo extends TextWebSocketHandler {
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        String receivedMessage = (String) message.getPayload();
        System.out.println("Got message from client " + session.getId() + ": " + receivedMessage);

        // Process the message and send a response if needed
        try {
            session.sendMessage(new TextMessage("Data sent from server to client"));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Client " + session.getId() + " has opened a connection.");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Client " + session.getId() + " has ended");
    }
}

//https://medium.com/@iamarijit07/building-real-time-applications-with-java-spring-boot-and-websocket-d674be1ce897
//https://docs.spring.io/spring-framework/reference/web/websocket/server.html
//https://medium.com/@ropelife/real-time-communication-with-websocket-in-spring-boot-using-webflux-5d9fbb36a0ab
