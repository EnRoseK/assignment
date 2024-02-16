package com.example.backend.dtos;

import com.example.backend.entities.Section;
import com.example.backend.entities.User;

public class UserRegisterDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private Long sectionId;
    private String password;
    private String passwordConfirmation;

    public UserRegisterDTO() {
    }

    public UserRegisterDTO(String email, String firstName, String lastName, String gender, Long sectionId, String password, String passwordConfirmation) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.sectionId = sectionId;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getSectionId() {
        return sectionId;
    }

    public void setSectionId(Long sectionId) {
        this.sectionId = sectionId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public User toUser(Section section) {
        return new User(email, firstName, lastName, password, gender, section);
    }
}
