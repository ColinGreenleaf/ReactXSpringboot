package com.dev.proj;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.dev.proj.model.Event;
import com.dev.proj.model.Group;
import com.dev.proj.model.GroupRepository;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;


// this is the initializer for the application
@Component
class Initializer implements CommandLineRunner {

    // create a repository for groups
    private final GroupRepository repository;

    // constructor for the initializer, with a repository parameter
    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    // run the initializer, overriding the run method
    @Override
    public void run(String... strings) {
        // take a series of strings and create a group for each one
        Stream.of("Seattle", "Denver", "Dublin",
                "London").forEach(name ->
                repository.save(new Group(name))
        );

        // find the group with the name Seattle
        Group djug = repository.findByName("Seattle");
        // create an event for the group, using the builder pattern to set the title, description, and date
        Event e = Event.builder()
                .title("Micro Frontends for Java Developers")
                .description("JHipster now has microfrontend support!")
                .date(Instant.parse("2022-09-13T17:00:00.000Z"))
                .build();
        // get a collection with the event e as the only element, and set as the events for the group 
        djug.setEvents(Collections.singleton(e));
        // save the group
        repository.save(djug);

        // print out all the groups
        repository.findAll().forEach(System.out::println);
    }
}
