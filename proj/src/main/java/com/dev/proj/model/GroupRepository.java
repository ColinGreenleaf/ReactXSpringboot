package com.dev.proj.model;

import org.springframework.data.jpa.repository.JpaRepository;


// this is the repository for a group, it extends the JpaRepository so it has all the methods of a JpaRepository
// it has a method to find a group by name

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}