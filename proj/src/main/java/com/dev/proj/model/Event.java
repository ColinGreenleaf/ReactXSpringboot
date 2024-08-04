package com.dev.proj.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.time.Instant;
import java.util.Set;

// this is the data class for an event
// it has an id, date, title, description, and a set of attendees
// the attendees are a set of users
// the event is an entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Event {

    @Id
    @GeneratedValue
    private Long id;
    
    private Instant date;
    private String title;
    private String description;

    @ManyToMany
    private Set<User> attendees;
}
