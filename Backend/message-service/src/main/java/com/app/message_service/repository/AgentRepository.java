package com.app.message_service.repository;

import com.app.message_service.entity.Agents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepository extends JpaRepository<Agents, Long> {
    boolean existsByAgentNameAndPassword(String agentName, String password);
}
