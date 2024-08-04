package com.dev.proj.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.proj.model.Group;
import com.dev.proj.model.GroupRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;
import jakarta.validation.Valid;

// this is the controller for a group
@RestController
@RequestMapping("/api")
class GroupController {

    // create a logger and a repository for groups
    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private GroupRepository groupRepository;

    // constructor for the group controller, with a repository parameter
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    //GET endpoint to retrieve all groups
    @GetMapping("/groups")
    Collection<Group> groups() {
        return groupRepository.findAll();
    }

    //GET endpoint to retrieve a specific group
    @GetMapping("/group/{id}")
    ResponseEntity<?> getGroup(@PathVariable long id) {
        //find the id, optional because it may not exist
        Optional<Group> group = groupRepository.findById(id);
        //return the group mapped to a response entity, or return not found
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //POST endpoint to create a new group
    @PostMapping("/group")
    //parameter is the group to create, validate the request body
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException {
        //log the request to create a group
        log.info("Request to create group: {}", group);
        //save the group
        Group result = groupRepository.save(group);
        //return the response entity with the created group
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    //PUT endpoint to update a group
    @PutMapping("/group/{id}")
    //parameter is the group to update, validate the request body
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
        //log the request to update a group
        log.info("Request to update group: {}", group);
        //save the updated group
        Group result = groupRepository.save(group);
        //return ok response with the updated group
        return ResponseEntity.ok().body(result);
    }

    //DELETE endpoint to delete a group
    @DeleteMapping("/group/{id}")
    //parameter is the id of the group to delete
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        //log the request to delete a group
        log.info("Request to delete group: {}", id);
        //delete the group
        groupRepository.deleteById(id);
        //return ok response
        return ResponseEntity.ok().build();
    }


}
