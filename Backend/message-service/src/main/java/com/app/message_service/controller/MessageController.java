package com.app.message_service.controller;

import com.app.message_service.domain.MessageResponse;
import com.app.message_service.entity.CustomerMessage;
import com.app.message_service.repository.CustomerMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class MessageController {

    private final CustomerMessageRepository customerMessageRepository;

    @GetMapping("/getById/{id}")
    public CustomerMessage getMessageById(@PathVariable Long id) {
        return customerMessageRepository.findById(id).orElse(null);
    }

    @GetMapping("/responded")
    public List<CustomerMessage> getAllMessages() {
        return customerMessageRepository.findByRespondedByIsNotNull();
    }

    @GetMapping("/pending")
    public List<CustomerMessage> getPendingMessages() {
        return customerMessageRepository.findByRespondedByIsNull();
    }

    @PostMapping("/respond")
    public ResponseEntity<?> respondToMessage(@RequestBody MessageResponse responseDomain) {

        CustomerMessage message = customerMessageRepository.findById(responseDomain.getMessageId())
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (message.getRespondedBy() != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Message already responded by: " + message.getRespondedBy());
        }

        message.setRespondedBy(responseDomain.getAgentName());
        message.setRespondedAt(LocalDateTime.now());
        message.setReply(responseDomain.getResponseText());

        customerMessageRepository.save(message);

        return ResponseEntity.ok("Response saved successfully");
    }

    @GetMapping("/customer-info/{userId}")
    public Map<String, Object> getCustomerInfo(@PathVariable Integer userId) {
        Map<String, Object> info = new HashMap<>();
        info.put("userId", userId);
        info.put("accountAgeDays", 120);
        info.put("loanHistoryCount", 5);
        info.put("latestLoanStatus", "Approved");
        return info;
    }
}
