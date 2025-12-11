package com.app.message_service.domain;

import lombok.Data;

@Data
public class MessageResponse {
    private Long messageId;
    private String agentName;
    private String responseText;
}
