package com.app.message_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "customer_messages",
        indexes = {
                @Index(name = "idx_user_id", columnList = "user_id"),
                @Index(name = "idx_timestamp", columnList = "timestamp_utc")
        }
)
public class CustomerMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "message_body", nullable = false, columnDefinition = "TEXT")
    private String messageBody;

    @Column(name = "responded_by")
    private String respondedBy;

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    @Column(name = "reply")
    private String reply;

    @Column(name = "urgency")
    private Integer urgency; // 1 = low, 2 = medium, 3 = high

    @Column(name = "timestamp_utc", nullable = false, updatable = false)
    private LocalDateTime timestampUtc;

    @PrePersist
    protected void onCreate() {
        this.timestampUtc = LocalDateTime.now(); // Use UTC if system clock is UTC
    }
}
