package com.dev.proj.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;


// this is the data class for a group
// it has an id, name, address, city, state or province, country, postal code, user, and a set of events
// many groups can have the same user, and one user can have many groups
// one group can have many events, but an event can only belong to one group
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class Group {

    @Id
    @GeneratedValue
    private long id;

    @NonNull
    private String name;

    private String address;
    private String city;
    private String stateOrProvince;
    private String country;
    private String postalCode;

    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Event> events;
}