package no.hvl.dat152.js;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import no.hvl.dat152.js.controller.WebsocketDemo;
import no.hvl.dat152.js.controller.WebsocketRandom;

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(demoHandler(), "/socket");
        registry.addHandler(randomHandler(), "/random");
    }

    @Bean
    public WebsocketDemo demoHandler() {
        return new WebsocketDemo();
    }

    @Bean
    public WebsocketRandom randomHandler() {
        return new WebsocketRandom();
    }

}
