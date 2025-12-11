package com.app.message_service.controller;

import com.app.message_service.entity.Agents;
import com.app.message_service.repository.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/agents")
@RequiredArgsConstructor
public class AgentController {

    private final Set<String> activeAgents = ConcurrentHashMap.newKeySet();
    private final AgentRepository agentRepository;

    @PostMapping("/login")
    public String login(@RequestBody Agents agent) {
        if(agentRepository.existsByAgentNameAndPassword(agent.getAgentName() , agent.getPassword())) {
            activeAgents.add(agent.getAgentName());
            return agent.getAgentName() + " logged in successfully";
        }
        else{
            return "login failed";
        }
    }

    @PostMapping("/logout")
    public void logout(@RequestBody String agentName) {
        activeAgents.remove(agentName);
    }

}

