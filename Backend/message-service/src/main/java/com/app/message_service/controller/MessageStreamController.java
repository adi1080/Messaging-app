package com.app.message_service.controller;

import com.app.message_service.entity.CustomerMessage;
import com.app.message_service.repository.CustomerMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MessageStreamController {

    private final CustomerMessageRepository repo;

    private final Set<SseEmitter> emitters = ConcurrentHashMap.newKeySet();

    @GetMapping("/stream")
    public SseEmitter streamMessages() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError(e -> emitters.remove(emitter));

        return emitter;
    }

    @PostMapping("/createMessage")
    public CustomerMessage saveMessage(@RequestBody CustomerMessage msg) {

        String body = msg.getMessageBody().toLowerCase();
        if (body.contains("loan") || body.contains("approve") || body.contains("disburse")) {
            msg.setUrgency(3);
        } else if (body.contains("update") || body.contains("info") || body.contains("reject")) {
            msg.setUrgency(2);
        } else {
            msg.setUrgency(1);
        }

        CustomerMessage saved = repo.save(msg);

        // Track emitters that failed
        List<SseEmitter> deadEmitters = new ArrayList<>();

        // Send event to all active emitters
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("new-message")
                        .data(saved));
            } catch (Exception e) {
                deadEmitters.add(emitter); // mark emitter as dead
            }
        });

        // Remove failed emitters AFTER loop to avoid concurrent modification issues
        emitters.removeAll(deadEmitters);

        return saved;
    }
}
