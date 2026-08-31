package no.hvl.dat152.js.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketRandom extends TextWebSocketHandler {

    private static Set<WebSocketSession> sessions = new HashSet<>();
    private ScheduledExecutorService timer;

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        String receivedMessage = (String) message.getPayload();
        System.out.println("Got message from client " + session.getId() + ": " + receivedMessage);

        try {
            session.sendMessage(new TextMessage("Data sent from server to client"));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        System.out.println("Client " + session.getId() + " has opened a connection.");
        timer = Executors.newSingleThreadScheduledExecutor();
        Random randomGenerator = new Random();
        timer.scheduleAtFixedRate(() -> sendRandom(session, randomGenerator), 0, 5, TimeUnit.SECONDS);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Client " + session.getId() + " has ended");
    }

    private void sendRandom(WebSocketSession session, Random randomGenerator) {
        String randomNumberAsText = Integer.toString(randomGenerator.nextInt(100));
        System.out.println("To client: " + randomNumberAsText);
        try {
            session.sendMessage(new TextMessage(randomNumberAsText));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
